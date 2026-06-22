import { useEffect } from 'react'
import Lenis from 'lenis'
import { scrollState } from './scroll'

// Buttery smooth scroll (the signature feel of Lusion/Oryzo) + a global
// scroll-progress value the 3D scene reads each frame.
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    })

    ;(window as any).lenis = lenis

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    lenis.on('scroll', (e: any) => {
      scrollState.raw = e.scroll ?? 0
      scrollState.progress = e.progress ?? 0
      scrollState.velocity = e.velocity ?? 0
    })

    const onMove = (e: PointerEvent) => {
      scrollState.mouseX = (e.clientX / window.innerWidth) * 2 - 1
      scrollState.mouseY = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      window.removeEventListener('pointermove', onMove)
    }
  }, [])
}
