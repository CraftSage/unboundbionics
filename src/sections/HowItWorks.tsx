import { Reveal } from '../components/Reveal'

const STEPS = [
  {
    k: '01',
    t: 'Sense',
    p: 'Two MyoWare EMG sensors read the electrical signals from your residual-limb muscles.',
  },
  {
    k: '02',
    t: 'Think',
    p: 'A TensorFlow Lite model on the ESP32-S3 classifies the signal into a grip — under 50 ms, fully on-device.',
  },
  {
    k: '03',
    t: 'Move',
    p: '11 tendon-actuated joints form the grip: power, pinch, tripod or point.',
  },
  {
    k: '04',
    t: 'Feel',
    p: 'Fingertip force sensors pulse haptic motors in the socket — so you feel how hard you grip.',
  },
]

export default function HowItWorks() {
  return (
    <section id="tech" className="panel">
      <Reveal>
        <div className="eyebrow">How it works</div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="display section-head">Muscle to motion to touch — a full closed loop.</h2>
      </Reveal>

      <div className="steps">
        {STEPS.map((s, i) => (
          <Reveal key={s.k} className="step" delay={i * 0.08}>
            <div className="idx">{s.k}</div>
            <h3>{s.t}</h3>
            <p>{s.p}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
