import HeroReveal from './HeroReveal.jsx';
import { ShinyButton } from './ui/ShinyButton';
import { Highlighter } from './ui/highlighter';

const STATUTORY_LOGOS = [
  'Factories Act 1948',
  'OISD Standards',
  'PESO Regulations',
  'Process Plants',
  'EHS Safety Councils',
];

export default function Hero() {
  return (
    <section className="hero" id="top" style={{ position: "relative" }}>
      {/* Noise Texture (Darker Dots) Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background: "#ffffff",
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.35) 1px, transparent 0)",
          backgroundSize: "20px 20px",
          pointerEvents: "none",
        }}
      />
      <div className="hero__content container" style={{ position: "relative", zIndex: 1 }}>
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
