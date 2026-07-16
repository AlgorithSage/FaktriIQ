import { useEffect } from 'react';
import Lenis from 'lenis';
import NavBar from './components/NavBar.jsx';
import Hero from './components/Hero.jsx';
import CoreValueProposition from './components/CoreValueProposition.jsx';
import AgentsSection from './components/AgentsSection.jsx';
import StatutoryStandards from './components/StatutoryStandards.jsx';
import TwoModes from './components/TwoModes.jsx';
import ValuePillars from './components/ValuePillars.jsx';
import TechnologyStrip from './components/TechnologyStrip.jsx';
import RolesGrid from './components/RolesGrid.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

export default function App() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync Lenis scroll triggers with document changes if needed
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <CoreValueProposition />
        <AgentsSection />
        <StatutoryStandards />
        <TwoModes />
        <ValuePillars />
        <RolesGrid />
        <TechnologyStrip />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
