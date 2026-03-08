import WorkflowsDashboard from './components/WorkflowsDashboard'
import { Canvas } from '@react-three/fiber'
import Scene from './components/Scene'
import Cursor from './components/Cursor'

export default function App() {
  return (
    <>
      {/* behind-the-scenes 3D canvas */}
      <Canvas
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          pointerEvents: 'none',
        }}
        shadows
      >
        <Scene />
      </Canvas>
      <Cursor />
      <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
        <WorkflowsDashboard />
      </div>
    </>
  )
}




