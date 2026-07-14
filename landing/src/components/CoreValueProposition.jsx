const FEATURES = [
  'Factories Act Clause Mapping',
  'SOP Compliance Gap Auditing',
  'Traceable Source Citations',
];

const CLAUSE_RESULTS = [
  { ref: 'Factories Act §7A(2)(c)', label: 'PPE issuance procedure matched', status: 'ok' },
  { ref: 'OISD-STD-105 · 4.3.1', label: 'Hot-work permit interval matched', status: 'ok' },
  { ref: 'PESO SMPV(U) R.19', label: 'Pressure-vessel test log missing', status: 'gap' },
];

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12.5l4.5 4.5L19 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* CSS-styled infographic: Plant SOP text -> Compliance Agent -> mapped clauses. */
function ComplianceDiagram() {
  return (
    <figure className="diagram" aria-label="Compliance mapping flow: plant SOP text passes through the Compliance Agent and maps to regulation clauses">
      <div className="diagram__col">
        <div className="diagram__doc">
          <span className="diagram__doc-title">Plant SOP Text</span>
          <span className="diagram__doc-line" style={{ width: '92%' }} />
          <span className="diagram__doc-line" style={{ width: '78%' }} />
          <span className="diagram__doc-line diagram__doc-line--hl" style={{ width: '85%' }} />
          <span className="diagram__doc-line" style={{ width: '64%' }} />
        </div>
      </div>

      <div className="diagram__flow" aria-hidden="true">
        <span className="diagram__arrow" />
      </div>

      <div className="diagram__col">
        <div className="diagram__agent">
          <span className="diagram__agent-dot" />
          Compliance Agent
        </div>
      </div>

      <div className="diagram__flow" aria-hidden="true">
        <span className="diagram__arrow" />
      </div>

      <div className="diagram__col diagram__col--results">
        <p className="diagram__results-title">OISD · Factories Act · PESO</p>
        {CLAUSE_RESULTS.map((clause) => (
          <div key={clause.ref} className={`diagram__clause diagram__clause--${clause.status}`}>
            <span className="diagram__clause-status">
              {clause.status === 'ok' ? 'OK' : 'GAP'}
            </span>
            <span className="diagram__clause-body">
              <code>{clause.ref}</code>
              {clause.label}
            </span>
          </div>
        ))}
      </div>

      <figcaption className="diagram__disclaimer">
        System-generated flags. Confirm against the original regulation before acting.
      </figcaption>
    </figure>
  );
}

export default function CoreValueProposition() {
  return (
    <section className="value-prop section" id="overview">
      <div className="container value-prop__grid">
        <div className="value-prop__intro">
          <p className="overline">FaktriIQ Operations Brain</p>
          <h2 className="section-heading">Instant answers. Verified compliance.</h2>
          <p className="section-subheading">
            Unify your plant manuals, safety SOPs, and Indian statutory rules into a
            single contextual engine to automate gap detection, answer questions, and
            stay audit-ready.
          </p>
        </div>

        <div className="value-prop__showcase card">
          <p className="overline overline--accent">Audit</p>
          <h3 className="value-prop__showcase-heading">
            Map your procedures and automate gap detection with FaktriIQ
          </h3>
          <ul className="feature-list">
            {FEATURES.map((feature) => (
              <li key={feature}>
                <span className="feature-list__icon">
                  <CheckIcon />
                </span>
                {feature}
              </li>
            ))}
          </ul>
          <ComplianceDiagram />
        </div>
      </div>
    </section>
  );
}
