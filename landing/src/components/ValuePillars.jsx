import { useState } from 'react';

const PILLARS = [
  {
    title: 'Audit-Ready Dashboards',
    description:
      'Verify compliance automatically and prepare EHS logs without manual parsing.',
  },
  {
    title: 'Field-Tested Reliability',
    description:
      'Technicians access safety instructions locally on-device without needing internet connection.',
  },
  {
    title: 'Traceable Source Citations',
    description:
      'Every answer shows the exact document page and clause number, eliminating AI hallucination.',
  },
  {
    title: 'Continuous Gap Audits',
    description:
      'Automatically flag safety discrepancies the moment an SOP or regulation text is updated.',
  },
];

/* Understated line cluster radiating from a central focus point. The rays
   rotate subtly as the active tab changes. */
function LineCluster({ activeIndex }) {
  const rays = 12;
  const cx = 180;
  const cy = 180;
  return (
    <svg
      className="pillars__cluster"
      viewBox="0 0 360 360"
      role="img"
      aria-label={`Diagram highlighting ${PILLARS[activeIndex].title}`}
      style={{ '--cluster-rotation': `${activeIndex * 15}deg` }}
    >
      <g className="pillars__cluster-rays">
        {Array.from({ length: rays }, (_, i) => {
          const angle = (i / rays) * Math.PI * 2;
          const inner = 34;
          const outer = i % 3 === 0 ? 150 : i % 2 === 0 ? 118 : 92;
          const x1 = cx + Math.cos(angle) * inner;
          const y1 = cy + Math.sin(angle) * inner;
          const x2 = cx + Math.cos(angle) * outer;
          const y2 = cy + Math.sin(angle) * outer;
          const isLead = i === activeIndex * 3;
          return (
            <g key={i}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isLead ? '#77E6E0' : '#CBD5E1'}
                strokeWidth={isLead ? 1.8 : 1.1}
              />
              <circle
                cx={x2}
                cy={y2}
                r={isLead ? 4.5 : 3}
                fill={isLead ? '#F8E36A' : '#FFFFFF'}
                stroke={isLead ? '#77E6E0' : '#94A3B8'}
                strokeWidth="1.2"
              />
            </g>
          );
        })}
      </g>
      <circle cx={cx} cy={cy} r="26" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r="8" fill="#111111" />
    </svg>
  );
}

export default function ValuePillars() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="pillars section section--warm" id="agents">
      <div className="container">
        <div className="pillars__header">
          <p className="overline">The Power of FaktriIQ</p>
          <h2 className="section-heading">Audit-ready and floor-focused from day one</h2>
          <p className="section-subheading">
            Industrial facilities and safety departments deploy our multi-agent
            platform to resolve safety questions on the floor and detect regulatory
            gaps at EHS desks.
          </p>
        </div>

        <div className="pillars__grid">
          <div className="pillars__tabs" role="tablist" aria-orientation="vertical">
            {PILLARS.map((pillar, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={pillar.title}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="pillars-visual"
                  className={`pillars__tab ${isActive ? 'is-active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                >
                  <span className="pillars__tab-title">{pillar.title}</span>
                  <span className="pillars__tab-description">{pillar.description}</span>
                </button>
              );
            })}
          </div>

          <div className="pillars__visual card" id="pillars-visual">
            <LineCluster activeIndex={activeIndex} />
            <div className="pillars__dots" aria-hidden="true">
              {PILLARS.map((pillar, index) => (
                <button
                  key={pillar.title}
                  type="button"
                  tabIndex={-1}
                  className={`pillars__dot ${index === activeIndex ? 'is-active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
