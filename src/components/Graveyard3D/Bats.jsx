import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function BatItem({ config, reducedMotion }) {
  const batRef = useRef()
  const leftWingRef = useRef()
  const rightWingRef = useRef()

  const wingShape = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(0, 0)
    shape.lineTo(0.35, 0.25)
    shape.lineTo(0.55, 0.15)
    shape.lineTo(0.7, 0.3)
    shape.lineTo(0.85, 0.1)
    shape.lineTo(0.65, -0.2)
    shape.lineTo(0.35, -0.15)
    shape.lineTo(0, 0)
    return shape
  }, [])

  useFrame((state) => {
    if (reducedMotion || !batRef.current) return
    const t = state.clock.getElapsedTime()
    const { speed, flapSpeed, startX, endX, yOffset, z, arcHeight, seed } = config

    // Progress across sky
    const cycleTime = (endX - startX) / speed
    const currentProgress = ((t + seed) % cycleTime) / cycleTime
    const currentX = startX + currentProgress * (endX - startX)

    // Gentle swooping flight arc
    const arc = Math.sin(currentProgress * Math.PI) * arcHeight
    const wobbleY = Math.sin(t * 3.5 + seed) * 0.18

    batRef.current.position.set(currentX, yOffset + arc + wobbleY, z)

    // Bank into flight direction
    batRef.current.rotation.z = -0.12 + Math.sin(t * 2 + seed) * 0.08
    batRef.current.rotation.y = Math.PI / 2 + Math.sin(t * 1.5 + seed) * 0.1

    // Flap wings
    const flap = Math.sin(t * flapSpeed) * 0.75
    if (leftWingRef.current) leftWingRef.current.rotation.z = flap
    if (rightWingRef.current) rightWingRef.current.rotation.z = -flap
  })

  return (
    <group ref={batRef} position={[config.startX, config.yOffset, config.z]} scale={config.scale}>
      {/* Bat small head and body */}
      <mesh>
        <capsuleGeometry args={[0.07, 0.25, 4, 8]} />
        <meshBasicMaterial color="#020408" />
      </mesh>

      {/* Left Wing Pivot */}
      <group ref={leftWingRef} position={[-0.05, 0.05, 0]}>
        <mesh rotation={[Math.PI / 2, 0, Math.PI]}>
          <shapeGeometry args={[wingShape]} />
          <meshBasicMaterial color="#05070d" side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Right Wing Pivot */}
      <group ref={rightWingRef} position={[0.05, 0.05, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <shapeGeometry args={[wingShape]} />
          <meshBasicMaterial color="#05070d" side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  )
}

export default function Bats({ reducedMotion = false }) {
  const batsData = useMemo(() => {
    return [
      {
        startX: -14,
        endX: 14,
        yOffset: 3.5,
        z: -9,
        speed: 3.2,
        flapSpeed: 16,
        arcHeight: 1.2,
        scale: [0.75, 0.75, 0.75],
        seed: 0,
      },
      {
        startX: -15,
        endX: 13,
        yOffset: 4.8,
        z: -12,
        speed: 2.6,
        flapSpeed: 14,
        arcHeight: 0.8,
        scale: [0.55, 0.55, 0.55],
        seed: 4.2,
      },
      {
        startX: -12,
        endX: 12,
        yOffset: 2.8,
        z: -6,
        speed: 3.8,
        flapSpeed: 18,
        arcHeight: 1.4,
        scale: [0.9, 0.9, 0.9],
        seed: 8.5,
      },
      {
        startX: -16,
        endX: 14,
        yOffset: 5.5,
        z: -14,
        speed: 2.2,
        flapSpeed: 13,
        arcHeight: 0.6,
        scale: [0.45, 0.45, 0.45],
        seed: 12.1,
      },
    ]
  }, [])

  if (reducedMotion) return null

  return (
    <group>
      {batsData.map((data, idx) => (
        <BatItem key={idx} config={data} reducedMotion={reducedMotion} />
      ))}
    </group>
  )
}
