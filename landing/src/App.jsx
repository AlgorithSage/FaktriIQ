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

    // Intercept hash link clicks for Lenis smooth scroll
    const handleAnchorClick = (e) => {
      const targetLink = e.target.closest('a');
      if (!targetLink) return;
      
      const href = targetLink.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement, {
            offset: -16, // offset to account for navbar height spacing
            duration: 1.2,
          });
          // Update window location hash without browser jump
          window.history.pushState(null, '', href);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Sync Lenis scroll triggers with document changes if needed
    return () => {
      document.removeEventListener('click', handleAnchorClick);
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
