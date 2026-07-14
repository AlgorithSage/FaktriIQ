import { ShieldCheck, Smartphone, Gauge, Lock, ArrowRight } from 'lucide-react';

/* Per-role accent — a gradient tile, a soft chip background, and a matching
   glow used for the hover shadow, so each card feels distinct but harmonious. */
const ACCENTS = {
  sky: {
    tile: 'linear-gradient(135deg, var(--sky) 0%, var(--cyan) 100%)',
    soft: 'var(--sky-soft)',
    mid: 'var(--sky)',
    glow: 'rgba(169, 216, 255, 0.5)',
  },
  cyan: {
    tile: 'linear-gradient(135deg, var(--cyan) 0%, var(--sky) 100%)',
    soft: 'var(--cyan-soft)',
    mid: 'var(--cyan)',
    glow: 'rgba(119, 230, 224, 0.45)',
  },
  peach: {
    tile: 'linear-gradient(135deg, var(--peach) 0%, var(--orange) 100%)',
    soft: 'var(--peach-soft)',
    mid: 'var(--peach)',
    glow: 'rgba(247, 198, 184, 0.55)',
  },
  lemon: {
    tile: 'linear-gradient(135deg, var(--lemon) 0%, var(--orange) 100%)',
    soft: 'var(--lemon-soft)',
    mid: 'var(--lemon)',
    glow: 'rgba(248, 227, 106, 0.5)',
  },
};

const ROLES = [
  {
    icon: ShieldCheck,
    accent: 'sky',
    title: 'Safety Officers',
    deployment: 'Web console',
    description:
      'Audit SOPs against statutory standards, identify regulatory gaps, and maintain audit-ready compliance reports.',
  },
  {
    icon: Smartphone,
    accent: 'cyan',
    title: 'Field Technicians',
    deployment: 'Mobile · offline',
    description:
      'Get instant, cited answers from plant manuals and SOPs on the floor — accelerated on-device, even with no signal.',
  },
  {
    icon: Gauge,
    accent: 'peach',
    title: 'Plant Managers',
    deployment: 'Live dashboard',
    description:
      'Unify institutional knowledge, surface EHS hazards early, and keep every site ready for its next audit.',
  },
  {
    icon: Lock,
    accent: 'lemon',
    title: 'IT & EHS Security',
    deployment: 'On-prem · private',
    description:
      'Protect data sovereignty by running 100% private, on-device models with zero external server dependencies.',
  },
];

export default function RolesGrid() {
  return (
    <section className="section" id="resources">
      <div className="container">
        <div className="mb-12 max-w-[600px] md:mb-16">
          <p className="overline">Roles &amp; Deployments</p>
          <h2 className="section-heading">Built for everyone on the plant</h2>
          <p className="section-subheading">
            From the shop floor to the server room, every role gets the same grounded, cited
            intelligence — shaped to exactly how, and where, they work.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ROLES.map((role) => {
            const Icon = role.icon;
            const accent = ACCENTS[role.accent];
            return (
              <a
                key={role.title}
                href="#book-a-demo"
                className="group flex flex-col rounded-2xl border bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-(--role-mid) hover:shadow-[0_20px_44px_var(--role-glow)]"
                style={{
                  borderColor: 'var(--color-border)',
                  boxShadow: 'var(--shadow)',
                  '--role-mid': accent.mid,
                  '--role-glow': accent.glow,
                }}
              >
                <span
                  className="flex h-[52px] w-[52px] items-center justify-center rounded-[14px] transition-transform duration-300 group-hover:scale-105"
                  style={{ background: accent.tile, boxShadow: `0 8px 20px ${accent.glow}` }}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.7} style={{ color: 'var(--color-ink)' }} />
                </span>

                <span
                  className="mt-5 inline-flex w-fit items-center rounded-full px-2.5 py-1 font-mono text-[10.5px] font-bold uppercase tracking-[0.08em]"
                  style={{ background: accent.soft, color: 'var(--color-slate)' }}
                >
                  {role.deployment}
                </span>

                <h3 className="mt-3 text-[18px] font-bold leading-tight" style={{ color: 'var(--color-ink)' }}>
                  {role.title}
                </h3>
                <p className="mt-2 flex-1 text-[14px] leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  {role.description}
                </p>

                <span
                  className="mt-6 flex items-center gap-1.5 border-t pt-4 text-[12px] font-bold uppercase tracking-widest"
                  style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink)' }}
                >
                  Learn more
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={2}
                  />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
