import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { scrollState } from '../lib/scroll'
import { ProceduralHand } from './ProceduralHand'
import { handState } from './handState'

// ── Drop in your real model ───────────────────────────────────────────────
// Export your arm from Fusion 360 as .glb (or download a licensed model),
// save it to  web/public/models/hand.glb  and set:
//   const MODEL_URL = '/models/hand.glb'
// Until then a stylised procedural hand stands in.
const MODEL_URL: string | null = null

function LoadedHand({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}

export function HandRig() {
  const group = useRef<THREE.Group>(null!)
  const inner = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (!group.current || !inner.current) return
    const p = scrollState.progress
    const t = state.clock.elapsedTime
    const focus = handState.focus // 1 while the EMG→grip journey is on screen

    // story sections push the hand off-centre; the journey pins it back to a
    // readable pose on the right and stops the spin so you can watch the grips
    const ramp = THREE.MathUtils.smoothstep(p, 0.05, 0.16) * (1 - THREE.MathUtils.smoothstep(p, 0.9, 0.99))
    const storyX = ramp * 1.9
    const targetX = THREE.MathUtils.lerp(storyX, 0.8, focus)
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetX, 0.08)
    group.current.position.y = Math.sin(t * 0.6) * 0.06

    // rotation: full turntable normally, settled palm-forward pose when focused
    const turntable = p * Math.PI * 2.2 + t * 0.12
    const posed = -0.35 + Math.sin(t * 0.4) * 0.06
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, THREE.MathUtils.lerp(turntable, posed, focus), 0.1)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, THREE.MathUtils.lerp(-0.15 + p * 0.5, -0.05, focus), 0.1)

    // mouse parallax (eased out while focused)
    inner.current.rotation.y = THREE.MathUtils.lerp(inner.current.rotation.y, scrollState.mouseX * 0.25 * (1 - focus), 0.06)
    inner.current.rotation.x = THREE.MathUtils.lerp(inner.current.rotation.x, scrollState.mouseY * 0.15 * (1 - focus), 0.06)

    // camera dolly through the page, pulls a touch closer for the journey
    const camZ = THREE.MathUtils.lerp(6 - p * 1.6, 5.2, focus)
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, camZ, 0.08)
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, scrollState.mouseX * 0.3 * (1 - focus), 0.05)
    state.camera.lookAt(0, 0, 0)
  })

  return (
    <group ref={group}>
      <group ref={inner}>{MODEL_URL ? <LoadedHand url={MODEL_URL} /> : <ProceduralHand />}</group>
    </group>
  )
}
