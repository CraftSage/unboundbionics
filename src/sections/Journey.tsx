import { useEffect, useRef, useState, MutableRefObject } from 'react'
import * as THREE from 'three'
import { handState } from '../three/handState'

type Grip = { name: string; pose: number[]; act: number; note: string }

// [thumb, index, middle, ring, pinky]
const GRIPS: Grip[] = [
  { name: 'OPEN', pose: [0, 0, 0, 0, 0], act: 0.06, note: 'Resting. Muscles quiet.' },
  { name: 'POWER GRIP', pose: [0.8, 1, 1, 1, 1], act: 0.96, note: 'Whole-hand close. Hold a bottle, a bag, a railing.' },
  { name: 'PINCH', pose: [0.85, 0.95, 0.12, 0.08, 0.08], act: 0.5, note: 'Thumb + index. Pick up a key or a coin.' },
  { name: 'TRIPOD', pose: [0.8, 0.9, 0.9, 0.12, 0.08], act: 0.68, note: 'Thumb + index + middle. Hold a pen.' },
  { name: 'POINT', pose: [0.7, 0, 1, 1, 1], act: 0.4, note: 'Index extended. Tap, press, gesture.' },
]

function EMGWave({ actRef }: { actRef: MutableRefObject<number> }) {
  const cvs = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = cvs.current!
    const ctx = c.getContext('2d')!
    let raf = 0
    const resize = () => {
      c.width = c.clientWidth * 2
      c.height = c.clientHeight * 2
    }
    resize()
    window.addEventListener('resize', resize)
    let pts: number[] = []
    const draw = () => {
      const W = c.width
      const H = c.height
      const N = Math.max(40, Math.floor(W / 3))
      if (pts.length === 0) pts = new Array(N).fill(H / 2)
      const act = actRef.current
      const spike = Math.random() < 0.18 ? (Math.random() - 0.5) * act * H * 0.85 : 0
      const base = (Math.random() - 0.5) * act * H * 0.16
      pts.push(H / 2 + base + spike)
      while (pts.length > N) pts.shift()

      ctx.clearRect(0, 0, W, H)
      // baseline
      ctx.strokeStyle = 'rgba(255,255,255,0.08)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(0, H / 2)
      ctx.lineTo(W, H / 2)
      ctx.stroke()
      // trace
      ctx.strokeStyle = '#39c8ff'
      ctx.lineWidth = 4
      ctx.shadowColor = '#39c8ff'
      ctx.shadowBlur = 14
      ctx.beginPath()
      for (let i = 0; i < pts.length; i++) {
        const x = (i / (pts.length - 1)) * W
        i === 0 ? ctx.moveTo(x, pts[i]) : ctx.lineTo(x, pts[i])
      }
      ctx.stroke()
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [actRef])
  return <canvas ref={cvs} className="emg-canvas" />
}

export default function Journey() {
  const ref = useRef<HTMLDivElement>(null)
  const actRef = useRef(0)
  const lastName = useRef('OPEN')
  const [grip, setGrip] = useState(GRIPS[0])

  useEffect(() => {
    let raf = 0
    const loop = () => {
      const el = ref.current
      if (el) {
        const r = el.getBoundingClientRect()
        const vh = window.innerHeight
        const inView = r.bottom > 0 && r.top < vh
        if (!inView) {
          handState.focus = THREE.MathUtils.lerp(handState.focus, 0, 0.1)
          for (let k = 0; k < 5; k++) handState.curls[k] = THREE.MathUtils.lerp(handState.curls[k], 0, 0.1)
          actRef.current = THREE.MathUtils.lerp(actRef.current, 0, 0.1)
        } else {
          const total = r.height - vh
          const local = THREE.MathUtils.clamp(-r.top / (total > 0 ? total : 1), 0, 1)
          const centered = r.top < vh * 0.45 && r.bottom > vh * 0.55
          handState.focus = THREE.MathUtils.lerp(handState.focus, centered ? 1 : 0, 0.1)

          const f = local * (GRIPS.length - 1)
          const i = Math.min(Math.floor(f), GRIPS.length - 2)
          const tt = THREE.MathUtils.smoothstep(f - i, 0, 1)
          const a = GRIPS[i]
          const b = GRIPS[i + 1]
          for (let k = 0; k < 5; k++) handState.curls[k] = a.pose[k] + (b.pose[k] - a.pose[k]) * tt
          actRef.current = a.act + (b.act - a.act) * tt

          const cur = tt < 0.5 ? a : b
          if (cur.name !== lastName.current) {
            lastName.current = cur.name
            setGrip(cur)
          }
        }
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      handState.focus = 0
    }
  }, [])

  return (
    <section className="journey" ref={ref}>
      <div className="journey-sticky">
        <div className="journey-panel">
          <div className="eyebrow">Watch it work · live</div>
          <div className="grip-name grad">{grip.name}</div>
          <p className="grip-note">{grip.note}</p>
          <div className="emg-wrap">
            <div className="emg-label">EMG · channel 1–2</div>
            <EMGWave actRef={actRef} />
          </div>
          <div className="journey-flow">
            <span>Muscle signal</span>
            <i>→</i>
            <span>On-device AI</span>
            <i>→</i>
            <span>Grip · &lt;50ms</span>
          </div>
          <div className="journey-hint">Keep scrolling to cycle grips</div>
        </div>
      </div>
    </section>
  )
}
