import React from 'react'
import { SpotLight } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Lighting() {
  const pointLightRef = React.useRef<THREE.PointLight>(null)
  const spotLightRef = React.useRef<THREE.SpotLight>(null)

  useFrame(({ clock }) => {
    // Animate point light position
    if (pointLightRef.current) {
      const plight = pointLightRef.current as any
      plight.position.x = Math.sin(clock.elapsedTime * 0.3) * 8
      plight.position.y = 6 + Math.cos(clock.elapsedTime * 0.25) * 2
      plight.position.z = Math.cos(clock.elapsedTime * 0.35) * 8
    }

    // Animate spot light
    if (spotLightRef.current) {
      const slight = spotLightRef.current as any
      slight.position.x = Math.cos(clock.elapsedTime * 0.2) * 10
      slight.position.y = 8
      slight.position.z = Math.sin(clock.elapsedTime * 0.2) * 10
    }
  })

  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={0.3} color="#ffffff" />

      {/* Key light - Warm point light */}
      <pointLight
        ref={pointLightRef}
        position={[5, 6, 5]}
        intensity={1.5}
        color="#ffd700"
        distance={50}
        decay={2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={100}
      />

      {/* Fill light - Cool spot light */}
      <SpotLight
        ref={spotLightRef}
        position={[-10, 8, 10]}
        angle={Math.PI / 3}
        penumbra={1}
        intensity={1.2}
        color="#00d4ff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={100}
      />

      {/* Accent light */}
      <pointLight
        position={[0, 3, -15]}
        intensity={0.8}
        color="#ff006e"
        distance={40}
        decay={2}
      />

      {/* Environmental light */}
      <pointLight
        position={[0, 0, 0]}
        intensity={0.2}
        color="#ffffff"
        distance={100}
      />
    </>
  )
}
