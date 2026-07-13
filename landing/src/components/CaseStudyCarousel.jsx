import { useState } from 'react';

const CASE_STUDIES = [
  {
    partnerLogo: 'PLANT PILOT',
    heading: 'Safety Officers reduce SOP compliance audit time from hours to minutes',
    description:
      'FaktriIQ powers plant-wide document intelligence, parsing multi-page technical manuals, standard operating procedures, and Indian safety standards, automating risk management, officer reviews, and technician lookups.',
    metrics: [
      { value: '95%', label: 'reduced gap identification time' },
      { value: '0%', label: 'hallucination rate using strict grounding' },
      { value: '< 3 seconds', label: 'Average question retrieval response time' },
    ],
  },
  {
    partnerLogo: 'FIELD OPS',
    heading: 'Field Technicians resolve procedure questions on the floor, fully offline',
    description:
      'On-device Gemma 4 E2B running on llama.cpp with Vulkan acceleration gives technicians cited answers from plant manuals with zero connectivity — every response grounded in the exact SOP page it came from.',
    metrics: [
      { value: '100%', label: 'offline availability on plant-floor devices' },
      { value: '48px', label: 'minimum touch targets, glove-friendly by design' },
      { value: '2', label: 'source citations attached to every answer' },
    ],
  },
  {
    partnerLogo: 'EHS DESK',
    heading: 'EHS teams keep every audit trail sovereign, private, and on-premise',
    description:
      'With browser-local WebGPU inference and explicit opt-in consent for any cloud-assisted audit, IT and EHS security teams keep document text inside the plant while still preparing statutory reports in record time.',
    metrics: [
      { value: '0', label: 'documents leaving the premises by default' },
      { value: '500 tok/s', label: 'opt-in cloud audit speed on Groq LPU' },
      { value: '3', label: 'statutory frameworks mapped: Factories Act, OISD, PESO' },
    ],
  },
];

function ArrowIcon({ direction }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={direction === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Low-contrast, minimally styled industrial control room scene built from CSS/SVG. */
function ControlRoomVisual() {
  return (
    <svg
      className="case-study__scene"
      viewBox="0 0 480 360"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Stylized industrial plant control room"
    >
      <rect width="480" height="360" fill="#F8FAFC" />
      <rect x="0" y="250" width="480" height="110" fill="#EEF2F7" />
      {/* monitor wall */}
      <g stroke="#CBD5E1" strokeWidth="1.5" fill="#FFFFFF">
        <rect x="48" y="56" width="120" height="76" rx="4" />
        <rect x="184" y="56" width="120" height="76" rx="4" />
        <rect x="320" y="56" width="120" height="76" rx="4" />
      </g>
      <g stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round">
        <path d="M62 96 l24 -14 l22 10 l26 -18 l20 8" fill="none" />
        <path d="M198 108 l22 -8 l24 -20 l26 12 l22 -6" fill="none" />
      </g>
      <g fill="#F1F5F9">
        <rect x="332" y="68" width="96" height="8" rx="2" />
        <rect x="332" y="84" width="72" height="8" rx="2" />
        <rect x="332" y="100" width="84" height="8" rx="2" />
      </g>
      <circle cx="418" cy="72" r="4" fill="#77E6E0" opacity="0.8" />
      {/* console desk */}
      <g stroke="#CBD5E1" strokeWidth="1.5" fill="#FFFFFF">
        <rect x="96" y="204" width="130" height="58" rx="4" />
        <rect x="254" y="204" width="130" height="58" rx="4" />
      </g>
      <rect x="60" y="272" width="360" height="14" rx="3" fill="#E2E8F0" />
      <g fill="#CBD5E1">
        <rect x="118" y="222" width="86" height="6" rx="2" />
        <rect x="118" y="236" width="62" height="6" rx="2" />
        <rect x="276" y="222" width="86" height="6" rx="2" />
        <rect x="276" y="236" width="52" height="6" rx="2" />
      </g>
      <circle cx="210" cy="243" r="3.5" fill="#F7C6B8" opacity="0.9" />
    </svg>
  );
}

export default function CaseStudyCarousel() {
  const [index, setIndex] = useState(0);
  const total = CASE_STUDIES.length;
  const study = CASE_STUDIES[index];

  const previous = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <section className="case-study section section--subtle" id="why-faktriiq-">
      <div className="container">
        <div className="case-study__card card">
          <div className="case-study__content" key={index}>
            <p className="case-study__partner">{study.partnerLogo}</p>
            <h2 className="case-study__heading">{study.heading}</h2>
            <p className="case-study__description">{study.description}</p>

            <dl className="case-study__metrics">
              {study.metrics.map((metric) => (
                <div key={metric.label} className="case-study__metric">
                  <dt className="case-study__metric-value">{metric.value}</dt>
                  <dd className="case-study__metric-label">{metric.label}</dd>
                </div>
              ))}
            </dl>

            <div className="case-study__footer">
              <a className="text-link" href="#resources">
                Hear from our customers
              </a>
              <div className="case-study__controls">
                <button
                  type="button"
                  className="case-study__arrow"
                  onClick={previous}
                  aria-label="Previous case study"
                >
                  <ArrowIcon direction="left" />
                </button>
                <span className="case-study__count">
                  {index + 1} / {total}
                </span>
                <button
                  type="button"
                  className="case-study__arrow"
                  onClick={next}
                  aria-label="Next case study"
                >
                  <ArrowIcon direction="right" />
                </button>
              </div>
            </div>
          </div>

          <div className="case-study__visual">
            <ControlRoomVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
