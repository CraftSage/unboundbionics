import { useEffect, useState } from 'react'

export function Preloader() {
  const [pct, setPct] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let v = 0
    const id = window.setInterval(() => {
      v += Math.random() * 12 + 5
      if (v >= 100) {
        v = 100
        window.clearInterval(id)
        window.setTimeout(() => setDone(true), 450)
      }
      setPct(Math.floor(v))
    }, 110)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className={`preloader ${done ? 'done' : ''}`}>
      <div className="count">{pct}</div>
      <div className="bar">
        <i style={{ width: `${pct}%` }} />
      </div>
      <div className="tag">Initialising ReachAI</div>
    </div>
  )
}
