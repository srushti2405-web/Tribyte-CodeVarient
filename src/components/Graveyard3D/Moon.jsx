import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { getMoonGlowTexture } from './textures'

export default function Moon({ position = [3.8, 4.0, -14] }) {
  const glowRef = useRef()
  const moonRef = useRef()
  const glowTexture = getMoonGlowTexture()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (glowRef.current) {
      // Gentle breathing glow
      const scale = 1 + Math.sin(t * 0.8) * 0.04
      glowRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <group position={position}>
      {/* Directional moonlight casting across the cemetery */}
      <directionalLight
        color="#dbeafe"
        intensity={1.6}
        position={[0, 0, 2]}
        target-position={[0, -4, 10]}
      />

      {/* Moon sphere core */}
      <mesh ref={moonRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color="#f8fafc"
          emissive="#dbeafe"
          emissiveIntensity={0.85}
          roughness={0.9}
        />
      </mesh>

      {/* Inner Moon Halo */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[4.2, 4.2]} />
        <meshBasicMaterial
          map={glowTexture}
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Wide atmospheric mystical corona */}
      <mesh ref={glowRef} position={[0, 0, 0.03]}>
        <planeGeometry args={[9.5, 9.5]} />
        <meshBasicMaterial
          map={glowTexture}
          transparent
          opacity={0.45}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}
