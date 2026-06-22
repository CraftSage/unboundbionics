import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { warpState } from '../three/warpState'

const STAGES = ['MUSCLE', 'NERVE', 'SILICON', 'MOTION']

export default function Warp() {
  const ref = useRef<HTMLDivElement>(null)
  const last = useRef(0)
  const [stage, setStage] = useState(0)

  useEffect(() => {
    let raf = 0
    const loop = () => {
      const el = ref.current
      if (el) {
        const r = el.getBoundingClientRect()
        const vh = window.innerHeight
        const inView = r.bottom > 0 && r.top < vh
        if (!inView) {
          warpState.active = THREE.MathUtils.lerp(warpState.active, 0, 0.1)
        } else {
          const total = r.height - vh
          const local = THREE.MathUtils.clamp(-r.top / (total > 0 ? total : 1), 0, 1)
          warpState.progress = local
          const centered = r.top < vh * 0.5 && r.bottom > vh * 0.5
          const target = centered ? 1 : 0
          warpState.active = THREE.MathUtils.lerp(warpState.active, target, 0.08)

          const si = Math.min(STAGES.length - 1, Math.floor(local * STAGES.length))
          if (si !== last.current) {
            last.current = si
            setStage(si)
          }
        }
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      warpState.active = 0
    }
  }, [])

  return (
    <section className="warp" ref={ref}>
      <div className="warp-sticky">
        <div className="eyebrow">Follow the signal</div>
        <div className="warp-stage grad">{STAGES[stage]}</div>
        <p className="warp-sub">
          From a flicker in your muscle to a closing grip — in a heartbeat, across four worlds.
        </p>
        <div className="warp-stages">
          {STAGES.map((s, i) => (
            <span key={s} className={i === stage ? 'on' : ''}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
