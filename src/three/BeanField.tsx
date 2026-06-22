import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 80

type Bean = {
  base: THREE.Vector3
  pos: THREE.Vector3
  vel: THREE.Vector3
  rot: THREE.Euler
  spin: THREE.Vector3
  scale: number
}

function Beans() {
  const mesh = useRef<THREE.InstancedMesh>(null!)
  const { pointer, viewport } = useThree()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const mouse = useMemo(() => new THREE.Vector3(), [])

  const beans = useMemo<Bean[]>(() => {
    const arr: Bean[] = []
    for (let i = 0; i < COUNT; i++) {
      const base = new THREE.Vector3((Math.random() - 0.5) * 11, (Math.random() - 0.5) * 6.5, (Math.random() - 0.5) * 2.5)
      arr.push({
        base,
        pos: base.clone(),
        vel: new THREE.Vector3(),
        rot: new THREE.Euler(Math.random() * 6, Math.random() * 6, Math.random() * 6),
        spin: new THREE.Vector3((Math.random() - 0.5) * 0.6, (Math.random() - 0.5) * 0.6, (Math.random() - 0.5) * 0.6),
        scale: 0.55 + Math.random() * 0.55,
      })
    }
    return arr
  }, [])

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05)
    mouse.set((pointer.x * viewport.width) / 2, (pointer.y * viewport.height) / 2, 0)
    const R = 2.4

    for (let i = 0; i < beans.length; i++) {
      const b = beans[i]
      // push away from the cursor
      const dx = b.pos.x - mouse.x
      const dy = b.pos.y - mouse.y
      const dz = b.pos.z - mouse.z
      const dist = Math.hypot(dx, dy, dz)
      if (dist < R && dist > 0.0001) {
        const f = (1 - dist / R) * 26 * dt
        b.vel.x += (dx / dist) * f
        b.vel.y += (dy / dist) * f
        b.vel.z += (dz / dist) * f
      }
      // spring back to home + damping
      b.vel.x += (b.base.x - b.pos.x) * 4 * dt
      b.vel.y += (b.base.y - b.pos.y) * 4 * dt
      b.vel.z += (b.base.z - b.pos.z) * 4 * dt
      b.vel.multiplyScalar(0.9)
      b.vel.clampLength(0, 9)
      b.pos.addScaledVector(b.vel, dt)

      b.rot.x += b.spin.x * dt
      b.rot.y += b.spin.y * dt
      b.rot.z += b.spin.z * dt

      dummy.position.copy(b.pos)
      dummy.rotation.copy(b.rot)
      dummy.scale.setScalar(b.scale)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    }
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined as never, undefined as never, COUNT]}>
      <capsuleGeometry args={[0.12, 0.32, 6, 14]} />
      <meshStandardMaterial color="#2b3346" metalness={0.7} roughness={0.28} emissive="#39c8ff" emissiveIntensity={0.22} />
    </instancedMesh>
  )
}

export function BeanField() {
  return (
    <div className="bean-canvas">
      <Canvas dpr={[1, 2]} gl={{ alpha: true, antialias: true }} camera={{ position: [0, 0, 8], fov: 42 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 5, 5]} intensity={2.4} color="#cdeaff" />
        <pointLight position={[-5, -2, 3]} intensity={26} color="#b06bff" />
        <pointLight position={[5, 3, 2]} intensity={18} color="#39c8ff" />
        <Beans />
      </Canvas>
    </div>
  )
}
