import HeroReveal from './HeroReveal.jsx';
import { PushButton } from './ui/PushButton';
import { ShaderBackground } from './ui/ShaderBackground.jsx';
import ScrollReveal from './ui/ScrollReveal.jsx';
import { Highlighter } from './ui/highlighter';

const STATUTORY_DETAILS = {
  'Factories Act 1948': {
    description: 'Governs industrial workforce safety, health, and welfare standards across manufacturing units.',
    mapping: 'Section 36 (Confined Space), Section 41F (Chemical Exposure), Section 7A (Occupier Welfare)',
    checks: 'PPE protocols, air change frequency, hazardous chemical exposure logs, height-work permits.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="social-proof__badge-icon">
        <path d="M2 20h20"/>
        <path d="m5 17 2-3h4v3"/>
        <path d="M9 14V4h6v10"/>
        <path d="m13 17 2-3h4v3"/>
        <path d="M17 14V8h5v6"/>
      </svg>
    )
  },
  'OISD Standards': {
    description: 'Safety guidelines formulated by the Oil Industry Safety Directorate for hydrocarbons processing.',
    mapping: 'OISD-STD-105 (Work Permit System), OISD-STD-189 (Firefighting Equipment), OISD-GDN-115 (Static Electricity)',
    checks: 'Hot-work permit intervals, gas-free certifications, fire hydrant pressure loops, grounding audits.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="social-proof__badge-icon">
        <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 11 5 15a7 7 0 0 0 7 7z"/>
      </svg>
    )
  },
  'PESO Regulations': {
    description: 'Petroleum and Explosives Safety Organization rules for storage, manufacturing, and transport of hazardous substances.',
    mapping: 'Petroleum Rules 2002 (Storage Class A/B/C), Static Grounding guidelines',
    checks: 'Safety boundary distances, dike/bund wall containment volumes, vessel pressure safety valves.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="social-proof__badge-icon">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M12 8v4"/>
        <path d="M12 16h.01"/>
      </svg>
    )
  },
  'DGMS Guidelines': {
    description: 'Directorate General of Mines Safety circulars governing coal, metal, and oil mining, plus electrical supply and occupational health in mines.',
    mapping: 'Coal/Metal/Oil Mines Regulations, Electrical Supply safety measures, Occupational Safety & Health provisions',
    checks: 'Mine ventilation, gas monitoring, winding & haulage safety, electrical isolation, statutory inspections.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="social-proof__badge-icon">
        <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
      </svg>
    )
  },
  'MSIHC Rules': {
    description: 'Manufacture, Storage and Import of Hazardous Chemical Rules covering threshold quantities and major-accident hazard controls.',
    mapping: 'Schedule threshold quantities, on-site emergency plans, safety reports for hazardous chemical inventories',
    checks: 'Threshold quantity limits, major-accident-hazard unit identification, emergency preparedness, hazardous storage.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="social-proof__badge-icon">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
        <path d="M12 9v4"/>
        <path d="M12 17h.01"/>
      </svg>
    )
  }
};

export default function Hero() {
  return (
    <section className="hero" id="top" style={{ position: "relative" }}>
      {/* WebGL Silk Shader Background (interactive, theme matched) */}
      <ShaderBackground className="absolute inset-0 z-0 pointer-events-none" />
      <div className="hero__content container" style={{ position: "relative", zIndex: 1, marginBottom: "clamp(2rem, 4vw, 3rem)" }}>
        <h1 className="hero__heading">
          Catch <Highlighter action="highlight" color="rgba(47, 163, 107, 0.22)" animationDuration={800} padding={3} isView><span className="pl-1 pr-3">compliance gaps</span></Highlighter> before your next <Highlighter action="underline" color="#D97706" animationDuration={600} strokeWidth={2.5} isView>audit</Highlighter> does.
        </h1>
        <ScrollReveal preset="fadeUp" delay={0.15} duration={0.8}>
          <p className="hero__subheading">
            A unified AI asset &amp; operations brain mapping plant procedures against
            Indian regulations-delivering traceable, cited answers for technicians
            on the floor and safety officers at their desks.
          </p>
        </ScrollReveal>
        <ScrollReveal preset="fadeUp" delay={0.3} duration={0.8}>
          <div className="hero__ctas">
            <PushButton href="#agents">
              See our Platform
            </PushButton>
            <PushButton href="#technician-app">
              Download APK
            </PushButton>
          </div>
        </ScrollReveal>
      </div>

      <HeroReveal videoSrc="/lp_video.mp4" />

      <ScrollReveal preset="fadeUp" delay={0.1} className="social-proof container">
        <p className="social-proof__label">Aligned with statutory standards</p>
        <ul className="social-proof__logos">
          {Object.entries(STATUTORY_DETAILS).map(([name, details]) => (
            <li key={name} className="social-proof__badge-container">
              <div className="social-proof__badge">
                {details.icon}
                <span>{name}</span>
              </div>
              <div className="social-proof__tooltip">
                <div className="social-proof__tooltip-header">
                  <span className="social-proof__tooltip-tag">Compliance Framework</span>
                  <span className="social-proof__tooltip-status">Pre-configured</span>
                </div>
                <h4 className="social-proof__tooltip-title">{name}</h4>
                <p className="social-proof__tooltip-desc">{details.description}</p>
                <div className="social-proof__tooltip-divider" />
                <div className="social-proof__tooltip-meta">
                  <div className="social-proof__tooltip-meta-item">
                    <strong>Active Mapping:</strong> {details.mapping}
                  </div>
                  <div className="social-proof__tooltip-meta-item" style={{ marginTop: '6px' }}>
                    <strong>Automated Checks:</strong> {details.checks}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </ScrollReveal>
    </section>
  );
}
