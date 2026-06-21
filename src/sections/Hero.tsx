import { Reveal } from '../components/Reveal'

export default function Hero() {
  return (
    <section className="panel hero">
      <Reveal>
        <div className="eyebrow">ReachAI · Samsung Solve for Tomorrow 2026</div>
      </Reveal>
      <Reveal delay={0.08}>
        <h1 className="display">
          A bionic arm
          <br />
          for the <span className="grad">other 95%</span>.
        </h1>
      </Reveal>
      <Reveal delay={0.16} className="sub">
        <p className="lead" style={{ margin: '0 auto' }}>
          An AI-powered, high-dexterity prosthetic that reads your muscles, thinks on-device and gives a
          sense of touch back — for ₹22,000 instead of ₹20 lakh.
        </p>
      </Reveal>
      <div className="scroll-hint">
        <span className="dot" />
        Scroll
      </div>
    </section>
  )
}
