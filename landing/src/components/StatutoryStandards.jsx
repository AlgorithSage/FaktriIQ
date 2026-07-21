import { Scale, Flame, Fuel, Mountain, FlaskConical } from 'lucide-react';
import { PushButton } from './ui/PushButton';
import ScrollReveal from './ui/ScrollReveal.jsx';

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
      'Oil Industry Safety Directorate standards for hydrocarbon operations - hot-work permits, fire-protection systems, and equipment-integrity inspections.',
  },
  {
    icon: Fuel,
    name: 'PESO Regulations',
    code: 'SMPV(U) · Gas Cylinder Rules',
    description:
      'Petroleum & Explosives Safety Organisation rules covering pressure vessels, compressed-gas cylinders, and hazardous-material storage and handling.',
  },
  {
    icon: Mountain,
    name: 'DGMS Guidelines',
    code: 'DGMS Safety Circulars',
    description:
      'Directorate General of Mines Safety circulars covering coal, metal, and oil mining, electrical supply, and occupational health in mines.',
  },
  {
    icon: FlaskConical,
    name: 'MSIHC Rules',
    code: 'Hazardous Chemical Rules',
    description:
      'Manufacture, Storage and Import of Hazardous Chemical Rules covering threshold quantities and major-accident-hazard controls.',
  },
];

const META = ['5 statutory frameworks', '9,803 clauses indexed', 'Source text one tap away'];

export default function StatutoryStandards() {
  return (
    <section id="compliance" className="section">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          {/* Intro column */}
          <ScrollReveal preset="fadeLeft" className="flex flex-col">
            <p className="overline">Compliance Coverage</p>
            <h2 className="section-heading">
              Aligned with the standards your auditors actually cite
            </h2>
            <p className="section-subheading">
              FaktriIQ doesn’t just “do compliance” - it grounds every answer in the exact
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

            <PushButton className="mt-8 self-start" href="#agents">
              See the Compliance Agent
            </PushButton>
          </ScrollReveal>

          {/* Framework grid */}
          <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
            {FRAMEWORKS.map((framework, idx) => {
              const Icon = framework.icon;
              return (
                <ScrollReveal
                  key={framework.name}
                  preset="fadeUp"
                  delay={0.1 + (idx % 2) * 0.12 + Math.floor(idx / 2) * 0.1}
                  className="flex flex-col"
                >
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-[12px]"
                    style={{
                      background: 'linear-gradient(133deg, var(--sky) 0%, var(--cyan) 100%)',
                      boxShadow: '0 6px 16px rgba(119, 230, 224, 0.28)',
                    }}
                  >
                    <Icon className="h-[26px] w-[26px]" strokeWidth={1.6} style={{ color: 'var(--color-ink)' }} />
                  </span>
 
                  <h3 className="mt-5 text-[17px] font-bold leading-tight" style={{ color: 'var(--color-ink)' }}>
                    {framework.name}
                  </h3>
                  <code className="mt-2 text-[12px]" style={{ color: 'var(--color-muted)' }}>
                    {framework.code}
                  </code>
                  <p className="mt-3 text-[14px] leading-snug" style={{ color: 'var(--color-muted)' }}>
                    {framework.description}
                  </p>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
