import HeroReveal from './HeroReveal.jsx';

const STATUTORY_LOGOS = [
  'Factories Act 1948',
  'OISD Standards',
  'PESO Regulations',
  'Process Plants',
  'EHS Safety Councils',
];

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
          Catch compliance gaps before your next audit does.
        </h1>
        <p className="hero__subheading">
          A unified AI asset &amp; operations brain mapping plant procedures against
          Indian regulations&mdash;delivering traceable, cited answers for technicians
          on the floor and safety officers at their desks.
        </p>
        <a className="btn btn--primary hero__cta" href="#agents">
          See our Platform
        </a>
      </div>

      <HeroReveal videoSrc="/lp_video.mp4" />

      <div className="social-proof container">
        <p className="social-proof__label">Aligned with statutory standards</p>
        <ul className="social-proof__logos">
          {STATUTORY_LOGOS.map((name) => (
            <li key={name} className="social-proof__badge">
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
