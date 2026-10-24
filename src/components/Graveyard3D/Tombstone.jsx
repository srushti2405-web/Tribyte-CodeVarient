import { useMemo } from 'react'

export default function Tombstone({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  variant = 'arched', // 'arched' | 'cross' | 'obelisk' | 'weathered'
  glow = false,
}) {
  const stoneColor = useMemo(() => {
    const tones = ['#1a202c', '#151b26', '#1e2638', '#141a24']
    const hash = Math.abs(Math.round(position[0] * 7 + position[2] * 13))
    return tones[hash % tones.length]
  }, [position])

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Stone Base pedestal */}
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.1, 0.2, 0.6]} />
        <meshStandardMaterial
          color="#0f1520"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {variant === 'arched' && (
        <group position={[0, 0.2, 0]}>
          {/* Main slab */}
          <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.85, 1.0, 0.25]} />
            <meshStandardMaterial
              color={stoneColor}
              roughness={0.88}
              metalness={0.1}
            />
          </mesh>
          {/* Arched top */}
          <mesh position={[0, 1.1, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
            <cylinderGeometry args={[0.425, 0.425, 0.25, 20]} />
            <meshStandardMaterial
              color={stoneColor}
              roughness={0.88}
              metalness={0.1}
            />
          </mesh>
          {/* Carved cross / relief mark */}
          <mesh position={[0, 0.75, 0.135]}>
            <boxGeometry args={[0.08, 0.4, 0.02]} />
            <meshStandardMaterial
              color={glow ? '#34d399' : '#080d16'}
              emissive={glow ? '#10b981' : '#000000'}
              emissiveIntensity={glow ? 0.8 : 0}
              roughness={0.5}
            />
          </mesh>
          <mesh position={[0, 0.82, 0.135]}>
            <boxGeometry args={[0.26, 0.08, 0.02]} />
            <meshStandardMaterial
              color={glow ? '#34d399' : '#080d16'}
              emissive={glow ? '#10b981' : '#000000'}
              emissiveIntensity={glow ? 0.8 : 0}
              roughness={0.5}
            />
          </mesh>
        </group>
      )}

      {variant === 'cross' && (
        <group position={[0, 0.2, 0]}>
          {/* Base block */}
          <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.6, 0.3, 0.4]} />
            <meshStandardMaterial color="#121824" roughness={0.9} />
          </mesh>
          {/* Vertical shaft */}
          <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.22, 1.4, 0.2]} />
            <meshStandardMaterial color={stoneColor} roughness={0.85} />
          </mesh>
          {/* Horizontal crossbar */}
          <mesh position={[0, 1.25, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.85, 0.2, 0.2]} />
            <meshStandardMaterial color={stoneColor} roughness={0.85} />
          </mesh>
          {/* Celtic halo ring */}
          <mesh position={[0, 1.25, 0]}>
            <torusGeometry args={[0.26, 0.04, 12, 24]} />
            <meshStandardMaterial color="#0f1522" roughness={0.9} />
          </mesh>
        </group>
      )}

      {variant === 'obelisk' && (
        <group position={[0, 0.2, 0]}>
          {/* Stepped plinth */}
          <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.7, 0.25, 0.55]} />
            <meshStandardMaterial color="#0f141f" roughness={0.9} />
          </mesh>
          {/* Tapered pillar */}
          <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.18, 0.32, 1.6, 4]} />
            <meshStandardMaterial color={stoneColor} roughness={0.85} />
          </mesh>
          {/* Pointed peak */}
          <mesh position={[0, 2.05, 0]} castShadow receiveShadow>
            <coneGeometry args={[0.18, 0.3, 4]} />
            <meshStandardMaterial color={stoneColor} roughness={0.85} />
          </mesh>
        </group>
      )}

      {variant === 'weathered' && (
        <group position={[0, 0.1, 0]} rotation={[0.08, 0.12, -0.15]}>
          {/* Sunken crooked slab */}
          <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.75, 1.1, 0.22]} />
            <meshStandardMaterial
              color={stoneColor}
              roughness={0.95}
              metalness={0.05}
            />
          </mesh>
          {/* Broken chipped corner */}
          <mesh position={[0.28, 1.05, 0]} rotation={[0, 0, 0.4]}>
            <boxGeometry args={[0.3, 0.2, 0.22]} />
            <meshStandardMaterial color="#0e131b" roughness={0.95} />
          </mesh>
        </group>
      )}

      {/* Earth mound hugging base */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.75, 12]} />
        <meshStandardMaterial color="#05080e" roughness={1} />
      </mesh>
    </group>
  )
}
