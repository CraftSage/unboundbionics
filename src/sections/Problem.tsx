import { Reveal } from '../components/Reveal'

export default function Problem() {
  return (
    <section id="problem" className="panel problem">
      <Reveal>
        <div className="eyebrow">The problem</div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="display">
          5.7 million Indians have lost an arm. <span className="grad">95% can’t afford</span> to get
          one back.
        </h2>
      </Reveal>

      <div className="stats">
        <Reveal className="stat">
          <div className="num grad">57L</div>
          <div className="label">upper-limb amputees in India</div>
        </Reveal>
        <Reveal className="stat" delay={0.1}>
          <div className="num grad">95%</div>
          <div className="label">priced out of any functional prosthetic</div>
        </Reveal>
        <Reveal className="stat" delay={0.2}>
          <div className="num grad">₹5–65L</div>
          <div className="label">cost of a commercial myoelectric arm</div>
        </Reveal>
      </div>
    </section>
  )
}
