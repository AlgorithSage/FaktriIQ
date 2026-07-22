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
  ShieldCheck,
} from 'lucide-react';
import ScrollReveal from './ui/ScrollReveal.jsx';
import { PushButton } from './ui/PushButton';

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
      className="mx-auto w-[248px] rounded-[38px] border-4 p-1 relative overflow-hidden"
      style={{
        backgroundColor: '#000000',
        borderColor: 'var(--color-slate)',
        borderWidth: '4px',
        boxShadow: 'var(--shadow-soft), 0 25px 50px -12px rgba(0,0,0,0.5)',
        aspectRatio: '9/18.5',
      }}
    >
      {/* Speaker/Camera notch */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 h-3.5 w-16 bg-black rounded-full z-20" />

      {/* Screenshot Image with top crop to hide system status bar */}
      <div className="w-full h-full overflow-hidden rounded-[32px]">
        <img
          src="/faktriiq_app_ui.png"
          alt="FaktriIQ Mobile App UI"
          className="w-full select-none pointer-events-none"
          style={{
            height: '106.5%',
            objectFit: 'cover',
            transform: 'translateY(-6%)',
          }}
        />
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
      {/* native app titlebar */}
      <div className="relative flex items-center px-3 py-2.5" style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
        <span className="flex shrink-0 gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#FF5F57' }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#FEBC2E' }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#28C840' }} />
        </span>
        <span
          className="pointer-events-none absolute inset-0 flex items-center justify-center gap-1.5 text-[11px] font-bold"
          style={{ color: 'var(--color-ink)' }}
        >
          <ShieldCheck className="h-3 w-3" strokeWidth={2} />
          FaktriIQ Compliance Console
        </span>
      </div>

      {/* two panes */}
      <div className="grid grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div className="p-3" style={{ background: 'var(--color-subtle)' }}>
          <p className="mb-2 font-mono text-[9.5px] font-bold uppercase tracking-[0.1em]" style={{ color: 'var(--color-muted)' }}>
            Documents
          </p>
          <div className="flex flex-col gap-1.5">
            {docs.map((d, i) => (
              <div
                key={d.name}
                className="flex items-center gap-2 rounded-md px-2 py-1.5"
                style={{
                  background: i === 2 ? 'var(--sky-soft)' : 'var(--color-surface)',
                  boxShadow: '0 1px 3px rgba(30,35,40,0.06)',
                }}
              >
                <span className="truncate text-[11px] font-medium" style={{ color: 'var(--color-ink)' }}>
                  {d.name}
                </span>
                <span className="ml-auto flex shrink-0 items-center gap-2 font-mono text-[9.5px] font-bold">
                  {d.gap > 0 && (
                    <span className="flex items-center gap-1" style={{ color: 'var(--color-flag)' }}>
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--color-flag)' }} />
                      {d.gap} gap
                    </span>
                  )}
                  <span className="flex items-center gap-1" style={{ color: 'var(--color-verify)' }}>
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--color-verify)' }} />
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
                  className="flex items-center gap-2 rounded-md px-2 py-2"
                  style={{ background: 'var(--color-surface)', boxShadow: '0 1px 3px rgba(30,35,40,0.06)' }}
                >
                  <span className="flex shrink-0 items-center gap-1.5 font-mono text-[9.5px] font-bold" style={{ color }}>
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
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
        <ScrollReveal preset="fadeUp" className="mx-auto mb-14 max-w-[720px] text-center">
          <p className="overline" style={{ display: 'inline-block' }}>
            Two Modes
          </p>
          <h2 className="section-heading">One brain, two ways to work</h2>
          <p className="section-subheading" style={{ marginInline: 'auto' }}>
            FaktriIQ opens to a simple choice of role, then adapts entirely to the surface the
            work happens on - a one-handed phone on the plant floor, or a dense two-pane console
            at the EHS desk.
          </p>
        </ScrollReveal>

        <div className="flex flex-col gap-10">
          {/* Technician mode */}
          <ScrollReveal id="technician-app" preset="fadeLeft" delay={0.1} as="article" className="card grid gap-8 p-6 md:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-12">
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
                arrives as one focused, cited card, operating seamlessly with or without network.
              </p>

              <ul className="flex flex-col gap-3.5">
                <Check icon={WifiOff} soft="var(--cyan-soft)">
                  <strong>Hybrid Connectivity</strong>: Utilizes high-speed APIs when online, falling back to on-device edge models.
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

              <div className="border-t" style={{ borderColor: 'var(--color-border)', marginTop: '36px', paddingTop: '28px' }}>
                <p className="text-[13.5px] font-medium flex items-center gap-2.5" style={{ color: 'var(--color-muted)', marginBottom: '20px' }}>
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" style={{ boxShadow: '0 0 8px #10b981' }} />
                  Latest stable release (v1.0.0) ready for instant install
                </p>
                <div className="flex flex-wrap gap-5 items-center">
                  <PushButton href="https://firebasestorage.googleapis.com/v0/b/faktri-iq.firebasestorage.app/o/app-release.apk?alt=media">
                    <span className="flex items-center gap-2">
                      <Download className="h-4 w-4" /> Download APK
                    </span>
                  </PushButton>
                  <span className="text-[12px] font-mono" style={{ color: 'var(--color-muted)', marginLeft: '4px' }}>
                    Release v1.0.0 | Android 7.0+ (Android 16 Ready)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center min-h-[360px] rounded-2xl p-4" style={{ background: 'var(--color-bg)' }}>
              <PhoneMock />
            </div>
          </ScrollReveal>

          {/* Officer mode */}
          <ScrollReveal preset="fadeRight" delay={0.15} as="article" className="card grid gap-8 p-6 md:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-12">
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
                    Compliance Console · Windows Desktop
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
                  <strong>Automatic Alignment</strong>: Maps plant procedures against Factories Act, OISD, PESO, DGMS, and MSIHC clauses.
                </Check>
                <Check icon={CircleAlert} soft="var(--sky-soft)">
                  <strong>Color-Coded Triage</strong>: Visual gap indicators (red/green) highlight compliance status instantly.
                </Check>
                <Check icon={FileSearch} soft="var(--sky-soft)">
                  <strong>Document Ingestion</strong>: Upload plant SOPs and manuals - the pipeline extracts, tags, and indexes them for instant clause matching.
                </Check>
              </ul>

              <div className="border-t" style={{ borderColor: 'var(--color-border)', marginTop: '36px', paddingTop: '28px' }}>
                <p className="text-[13.5px] font-medium flex items-center gap-2.5" style={{ color: 'var(--color-muted)', marginBottom: '20px' }}>
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" style={{ boxShadow: '0 0 8px #10b981' }} />
                  Windows desktop build (v1.0.0) - installs alongside a local backend
                </p>
                <div className="flex flex-wrap gap-5 items-center">
                  <PushButton href="https://github.com/AlgorithSage/FaktriIQ/releases/latest">
                    <span className="flex items-center gap-2">
                      <Download className="h-4 w-4" /> Download for Windows
                    </span>
                  </PushButton>
                  <span className="text-[12px] font-mono" style={{ color: 'var(--color-muted)', marginLeft: '4px' }}>
                    Windows 10/11 · 64-bit
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center min-h-[360px] rounded-2xl p-4" style={{ background: 'var(--color-bg)' }}>
              <div className="w-full max-w-[420px]">
                <ConsoleMock />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
