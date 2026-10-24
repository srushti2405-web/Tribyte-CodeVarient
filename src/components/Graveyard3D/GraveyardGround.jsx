import { useMemo } from 'react'
import * as THREE from 'three'

export default function GraveyardGround() {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(50, 36, 40, 30)
    geo.rotateX(-Math.PI / 2)

    const pos = geo.attributes.position
    const count = pos.count

    // Procedural undulating mounds and sunken plots
    for (let i = 0; i < count; i++) {
      const x = pos.getX(i)
      const z = pos.getZ(i)

      // Rolling mounds
      let y =
        Math.sin(x * 0.2) * 0.25 +
        Math.cos(z * 0.25) * 0.3 +
        Math.sin(x * 0.5 + z * 0.4) * 0.12

      // Sloping back into the darkness
      if (z < -8) {
        y += (z + 8) * 0.08
      }

      pos.setY(i, y)
    }

    geo.computeVertexNormals()
    return geo
  }, [])

  return (
    <mesh geometry={geometry} position={[0, -0.2, -4]} receiveShadow>
      <meshStandardMaterial
        color="#06090f"
        roughness={0.96}
        metalness={0.05}
      />
    </mesh>
  )
}
