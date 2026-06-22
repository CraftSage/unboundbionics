import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Environment, Lightformer } from '@react-three/drei'
import { HandRig } from './HandModel'
import { WarpTunnel } from './WarpTunnel'
import { Backdrop } from './Backdrop'
import { Effects } from './Effects'

export function Experience() {
  return (
    <div className="canvas-wrap">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: false }} camera={{ position: [0, 0, 6], fov: 35 }}>
        <color attach="background" args={['#05060a']} />

        <ambientLight intensity={0.3} />
        <spotLight position={[5, 7, 5]} angle={0.5} penumbra={0.9} intensity={260} color="#cdeaff" />
        <pointLight position={[-6, -2, 3]} intensity={90} color="#b06bff" />
        <pointLight position={[6, -3, -2]} intensity={70} color="#ff5e9c" />

        <Suspense fallback={null}>
          <Backdrop />
          <HandRig />
          <WarpTunnel />
          {/* Procedural environment for metallic reflections — no network HDRI */}
          <Environment resolution={256}>
            <Lightformer form="rect" intensity={2.4} position={[0, 3, 4]} scale={[8, 3, 1]} color="#9fd8ff" />
            <Lightformer form="rect" intensity={1.6} position={[-4, -1, 2]} scale={[4, 4, 1]} color="#b06bff" />
            <Lightformer form="rect" intensity={1.3} position={[4, 0, -3]} scale={[5, 5, 1]} color="#ff5e9c" />
            <Lightformer form="ring" intensity={1.2} position={[0, 0, -5]} scale={6} color="#1b2740" />
          </Environment>
        </Suspense>

        <Effects />
      </Canvas>
    </div>
  )
}
