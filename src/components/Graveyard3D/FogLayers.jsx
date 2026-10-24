import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { getFogTexture } from './textures'

export default function FogLayers({ reducedMotion = false }) {
  const fogTexture = getFogTexture()
  const fogGroup = useRef()

  const layers = useMemo(() => {
    return [
      { pos: [-4, 0.4, 2], scale: [12, 5], speed: 0.12, baseOpacity: 0.28 },
      { pos: [3, 0.3, 0], scale: [14, 6], speed: -0.09, baseOpacity: 0.35 },
      { pos: [-2, 0.6, -4], scale: [16, 7], speed: 0.08, baseOpacity: 0.32 },
      { pos: [5, 0.5, -8], scale: [22, 9], speed: -0.06, baseOpacity: 0.4 },
      { pos: [0, 0.2, 3], scale: [10, 4], speed: 0.15, baseOpacity: 0.22 },
    ]
  }, [])

  useFrame((state) => {
    if (reducedMotion || !fogGroup.current) return
    const t = state.clock.getElapsedTime()

    fogGroup.current.children.forEach((child, i) => {
      const cfg = layers[i]
      if (!cfg) return

      // Subtle horizontal drift
      child.position.x = cfg.pos[0] + Math.sin(t * cfg.speed + i) * 1.5
      // Gentle height breathing
      child.position.y = cfg.pos[1] + Math.sin(t * 0.4 + i * 2) * 0.12

      if (child.material) {
        child.material.opacity = cfg.baseOpacity + Math.sin(t * 0.5 + i) * 0.05
      }
    })
  })

  return (
    <group ref={fogGroup}>
      {layers.map((layer, index) => (
        <mesh
          key={index}
          position={layer.pos}
          rotation={[-0.1, 0, 0]}
        >
          <planeGeometry args={layer.scale} />
          <meshBasicMaterial
            map={fogTexture}
            transparent
            opacity={layer.baseOpacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}
