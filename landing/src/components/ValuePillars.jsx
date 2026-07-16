import { useState, useEffect, useRef } from 'react';
import ScrollReveal from './ui/ScrollReveal.jsx';

const PILLARS = [
  {
    title: 'Audit-Ready Dashboards',
    points: [
      { lead: 'Automated Verification', text: 'Generates compliant EHS reports without manual document parsing.' },
      { lead: 'Instant Health Check', text: 'View plant-wide compliance indicators on a unified dashboard.' }
    ],
  },
  {
    title: 'Field-Tested Reliability',
    points: [
      { lead: '100% Offline Ops', text: 'Operational on the floor even in zero-connectivity areas.' },
      { lead: 'Real-Time Retrieval', text: 'Fast local lookup directly on technicians\' mobile devices.' }
    ],
  },
  {
    title: 'Traceable Source Citations',
    points: [
      { lead: 'Verifiable Answers', text: 'Every gap flag and warning points directly to active regulations.' },
      { lead: 'Audit Confidence', text: 'Eliminates guesswork with direct links to cited standards.' }
    ],
  },
  {
    title: 'Continuous Gap Audits',
    points: [
      { lead: 'Proactive Monitoring', text: 'Flags compliance risks the moment an SOP or regulatory text changes.' },
      { lead: 'Instant Alerts', text: 'Notifies safety officers of newly introduced compliance gaps.' }
    ],
  },
];

// Snapping angles relative to North (12 o'clock / straight up)
const SNAP_ROTATIONS = [-45, 45, -135, 135];

/* ─── Futuristic SVG Compass ────────────────────────────────────────── */

function CompassVisual({ rotationAngle, isLocked }) {
  const cx = 100;
  const cy = 100;
  const r = 76;

  // Render ticks for the outer bezel
  const ticks = Array.from({ length: 32 }, (_, i) => {
    const angle = (i / 32) * Math.PI * 2;
    const isMajor = i % 8 === 0;
    const len = isMajor ? 8 : 4;
    const x1 = cx + Math.cos(angle) * (r - len);
    const y1 = cy + Math.sin(angle) * (r - len);
    const x2 = cx + Math.cos(angle) * r;
    const y2 = cy + Math.sin(angle) * r;
    return (
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="var(--color-border)"
        strokeWidth={isMajor ? 1.5 : 0.8}
        opacity={isLocked ? (isMajor ? 0.6 : 0.3) : (isMajor ? 0.4 : 0.2)}
        style={{ transition: 'all 0.3s' }}
      />
    );
  });

  return (
    <svg
      viewBox="0 0 200 200"
      className="w-full h-full p-1"
      role="img"
      aria-label="Futuristic interactive compass"
    >
      <defs>
        <radialGradient id="compassGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--orange)" stopOpacity="0.3" />
          <stop offset="60%" stopColor="var(--peach)" stopOpacity="0.1" />
          <stop offset="100%" stopColor="var(--orange)" stopOpacity="0" />
        </radialGradient>
        <filter id="compassShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Outer structural circles */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--color-border)" strokeWidth={1.35} opacity={0.2} />
      <circle cx={cx} cy={cy} r={r - 10} fill="none" stroke="var(--color-border)" strokeWidth={1} strokeDasharray="3 5" opacity={0.25} />
      <circle cx={cx} cy={cy} r={r - 18} fill="none" stroke="var(--color-border)" strokeWidth={0.5} opacity={0.15} />

      {/* Bezel ticks */}
      {ticks}

      {/* Compass background glow */}
      {isLocked && (
        <circle
          cx={cx}
          cy={cy}
          r={r - 18}
          fill="url(#compassGlow)"
          className="animate-pulse"
        />
      )}

      {/* Cardinal markers */}
      <text x={cx} y={cy - r + 13} textAnchor="middle" fontSize="9" fontWeight="800" fill="var(--color-ink)" opacity={0.6} fontFamily="var(--font-mono)">N</text>
      <text x={cx + r - 13} y={cy + 3.5} textAnchor="middle" fontSize="9" fontWeight="800" fill="var(--color-ink)" opacity={0.6} fontFamily="var(--font-mono)">E</text>
      <text x={cx} y={cy + r - 5} textAnchor="middle" fontSize="9" fontWeight="800" fill="var(--color-ink)" opacity={0.6} fontFamily="var(--font-mono)">S</text>
      <text x={cx - r + 13} y={cy + 3.5} textAnchor="middle" fontSize="9" fontWeight="800" fill="var(--color-ink)" opacity={0.6} fontFamily="var(--font-mono)">W</text>

      {/* Rotating Dial Group */}
      <g
        style={{
          transformOrigin: `${cx}px ${cy}px`,
          transform: `rotate(${rotationAngle}deg)`,
          transition: isLocked
            ? 'transform 0.6s cubic-bezier(0.25, 1.25, 0.5, 1.1)'
            : 'transform 0.15s cubic-bezier(0.1, 0.8, 0.25, 1)',
        }}
      >
        {/* Futuristic arrow pointer needle */}
        <g filter={isLocked ? 'url(#compassShadow)' : undefined}>
          {/* Outer target crossline */}
          <line
            x1={cx}
            y1={cy - r + 15}
            x2={cx}
            y2={cy - r + 26}
            stroke={isLocked ? 'var(--orange)' : 'var(--color-ink)'}
            strokeWidth={1.5}
            style={{ transition: 'stroke 0.3s' }}
          />
          {/* Main pointer body */}
          <path
            d={`M ${cx},${cy - r + 24} L ${cx + 7},${cy - 8} L ${cx + 2.5},${cy} L ${cx - 2.5},${cy} L ${cx - 7},${cy - 8} Z`}
            fill={isLocked ? 'var(--orange)' : 'var(--color-ink)'}
            style={{ transition: 'fill 0.3s' }}
          />
          {/* Glowing node at arrow tip */}
          <circle
            cx={cx}
            cy={cy - r + 24}
            r={3}
            fill={isLocked ? 'var(--sky)' : 'var(--color-border)'}
            style={{ transition: 'fill 0.3s' }}
          />
        </g>

        {/* Needle tail */}
        <path
          d={`M ${cx - 4},${cy + 10} L ${cx + 4},${cy + 10} L ${cx},${cy + 22} Z`}
          fill="var(--color-muted)"
          opacity={0.5}
        />

        {/* Fine crosshairs */}
        <line x1={cx - 12} y1={cy} x2={cx + 12} y2={cy} stroke="var(--color-border)" strokeWidth={0.5} opacity={0.25} />
        <line x1={cx} y1={cy - 12} x2={cx} y2={cy + 12} stroke="var(--color-border)" strokeWidth={0.5} opacity={0.25} />
      </g>

      {/* Solid center cap */}
      <circle cx={cx} cy={cy} r={10} fill="#FFFFFF" stroke="var(--color-border)" strokeWidth={1} />
      <circle
        cx={cx}
        cy={cy}
        r={5}
        fill={isLocked ? 'var(--orange)' : 'var(--color-ink)'}
        className={isLocked ? 'animate-ping' : undefined}
        style={{ transformOrigin: `${cx}px ${cy}px`, transition: 'fill 0.3s' }}
        opacity={isLocked ? 0.7 : 0}
      />
      <circle
        cx={cx}
        cy={cy}
        r={4.5}
        fill={isLocked ? 'var(--orange)' : 'var(--color-ink)'}
        style={{ transition: 'fill 0.3s' }}
      />
    </svg>
  );
}

/* ─── Responsive Rounded L-Shape SVG Background ───────────────────── */

function RoundedCardBg({ quadrant, size, isActive }) {
  const { width: W, height: H } = size;
  if (!W || !H) return null;

  const C = 110; // Cutout size
  const R = 22;  // Corner radius

  let d = '';

  if (quadrant === 'tl') {
    d = `
      M ${R},0 
      L ${W - R},0 
      Q ${W},0 ${W},${R} 
      L ${W},${H - C - R} 
      Q ${W},${H - C} ${W - R},${H - C} 
      L ${W - C + R},${H - C} 
      Q ${W - C},${H - C} ${W - C},${H - C + R} 
      L ${W - C},${H - R} 
      Q ${W - C},${H} ${W - C - R},${H} 
      L ${R},${H} 
      Q 0,${H} 0,${H - R} 
      L 0,${R} 
      Q 0,0 ${R},0 
      Z
    `.trim().replace(/\s+/g, ' ');
  } else if (quadrant === 'tr') {
    d = `
      M ${C + R},${H} 
      L ${W - R},${H} 
      Q ${W},${H} ${W},${H - R} 
      L ${W},${R} 
      Q ${W},0 ${W - R},0 
      L ${R},0 
      Q 0,0 0,${R} 
      L 0,${H - C - R} 
      Q 0,${H - C} ${R},${H - C} 
      L ${C - R},${H - C} 
      Q ${C},${H - C} ${C},${H - C + R} 
      L ${C},${H - R} 
      Q ${C},${H} ${C + R},${H} 
      Z
    `.trim().replace(/\s+/g, ' ');
  } else if (quadrant === 'bl') {
    d = `
      M 0,${C + R} 
      L 0,${H - R} 
      Q 0,${H} ${R},${H} 
      L ${W - R},${H} 
      Q ${W},${H} ${W},${H - R} 
      L ${W},${C + R} 
      Q ${W},${C} ${W - R},${C} 
      L ${W - C + R},${C} 
      Q ${W - C},${C} ${W - C},${C - R} 
      L ${W - C},${R} 
      Q ${W - C},0 ${W - C - R},0 
      L ${R},0 
      Q 0,0 0,${R} 
      L 0,${C + R} 
      Z
    `.trim().replace(/\s+/g, ' ');
  } else if (quadrant === 'br') {
    d = `
      M ${C + R},0 
      L ${W - R},0 
      Q ${W},0 ${W},${R} 
      L ${W},${H - R} 
      Q ${W},${H} ${W - R},${H} 
      L ${R},${H} 
      Q 0,${H} 0,${H - R} 
      L 0,${C + R} 
      Q 0,${C} ${R},${C} 
      L ${C - R},${C} 
      Q ${C},${C} ${C},${C - R} 
      L ${C},${R} 
      Q ${C},0 ${C + R},0 
      Z
    `.trim().replace(/\s+/g, ' ');
  }

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0, overflow: 'visible' }}>
      <path
        d={d}
        fill={isActive ? 'var(--color-subtle)' : 'var(--color-surface)'}
        stroke={isActive ? 'var(--color-border)' : 'rgba(59, 63, 70, 0.15)'}
        strokeWidth={1.35}
        style={{
          transition: 'fill 0.4s ease, stroke 0.4s ease',
        }}
      />
    </svg>
  );
}

/* ─── Main Pillars Container ───────────────────────────────────────── */

export default function ValuePillars() {
  const [activeIndex, setActiveIndex] = useState(null);

  // Needle rests at North (0°) when idle, snaps to card angle on hover
  const activeAngle = activeIndex !== null ? SNAP_ROTATIONS[activeIndex] : 0;
  const isLocked = activeIndex !== null;

  const cardLayouts = ['tl', 'tr', 'bl', 'br'];

  // The compass is centered with a plain `top: 50%` against the 2x2 grid box,
  // which only lines up with the true row boundary when both rows are the
  // same height. Card copy lengths differ, so left to their own intrinsic
  // size the two rows can render unevenly - drifting the compass into
  // whichever row is taller. Measuring every card's natural content height
  // here and applying the max as a shared floor keeps all four (and both
  // rows) locked to the same height, so the 50% center is always correct.
  const [cardHeights, setCardHeights] = useState([0, 0, 0, 0]);
  const maxCardHeight = Math.max(190, ...cardHeights);

  const reportCardHeight = (index, height) => {
    setCardHeights((prev) => {
      if (prev[index] === height) return prev;
      const next = [...prev];
      next[index] = height;
      return next;
    });
  };

  // Card component implementing resize observer to feed exact widths to the SVG path generator
  const Card = ({ pillar, index }) => {
    const [size, setSize] = useState({ width: 0, height: 0 });
    const ref = useRef(null);
    const contentRef = useRef(null);
    const isActive = index === activeIndex;

    useEffect(() => {
      if (!ref.current) return;
      const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
          setSize({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
        }
      });
      observer.observe(ref.current);
      return () => observer.disconnect();
    }, []);

    // Tracks the content's own natural height (unaffected by the minHeight
    // floor applied to the outer card below), so all four cards can be
    // measured independently and equalized without a feedback loop.
    useEffect(() => {
      if (!contentRef.current) return;
      const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
          reportCardHeight(index, entry.contentRect.height);
        }
      });
      observer.observe(contentRef.current);
      return () => observer.disconnect();
    }, [index]);

    return (
      <div
        ref={ref}
        className={`pillars__puzzle-card is-${cardLayouts[index]} ${isActive ? 'is-active' : ''}`}
        onMouseEnter={() => setActiveIndex(index)}
        onMouseLeave={() => setActiveIndex(null)}
        onClick={() => setActiveIndex(isActive ? null : index)}
        style={{
          position: 'relative',
          background: 'transparent',
          border: 'none',
          boxShadow: 'none',
          minHeight: maxCardHeight,
          filter: isActive
            ? 'drop-shadow(0 16px 36px rgba(30, 35, 40, 0.08))'
            : 'drop-shadow(0 4px 12px rgba(30, 35, 40, 0.03))',
          transition: 'all 0.4s ease',
        }}
      >
        <RoundedCardBg quadrant={cardLayouts[index]} size={size} isActive={isActive} />

        {/* Content wrapper - self-start so it keeps its natural content+padding
            height for measurement, instead of being stretched to fill the
            outer card's (now equalized) minHeight. */}
        <div
          ref={contentRef}
          className="pillars__card-inner relative w-full bg-transparent border-none p-6 lg:p-7"
          style={{ zIndex: 1, background: 'transparent', height: 'auto', alignSelf: 'flex-start' }}
        >
          <span
            className="pillars__card-badge inline-block"
            style={{
              borderColor: isActive ? 'var(--color-border)' : 'rgba(59, 63, 70, 0.15)',
              background: isActive ? '#FFFFFF' : 'var(--color-surface)',
              transition: 'all 0.3s',
            }}
          >
            0{index + 1}
          </span>
          <h3 className="pillars__card-title text-[18px] font-bold text-[var(--color-ink)] mb-2">
            {pillar.title}
          </h3>
          <ul className="pillars__card-desc flex flex-col gap-2.5 text-[13.5px] leading-relaxed" style={{ color: 'var(--color-slate)' }}>
            {pillar.points.map((pt, idx) => (
              <li key={idx} className="relative pl-4 leading-snug">
                <span className="absolute left-0 top-[7px] h-1.5 w-1.5 rounded-full bg-[var(--orange)] opacity-80" />
                <strong>{pt.lead}: </strong>{pt.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <section className="pillars section" id="platform" style={{ overflow: 'hidden' }}>
      <div className="container">
        <ScrollReveal preset="fadeUp" className="pillars__header mx-auto text-center max-w-[720px] mb-16">
          <p className="overline">The Power of FaktriIQ</p>
          <h2 className="section-heading">Audit-ready and floor-focused from day one</h2>
          <p className="section-subheading" style={{ marginInline: 'auto' }}>
            Industrial facilities and safety departments deploy our multi-agent
            platform to resolve safety questions on the floor and detect regulatory
            gaps at EHS desks.
          </p>
        </ScrollReveal>

        <div className="pillars__puzzle">
          {PILLARS.map((pillar, index) => (
            <ScrollReveal
              key={pillar.title}
              preset={index % 2 === 0 ? 'fadeLeft' : 'fadeRight'}
              delay={0.1 + index * 0.08}
              style={{ display: 'contents' }}
            >
              <Card pillar={pillar} index={index} />
            </ScrollReveal>
          ))}

          {/* Symmetrical central floating compass panel */}
          <ScrollReveal
            preset="scaleUp"
            delay={0.25}
            className="pillars__puzzle-center flex items-center justify-center border"
            id="pillars-visual"
            style={{
              borderRadius: '1.5rem',
              background: '#FFFFFF',
              borderColor: isLocked ? 'var(--color-border)' : 'rgba(59, 63, 70, 0.15)',
              boxShadow: isLocked
                ? '0 12px 30px rgba(217, 119, 6, 0.12)'
                : '0 8px 24px rgba(30, 35, 40, 0.08)',
              transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
            }}
          >
            <CompassVisual rotationAngle={activeAngle} isLocked={isLocked} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
