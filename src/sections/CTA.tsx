import { Reveal } from '../components/Reveal'

export default function CTA() {
  return (
    <>
      <section className="panel cta">
        <Reveal>
          <div className="eyebrow">Built by two 14-year-olds</div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="display">
            Let’s give 5.7 million people
            <br />
            their <span className="grad">hands back</span>.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="row">
            <a className="btn solid" href="mailto:aaravstudy4122@gmail.com">
              Get in touch
            </a>
            <a className="btn" href="#top">
              Back to top
            </a>
          </div>
        </Reveal>
      </section>

      <footer className="footer">
        <div>
          <b>ReachAI</b> — affordable AI bionics
        </div>
        <div>Samsung Solve for Tomorrow 2026 · India</div>
        <div>Built with ❤ by two Class-10 students</div>
      </footer>
    </>
  )
}
