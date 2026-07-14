import { Scale, Flame, Fuel, Factory, HeartPulse, BadgeCheck } from 'lucide-react';
import { PushButton } from './ui/PushButton';

/* The Indian statutory frameworks the Compliance Agent grounds its answers in.
   Presented in the two-column "features title" layout: intro on the left,
   a detailed framework grid on the right. */
const FRAMEWORKS = [
  {
    icon: Scale,
    name: 'Factories Act, 1948',
    code: 'Act No. 63 of 1948',
    description:
      'India’s principal worker-safety statute. SOPs are mapped to hazardous-process clauses (§7A, §41B), PPE issuance, working-hour and welfare obligations.',
  },
  {
    icon: Flame,
    name: 'OISD Standards',
    code: 'OISD-STD series',
    description:
      'Oil Industry Safety Directorate standards for hydrocarbon operations — hot-work permits, fire-protection systems, and equipment-integrity inspections.',
  },
  {
    icon: Fuel,
    name: 'PESO Regulations',
    code: 'SMPV(U) · Gas Cylinder Rules',
    description:
      'Petroleum & Explosives Safety Organisation rules covering pressure vessels, compressed-gas cylinders, and hazardous-material storage and handling.',
  },
  {
    icon: Factory,
    name: 'Process Plants',
    code: 'Process Safety Management',
    description:
      'Interlocks, management-of-change, permit-to-work, and safe shutdown procedures for chemical, refinery, and petrochemical facilities.',
  },
  {
    icon: HeartPulse,
    name: 'EHS Safety Councils',
    code: 'NSC & EHS guidance',
    description:
      'Environment, health & safety best-practice frameworks and National Safety Council guidance, built into every audit-readiness check.',
  },
  {
    icon: BadgeCheck,
    name: 'IS / BIS Codes',
    code: 'Bureau of Indian Standards',
    description:
      'Equipment, testing, and safety Indian Standards cross-referenced wherever a procedure cites an IS code, so citations resolve to the exact spec.',
  },
];

const META = ['6 frameworks', 'Clause-level mapping', 'Source text one tap away'];

export default function StatutoryStandards() {
  return (
    <section id="compliance" className="section">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          {/* Intro column */}
          <div className="lg:sticky lg:top-[calc(var(--nav-height)+40px)] lg:self-center">
            <p className="overline">Compliance Coverage</p>
            <h2 className="section-heading">
              Aligned with the standards your auditors actually cite
            </h2>
            <p className="section-subheading">
              FaktriIQ doesn’t just “do compliance” — it grounds every answer in the exact
              Indian statutory frameworks that govern your plant. Each one below is built into
              the Compliance Agent, so a flagged gap always points back to a real clause you
              can open and verify.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {META.map((item) => (
                <span
                  key={item}
                  className="rounded-full border px-3 py-1.5 text-[12.5px] font-medium"
                  style={{
                    borderColor: 'var(--color-border)',
                    background: 'var(--color-surface)',
                    color: 'var(--color-slate)',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>

            <PushButton className="mt-8" href="#agents">
              See the Compliance Agent
            </PushButton>
          </div>

          {/* Framework grid */}
          <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
            {FRAMEWORKS.map((framework) => {
              const Icon = framework.icon;
              return (
                <div key={framework.name} className="flex flex-col">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-[12px]"
                    style={{
                      background: 'linear-gradient(133deg, var(--sky) 0%, var(--cyan) 100%)',
                      boxShadow: '0 6px 16px rgba(119, 230, 224, 0.28)',
                    }}
                  >
                    <Icon className="h-[26px] w-[26px]" strokeWidth={1.6} style={{ color: 'var(--color-ink)' }} />
                  </span>

                  <h3 className="mt-4 text-[17px] font-bold leading-tight" style={{ color: 'var(--color-ink)' }}>
                    {framework.name}
                  </h3>
                  <code className="mt-1 text-[12px]" style={{ color: 'var(--color-muted)' }}>
                    {framework.code}
                  </code>
                  <p className="mt-2 text-[14px] leading-snug" style={{ color: 'var(--color-muted)' }}>
                    {framework.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
