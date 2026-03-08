import React from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import Lighting from './Lighting'
import Floor from './Floor'
import FloatingObject from './FloatingObject'

export default function Scene() {
  const { camera } = useThree()
  const mounted = React.useRef(false)

  React.useEffect(() => {
    mounted.current = true
    console.log('Scene mounted')
  }, [])

  useFrame(({ clock }) => {
    if (!mounted.current) return
    
    // Subtle camera movement
    camera.position.x = Math.sin(clock.elapsedTime * 0.1) * 2
    camera.position.z = 15 + Math.cos(clock.elapsedTime * 0.08) * 3
    camera.lookAt(0, 2, 0)
  })

  return (
    <>
      <Lighting />
      <Floor />
      <FloatingObject />
    </>
  )
}

