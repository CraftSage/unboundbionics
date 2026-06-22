import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { scrollState } from '../lib/scroll'
import { ProceduralHand } from './ProceduralHand'
import { handState } from './handState'
import { warpState } from './warpState'
import { thermalState } from './thermalState'

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
    // centred/posed for either the EMG→grip journey or the thermal beat
    const focus = Math.max(handState.focus, thermalState.value)
    const warp = warpState.active // 1 while flying the signal tunnel

    // fade the hand out for the warp tunnel & contact section
    const hide = Math.max(handState.hidden, warp)
    const targetScale = Math.max(1 - hide * 0.999, 0.001)
    const s = THREE.MathUtils.lerp(group.current.scale.x, targetScale, 0.12)
    group.current.scale.setScalar(s)

    // story sections push the hand off-centre; the journey pins it back to a
    // readable pose on the right and stops the spin so you can watch the grips
    const ramp = THREE.MathUtils.smoothstep(p, 0.05, 0.16) * (1 - THREE.MathUtils.smoothstep(p, 0.9, 0.99))
    const storyX = ramp * 1.9
    const targetX = THREE.MathUtils.lerp(storyX, 0.8, focus)
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetX, 0.08)
    group.current.position.y = Math.sin(t * 0.6) * 0.06

    // rotation: full turntable normally; when focused, ease to the NEAREST
    // palm-forward orientation so there's no big spin/jump at the boundaries
    const turntable = p * Math.PI * 2.2 + t * 0.12
    const nearestForward = Math.round(turntable / (Math.PI * 2)) * (Math.PI * 2) - 0.35 + Math.sin(t * 0.4) * 0.06
    const targetY = THREE.MathUtils.lerp(turntable, nearestForward, focus)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.1)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, THREE.MathUtils.lerp(-0.15 + p * 0.5, -0.05, focus), 0.1)

    // mouse parallax (eased out while focused)
    inner.current.rotation.y = THREE.MathUtils.lerp(inner.current.rotation.y, scrollState.mouseX * 0.25 * (1 - focus), 0.06)
    inner.current.rotation.x = THREE.MathUtils.lerp(inner.current.rotation.x, scrollState.mouseY * 0.15 * (1 - focus), 0.06)

    // camera: normal dolly, blended into a flight through the warp tunnel
    const normalZ = THREE.MathUtils.lerp(6 - p * 1.6, 5.2, focus)
    const warpZ = 3 - warpState.progress * 70
    const camZ = THREE.MathUtils.lerp(normalZ, warpZ, warp)
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, camZ, 0.1)

    const normalX = scrollState.mouseX * 0.3 * (1 - focus)
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, normalX * (1 - warp), 0.05)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 0, 0.05)

    const lookZ = THREE.MathUtils.lerp(0, state.camera.position.z - 8, warp)
    state.camera.lookAt(0, 0, lookZ)
  })

  return (
    <group ref={group}>
      <group ref={inner}>{MODEL_URL ? <LoadedHand url={MODEL_URL} /> : <ProceduralHand />}</group>
    </group>
  )
}
