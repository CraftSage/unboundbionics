import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { thermalState } from '../three/thermalState'

export default function Thermal() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    const loop = () => {
      const el = ref.current
      if (el) {
        const r = el.getBoundingClientRect()
        const vh = window.innerHeight
        const centered = r.top < vh * 0.45 && r.bottom > vh * 0.55
        thermalState.value = THREE.MathUtils.lerp(thermalState.value, centered ? 1 : 0, 0.07)
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      thermalState.value = 0
    }
  }, [])

  return (
    <section className="thermal" ref={ref}>
      <div className="thermal-sticky">
        <div className="thermal-panel">
          <div className="eyebrow">Handles extremes with ease</div>
          <h2 className="display thermal-head">
            Hot coffee to ice water — <span className="grad">never skips a beat.</span>
          </h2>
          <p className="lead">
            Servos, EMG front-end and the LiPo all stay inside spec across a wide thermal range. Your
            coffee table tapped out three sips ago.
          </p>
        </div>

        <div className="thermal-legend">
          <span className="t-hi">HOT · 60°C</span>
          <div className="t-bar" />
          <span className="t-lo">COLD · −10°C</span>
          <div className="t-cap">Operating range</div>
        </div>
      </div>
    </section>
  )
}
