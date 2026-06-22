import { useRef, useMemo, useLayoutEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { warpState } from './warpState'

const COUNT = 80
const DEPTH = 72

// A tunnel of glowing rings + streaking particles the camera flies through.
// Colour shifts cyan → violet → magenta as you travel ("different dimensions").
export function WarpTunnel() {
  const group = useRef<THREE.Group>(null!)
  const mesh = useRef<THREE.InstancedMesh>(null!)
  const mat = useRef<THREE.MeshStandardMaterial>(null!)
  const ptMat = useRef<THREE.PointsMaterial>(null!)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const cyan = useMemo(() => new THREE.Color('#39c8ff'), [])
  const violet = useMemo(() => new THREE.Color('#7a5cff'), [])
  const magenta = useMemo(() => new THREE.Color('#ff5e9c'), [])
  const tmp = useMemo(() => new THREE.Color(), [])

  const rings = useMemo(() => {
    const arr: { z: number; rot: number; r: number }[] = []
    for (let i = 0; i < COUNT; i++) {
      const t = i / (COUNT - 1)
      arr.push({ z: -t * DEPTH, rot: Math.random() * Math.PI, r: 2.4 + Math.sin(i * 0.7) * 0.5 })
    }
    return arr
  }, [])

  const particles = useMemo(() => {
    const N = 1100
    const pos = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      const a = Math.random() * Math.PI * 2
      const rad = 0.5 + Math.random() * 3.4
      pos[i * 3] = Math.cos(a) * rad
      pos[i * 3 + 1] = Math.sin(a) * rad
      pos[i * 3 + 2] = -Math.random() * DEPTH
    }
    return pos
  }, [])

  useLayoutEffect(() => {
    rings.forEach((ring, i) => {
      dummy.position.set(0, 0, ring.z)
      dummy.rotation.set(0, 0, ring.rot)
      dummy.scale.setScalar(ring.r)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  }, [rings, dummy])

  useFrame((_, dt) => {
    const a = warpState.active
    const pr = warpState.progress
    if (pr < 0.5) tmp.copy(cyan).lerp(violet, pr * 2)
    else tmp.copy(violet).lerp(magenta, (pr - 0.5) * 2)

    if (group.current) {
      group.current.visible = a > 0.01
      group.current.rotation.z += dt * 0.06 * a
    }
    if (mat.current) {
      mat.current.opacity = a
      mat.current.emissive.copy(tmp)
      mat.current.color.copy(tmp)
    }
    if (ptMat.current) {
      ptMat.current.opacity = a * 0.9
      ptMat.current.color.copy(tmp).lerp(new THREE.Color('#ffffff'), 0.4)
    }
  })

  return (
    <group ref={group} visible={false}>
      <instancedMesh ref={mesh} args={[undefined as never, undefined as never, COUNT]}>
        <torusGeometry args={[1, 0.02, 8, 44]} />
        <meshStandardMaterial
          ref={mat}
          transparent
          opacity={0}
          emissive="#39c8ff"
          emissiveIntensity={2.2}
          color="#39c8ff"
          toneMapped={false}
        />
      </instancedMesh>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={ptMat}
          size={0.055}
          color="#9fe6ff"
          transparent
          opacity={0}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </points>
    </group>
  )
}
