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
} from 'lucide-react';

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
      'Audits every plant SOP against Indian statutory frameworks - Factories Act 1948, OISD, and PESO - mapping each requirement clause-by-clause and flagging the gaps before an inspector does.',
    capabilities: [
      {
        icon: ScanSearch,
        title: 'Automatic clause mapping',
        text: 'Matches each SOP passage to the exact Factories Act / OISD / PESO clause it satisfies - or flags where none does.',
      },
      {
        icon: CircleAlert,
        title: 'Gap detection',
        text: 'Every clause is marked compliant or gap, with a plain-language explanation of what is missing.',
      },
      {
        icon: BadgeCheck,
        title: 'Traceable citations',
        text: 'Each verdict links back to the source document, page, and clause number - no unsourced claims.',
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
      'Answers plain-language questions about plant procedures on the shop floor - fully offline, on-device, with a citation on every answer and an honest "I don\'t know" instead of a guess.',
    capabilities: [
      {
        icon: WifiOff,
        title: '100% offline',
        text: 'Runs on the device GPU via llama.cpp + Vulkan - no Wi-Fi, no cellular, nothing leaves the handset.',
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
      'Turns raw manuals and PDFs into clean, grounded knowledge - extracting dates, equipment tags, and clause references, then pre-computing compliance audits while the plant is online.',
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
      className="agents__chat-status"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        borderRadius: '6px',
        border: `1px solid ${isGap ? 'rgba(224,72,61,0.38)' : 'rgba(47,163,107,0.35)'}`,
        background: isGap ? 'rgba(224,72,61,0.08)' : 'rgba(47,163,107,0.1)',
        padding: '4px 10px',
        fontFamily: 'var(--font-mono)',
        fontSize: '11.5px',
        color,
      }}
    >
      <span
        style={{
          display: 'inline-block',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: color,
        }}
      />
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
        {/* ── Zone 1: Centred header ── */}
        <div className="agents__header">
          <p className="overline">The Agents</p>
          <h2 className="section-heading">
            Purpose-built agents, one grounded brain
          </h2>
          <p className="section-subheading">
            Every FaktriIQ answer is produced by a dedicated agent - grounded in
            your own documents, cited to the clause, and deployed exactly where
            the work happens, from an offline phone on the floor to an EHS desk
            preparing for audit.
          </p>
        </div>

        {/* ── Zone 2: Horizontal tab strip ── */}
        <div className="agents__tabs">
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
                className={`agents__tab${isActive ? ' agents__tab--active' : ''}`}
                style={{
                  borderColor: isActive ? 'var(--color-ink)' : 'var(--color-border)',
                  background: isActive ? 'var(--color-ink)' : undefined,
                }}
              >
                <span
                  className="agents__tab-icon"
                  style={{
                    background: tabAccent.soft,
                    borderColor: 'var(--color-border)',
                  }}
                >
                  <TabIcon
                    size={22}
                    strokeWidth={1.6}
                    style={{ color: 'var(--color-ink)' }}
                  />
                </span>
                <span className="agents__tab-text">
                  <span className="agents__tab-name">{item.name}</span>
                  <span className="agents__tab-tagline">{item.tagline}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Zone 3: Full-width 3-column detail panel ── */}
        <div className="agents__panel" key={agent.id}>
          {/* Left: Profile */}
          <div className="agents__profile">
            <span
              className="agents__profile-icon"
              style={{ background: accent.soft, borderColor: 'var(--color-border)' }}
            >
              <PanelIcon
                size={30}
                strokeWidth={1.6}
                style={{ color: 'var(--color-ink)' }}
              />
            </span>
            <h3 className="agents__profile-name">{agent.name}</h3>
            <p className="agents__profile-tagline">{agent.tagline}</p>
            <p className="agents__profile-summary">{agent.summary}</p>

            <div className="agents__engines">
              <p className="agents__engines-label">Runs on</p>
              <div className="agents__engines-list">
                {agent.engines.map((engine) => (
                  <code key={engine} className="agents__engine-badge">
                    {engine}
                  </code>
                ))}
              </div>
            </div>
          </div>

          {/* Centre: Capabilities 2×2 */}
          <div className="agents__capabilities">
            {agent.capabilities.map((cap) => {
              const CapIcon = cap.icon;
              return (
                <div
                  key={cap.title}
                  className="agents__cap-card"
                  style={{ '--cap-accent': accent.mid }}
                >
                  <span
                    className="agents__cap-icon"
                    style={{ background: accent.soft }}
                  >
                    <CapIcon
                      size={18}
                      strokeWidth={1.7}
                      style={{ color: 'var(--color-ink)' }}
                    />
                  </span>
                  <div>
                    <p className="agents__cap-title">{cap.title}</p>
                    <p className="agents__cap-text">{cap.text}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Demo + Stats */}
          <div className="agents__demo">
            {/* Chat window */}
            <div className="agents__chat">
              <div className="agents__chat-titlebar">
                <div className="agents__chat-dots">
                  <span className="agents__chat-dot" />
                  <span className="agents__chat-dot" />
                  <span className="agents__chat-dot" />
                </div>
                <span className="agents__chat-title">{agent.name}</span>
              </div>
              <div className="agents__chat-body">
                <div
                  className="agents__chat-q"
                  style={{ background: accent.soft }}
                >
                  {agent.example.q}
                </div>
                <div className="agents__chat-a">{agent.example.a}</div>
                <StatusChip
                  status={agent.example.status}
                  cite={agent.example.cite}
                />
              </div>
            </div>

            {/* Stats row */}
            <div className="agents__stats">
              {agent.stats.map((stat) => (
                <div key={stat.label} className="agents__stat">
                  <p className="agents__stat-value">{stat.value}</p>
                  <p className="agents__stat-label">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
