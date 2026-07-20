import { useState } from 'react';
import { motion } from 'motion/react';
import ScrollReveal from './ui/ScrollReveal.jsx';
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
  Send,
  Network,
  Wrench,
  History,
} from 'lucide-react';

/* Accent → palette CSS variables (kept as vars so light/pastel theming stays central). */
const ACCENTS = {
  sky: { soft: 'var(--sky-soft)', mid: 'var(--sky)' },
  cyan: { soft: 'var(--cyan-soft)', mid: 'var(--cyan)' },
  peach: { soft: 'var(--peach-soft)', mid: 'var(--peach)' },
  orange: { soft: 'var(--orange-soft)', mid: 'var(--orange)' },
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
      'Answers plain-language questions about plant procedures on the shop floor - running via cloud APIs when online, with cached lookup and local RAG search when offline.',
    capabilities: [
      {
        icon: WifiOff,
        title: 'Hybrid online & offline',
        text: 'Uses fast cloud APIs when connected, falling back to on-device local RAG and cached query lookup when offline.',
      },
      {
        icon: Cpu,
        title: 'On-device AI model',
        text: 'Optionally downloads and runs the 2.49 GB Phi-4 Mini (3.8B GGUF) model directly on-device for local offline synthesis.',
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
    engines: ['Phi-4 Mini 3.8B · GGUF', 'BM25/TF-IDF Statutory RAG', 'On-device · private'],
    example: {
      q: 'What PPE do I need to enter Pump House 2?',
      a: 'Flame-resistant coveralls, a hard hat, and an H₂S-rated respirator are required. See the site-entry procedure, section 3.',
      cite: 'Manual PH2-Entry · §3',
      status: 'ok',
    },
    stats: [
      { value: '< 3s', label: 'avg. answer time' },
      { value: 'Hybrid', label: 'online + offline' },
      { value: '2.49 GB', label: 'on-device model' },
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
  {
    id: 'knowledge-graph',
    name: 'Knowledge Graph Agent',
    tagline: 'For Operations & Eng.',
    icon: Network,
    accent: 'sky',
    isRoadmap: true,
    summary:
      'Compiles a live semantic model linking plant equipment tags, statutory regulations, and procedure documents - updating relationships automatically as new manuals are uploaded.',
    capabilities: [
      {
        icon: ScanSearch,
        title: 'Relationship Discovery',
        text: 'Interlinks equipment tags (e.g., PV-202) across maintenance manuals, OISD standards, and P&ID drawings.',
      },
      {
        icon: Layers,
        title: 'Multi-Document Graph',
        text: 'Maintains an active topology of equipment dependencies, compliance paths, and operational history.',
      },
    ],
    engines: ['Neo4j Graph Database', 'gRPC / GraphQL API', 'Scheduled Graph Updates'],
    roadmapInfo: {
      phase: 'Phase 2: Graph Intelligence',
      status: 'In Design',
      timeline: 'Q3 2026',
      description: 'The Knowledge Graph Agent connects disconnected data silos (drawings, SOPs, work orders) into a unified relational brain.'
    },
    stats: [
      { value: '10k+', label: 'nodes mapped' },
      { value: '< 1s', label: 'graph queries' },
      { value: 'Auto', label: 'drawing parser' },
    ],
  },
  {
    id: 'maintenance-rca',
    name: 'Maintenance & RCA Agent',
    tagline: 'For Maintenance Teams',
    icon: Wrench,
    accent: 'peach',
    isRoadmap: true,
    summary:
      'Fuses work orders, OEM equipment manuals, failure history, and regulatory guidelines to auto-generate root-cause analyses and predictive schedules.',
    capabilities: [
      {
        icon: Cpu,
        title: 'Predictive Scheduling',
        text: 'Analyzes operating hours and safety logs to recommend optimal windows for valve and seal replacements.',
      },
      {
        icon: CircleAlert,
        title: 'Incident RCA Generator',
        text: 'Traces failure sequences against design specs and historical logs to output ready-to-review incident reports.',
      },
    ],
    engines: ['Failure Mode AI (FMEA)', 'Work-order RAG pipeline', 'RCA Auto-generation'],
    roadmapInfo: {
      phase: 'Phase 3: Predictive Operations',
      status: 'Planned',
      timeline: 'Q4 2026',
      description: 'Empowers field teams to preempt equipment failures and comply with Factories Act inspection schedules automatically.'
    },
    stats: [
      { value: '30%', label: 'downtime drop' },
      { value: 'FMEA', label: 'compliant' },
      { value: 'OEMs', label: 'fully parsed' },
    ],
  },
  {
    id: 'lessons-learned',
    name: 'Lessons Learned Agent',
    tagline: 'For Safety Directors',
    icon: History,
    accent: 'orange',
    isRoadmap: true,
    summary:
      'Unifies past incident reports, audits, and external safety databases to preemptively push safety alerts to technicians before high-risk tasks.',
    capabilities: [
      {
        icon: Sparkles,
        title: 'Proactive Alert Push',
        text: 'Pushes historical hazard warnings directly to a field operator when they initiate a tank-cleaning or hot-work query.',
      },
      {
        icon: Quote,
        title: 'Cross-Plant Auditing',
        text: 'Compares safety deviations across different plant units to flag systemic operational risks.',
      },
    ],
    engines: ['Historical incident LLM', 'Vector similarity search', 'Context matching'],
    roadmapInfo: {
      phase: 'Phase 3: Operational Safety',
      status: 'Planned',
      timeline: 'Q1 2027',
      description: 'Integrates past organizational lessons directly into the daily workflow of the shop floor.'
    },
    stats: [
      { value: 'Proactive', label: 'alert engine' },
      { value: '0', label: 'forgotten lessons' },
      { value: 'SIM', label: 'incident-matched' },
    ],
  },
];

function StatusChip({ status, cite }) {
  const isGap = status === 'gap';
  const color = isGap ? 'var(--color-flag)' : 'var(--color-verify)';
  return (
    <span className="agents__chat-status" style={{ color }}>
      <span className="agents__chat-status-dot" style={{ background: color }} />
      <span>
        {isGap ? 'GAP' : 'OK'}
        <span className="agents__chat-status-cite"> · {cite}</span>
      </span>
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
        <ScrollReveal preset="fadeUp" className="agents__header">
          <p className="overline">The Agents</p>
          <h2 className="section-heading">
            Purpose-built agents, one grounded brain
          </h2>
          <p className="section-subheading">
            Every FaktriIQ answer is produced by a dedicated agent - grounded in
            your own documents, cited to the clause, and deployed exactly where
            the work happens, from a hybrid-mode phone on the floor to an EHS desk
            preparing for audit.
          </p>
        </ScrollReveal>

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
                  <span className="agents__tab-name" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {item.name}
                    {item.isRoadmap && (
                      <span style={{
                        fontSize: '8px',
                        fontWeight: '800',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        background: isActive ? 'var(--color-slate)' : 'var(--color-surface)',
                        color: isActive ? '#FFFFFF' : 'var(--color-accent-dark)',
                        padding: '1px 5px',
                        borderRadius: '4px',
                        border: '1px solid var(--color-border)'
                      }}>
                        Roadmap
                      </span>
                    )}
                  </span>
                  <span className="agents__tab-tagline">{item.tagline}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Zone 3: Full-width 3-column detail panel ── */}
        <ScrollReveal preset="scaleUp" delay={0.2} className="agents__panel">
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            className="agents__panel-inner"
          >
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
              {/* Chat window (mobile mockup) or Roadmap integration card */}
              {agent.isRoadmap ? (
                <div style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  background: 'var(--color-surface)',
                  border: '1.5px solid var(--color-border)',
                  borderRadius: '20px',
                  padding: '24px',
                  boxShadow: 'var(--shadow-soft)',
                  minHeight: '280px',
                  margin: '8px 0'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <span style={{
                      fontSize: '9px',
                      fontWeight: '800',
                      color: 'var(--color-accent-dark)',
                      background: 'var(--color-subtle-light)',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      border: '1px solid var(--color-border)',
                      fontFamily: 'var(--font-mono)'
                    }}>
                      {agent.roadmapInfo.phase}
                    </span>
                    <span style={{
                      fontSize: '10px',
                      fontWeight: '700',
                      color: 'var(--color-muted)',
                      fontFamily: 'var(--font-mono)'
                    }}>
                      {agent.roadmapInfo.timeline}
                    </span>
                  </div>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: 'var(--color-ink)',
                    marginBottom: '8px'
                  }}>
                    {agent.name} Integration
                  </h4>
                  <p style={{
                    fontSize: '12px',
                    lineHeight: '1.6',
                    color: 'var(--color-muted)',
                    marginBottom: '16px'
                  }}>
                    {agent.roadmapInfo.description}
                  </p>
                  <div style={{
                    background: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <span style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--color-warn)',
                      flexShrink: 0
                    }} />
                    <span style={{
                      fontSize: '10px',
                      fontWeight: '700',
                      color: 'var(--color-ink)',
                      fontFamily: 'var(--font-mono)'
                    }}>
                      Status: {agent.roadmapInfo.status}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="agents__phone" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 0' }}>
                  <div className="agents__phone-frame" style={{ width: '100%', maxWidth: '258px', borderRadius: '30px', border: '1px solid var(--color-slate)', background: 'var(--color-slate)', padding: '6px', boxShadow: 'var(--shadow-soft)' }}>
                    <div className="agents__phone-screen" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: '25px', background: 'var(--color-subtle)' }}>
                      <div className="agents__phone-statusbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px 8px' }}>
                        <span className="agents__phone-time" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-muted)' }}>9:41</span>
                        <span className="agents__phone-agent" style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--color-ink)' }}>
                          <span
                            className="agents__phone-dot"
                            style={{ width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0, background: accent.mid }}
                          />
                          {agent.name}
                        </span>
                      </div>
                      <div className="agents__phone-body" style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '4px 14px 12px' }}>
                        <div
                          className="agents__chat-q"
                          style={{ alignSelf: 'flex-end', maxWidth: '85%', padding: '10px 14px', borderRadius: '12px 12px 4px 12px', fontSize: '12.5px', fontWeight: 500, lineHeight: 1.45, color: 'var(--color-ink)', background: accent.soft }}
                        >
                          {agent.example.q}
                        </div>
                        <div className="agents__chat-a" style={{ alignSelf: 'flex-start', maxWidth: '92%', padding: '10px 14px', borderRadius: '12px 12px 12px 4px', background: 'var(--color-surface)', boxShadow: '0 1px 3px rgba(30, 35, 40, 0.06)', fontSize: '12.5px', lineHeight: 1.5, color: 'var(--color-slate)' }}>{agent.example.a}</div>
                        <StatusChip
                          status={agent.example.status}
                          cite={agent.example.cite}
                        />
                      </div>
                      <div className="agents__phone-inputbar" style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 14px 14px', padding: '7px 7px 7px 14px', borderRadius: '9999px', background: 'var(--color-surface)', boxShadow: '0 1px 3px rgba(30, 35, 40, 0.06)' }}>
                        <span className="agents__phone-input-text" style={{ fontSize: '11px', color: 'var(--color-muted)' }}>
                          Ask about a procedure…
                        </span>
                        <span
                          className="agents__phone-send"
                          style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '26px', height: '26px', borderRadius: '50%', flexShrink: 0, background: accent.mid }}
                        >
                          <Send
                            size={13}
                            strokeWidth={2}
                            style={{ color: 'var(--color-ink)' }}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

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
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
