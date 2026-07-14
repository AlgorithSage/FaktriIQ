import { useState } from 'react';
import {
  ShieldCheck,
  MessageSquareText,
  FileSearch,
  ScanSearch,
  CircleAlert,
  BadgeCheck,
  Layers,
  WifiOff,
  Sparkles,
  Quote,
  Cpu,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/* Accent → palette CSS variables (kept as vars so light/pastel theming stays central). */
const ACCENTS = {
  sky: { soft: 'var(--sky-soft)', mid: 'var(--sky)' },
  cyan: { soft: 'var(--cyan-soft)', mid: 'var(--cyan)' },
  peach: { soft: 'var(--peach-soft)', mid: 'var(--peach)' },
};

const AGENTS = [
  {
    id: 'compliance-agent',
    name: 'Compliance Agent',
    tagline: 'For Safety & EHS Officers',
    icon: ShieldCheck,
    accent: 'sky',
    summary:
      'Audits every plant SOP against Indian statutory frameworks — Factories Act 1948, OISD, and PESO — mapping each requirement clause-by-clause and flagging the gaps before an inspector does.',
    capabilities: [
      {
        icon: ScanSearch,
        title: 'Automatic clause mapping',
        text: 'Matches each SOP passage to the exact Factories Act / OISD / PESO clause it satisfies — or flags where none does.',
      },
      {
        icon: CircleAlert,
        title: 'Gap detection',
        text: 'Every clause is marked compliant or gap, with a plain-language explanation of what is missing.',
      },
      {
        icon: BadgeCheck,
        title: 'Traceable citations',
        text: 'Each verdict links back to the source document, page, and clause number — no unsourced claims.',
      },
      {
        icon: Layers,
        title: 'Cached audit reports',
        text: 'High-fidelity cloud audits are cached locally so officers can review results during an outage.',
      },
    ],
    engines: ['Agno + Groq LPU', 'openai/gpt-oss-120b', 'LiteRT.js + WebGPU · local'],
    example: {
      q: 'Does SOP-114 meet the hot-work permit requirement?',
      a: 'Gap found. SOP-114 covers hot-work isolation but never sets a permit validity window. OISD-STD-105 §4.3.1 requires re-validation every 8 hours.',
      cite: 'OISD-STD-105 · §4.3.1',
      status: 'gap',
    },
    stats: [
      { value: '95%', label: 'less gap-ID time' },
      { value: '3', label: 'frameworks mapped' },
      { value: '0%', label: 'ungrounded claims' },
    ],
  },
  {
    id: 'knowledge-copilot',
    name: 'Knowledge Copilot',
    tagline: 'For Field Technicians',
    icon: MessageSquareText,
    accent: 'cyan',
    summary:
      'Answers plain-language questions about plant procedures on the shop floor — fully offline, on-device, with a citation on every answer and an honest “I don’t know” instead of a guess.',
    capabilities: [
      {
        icon: WifiOff,
        title: '100% offline',
        text: 'Runs on the device GPU via llama.cpp + Vulkan — no Wi-Fi, no cellular, nothing leaves the handset.',
      },
      {
        icon: Sparkles,
        title: 'Multimodal input',
        text: 'Reads text, photos of equipment, and audio notes to answer hazard-log questions in the field.',
      },
      {
        icon: Quote,
        title: 'Cited answers',
        text: 'Every response shows the source document and section, plus a High / Medium / Low confidence signal.',
      },
      {
        icon: FileSearch,
        title: 'Snippet fallback',
        text: 'On low confidence it surfaces the raw SOP passage so the technician always sees the ground truth.',
      },
    ],
    engines: ['llama.cpp + Vulkan', 'Gemma 4 E2B · GGUF', 'On-device · private'],
    example: {
      q: 'What PPE do I need to enter Pump House 2?',
      a: 'Flame-resistant coveralls, a hard hat, and an H₂S-rated respirator are required. See the site-entry procedure, section 3.',
      cite: 'Manual PH2-Entry · §3',
      status: 'ok',
    },
    stats: [
      { value: '< 3s', label: 'avg. answer time' },
      { value: '100%', label: 'offline capable' },
      { value: '< 1.5GB', label: 'on-device model' },
    ],
  },
  {
    id: 'ingestion-agent',
    name: 'Ingestion Agent',
    tagline: 'For EHS Admins',
    icon: FileSearch,
    accent: 'peach',
    summary:
      'Turns raw manuals and PDFs into clean, grounded knowledge — extracting dates, equipment tags, and clause references, then pre-computing compliance audits while the plant is online.',
    capabilities: [
      {
        icon: ScanSearch,
        title: 'Metadata extraction',
        text: 'Auto-tags upload date, equipment IDs, and matched regulatory references on ingest.',
      },
      {
        icon: Layers,
        title: 'Structured grounding',
        text: 'Converts documents into logical JSON slots so even small local models answer with large-model accuracy.',
      },
      {
        icon: Cpu,
        title: 'Pre-computed audits',
        text: 'While online, the Groq GPT-OSS 120B agent audits new SOPs and caches the report for offline use.',
      },
      {
        icon: BadgeCheck,
        title: 'Consent-gated cloud',
        text: 'Any cloud-assisted audit is clearly labelled and requires explicit officer opt-in before upload.',
      },
    ],
    engines: ['Structured JSON pipeline', 'chromadb + embeddings', 'Groq pre-compute'],
    example: {
      q: 'Ingested: Boiler-Maintenance-Manual-v4.pdf',
      a: 'Tagged 12 equipment IDs, 3 revision dates, and 18 clause references. 2 gaps pre-flagged and cached for offline review.',
      cite: '18 clauses · 2 gaps',
      status: 'ok',
    },
    stats: [
      { value: '18', label: 'clauses matched' },
      { value: '~80%', label: 'of 70B accuracy, local' },
      { value: 'PDF', label: 'text & scanned' },
    ],
  },
];

function StatusChip({ status, cite }) {
  const isGap = status === 'gap';
  const color = isGap ? 'var(--color-flag)' : 'var(--color-verify)';
  return (
    <span
      className="inline-flex items-center gap-2 rounded-md border px-2.5 py-1 font-mono text-[11.5px]"
      style={{
        color,
        borderColor: isGap ? 'rgba(224,72,61,0.38)' : 'rgba(47,163,107,0.35)',
        background: isGap ? 'rgba(224,72,61,0.08)' : 'rgba(47,163,107,0.1)',
      }}
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: color }} />
      {isGap ? 'GAP' : 'OK'} · {cite}
    </span>
  );
}

export default function AgentsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const agent = AGENTS[activeIdx];
  const accent = ACCENTS[agent.accent];
  const PanelIcon = agent.icon;

  return (
    <section id="agents" className="section section--subtle">
      <div className="container">
        <div className="mb-12 max-w-[660px] md:mb-16">
          <p className="overline">The Agents</p>
          <h2 className="section-heading">Purpose-built agents, one grounded brain</h2>
          <p className="section-subheading">
            Every FaktriIQ answer is produced by a dedicated agent — grounded in your own
            documents, cited to the clause, and deployed exactly where the work happens,
            from an offline phone on the floor to an EHS desk preparing for audit.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-8">
          {/* Agent selector */}
          <div className="flex flex-col gap-3">
            {AGENTS.map((item, idx) => {
              const isActive = idx === activeIdx;
              const TabIcon = item.icon;
              const tabAccent = ACCENTS[item.accent];
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  aria-pressed={isActive}
                  className={cn(
                    'group flex items-center gap-4 rounded-[10px] border bg-white p-4 text-left transition-all duration-200',
                    isActive ? 'shadow-[var(--shadow-gold)]' : 'hover:-translate-y-0.5'
                  )}
                  style={{ borderColor: isActive ? tabAccent.mid : 'var(--color-border)' }}
                >
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] border"
                    style={{ background: tabAccent.soft, borderColor: tabAccent.mid }}
                  >
                    <TabIcon className="h-6 w-6" strokeWidth={1.6} style={{ color: 'var(--color-ink)' }} />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="text-[15px] font-bold" style={{ color: 'var(--color-ink)' }}>
                      {item.name}
                    </span>
                    <span className="text-[13px]" style={{ color: 'var(--color-muted)' }}>
                      {item.tagline}
                    </span>
                  </span>
                  <ArrowRight
                    className={cn(
                      'ml-auto h-4 w-4 shrink-0 transition-all duration-200',
                      isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                    )}
                    style={{ color: 'var(--color-ink)' }}
                  />
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <article
            key={agent.id}
            className="animate-in fade-in-0 slide-in-from-bottom-2 rounded-[10px] border bg-white p-6 duration-300 md:p-8"
            style={{ borderColor: 'var(--color-border)', boxShadow: 'var(--shadow)' }}
          >
            <div className="flex items-start gap-4">
              <span
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[12px] border"
                style={{ background: accent.soft, borderColor: accent.mid }}
              >
                <PanelIcon className="h-7 w-7" strokeWidth={1.6} style={{ color: 'var(--color-ink)' }} />
              </span>
              <div>
                <h3 className="text-[22px] font-bold leading-tight" style={{ color: 'var(--color-ink)' }}>
                  {agent.name}
                </h3>
                <p
                  className="mt-1 font-mono text-[12px] font-bold uppercase tracking-[0.12em]"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {agent.tagline}
                </p>
              </div>
            </div>

            <p className="mt-5 text-[16px] leading-relaxed" style={{ color: 'var(--color-slate)' }}>
              {agent.summary}
            </p>

            {/* Capabilities */}
            <div className="mt-7 grid gap-x-6 gap-y-5 sm:grid-cols-2">
              {agent.capabilities.map((cap) => {
                const CapIcon = cap.icon;
                return (
                  <div key={cap.title} className="flex gap-3">
                    <span
                      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px]"
                      style={{ background: accent.soft }}
                    >
                      <CapIcon className="h-[18px] w-[18px]" strokeWidth={1.7} style={{ color: 'var(--color-ink)' }} />
                    </span>
                    <div>
                      <p className="text-[14.5px] font-bold" style={{ color: 'var(--color-ink)' }}>
                        {cap.title}
                      </p>
                      <p className="mt-0.5 text-[13.5px] leading-snug" style={{ color: 'var(--color-muted)' }}>
                        {cap.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Example interaction */}
            <div
              className="mt-7 rounded-[10px] border p-4"
              style={{ borderColor: 'var(--color-border)', background: 'var(--color-subtle)' }}
            >
              <div className="flex justify-end">
                <p
                  className="max-w-[80%] rounded-[10px] rounded-br-sm px-3.5 py-2 text-[13.5px] font-medium"
                  style={{ background: accent.soft, color: 'var(--color-ink)' }}
                >
                  {agent.example.q}
                </p>
              </div>
              <div className="mt-3 flex flex-col items-start gap-2">
                <p
                  className="max-w-[88%] rounded-[10px] rounded-bl-sm border bg-white px-3.5 py-2 text-[13.5px] leading-snug"
                  style={{ borderColor: 'var(--color-border)', color: 'var(--color-slate)' }}
                >
                  {agent.example.a}
                </p>
                <StatusChip status={agent.example.status} cite={agent.example.cite} />
              </div>
            </div>

            {/* Engines + stats */}
            <div className="mt-7 flex flex-col gap-6 border-t pt-6 lg:flex-row lg:items-center lg:justify-between" style={{ borderColor: 'var(--color-border)' }}>
              <div>
                <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: 'var(--color-muted)' }}>
                  Runs on
                </p>
                <div className="flex flex-wrap gap-2">
                  {agent.engines.map((engine) => (
                    <code
                      key={engine}
                      className="rounded-md border px-2.5 py-1 text-[12px]"
                      style={{ borderColor: 'var(--sky)', background: 'var(--sky-soft)', color: 'var(--color-slate)' }}
                    >
                      {engine}
                    </code>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {agent.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[10px] border px-3 py-2.5 text-center"
                    style={{
                      borderColor: 'var(--peach)',
                      background: 'linear-gradient(160deg, var(--lemon-soft) 0%, var(--peach-soft) 100%)',
                    }}
                  >
                    <p className="font-mono text-[17px] font-bold leading-none" style={{ color: 'var(--color-ink)' }}>
                      {stat.value}
                    </p>
                    <p className="mt-1.5 text-[11px] leading-tight" style={{ color: 'var(--color-muted)' }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
