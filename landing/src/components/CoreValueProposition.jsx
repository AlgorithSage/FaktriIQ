import { useState, useEffect } from 'react';
import { Layers, ScanSearch, BadgeCheck, ArrowRight } from 'lucide-react';

/* ─── Data ─────────────────────────────────────────────────────────── */

const STEPS = [
  {
    icon: Layers,
    title: 'Ground',
    label: 'Step 01',
    headline: 'Unified Ingestion Engine',
    description:
      'Merges plant manuals, safety SOPs, and Indian statutory rules into one contextual engine with clause-level mapping and zero hallucinations.',
    bullets: [
      'Unified ingestion across 3 frameworks',
      'Clause-level auto-tagging for traceability',
      'Strictly bounded - zero hallucination guarantee',
    ],
    metric: '3',
    metricLabel: 'Frameworks unified',
  },
  {
    icon: ScanSearch,
    title: 'Ask or Audit',
    label: 'Step 02',
    headline: 'Plain-Language Query & Audit',
    description:
      'Floor technicians get immediate answers in natural language. EHS officers audit procedures against active regulations in seconds.',
    bullets: [
      'Natural language queries for floor technicians',
      'Statutory audits against active regulations',
      'Sub-3 second verified resolution time',
    ],
    metric: '~2.3s',
    metricLabel: 'Average response time',
  },
  {
    icon: BadgeCheck,
    title: 'Cite',
    label: 'Step 03',
    headline: 'Traceable, Audit-Ready Proof',
    description:
      'Every response references the exact document page, section, and clause. Tap any citation to inspect the original source text.',
    bullets: [
      'Traceable footnotes to exact clause & section',
      'One-tap source text inspection',
      'Honest fallbacks when confidence is low',
    ],
    metric: '§7A',
    metricLabel: 'Cited to clause level',
  },
];

/* ─── Isometric Layer Stack (SVG) ──────────────────────────────────── */

function IsometricStack({ active }) {
  // A tightly-bounded viewBox (no reserved margin for side captions) so the
  // stack itself - not empty canvas around it - fills the panel.
  const cx = 180;
  const w = 170;
  const h = 85;
  const d = 54;
  // 185px apart - comfortably more than each layer's 170px vertical
  // footprint (2h), so adjacent layers never overlap.
  const yPositions = [490, 305, 120];

  const labels = ['Ground', 'Query', 'Cite'];

  return (
    <svg
      viewBox="0 0 440 660"
      className="w-full h-full"
      role="img"
      aria-label="Knowledge stack visualization"
    >
      <defs>
        <filter id="layerGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>

      {/* Center guide line */}
      <line
        x1={cx}
        y1={active === 2 ? 23 : 35}
        x2={cx}
        y2={active === 0 ? 617 : 629}
        stroke="var(--color-border)"
        strokeDasharray="3 8"
        strokeLinecap="round"
        opacity="0.25"
        style={{
          transition: 'y1 0.55s cubic-bezier(0.16, 1, 0.3, 1), y2 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {[0, 1, 2].map((i) => {
        const cy = yPositions[i];
        const on = i === active;

        const topFace = `M${cx},${cy - h} L${cx + w},${cy} L${cx},${cy + h} L${cx - w},${cy} Z`;
        const leftFace = `M${cx - w},${cy} L${cx},${cy + h} L${cx},${cy + h + d} L${cx - w},${cy + d} Z`;
        const rightFace = `M${cx + w},${cy} L${cx},${cy + h} L${cx},${cy + h + d} L${cx + w},${cy + d} Z`;

        const baseStroke = on ? 'var(--orange)' : 'var(--color-border)';
        const dashArray = on ? undefined : '6 7';

        return (
          <g
            key={i}
            style={{
              transform: on ? 'translateY(-12px)' : 'translateY(0)',
              transition: 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Glow shadow */}
            <ellipse
              cx={cx}
              cy={cy + d + 48}
              rx={150}
              ry={40}
              fill="var(--peach)"
              opacity={on ? 0.22 : 0}
              filter="url(#layerGlow)"
              style={{ transition: 'opacity 0.5s' }}
            />
            {/* Left face */}
            <path
              d={leftFace}
              fill={on ? 'var(--orange)' : 'transparent'}
              stroke={baseStroke}
              strokeWidth={1.75}
              strokeDasharray={dashArray}
              style={{ transition: 'all 0.5s' }}
            />
            {/* Right face */}
            <path
              d={rightFace}
              fill={on ? 'var(--peach)' : 'transparent'}
              stroke={baseStroke}
              strokeWidth={1.75}
              strokeDasharray={dashArray}
              style={{ transition: 'all 0.5s' }}
            />
            {/* Top face */}
            <path
              d={topFace}
              fill={on ? 'var(--sky)' : 'var(--color-surface)'}
              stroke={baseStroke}
              strokeWidth={1.75}
              strokeDasharray={dashArray}
              style={{ transition: 'all 0.5s' }}
            />
            {/* Layer heading - the only label kept */}
            <text
              x={cx}
              y={cy + 6}
              textAnchor="middle"
              fill={on ? 'var(--color-ink)' : 'var(--color-muted)'}
              fontSize="19"
              fontWeight="700"
              fontFamily="var(--font-mono)"
              letterSpacing="0.08em"
              style={{
                textTransform: 'uppercase',
                transition: 'fill 0.4s',
                opacity: on ? 1 : 0.55,
              }}
            >
              {labels[i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ─── Main Section ─────────────────────────────────────────────────── */

export default function CoreValueProposition() {
  // First step open by default so the section reads as fully populated on
  // load, rather than three collapsed rows next to an unlit diagram.
  const [active, setActive] = useState(0);
  const current = active !== null ? STEPS[active] : null;

  // Auto-cycle through the steps every 5 seconds.
  // Resetting the timer whenever `active` changes guarantees that if a user manually clicks,
  // the auto-cycle is deferred by another full 5 seconds (preventing sudden jumps).
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % STEPS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <section className="section" id="overview">
      <div className="container max-w-[1400px]">
        {/* Section header - centered, with clear rhythm between heading and support copy */}
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <p className="overline">FaktriIQ Operations Brain</p>
          <h2 className="section-heading">
            Instant answers. Verified compliance.
          </h2>
          <p className="section-subheading" style={{ marginTop: '20px' }}>
            One unified brain, working end to end - turning raw plant documents
            into cited, audit-ready answers in three steps.
          </p>
        </div>

        {/* ── Large yellow container wrapping both columns ── */}
        <div
          className="overflow-hidden border grain-bg-parent"
          style={{
            borderRadius: '2rem',
            background: 'var(--color-subtle)',
            borderColor: 'var(--color-border)',
            boxShadow: 'var(--shadow-soft)',
            padding: 'clamp(0.5rem, 1.2vw, 1.0rem) clamp(1.5rem, 3.5vw, 3rem)',
          }}
        >
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[48fr_52fr] lg:gap-12">

            {/* ─── Left Column: Intro + Step Cards ─── */}
            <div className="flex w-full min-w-0 flex-col gap-8">
              {/* Pipeline Intro Block */}
              <div className="flex flex-col gap-3 max-w-lg">
                <div className="inline-flex items-center gap-2 self-start rounded-full bg-white/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--color-ink)] border border-[rgba(59,63,70,0.15)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-verify)] animate-pulse" />
                  Active Data Pipeline
                </div>
                <h3 className="text-xl font-bold tracking-tight text-[var(--color-ink)] mt-2">
                  How the Brain Processes Data
                </h3>
                <p className="text-[14px] leading-relaxed text-[var(--color-slate)] opacity-90">
                  Select a step below to inspect how the FaktriIQ Operations Brain dynamically connects raw shop-floor documents to rigorous compliance standards in real time.
                </p>
              </div>

              {/* Step Cards List */}
              <div className="flex flex-col gap-3.5">
                {STEPS.map((step, i) => {
                  const Icon = step.icon;
                  const on = active !== null && i === active;

                  return (
                    <button
                      key={step.title}
                      type="button"
                      onClick={() => setActive(i)}
                      className="group relative w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)]"
                    >
                    <div
                      className="overflow-hidden border transition-all duration-300"
                      style={{
                        borderRadius: '1.25rem',
                        borderColor: on
                          ? 'var(--color-border)'
                          : 'rgba(59, 63, 70, 0.15)',
                        background: on ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)',
                        boxShadow: on
                          ? '0 6px 24px rgba(30, 35, 40, 0.08)'
                          : '0 1px 2px rgba(30, 35, 40, 0.02)',
                      }}
                    >
                      {/* Card content */}
                      <div className="px-5 py-4 lg:px-6 lg:py-5">
                        {/* Top row: icon + label + title + arrow */}
                        <div className="flex items-center gap-3.5">
                          <span
                            className="flex h-8 w-8 shrink-0 items-center justify-center transition-all duration-300"
                            style={{
                              borderRadius: '0.5rem',
                              background: on
                                ? 'var(--color-subtle)'
                                : 'var(--color-surface)',
                              border: `1px solid ${on ? 'var(--color-border)' : 'rgba(59, 63, 70, 0.15)'}`,
                              boxShadow: on
                                ? '0 3px 10px rgba(30, 35, 40, 0.08)'
                                : 'none',
                            }}
                          >
                            <Icon
                              className="h-[16px] w-[16px] transition-colors duration-300"
                              strokeWidth={1.8}
                              style={{
                                color: on
                                  ? 'var(--color-ink)'
                                  : 'var(--color-muted)',
                              }}
                            />
                          </span>

                          <div className="flex flex-col min-w-0">
                            <span
                              className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] leading-none"
                              style={{ color: 'var(--color-muted)', opacity: 0.6 }}
                            >
                              {step.label}
                            </span>
                            <h3
                              className="mt-0.5 text-[16px] font-bold leading-snug transition-colors duration-300"
                              style={{
                                color: on
                                  ? 'var(--color-ink)'
                                  : 'var(--color-muted)',
                              }}
                            >
                              {step.title}
                            </h3>
                          </div>

                          <ArrowRight
                            className="ml-auto h-4 w-4 shrink-0 transition-all duration-300"
                            strokeWidth={2}
                            style={{
                              color: on ? 'var(--color-ink)' : 'var(--color-muted)',
                              opacity: on ? 0.7 : 0.35,
                              transform: on ? 'rotate(90deg)' : 'rotate(0deg)',
                            }}
                          />
                        </div>

                        {/* Expandable content */}
                        <div
                          className="overflow-hidden transition-all duration-500"
                          style={{
                            maxHeight: on ? '180px' : '0px',
                            opacity: on ? 1 : 0,
                            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                          }}
                        >
                          <div className="mt-3.5 ml-[54px] border-t pt-3.5" style={{ borderColor: 'rgba(30, 35, 40, 0.08)' }}>
                            {/* Headline */}
                            <p
                              className="mb-2.5 text-[14px] font-semibold"
                              style={{ color: 'var(--color-ink)' }}
                            >
                              {step.headline}
                            </p>

                            {/* Bullets */}
                            <ul className="flex flex-col gap-2">
                              {step.bullets.map((bullet, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2.5 text-[13.5px] leading-relaxed"
                                  style={{ color: 'var(--color-slate)' }}
                                >
                                  <span
                                    className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                                    style={{
                                      background: 'var(--orange)',
                                      boxShadow: '0 0 0 2px rgba(245, 158, 11, 0.15)',
                                    }}
                                  />
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>

                            {/* Metric badge */}
                            <div
                              className="mt-3 inline-flex items-center gap-2 rounded-lg px-3 py-1.5"
                              style={{
                                background: 'var(--lemon-soft)',
                                border: '1px solid rgba(59, 63, 70, 0.12)',
                              }}
                            >
                              <span
                                className="text-[15px] font-bold"
                                style={{ color: 'var(--color-ink)' }}
                              >
                                {step.metric}
                              </span>
                              <span
                                className="text-[11px] font-medium"
                                style={{ color: 'var(--color-muted)' }}
                              >
                                {step.metricLabel}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
              </div>

              {/* Footer CTA - anchors the column and drives into the agents section */}
              <a
                href="#agents"
                className="group inline-flex w-fit items-center gap-2.5 rounded-full px-5 py-3 text-[13px] font-bold transition-transform duration-300 hover:-translate-y-0.5"
                style={{ background: 'var(--color-ink)', color: '#FFFFFF' }}
              >
                See the platform in action
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={2}
                />
              </a>
            </div>

            {/* ─── Right Column: Isometric Stack in white panel ─── */}
            <div
              className="relative w-full min-w-0 overflow-hidden border"
              style={{
                borderRadius: '1.5rem',
                background: '#FFFFFF',
                borderColor: 'var(--color-border)',
                boxShadow: 'var(--shadow-soft)',
                minHeight: '380px',
              }}
            >
              {/* SVG Stack is absolutely positioned so it fills - but never
                  drives - the panel height. The grid (items-stretch) sizes this
                  panel to the LEFT column's height, so the diagram always
                  conforms to the content beside it and no dead space appears. */}
              <div
                className="absolute"
                style={{ inset: 'clamp(1rem, 2.5vw, 2rem)' }}
              >
                <IsometricStack active={active} />
              </div>

              {/* Floating info chip - only shown when a step is active */}
              {current && (
                <div
                  className="absolute flex flex-col border px-3.5 py-2.5 transition-all duration-500 ease-in-out"
                  style={{
                    right: 'clamp(0.4rem, 1.2vw, 0.85rem)',
                    top: active === 0 ? '74%' : active === 1 ? '46%' : '18%',
                    transform: 'translateY(-50%)',
                    borderRadius: '0.75rem',
                    borderColor: 'var(--color-border)',
                    boxShadow: '0 4px 16px rgba(30, 35, 40, 0.10)',
                    background: 'var(--color-subtle)',
                  }}
                >
                  <span
                    className="font-mono text-[9px] font-bold uppercase tracking-widest"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    {current.label}
                  </span>
                  <span
                    className="mt-0.5 text-[14px] font-bold"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    {current.metric} - {current.metricLabel}
                  </span>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
