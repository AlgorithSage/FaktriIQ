import {
  Smartphone,
  Monitor,
  WifiOff,
  Fingerprint,
  BadgeCheck,
  FileSearch,
  LayoutPanelLeft,
  ScanSearch,
  CircleAlert,
  Download,
  Send,
} from 'lucide-react';

/* ------------------------------------------------------------------
   Two operating modes - the two surfaces the role-selection gateway
   splits into: the Field Technician's on-device mobile copilot and the
   Safety Officer's two-pane web compliance console.
------------------------------------------------------------------ */

function Check({ children, icon: Icon, soft }) {
  return (
    <li className="flex items-start gap-3.5">
      <span
        className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px]"
        style={{ background: soft }}
      >
        <Icon className="h-[15px] w-[15px]" strokeWidth={1.8} style={{ color: 'var(--color-ink)' }} />
      </span>
      <span className="text-[14.5px] leading-relaxed pt-0.5" style={{ color: 'var(--color-slate)' }}>
        {children}
      </span>
    </li>
  );
}

/* Mobile Knowledge Copilot mock. */
function PhoneMock() {
  return (
    <div
      className="mx-auto w-[248px] rounded-[30px] border p-2"
      style={{ background: 'var(--color-ink)', borderColor: 'var(--color-ink)', boxShadow: 'var(--shadow-soft)' }}
    >
      <div className="overflow-hidden rounded-[22px]" style={{ background: 'var(--color-subtle)' }}>
        {/* status bar */}
        <div className="flex items-center justify-between px-4 pb-2 pt-3">
          <span className="font-mono text-[10px]" style={{ color: 'var(--color-muted)' }}>
            9:41
          </span>
          <span className="flex items-center gap-1 font-mono text-[9px] font-bold" style={{ color: 'var(--color-verify)' }}>
            <WifiOff className="h-3 w-3" strokeWidth={2} /> OFFLINE
          </span>
        </div>

        {/* conversation */}
        <div className="flex flex-col gap-2.5 px-3.5 pb-2">
          <div className="flex justify-end">
            <p
              className="max-w-[82%] rounded-[12px] rounded-br-sm px-3 py-2 text-[12px] font-medium"
              style={{ background: 'var(--cyan-soft)', color: 'var(--color-ink)' }}
            >
              What PPE do I need for Pump House 2?
            </p>
          </div>

          <div
            className="rounded-[12px] rounded-bl-sm border px-3 py-2.5"
            style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}
          >
            <p className="text-[12px] leading-snug" style={{ color: 'var(--color-slate)' }}>
              Flame-resistant coveralls, a hard hat, and an H₂S-rated respirator. See the
              site-entry procedure, §3.
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <code
                className="rounded-md border px-2 py-0.5 text-[10px]"
                style={{ borderColor: 'var(--color-border)', background: 'var(--color-subtle)', color: 'var(--color-ink)' }}
              >
                Manual PH2-Entry · §3
              </code>
              <span className="flex items-center gap-1 text-[10px] font-bold" style={{ color: 'var(--color-verify)' }}>
                <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: 'var(--color-verify)' }} />
                High confidence
              </span>
            </div>
          </div>
        </div>

        {/* input */}
        <div className="px-3.5 pb-3.5 pt-1.5">
          <div
            className="flex items-center gap-2 rounded-full border px-3 py-2"
            style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}
          >
            <span className="text-[11.5px]" style={{ color: 'var(--color-muted)' }}>
              Ask about a procedure…
            </span>
            <span
              className="ml-auto flex h-6 w-6 items-center justify-center rounded-full"
              style={{ background: 'var(--cyan)' }}
            >
              <Send className="h-3.5 w-3.5" strokeWidth={2} style={{ color: 'var(--color-ink)' }} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Web Compliance Console (two-pane) mock. */
function ConsoleMock() {
  const docs = [
    { name: 'Boiler-Maintenance v4', gap: 2, ok: 6 },
    { name: 'Hot-Work Permit SOP', gap: 0, ok: 8 },
    { name: 'PH2 Entry Procedure', gap: 1, ok: 5 },
    { name: 'Electrical-Safety SOP', gap: 0, ok: 7 },
  ];
  const clauses = [
    { code: 'Factories Act §7A(2)', status: 'ok' },
    { code: 'OISD-STD-105 · §4.3', status: 'ok' },
    { code: 'PESO SMPV(U) · R.19', status: 'gap' },
    { code: 'IS-14489 Audit Code', status: 'ok' },
  ];
  return (
    <div
      className="overflow-hidden rounded-[12px] border"
      style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)', boxShadow: 'var(--shadow-soft)' }}
    >
      {/* title bar */}
      <div className="flex items-center gap-2 border-b px-3 py-2.5" style={{ borderColor: 'var(--color-border)', background: 'var(--color-subtle)' }}>
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#E7EAF0' }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#E7EAF0' }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#E7EAF0' }} />
        </span>
        <span
          className="ml-2 rounded-md px-2.5 py-1 font-mono text-[10.5px]"
          style={{ background: 'var(--color-surface)', color: 'var(--color-muted)', border: '1px solid var(--color-border)' }}
        >
          faktriiq.app / officer
        </span>
      </div>

      {/* two panes */}
      <div className="grid grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div className="border-r p-3" style={{ borderColor: 'var(--color-border)', background: 'var(--color-subtle)' }}>
          <p className="mb-2 font-mono text-[9.5px] font-bold uppercase tracking-[0.1em]" style={{ color: 'var(--color-muted)' }}>
            Documents
          </p>
          <div className="flex flex-col gap-1.5">
            {docs.map((d, i) => (
              <div
                key={d.name}
                className="flex items-center gap-2 rounded-md border px-2 py-1.5"
                style={{
                  borderColor: i === 2 ? 'var(--sky)' : 'var(--color-border)',
                  background: i === 2 ? 'var(--sky-soft)' : 'var(--color-surface)',
                }}
              >
                <span className="truncate text-[11px] font-medium" style={{ color: 'var(--color-ink)' }}>
                  {d.name}
                </span>
                <span className="ml-auto flex shrink-0 gap-1">
                  {d.gap > 0 && (
                    <span
                      className="rounded px-1.5 py-0.5 font-mono text-[9px] font-bold"
                      style={{ color: 'var(--color-flag)', background: 'rgba(224,72,61,0.1)' }}
                    >
                      {d.gap} gap
                    </span>
                  )}
                  <span
                    className="rounded px-1.5 py-0.5 font-mono text-[9px] font-bold"
                    style={{ color: 'var(--color-verify)', background: 'rgba(47,163,107,0.12)' }}
                  >
                    {d.ok} ok
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3">
          <p className="mb-2 font-mono text-[9.5px] font-bold uppercase tracking-[0.1em]" style={{ color: 'var(--color-muted)' }}>
            Clause matches · PH2 Entry
          </p>
          <div className="flex flex-col gap-1.5">
            {clauses.map((c) => {
              const isGap = c.status === 'gap';
              const color = isGap ? 'var(--color-flag)' : 'var(--color-verify)';
              return (
                <div
                  key={c.code}
                  className="flex items-center gap-2 rounded-md border px-2 py-2"
                  style={{ borderColor: isGap ? 'rgba(224,72,61,0.38)' : 'var(--color-border)', background: 'var(--color-surface)' }}
                >
                  <span
                    className="rounded px-1.5 py-0.5 font-mono text-[9px] font-bold"
                    style={{ color, background: isGap ? 'rgba(224,72,61,0.1)' : 'rgba(47,163,107,0.12)' }}
                  >
                    {isGap ? 'GAP' : 'OK'}
                  </span>
                  <code className="text-[11px]" style={{ color: 'var(--color-slate)' }}>
                    {c.code}
                  </code>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TwoModes() {
  return (
    <section id="modes" className="section section--subtle">
      <div className="container">
        <div className="mx-auto mb-14 max-w-[720px] text-center">
          <p className="overline" style={{ display: 'inline-block' }}>
            Two Modes
          </p>
          <h2 className="section-heading">One brain, two ways to work</h2>
          <p className="section-subheading" style={{ marginInline: 'auto' }}>
            FaktriIQ opens to a simple choice of role, then adapts entirely to the surface the
            work happens on - a one-handed phone on the plant floor, or a dense two-pane console
            at the EHS desk.
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {/* Technician mode */}
          <article className="card grid gap-8 p-6 md:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-12">
            <div className="flex flex-col">
              <div className="mb-5 flex items-center gap-3">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-[10px] border"
                  style={{ background: 'var(--cyan-soft)', borderColor: 'var(--color-border)' }}
                >
                  <Smartphone className="h-[22px] w-[22px]" strokeWidth={1.7} style={{ color: 'var(--color-ink)' }} />
                </span>
                <div>
                  <h3 className="text-[20px] font-bold leading-tight" style={{ color: 'var(--color-ink)' }}>
                    Field Technician
                  </h3>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: 'var(--color-muted)' }}>
                    Knowledge Copilot · Mobile
                  </p>
                </div>
              </div>

              <p className="mb-5 text-[15px] leading-relaxed" style={{ color: 'var(--color-slate)' }}>
                A single-question, single-answer copilot built for gloves and glances - the answer
                arrives as one focused, cited card, and it never needs a network.
              </p>

              <ul className="flex flex-col gap-3.5">
                <Check icon={WifiOff} soft="var(--cyan-soft)">
                  <strong>100% Offline Inference</strong>: Operates directly on edge hardware with zero network dependency.
                </Check>
                <Check icon={Fingerprint} soft="var(--cyan-soft)">
                  <strong>Ergonomic Design</strong>: Glove-friendly, thumb-reachable interface with 48px touch targets.
                </Check>
                <Check icon={BadgeCheck} soft="var(--cyan-soft)">
                  <strong>Grounded Citations</strong>: Every retrieved answer carries a clear compliance citation and confidence score.
                </Check>
                <Check icon={FileSearch} soft="var(--cyan-soft)">
                  <strong>Context Fallback</strong>: Instantly reveals raw SOP passages when confidence falls below safe thresholds.
                </Check>
              </ul>
            </div>

            <div className="flex items-center justify-center min-h-[360px] rounded-2xl p-4 border" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
              <PhoneMock />
            </div>
          </article>

          {/* Officer mode */}
          <article className="card grid gap-8 p-6 md:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-12">
            <div className="flex flex-col">
              <div className="mb-5 flex items-center gap-3">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-[10px] border"
                  style={{ background: 'var(--sky-soft)', borderColor: 'var(--color-border)' }}
                >
                  <Monitor className="h-[22px] w-[22px]" strokeWidth={1.7} style={{ color: 'var(--color-ink)' }} />
                </span>
                <div>
                  <h3 className="text-[20px] font-bold leading-tight" style={{ color: 'var(--color-ink)' }}>
                    Safety Officer
                  </h3>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: 'var(--color-muted)' }}>
                    Compliance Console · Web
                  </p>
                </div>
              </div>

              <p className="mb-5 text-[15px] leading-relaxed" style={{ color: 'var(--color-slate)' }}>
                A dense, information-rich workspace for triage - procedures on the left, matched
                clauses and flags on the right, with red reserved for genuine gaps.
              </p>

              <ul className="flex flex-col gap-3.5">
                <Check icon={LayoutPanelLeft} soft="var(--sky-soft)">
                  <strong>Two-Pane Workspace</strong>: Side-by-side view of active documents and matched statutory clauses.
                </Check>
                <Check icon={ScanSearch} soft="var(--sky-soft)">
                  <strong>Automatic Alignment</strong>: Maps plant procedures directly to Factories Act, OISD, and PESO clauses.
                </Check>
                <Check icon={CircleAlert} soft="var(--sky-soft)">
                  <strong>Color-Coded Triage</strong>: Visual gap indicators (red/green) highlight compliance status instantly.
                </Check>
                <Check icon={Download} soft="var(--sky-soft)">
                  <strong>Rapid Reporting</strong>: Export formatted gap audits to PDF, print, or email in a single click.
                </Check>
              </ul>
            </div>

            <div className="flex items-center justify-center min-h-[360px] rounded-2xl p-4 border" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
              <div className="w-full max-w-[420px]">
                <ConsoleMock />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
