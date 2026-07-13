function ShieldIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8.8 12l2.2 2.2 4.2-4.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SmartphoneIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="7" y="2.5" width="10" height="19" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.5 5h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="18" r="1" fill="currentColor" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 2.8v2.6M12 18.6v2.6M21.2 12h-2.6M5.4 12H2.8M18.5 5.5l-1.8 1.8M7.3 16.7l-1.8 1.8M18.5 18.5l-1.8-1.8M7.3 7.3L5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ServerIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="16" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="4" y="13" width="16" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="7.5" r="1" fill="currentColor" />
      <circle cx="8" cy="16.5" r="1" fill="currentColor" />
    </svg>
  );
}

const ROLES = [
  {
    title: 'Safety Officers',
    icon: <ShieldIcon />,
    description:
      'Audit SOPs against statutory standards, identify regulatory gaps, and maintain compliance reports.',
  },
  {
    title: 'Field Technicians',
    icon: <SmartphoneIcon />,
    description:
      'Get instant, cited answers from plant manuals and SOPs directly on the floor with low-connectivity mobile GPU acceleration.',
  },
  {
    title: 'Plant Managers',
    icon: <GearIcon />,
    description:
      'Unify institutional knowledge, prevent EHS safety hazards, and ensure seamless audit preparations.',
  },
  {
    title: 'IT & EHS Security',
    icon: <ServerIcon />,
    description:
      'Protect data sovereignty by running 100% private, on-device local models with zero external server dependencies.',
  },
];

export default function RolesGrid() {
  return (
    <section className="roles section" id="resources">
      <div className="container">
        <div className="roles__header">
          <p className="overline">Roles &amp; Deployments</p>
          <h2 className="section-heading">Who we help</h2>
        </div>
        <div className="roles__grid">
          {ROLES.map((role) => (
            <article key={role.title} className="roles__card card">
              <span className="roles__icon">{role.icon}</span>
              <h3 className="roles__title">{role.title}</h3>
              <p className="roles__description">{role.description}</p>
              <a className="roles__action" href="#book-a-demo">
                Learn more
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M9 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
