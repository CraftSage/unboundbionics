import { Reveal } from '../components/Reveal'

// TODO: replace the names / roles below with the real team details.
const MEMBERS = [
  { name: '[Your name]', role: 'Hardware · firmware · PCB', tag: 'C-01' },
  { name: '[Teammate]', role: 'AI · app · CAD', tag: 'C-02' },
]

export default function Team() {
  return (
    <section className="panel team">
      <Reveal>
        <div className="eyebrow">The team</div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="display section-head">
          Two 14-year-olds. One workshop. <span className="grad">5.7 million reasons.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.16}>
        <p className="lead">
          We&rsquo;re two Class-10 students who refused to accept that a working hand should cost more
          than a car. So we&rsquo;re building one that doesn&rsquo;t — with EMG sensing, on-device AI and a
          3D printer — and giving the whole design away.
        </p>
      </Reveal>

      <div className="members">
        {MEMBERS.map((m, i) => (
          <Reveal key={m.tag} className="member" delay={0.2 + i * 0.1}>
            <div className="member-tag">{m.tag}</div>
            <div className="member-name">{m.name}</div>
            <div className="member-role">{m.role}</div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
