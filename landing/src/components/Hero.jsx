import HeroReveal from './HeroReveal.jsx';
import { ShinyButton } from './ui/ShinyButton';
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
  'Process Plants': {
    description: 'Operational safety checks for refinery, chemical processing, and general utility systems.',
    mapping: 'LOTO (Lock-Out Tag-Out), Line Purging Procedures, Pre-Startup Safety Reviews (PSSR)',
    checks: 'Isolation logs, nitrogen blanketing levels, equipment isolation tag-outs, startup readiness.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="social-proof__badge-icon">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    )
  },
  'EHS Safety Councils': {
    description: 'General safety framework alignment including global Best Practice and Council recommendations.',
    mapping: 'ISO 45001 (Occupational Health & Safety), Near-Miss reporting loops',
    checks: 'Near-miss loop analysis, root-cause Q&A alignment, corrective action tracking (CAPA).',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="social-proof__badge-icon">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    )
  }
};

/* Low-contrast line-art grid of data nodes rendered as an inline SVG background. */
function GridBackdrop() {
  return (
    <svg
      className="hero__backdrop"
      viewBox="0 0 1200 640"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#E2E8F0" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1200" height="640" fill="url(#grid)" opacity="0.4" />
      <g stroke="#CBD5E1" strokeWidth="1" fill="none" opacity="0.6">
        <path d="M120 480 L360 320 L640 400 L900 240 L1120 320" />
        <path d="M240 160 L480 240 L760 160 L1000 240" />
      </g>
      <g fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.2" opacity="0.8">
        <circle cx="360" cy="320" r="5" />
        <circle cx="640" cy="400" r="5" />
        <circle cx="900" cy="240" r="5" />
        <circle cx="480" cy="240" r="5" />
        <circle cx="760" cy="160" r="5" />
      </g>
      <g fill="#77E6E0" opacity="0.7">
        <circle cx="640" cy="400" r="2.5" />
        <circle cx="900" cy="240" r="2.5" />
        <circle cx="480" cy="240" r="2.5" />
      </g>
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="top">
      <GridBackdrop />
      <div className="hero__content container">
        <h1 className="hero__heading">
          Catch{' '}
          <Highlighter isView={true} color="rgba(6, 182, 212, 0.25)" strokeWidth={3.5}>
            compliance gaps
          </Highlighter>{' '}
          before your next audit does.
        </h1>
        <p className="hero__subheading">
          A unified AI asset &amp; operations brain mapping plant procedures against
          Indian regulations&mdash;delivering traceable, cited answers for technicians
          on the floor and safety officers at their desks.
        </p>
        <ShinyButton onClick={() => window.location.hash = 'agents'} className="hero__cta">
          See our Platform
        </ShinyButton>
      </div>

      <HeroReveal videoSrc="/lp_video.mp4" />

      <div className="social-proof container">
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
      </div>
    </section>
  );
}
