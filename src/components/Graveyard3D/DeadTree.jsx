export default function DeadTree({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
}) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Lower trunk */}
      <mesh position={[0, 1.2, 0]} rotation={[0.06, 0.04, -0.08]} castShadow>
        <cylinderGeometry args={[0.22, 0.42, 2.4, 7]} />
        <meshStandardMaterial color="#070a10" roughness={0.96} />
      </mesh>

      {/* Mid trunk (slanted) */}
      <mesh position={[-0.14, 2.7, 0.05]} rotation={[-0.12, 0.1, 0.14]} castShadow>
        <cylinderGeometry args={[0.15, 0.22, 1.8, 6]} />
        <meshStandardMaterial color="#070a10" roughness={0.96} />
      </mesh>

      {/* Primary twisted limb 1 */}
      <group position={[-0.2, 3.2, 0]} rotation={[0.2, -0.4, 0.55]}>
        <mesh position={[0, 0.9, 0]}>
          <cylinderGeometry args={[0.09, 0.14, 1.8, 5]} />
          <meshStandardMaterial color="#070a10" roughness={0.96} />
        </mesh>
        {/* Sub branch 1A */}
        <mesh position={[-0.1, 1.7, 0]} rotation={[0.1, 0.2, -0.6]}>
          <cylinderGeometry args={[0.04, 0.08, 1.2, 5]} />
          <meshStandardMaterial color="#070a10" roughness={0.96} />
        </mesh>
        {/* Twig */}
        <mesh position={[0.2, 1.5, 0.1]} rotation={[-0.3, 0.4, 0.7]}>
          <cylinderGeometry args={[0.02, 0.05, 0.9, 4]} />
          <meshStandardMaterial color="#070a10" roughness={0.96} />
        </mesh>
      </group>

      {/* Primary twisted limb 2 */}
      <group position={[0.1, 2.9, -0.05]} rotation={[-0.3, 0.3, -0.58]}>
        <mesh position={[0, 0.95, 0]}>
          <cylinderGeometry args={[0.08, 0.13, 1.9, 5]} />
          <meshStandardMaterial color="#070a10" roughness={0.96} />
        </mesh>
        {/* Sub branch 2A */}
        <mesh position={[0.15, 1.6, 0]} rotation={[-0.2, -0.3, 0.65]}>
          <cylinderGeometry args={[0.03, 0.07, 1.1, 4]} />
          <meshStandardMaterial color="#070a10" roughness={0.96} />
        </mesh>
      </group>

      {/* Gnarly top crown limb */}
      <group position={[-0.05, 3.9, 0]} rotation={[0.1, 0.15, -0.2]}>
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.05, 0.11, 1.6, 5]} />
          <meshStandardMaterial color="#070a10" roughness={0.96} />
        </mesh>
        {/* Forked claw branch */}
        <mesh position={[-0.25, 1.4, 0]} rotation={[0, 0, 0.7]}>
          <cylinderGeometry args={[0.02, 0.05, 1.0, 4]} />
          <meshStandardMaterial color="#070a10" roughness={0.96} />
        </mesh>
        <mesh position={[0.22, 1.3, -0.1]} rotation={[0.2, 0, -0.6]}>
          <cylinderGeometry args={[0.02, 0.05, 0.9, 4]} />
          <meshStandardMaterial color="#070a10" roughness={0.96} />
        </mesh>
      </group>

      {/* Root flare */}
      <mesh position={[0.2, 0.1, 0.1]} rotation={[0, 0, -0.5]}>
        <cylinderGeometry args={[0.08, 0.18, 0.6, 5]} />
        <meshStandardMaterial color="#05080e" roughness={1} />
      </mesh>
      <mesh position={[-0.22, 0.1, -0.1]} rotation={[0, 0, 0.6]}>
        <cylinderGeometry args={[0.08, 0.16, 0.6, 5]} />
        <meshStandardMaterial color="#05080e" roughness={1} />
      </mesh>
    </group>
  )
}
