import { Reveal } from '../components/Reveal'

const STAGES = [
  { when: 'By 3 Jul 2026', what: 'Concept submission', detail: 'Samsung Solve for Tomorrow — concept round. No prototype required.', state: 'now' },
  { when: 'Sep 2026', what: 'Top 40 · build', detail: '₹8 lakh from Samsung to build the working prototype.', state: '' },
  { when: 'Oct–Nov 2026', what: 'Grand finale · IIT Delhi', detail: 'Live demo to the jury. Aiming for the Top 4.', state: '' },
  { when: 'The goal', what: 'Top 4 · ₹2 crore + incubation', detail: 'Grant + IIT Delhi FITT incubation to take ReachAI to real users.', state: 'goal' },
  { when: 'Then', what: 'Open-source release', detail: 'CAD, PCB and firmware published — reproducible by makers across India.', state: 'goal' },
]

export default function Roadmap() {
  return (
    <section className="panel roadmap">
      <Reveal>
        <div className="eyebrow">The road ahead</div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="display section-head">From concept to 5.7 million hands.</h2>
      </Reveal>

      <div className="timeline">
        {STAGES.map((s, i) => (
          <Reveal key={s.what} className={`tl-item ${s.state}`} delay={Math.min(i * 0.08, 0.4)}>
            <div className="tl-dot" />
            <div className="tl-when">{s.when}</div>
            <div className="tl-what">{s.what}</div>
            <div className="tl-detail">{s.detail}</div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
