import React from 'react'
import * as THREE from 'three'

export default function Floor() {
  const floorRef = React.useRef<THREE.Mesh>(null)

  React.useEffect(() => {
    if (floorRef.current) {
      floorRef.current.receiveShadow = true
      floorRef.current.castShadow = false
    }
  }, [])

  return (
    <mesh
      ref={floorRef}
      position={[0, -2, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[50, 50, 32, 32]} />
      <meshStandardMaterial
        color="#0a0a0a"
        metalness={0.1}
        roughness={0.8}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
