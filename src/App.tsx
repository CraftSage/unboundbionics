import { useLenis } from './lib/useLenis'
import { Experience } from './three/Experience'
import { Nav } from './components/Nav'
import { Preloader } from './components/Preloader'
import { ScrollProgress } from './components/ScrollProgress'
import Hero from './sections/Hero'
import Problem from './sections/Problem'
import Divide from './sections/Divide'
import HowItWorks from './sections/HowItWorks'
import Journey from './sections/Journey'
import Inside from './sections/Inside'
import BOM from './sections/BOM'
import Team from './sections/Team'
import Roadmap from './sections/Roadmap'
import CTA from './sections/CTA'

export default function App() {
  useLenis()
  return (
    <>
      <Preloader />
      <Experience />
      <Nav />
      <ScrollProgress />
      <main id="top" className="content">
        <Hero />
        <Problem />
        <Divide />
        <HowItWorks />
        <Journey />
        <Inside />
        <BOM />
        <Team />
        <Roadmap />
        <CTA />
      </main>
    </>
  )
}
