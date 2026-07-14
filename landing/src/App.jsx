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

export default function App() {
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
    </>
  );
}
