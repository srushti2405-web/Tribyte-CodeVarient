import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Moon from './Moon'
import Tombstone from './Tombstone'
import DeadTree from './DeadTree'
import FogLayers from './FogLayers'
import Fireflies from './Fireflies'
import Bats from './Bats'
import GraveyardGround from './GraveyardGround'

export default function GraveyardScene({ reducedMotion = false }) {
  const sceneRef = useRef()
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const scrollOffset = useRef(0)

  useEffect(() => {
    if (reducedMotion) return

    const handleMouseMove = (e) => {
      mouse.current.targetX = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1
    }

    const handleScroll = () => {
      const scrollMax = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      )
      scrollOffset.current = (window.scrollY / scrollMax) * 1.5
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [reducedMotion])

  useFrame(() => {
    if (reducedMotion || !sceneRef.current) return

    // Smooth lerp toward mouse target
    mouse.current.x = THREE.MathUtils.lerp(
      mouse.current.x,
      mouse.current.targetX,
      0.04
    )
    mouse.current.y = THREE.MathUtils.lerp(
      mouse.current.y,
      mouse.current.targetY,
      0.04
    )

    // Gentle parallax translation on group ref
    const targetX = -mouse.current.x * 0.75
    const targetY = -mouse.current.y * 0.35 + scrollOffset.current * 0.3
    const targetRotY = mouse.current.x * 0.05

    sceneRef.current.position.x = THREE.MathUtils.lerp(
      sceneRef.current.position.x,
      targetX,
      0.05
    )
    sceneRef.current.position.y = THREE.MathUtils.lerp(
      sceneRef.current.position.y,
      targetY,
      0.05
    )
    sceneRef.current.rotation.y = THREE.MathUtils.lerp(
      sceneRef.current.rotation.y,
      targetRotY,
      0.05
    )
  })

  return (
    <>
      {/* Atmospheric exponential fog */}
      <fogExp2 attach="fog" color="#05070e" density={0.048} />

      {/* Ambient lighting in deep midnight slate */}
      <ambientLight color="#0e172e" intensity={0.85} />

      {/* Eerie green crypt glow low among the tombstones */}
      <pointLight
        position={[-1.8, 0.5, 0.8]}
        color="#34d399"
        intensity={2.2}
        distance={9}
        decay={2}
      />

      {/* Subtle ghost-violet wisp light */}
      <pointLight
        position={[2.8, 0.8, -1.2]}
        color="#c084fc"
        intensity={1.8}
        distance={10}
        decay={2}
      />

      <group ref={sceneRef}>
        {/* Undulating graveyard soil */}
        <GraveyardGround />

        {/* The glowing full moon */}
        <Moon position={[3.6, 4.4, -13.5]} />

        {/* Dead Forest Silhouettes & Crooked Framing Trees */}
        {/* Background silhouettes in front of moon */}
        <DeadTree position={[4.0, 0, -11]} scale={[1.1, 1.1, 1.1]} rotation={[0, 0.4, 0]} />
        <DeadTree position={[2.2, 0, -12]} scale={[0.9, 0.9, 0.9]} rotation={[0, -0.6, 0]} />
        <DeadTree position={[5.8, 0, -10]} scale={[1.2, 1.2, 1.2]} rotation={[0, 0.2, 0]} />

        {/* Background left silhouettes */}
        <DeadTree position={[-3.2, 0, -10]} scale={[1.0, 1.0, 1.0]} rotation={[0, 0.8, 0]} />
        <DeadTree position={[-5.5, 0, -11.5]} scale={[1.15, 1.15, 1.15]} rotation={[0, -0.3, 0]} />

        {/* Midground framing trees */}
        <DeadTree position={[-6.2, -0.1, -1]} scale={[1.35, 1.35, 1.35]} rotation={[0, 0.5, 0]} />
        <DeadTree position={[6.4, -0.1, 0.2]} scale={[1.3, 1.3, 1.3]} rotation={[0, -0.4, 0]} />

        {/* Tombstones placed at varied depths */}
        {/* Foreground Left & Right (kept out of center for clean readability) */}
        <Tombstone
          position={[-3.6, -0.05, 3.2]}
          rotation={[0.06, 0.35, -0.12]}
          scale={[1.1, 1.1, 1.1]}
          variant="weathered"
        />
        <Tombstone
          position={[3.8, -0.05, 2.6]}
          rotation={[0, -0.28, 0.04]}
          scale={[1.05, 1.05, 1.05]}
          variant="arched"
          glow={true}
        />

        {/* Midground Tombstones */}
        <Tombstone
          position={[-2.2, 0, 0.2]}
          rotation={[0, 0.2, 0]}
          scale={[1, 1, 1]}
          variant="cross"
        />
        <Tombstone
          position={[2.2, 0, -0.4]}
          rotation={[0.08, -0.35, 0.12]}
          scale={[0.95, 0.95, 0.95]}
          variant="weathered"
        />
        <Tombstone
          position={[-0.9, 0, -1.8]}
          rotation={[0, 0.1, 0]}
          scale={[0.9, 0.9, 0.9]}
          variant="arched"
          glow={true}
        />
        <Tombstone
          position={[1.1, 0, -2.4]}
          rotation={[0, -0.12, 0]}
          scale={[0.92, 0.92, 0.92]}
          variant="obelisk"
        />

        {/* Background Tombstones receding into fog */}
        <Tombstone
          position={[-3.4, 0, -4.5]}
          rotation={[0, 0.25, 0]}
          scale={[0.75, 0.75, 0.75]}
          variant="cross"
        />
        <Tombstone
          position={[3.0, 0, -5.0]}
          rotation={[0, -0.2, 0]}
          scale={[0.7, 0.7, 0.7]}
          variant="arched"
        />
        <Tombstone
          position={[-1.4, 0, -6.2]}
          rotation={[0.06, 0.15, -0.1]}
          scale={[0.65, 0.65, 0.65]}
          variant="weathered"
        />
        <Tombstone
          position={[0.8, 0, -6.8]}
          rotation={[0, -0.1, 0]}
          scale={[0.6, 0.6, 0.6]}
          variant="cross"
        />

        {/* Layered Volumetric Fog Planes */}
        <FogLayers reducedMotion={reducedMotion} />

        {/* Floating Will-o'-the-Wisps & Fireflies */}
        <Fireflies count={160} reducedMotion={reducedMotion} />

        {/* Flying 3D Bats */}
        <Bats reducedMotion={reducedMotion} />
      </group>
    </>
  )
}
