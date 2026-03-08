import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function FloatingObject() {
  const torusRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Rotate the entire group
      groupRef.current.rotation.x += 0.002
      groupRef.current.rotation.y += 0.003
      groupRef.current.rotation.z += 0.001

      // Floating motion
      groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.3) * 2 + 2
    }

    if (torusRef.current) {
      // Scale animation
      const scale = 1 + Math.sin(clock.elapsedTime * 0.5) * 0.1
      torusRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main torus knot */}
      <mesh ref={torusRef} castShadow receiveShadow>
        <torusKnotGeometry args={[2.5, 0.8, 128, 32]} />
        <meshStandardMaterial
          color="#00d4ff"
          metalness={0.8}
          roughness={0.1}
          emissive="#00d4ff"
          emissiveIntensity={0.2}
          wireframe={false}
        />
      </mesh>

      {/* Decorative spheres */}
      <mesh position={[5, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color="#ffd700"
          metalness={0.9}
          roughness={0.05}
          emissive="#ffd700"
          emissiveIntensity={0.3}
        />
      </mesh>

      <mesh position={[-5, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color="#ff006e"
          metalness={0.9}
          roughness={0.05}
          emissive="#ff006e"
          emissiveIntensity={0.3}
        />
      </mesh>

      <mesh position={[0, 5, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color="#00ff88"
          metalness={0.85}
          roughness={0.1}
          emissive="#00ff88"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Inner wireframe sphere */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[3.2, 0.1, 16, 100]} />
        <meshBasicMaterial
          color="#00d4ff"
          wireframe={true}
          opacity={0.3}
          transparent={true}
        />
      </mesh>
    </group>
  )
}
