import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { getParticleTexture } from './textures'

// Deterministic pseudo-random generator to satisfy React 19 compiler purity
function seededRandom(seed) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export default function Fireflies({ count = 160, reducedMotion = false }) {
  const pointsRef = useRef()
  const particleTexture = getParticleTexture()

  const [positions, colors, seeds] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const s = new Float32Array(count * 3)

    const palette = [
      new THREE.Color('#34d399'), // Emerald revival
      new THREE.Color('#6ee7b7'), // Pale mint
      new THREE.Color('#c084fc'), // Ghost violet
      new THREE.Color('#a78bfa'), // Amethyst
      new THREE.Color('#93c5fd'), // Pale moonlight
      new THREE.Color('#fef08a'), // Soft firefly gold
    ]

    for (let i = 0; i < count; i++) {
      const r1 = seededRandom(i * 3 + 1)
      const r2 = seededRandom(i * 3 + 2)
      const r3 = seededRandom(i * 3 + 3)
      const r4 = seededRandom(i * 3 + 4)
      const r5 = seededRandom(i * 3 + 5)

      // Scatter in volume around graveyard
      pos[i * 3 + 0] = (r1 - 0.5) * 26
      pos[i * 3 + 1] = 0.2 + r2 * 5.0
      pos[i * 3 + 2] = -12 + r3 * 18

      const colorIndex = Math.floor(r4 * palette.length)
      const c = palette[colorIndex]
      col[i * 3 + 0] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b

      s[i * 3 + 0] = r5 * Math.PI * 2
      s[i * 3 + 1] = 0.4 + r1 * 0.8 // speed
      s[i * 3 + 2] = r2 * 0.5 + 0.5 // scale factor
    }

    return [pos, col, s]
  }, [count])

  useFrame((state) => {
    if (reducedMotion || !pointsRef.current) return
    const t = state.clock.getElapsedTime()
    const geo = pointsRef.current.geometry
    const posAttr = geo.attributes.position
    const arr = posAttr.array

    for (let i = 0; i < count; i++) {
      const idx = i * 3
      const seed = seeds[idx]
      const spd = seeds[idx + 1]

      // Gentle floating upward & sinusoidal drift
      arr[idx + 1] += Math.sin(t * spd + seed) * 0.003 + 0.002
      arr[idx + 0] += Math.cos(t * spd * 0.6 + seed) * 0.004

      // Wrap vertically within range
      if (arr[idx + 1] > 6.0) {
        arr[idx + 1] = 0.2
      } else if (arr[idx + 1] < 0.1) {
        arr[idx + 1] = 5.8
      }
    }

    posAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.22}
        map={particleTexture}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
