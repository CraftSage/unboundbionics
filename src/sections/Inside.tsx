import { Reveal } from '../components/Reveal'

const FEATURES = [
  { k: '11 DOF', t: 'Real dexterity', p: 'Eleven degrees of freedom across five fingers and a rotating wrist.' },
  { k: '<50ms', t: 'On-device AI', p: 'TensorFlow Lite inference on the ESP32-S3. No cloud, no lag, works offline.' },
  { k: '5 grips', t: 'Pattern recognition', p: 'Open, power, pinch, tripod, point — switched with a muscle flex.' },
  { k: '₹22,000', t: 'Whole bill of materials', p: 'Roughly 25× cheaper than a commercial myoelectric arm.' },
  { k: 'Haptic', t: 'A sense of touch', p: 'Fingertip force sensors drive vibration motors for closed-loop feedback.' },
  { k: 'Open', t: 'Reproducible anywhere', p: 'Open-source CAD, PCB and firmware — buildable with a printer and a soldering iron.' },
]

export default function Inside() {
  return (
    <section className="panel">
      <Reveal>
        <div className="eyebrow">Inside ReachAI</div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="display section-head">Flagship capability, built on a student budget.</h2>
      </Reveal>

      <div className="features">
        {FEATURES.map((f, i) => (
          <Reveal key={f.k} className="feature" delay={(i % 3) * 0.08}>
            <div className="k grad">{f.k}</div>
            <h3>{f.t}</h3>
            <p>{f.p}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
