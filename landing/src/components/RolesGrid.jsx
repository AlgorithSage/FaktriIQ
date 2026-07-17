import { useState } from 'react';
import { ShieldCheck, Smartphone, Gauge, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import ScrollReveal from './ui/ScrollReveal.jsx';

const ACCENTS = {
  sky: {
    tile: 'linear-gradient(135deg, var(--sky) 0%, var(--cyan) 100%)',
    soft: 'var(--sky-soft)',
    mid: 'var(--sky)',
    glow: 'rgba(169, 216, 255, 0.4)',
  },
  cyan: {
    tile: 'linear-gradient(135deg, var(--cyan) 0%, var(--sky) 100%)',
    soft: 'var(--cyan-soft)',
    mid: 'var(--cyan)',
    glow: 'rgba(119, 230, 224, 0.35)',
  },
  peach: {
    tile: 'linear-gradient(135deg, var(--sky) 0%, var(--cyan) 100%)',
    soft: 'var(--cyan-soft)',
    mid: 'var(--sky)',
    glow: 'rgba(169, 216, 255, 0.4)',
  },
  lemon: {
    tile: 'linear-gradient(135deg, var(--sky) 0%, var(--cyan) 100%)',
    soft: 'var(--sky-soft)',
    mid: 'var(--sky)',
    glow: 'rgba(169, 216, 255, 0.4)',
  },
};

const ROLES = [
  {
    icon: ShieldCheck,
    accent: 'sky',
    title: 'Safety Officers',
    deployment: 'Web console',
    description:
      'Audit SOPs against statutory standards online via Groq API + GPT-OSS 120B, with cached results that keep audits running offline through LiteRT.js + WebGPU.',
    checklist: [
      'Cloud audits via Groq API utilizing GPT-OSS 120B',
      'Cloud audits cached locally for offline parity',
      'On-device LiteRT.js fallback clause matching',
      'Visual gap triage with statutory citations',
      'Pre-computed snapshots sync on reconnect',
      'One-tap export EHS report cards',
    ],
    metric: '95%',
    metricLabel: 'Reduction in gap-audit time',
  },
  {
    icon: Smartphone,
    accent: 'cyan',
    title: 'Field Technicians',
    deployment: 'Mobile · Hybrid Online + Offline',
    description:
      'Get instant, cited answers from plant manuals and SOPs on the floor - powered by cloud APIs with on-device offline fallback.',
    checklist: [
      'Hybrid online API + offline Vulkan inference',
      'Thumb-reachable EHS console interface',
      'Original source text snippet fallbacks',
      'Voice-to-text hybrid search query mode',
      'Local encrypted storage for plant logs',
    ],
    metric: '< 3s',
    metricLabel: 'Floor response latency',
  },
  {
    icon: Gauge,
    accent: 'peach',
    title: 'Plant Managers',
    deployment: 'Live dashboard',
    description:
      'Unify institutional knowledge, surface EHS hazards early, and keep every site ready for its next audit.',
    checklist: [
      'Multi-site hazard monitoring feed',
      'Pre-computed gap alerts & notifications',
      'Clustered plant performance index',
      'Real-time worker compliance heatmaps',
      'Trend analytics for safety inspections',
    ],
    metric: '0%',
    metricLabel: 'Ungrounded claims guaranteed',
  },
  {
    icon: Lock,
    accent: 'lemon',
    title: 'IT & EHS Security',
    deployment: 'On-prem · private',
    description:
      'Protect data sovereignty by running 100% private, on-device models with zero external server dependencies.',
    checklist: [
      'Local vector store (ChromaDB + SQLite)',
      'Consent-gated cloud audit features',
      'No data leaves plant perimeter',
      'Role-based access token controls (RBAC)',
      'Cryptographically signed audit trail logs',
    ],
    metric: '100%',
    metricLabel: 'Private data sovereignty',
  },
];

export default function RolesGrid() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeRole = ROLES[activeIdx];
  const accent = ACCENTS[activeRole.accent];
  const ActiveIcon = activeRole.icon;

  return (
    <section className="section section--subtle section--bordered" id="resources" style={{ overflow: 'hidden' }}>
      <div className="container">
        
        {/* Section Header */}
        <ScrollReveal preset="fadeUp" className="mx-auto mb-14 max-w-[720px] text-center">
          <p className="overline" style={{ display: 'inline-block' }}>
            Roles &amp; Deployments
          </p>
          <h2 className="section-heading">Built for everyone on the plant</h2>
          <p className="section-subheading" style={{ marginInline: 'auto' }}>
            From the shop floor to the server room, every role gets the same grounded, cited
            intelligence - shaped to exactly how, and where, they work.
          </p>
        </ScrollReveal>

        {/* Interactive Showcase Layout */}
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8 lg:items-stretch">
          
          {/* Left Side: Vertical list of roles */}
          <ScrollReveal
            preset="fadeLeft"
            delay={0.1}
            className="flex flex-col gap-3 border p-5 lg:p-6"
            style={{
              borderRadius: '2rem',
              background: 'var(--color-white)',
              borderColor: 'var(--color-border)',
              boxShadow: 'var(--shadow-soft)',
            }}
          >
            {ROLES.map((role, idx) => {
              const Icon = role.icon;
              const isSelected = idx === activeIdx;
              const roleAccent = ACCENTS[role.accent];

              return (
                <button
                  key={role.title}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className="group relative w-full flex-1 text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)]"
                  style={{ transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column' }}
                >
                  <div
                    className="overflow-hidden border transition-all duration-300 flex-1 flex flex-col"
                    style={{
                      borderRadius: '1rem',
                      borderColor: isSelected ? 'var(--color-border)' : 'rgba(59, 63, 70, 0.10)',
                      background: isSelected ? 'var(--color-subtle)' : 'var(--color-surface)',
                      boxShadow: isSelected
                        ? '0 4px 16px rgba(30, 35, 40, 0.07)'
                        : 'none',
                    }}
                  >
                    <div className="flex items-center gap-4 px-5 py-4 flex-1">
                      {/* Icon */}
                      <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center transition-transform duration-300"
                        style={{
                          borderRadius: '0.75rem',
                          background: isSelected ? '#FFFFFF' : roleAccent.soft,
                          border: `1px solid ${isSelected ? 'var(--color-border)' : 'transparent'}`,
                        }}
                      >
                        <Icon className="h-5 w-5" strokeWidth={1.8} style={{ color: 'var(--color-ink)' }} />
                      </span>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <span
                          className="font-mono text-[9px] font-bold uppercase tracking-wider"
                          style={{
                            color: 'var(--color-muted)',
                            opacity: isSelected ? 0.9 : 0.6,
                          }}
                        >
                          {role.deployment}
                        </span>
                        <h3 className="text-[15px] font-bold leading-tight text-[var(--color-ink)] mt-0.5">
                          {role.title}
                        </h3>
                        <p
                          className="text-[12px] leading-snug mt-1"
                          style={{
                            color: 'var(--color-muted)',
                            opacity: isSelected ? 0.8 : 0.5,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {role.description}
                        </p>
                      </div>

                      {/* Indicator arrow */}
                      <ArrowRight
                        className="h-4 w-4 shrink-0 transition-all duration-300"
                        style={{
                          color: 'var(--color-ink)',
                          opacity: isSelected ? 1 : 0.25,
                          transform: isSelected ? 'translateX(0)' : 'translateX(-4px)',
                        }}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </ScrollReveal>

          {/* Right Side: Active role details card */}
          <ScrollReveal
            preset="scaleUp"
            delay={0.15}
            className="flex flex-col border p-6 lg:p-10"
            style={{
              borderRadius: '2rem',
              background: 'var(--color-white)',
              borderColor: 'var(--color-border)',
              boxShadow: 'var(--shadow-soft)',
            }}
          >
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
              className="flex flex-col flex-1"
            >
              {/* Header info */}
              <div className="flex flex-wrap items-start justify-between gap-4 border-b pb-6" style={{ borderColor: 'rgba(30, 35, 40, 0.08)' }}>
                <div className="flex items-center gap-4">
                  <span
                    className="flex h-[52px] w-[52px] items-center justify-center rounded-[14px] shadow-sm"
                    style={{ background: accent.tile }}
                  >
                    <ActiveIcon className="h-6 w-6" strokeWidth={1.7} style={{ color: 'var(--color-ink)' }} />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold leading-tight" style={{ color: 'var(--color-ink)' }}>
                      {activeRole.title}
                    </h3>
                    <span
                      className="mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.08em]"
                      style={{ background: accent.soft, color: 'var(--color-slate)' }}
                    >
                      {activeRole.deployment}
                    </span>
                  </div>
                </div>

                {/* Digital metric badge */}
                <div className="flex flex-col text-right">
                  <span className="font-mono text-xl font-extrabold" style={{ color: 'var(--orange)' }}>
                    {activeRole.metric}
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: 'var(--color-muted)' }}>
                    {activeRole.metricLabel}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="mt-6 text-[15px] leading-relaxed" style={{ color: 'var(--color-slate)' }}>
                {activeRole.description}
              </p>

              {/* Checklist */}
              <div className="mt-6">
                <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--color-muted)' }}>
                  Compliance &amp; Execution Parity
                </h4>
                <ul className="flex flex-col gap-3">
                  {activeRole.checklist.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-[14.5px] leading-relaxed" style={{ color: 'var(--color-ink)' }}>
                      <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" strokeWidth={1.8} style={{ color: 'var(--color-verify)' }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Call to action */}
              <a
                href="#book-a-demo"
                className="mt-auto pt-8 flex w-full items-center justify-center gap-2 border-t text-[12px] font-bold uppercase tracking-widest transition-colors hover:text-[var(--orange)]"
                style={{ borderColor: 'rgba(30, 35, 40, 0.08)', color: 'var(--color-ink)' }}
              >
                Configure Deployment
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </a>
            </motion.div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
