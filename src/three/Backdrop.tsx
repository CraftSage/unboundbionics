import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// A faint, slowly drifting particle field so the black void has depth.
export function Backdrop() {
  const ref = useRef<THREE.Points>(null!)
  const positions = useMemo(() => {
    const N = 1400
    const a = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      a[i * 3] = (Math.random() - 0.5) * 36
      a[i * 3 + 1] = (Math.random() - 0.5) * 24
      a[i * 3 + 2] = (Math.random() - 0.5) * 26 - 8
    }
    return a
  }, [])

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.01
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#6fd4ff"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  )
}
