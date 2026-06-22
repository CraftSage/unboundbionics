import { useEffect, useRef } from 'react'
import { scrollState } from '../lib/scroll'

export function ScrollProgress() {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    let raf = 0
    const loop = () => {
      if (ref.current) ref.current.style.transform = `scaleY(${scrollState.progress})`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])
  return (
    <div className="scroll-progress">
      <span ref={ref} />
    </div>
  )
}
