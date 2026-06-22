import { Reveal } from '../components/Reveal'

const ROWS: { part: string; detail: string; cost: string }[] = [
  { part: 'EMG sensing', detail: 'MyoWare 2.0 × 2 channels', cost: '₹3,100' },
  { part: 'Compute', detail: 'ESP32-S3 + XIAO ESP32-S3', cost: '₹1,600' },
  { part: 'Actuation', detail: '11× MG90S servos + MG996R wrist', cost: '₹1,670' },
  { part: 'Feedback', detail: '5× FSR + 3× haptic motors', cost: '₹990' },
  { part: 'Power', detail: '3S LiPo 2200mAh + BMS + charger', cost: '₹3,000' },
  { part: 'Custom PCB', detail: 'JLCPCB board + components', cost: '₹2,750' },
  { part: 'Structure', detail: 'PETG + carbon rods + hardware', cost: '₹4,250' },
  { part: 'Socket', detail: 'Silicone liner + straps + padding', cost: '₹1,900' },
  { part: 'Misc', detail: 'Wire, solder, Dyneema, heatshrink', cost: '₹800' },
]

export default function BOM() {
  return (
    <section className="panel bom">
      <Reveal>
        <div className="eyebrow">Where the ₹22,000 goes</div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="display section-head">A full bill of materials, in the open.</h2>
      </Reveal>

      <div className="bom-table">
        {ROWS.map((r, i) => (
          <Reveal key={r.part} className="bom-row" delay={Math.min(i * 0.04, 0.3)}>
            <span className="bom-part">{r.part}</span>
            <span className="bom-detail">{r.detail}</span>
            <span className="bom-cost">{r.cost}</span>
          </Reveal>
        ))}
        <Reveal className="bom-row total" delay={0.1}>
          <span className="bom-part">Total</span>
          <span className="bom-detail">Open-source, reproducible anywhere</span>
          <span className="bom-cost grad">≈ ₹20,060</span>
        </Reveal>
      </div>
    </section>
  )
}
