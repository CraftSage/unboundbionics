import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { handState } from './handState'

// Stylised robotic hand built from primitives — a stand-in for your real
// Fusion 360 / GLB model. Fingers are articulated so they curl into grips,
// driven by handState.curls. Glowing cyan joints get picked up by Bloom.
const METAL = { color: '#161a24', metalness: 0.95, roughness: 0.32 } as const
const ACCENT = '#39c8ff'

function Joint({ r = 0.14 }: { r?: number }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[r, 0.022, 10, 28]} />
      <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={2.6} toneMapped={false} />
    </mesh>
  )
}

// One phalanx: box sitting above the group origin, with a joint ring at base.
function Phalanx({ h, w }: { h: number; w: number }) {
  return (
    <group>
      <group position={[0, h / 2, 0]}>
        <RoundedBox args={[w, h, w]} radius={0.05} smoothness={4}>
          <meshStandardMaterial {...METAL} />
        </RoundedBox>
      </group>
      <Joint r={w * 0.55} />
    </group>
  )
}

function Finger({
  id,
  x,
  z = 0,
  base = 0.85,
  segs,
  w = 0.26,
  tilt = 0,
}: {
  id: number
  x: number
  z?: number
  base?: number
  segs: number[]
  w?: number
  tilt?: number
}) {
  const j1 = useRef<THREE.Group>(null!)
  const j2 = useRef<THREE.Group>(null!)
  const j3 = useRef<THREE.Group>(null!)
  const [h1, h2, h3] = [segs[0], segs[1] ?? 0, segs[2] ?? 0]
  const hasThird = segs.length >= 3

  useFrame(() => {
    const c = handState.curls[id] ?? 0
    const a = c * 1.35
    if (j1.current) j1.current.rotation.x = THREE.MathUtils.lerp(j1.current.rotation.x, a * 0.8, 0.16)
    if (j2.current) j2.current.rotation.x = THREE.MathUtils.lerp(j2.current.rotation.x, a * 1.05, 0.16)
    if (j3.current) j3.current.rotation.x = THREE.MathUtils.lerp(j3.current.rotation.x, a * 1.15, 0.16)
  })

  return (
    <group position={[x, base, z]} rotation={[0, 0, tilt]}>
      <group ref={j1}>
        <Phalanx h={h1} w={w} />
        <group ref={j2} position={[0, h1 + 0.05, 0]}>
          <Phalanx h={h2} w={w} />
          {hasThird && (
            <group ref={j3} position={[0, h2 + 0.05, 0]}>
              <Phalanx h={h3} w={w} />
            </group>
          )}
        </group>
      </group>
    </group>
  )
}

export function ProceduralHand() {
  return (
    <group position={[0, -0.35, 0]} scale={1.05}>
      {/* palm */}
      <RoundedBox args={[1.5, 1.7, 0.5]} radius={0.2} smoothness={6}>
        <meshStandardMaterial {...METAL} />
      </RoundedBox>

      {/* glowing palm core */}
      <mesh position={[0, 0.05, 0.26]}>
        <circleGeometry args={[0.22, 40]} />
        <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={1.3} toneMapped={false} />
      </mesh>

      {/* knuckle bar */}
      <mesh position={[0, 0.85, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.12, 0.12, 1.3, 24]} />
        <meshStandardMaterial {...METAL} />
      </mesh>

      {/* wrist */}
      <mesh position={[0, -1.15, 0]}>
        <cylinderGeometry args={[0.46, 0.52, 0.7, 36]} />
        <meshStandardMaterial {...METAL} />
      </mesh>
      <group position={[0, -1.5, 0]}>
        <Joint r={0.5} />
      </group>

      {/* fingers — ids: 0 thumb, 1 index, 2 middle, 3 ring, 4 pinky */}
      <Finger id={1} x={-0.54} segs={[0.46, 0.4, 0.32]} w={0.26} />
      <Finger id={2} x={-0.19} segs={[0.5, 0.42, 0.34]} w={0.27} />
      <Finger id={3} x={0.19} segs={[0.46, 0.4, 0.32]} w={0.26} />
      <Finger id={4} x={0.54} segs={[0.36, 0.3, 0.26]} w={0.23} />

      {/* thumb */}
      <Finger id={0} x={-0.82} z={0.12} base={0.0} segs={[0.4, 0.34]} w={0.27} tilt={0.95} />
    </group>
  )
}
