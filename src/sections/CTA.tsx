import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Reveal } from '../components/Reveal'
import { BeanField } from '../three/BeanField'
import { handState } from '../three/handState'

export default function CTA() {
  const ref = useRef<HTMLElement>(null)

  // fade the main hand out while the contact section (with its own bean field)
  // is on screen
  useEffect(() => {
    let raf = 0
    const loop = () => {
      const el = ref.current
      if (el) {
        const r = el.getBoundingClientRect()
        const vh = window.innerHeight
        // start fading early (while the warp tail is still on screen) so the
        // hand never flashes back between the two sections
        const inView = r.top < vh * 1.0 && r.bottom > vh * 0.1
        handState.hidden = THREE.MathUtils.lerp(handState.hidden, inView ? 1 : 0, 0.1)
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <>
      <section className="panel cta" ref={ref}>
        <BeanField />
        <div className="cta-inner">
          <Reveal>
            <div className="eyebrow">Built by two 14-year-olds</div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display">
              Let’s give 5.7 million people
              <br />
              their <span className="grad">hands back</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="row">
              <a className="btn solid" href="mailto:aaravstudy4122@gmail.com">
                Get in touch
              </a>
              <a className="btn" href="#top">
                Back to top
              </a>
            </div>
          </Reveal>
          <div className="cta-hint">Drag your cursor through the field ✦</div>
        </div>
      </section>

      <footer className="footer">
        <div>
          <b>ReachAI</b> — affordable AI bionics
        </div>
        <div>Samsung Solve for Tomorrow 2026 · India</div>
        <div>Built with ❤ by two Class-10 students</div>
      </footer>
    </>
  )
}
