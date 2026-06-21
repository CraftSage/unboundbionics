import { Reveal } from '../components/Reveal'

export default function Divide() {
  return (
    <section id="cost" className="panel divide">
      <Reveal>
        <div className="eyebrow">The disruption</div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="display">
          Same function.
          <br />
          One twenty-fifth the price.
        </h2>
      </Reveal>

      <Reveal delay={0.16}>
        <div className="vs">
          <div className="price old">
            <div className="amt">₹20L</div>
            <div className="cap">Commercial myoelectric arm</div>
          </div>
          <div className="x">vs</div>
          <div className="price">
            <div className="amt grad">₹22K</div>
            <div className="cap">ReachAI · open-source</div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.24}>
        <p className="lead" style={{ margin: '34px auto 0' }}>
          A ₹22,000 bill of materials — ESP32, MyoWare EMG sensors, 3D-printed PETG, a custom PCB — and a
          design anyone with a 3D printer can reproduce.
        </p>
      </Reveal>
    </section>
  )
}
