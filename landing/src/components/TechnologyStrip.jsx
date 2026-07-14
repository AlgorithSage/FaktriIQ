const TIERS = [
  {
    label: 'Offline Mobile & Field Deployment',
    title: 'On-Device Edge Engine',
    tech: 'llama.cpp · Vulkan · iOS · Android',
    logos: (
      <>
        {/* Apple Logo */}
        <svg viewBox="0 0 24 24" fill="currentColor" className="tech__logo" aria-label="iOS support">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.83-.98 2.94 1.08.08 2.15-.52 2.81-1.33z" />
        </svg>
        {/* Android Logo */}
        <svg viewBox="0 0 24 24" fill="currentColor" className="tech__logo" aria-label="Android support">
          <path d="M17.5 10c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5m-11 0c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S5 17.33 5 16.5v-5C5 10.67 5.67 10 6.5 10m5.5-3.8c2.2 0 4.16 1.44 4.8 3.5H7.2c.64-2.06 2.6-3.5 4.8-3.5m0 12.8c.83 0 1.5-.67 1.5-1.5V14h-3v3.5c0 .83.67 1.5 1.5 1.5m5.33-14L18.7 3.88a.5.5 0 0 0-.07-.7.5.5 0 0 0-.7.07l-1.32 1.5C15.22 4.28 13.68 4 12 4c-1.68 0-3.22.28-4.6.75L6.07 3.25a.5.5 0 0 0-.7-.07.5.5 0 0 0-.07.7l1.37 1.62C4.1 6.88 2.5 9.7 2.5 13h19c0-3.3-1.6-6.12-4.17-7.5z" />
        </svg>
        {/* Llama Mascot/Silhouette (llama.cpp) */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="tech__logo tech__logo--stroke" aria-label="llama.cpp">
          <path d="M6 3v6l2 4v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4l2-4V3M10 3v2M14 3v2" />
          <circle cx="9" cy="10" r="0.5" />
          <circle cx="15" cy="10" r="0.5" />
          <path d="M11 13h2" />
        </svg>
        {/* Vulkan Logo */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="tech__logo tech__logo--stroke" aria-label="Vulkan Acceleration">
          <path d="M12 2L2 6.5v11L12 22l10-4.5v-11L12 2z" />
          <path d="M12 2v20" />
          <path d="M2 6.5l10 4.5 10-4.5" />
        </svg>
      </>
    ),
    points: [
      'Zero-latency local inference executed directly on field devices',
      'Process voice notes, captured photos, and text queries in the field',
      '100% data sovereignty — zero external network dependency',
    ],
  },
  {
    label: 'Zero-Installation In-Browser Execution',
    title: 'Client-Side Sandbox Engine',
    tech: 'WebGPU · ONNX Runtime · Chrome · Safari',
    logos: (
      <>
        {/* Chrome Logo */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="tech__logo tech__logo--stroke" aria-label="Chrome compatible">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="4" />
          <line x1="21.17" y1="8" x2="12" y2="8" />
          <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
          <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
        </svg>
        {/* Safari Logo */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="tech__logo tech__logo--stroke" aria-label="Safari compatible">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
        {/* WebGPU Microchip */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="tech__logo tech__logo--stroke" aria-label="WebGPU Acceleration">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
        </svg>
        {/* ONNX Node network */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="tech__logo tech__logo--stroke" aria-label="ONNX Runtime">
          <circle cx="12" cy="5" r="3" />
          <circle cx="5" cy="17" r="3" />
          <circle cx="19" cy="17" r="3" />
          <path d="M12 8v6M5 14l5-5M19 14l-5-5" />
        </svg>
      </>
    ),
    points: [
      'Secure in-browser computation leveraging client-side GPU acceleration',
      'Private document chunking and vector search directly in the browser memory',
      'Zero server overhead or subscription cost for the organization',
    ],
  },
  {
    label: 'Sovereign High-Throughput Auditing',
    title: 'Enterprise Cloud Engine',
    tech: 'Docker · ChromaDB · SQLite · Private Cloud',
    logos: (
      <>
        {/* Sovereign Server Rack */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="tech__logo tech__logo--stroke" aria-label="Sovereign Cloud Cluster">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" />
          <line x1="6" y1="18" x2="6.01" y2="18" />
          <line x1="10" y1="6" x2="18" y2="6" />
          <line x1="10" y1="18" x2="18" y2="18" />
        </svg>
        {/* Docker Whale */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="tech__logo tech__logo--stroke" aria-label="Docker containerization">
          <path d="M2 14c0 3 2.5 5 5.5 5 2 0 3.5-.8 4.5-2h8c1.5 0 2-1 2-2 0-3.5-3-5-6-5h-2c-.5-1.5-1.5-3-3-3H7C4 7 2 10 2 14z" />
          <rect x="8" y="9" width="3" height="3" />
          <rect x="12" y="9" width="3" height="3" />
        </svg>
        {/* Database cylinder */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="tech__logo tech__logo--stroke" aria-label="Local Vector Store">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
          <path d="M19 7c-2 2-4 3-6 4" strokeWidth="1.5" />
        </svg>
      </>
    ),
    points: [
      'Ultra-high throughput processing for large statutory documents',
      'Advanced reasoning models for multi-framework compliance analysis',
      'Consent-gated architecture with explicit user control over data transit',
    ],
  },
];

export default function TechnologyStrip() {
  return (
    <section className="tech section" id="technology">
      <div className="container">
        
        {/* Header */}
        <div className="tech__header mx-auto text-center max-w-[720px] mb-16">
          <p className="overline" style={{ display: 'inline-block' }}>Under the Hood</p>
          <h2 className="section-heading">A three-tier hybrid AI runtime</h2>
          <p className="section-subheading" style={{ marginInline: 'auto' }}>
            The same grounded intelligence, matched to your hardware and
            connectivity&mdash;from an offline phone on the plant floor to
            sovereign cloud audits.
          </p>
        </div>

        {/* Outer Glassmorphic Modal Wrapper */}
        <div 
          className="tech__glass-modal"
          style={{
            background: 'rgba(255, 255, 255, 0.45)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(30, 35, 40, 0.12)',
            borderRadius: '2.5rem',
            padding: '3.5rem 2.5rem',
            boxShadow: '0 24px 60px rgba(30, 35, 40, 0.04)',
          }}
        >
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-8 items-stretch" id="architecture">
            {TIERS.map((tier) => (
              <article 
                key={tier.title} 
                className="tech__card flex flex-col items-center text-center justify-between"
                style={{
                  background: 'var(--color-subtle)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '1.75rem',
                  padding: '2.25rem 2rem',
                  boxShadow: 'var(--shadow)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  height: '100%',
                }}
              >
                <div className="w-full flex flex-col items-center">
                  {/* Inside Centered Modal for Icons */}
                  <div 
                    className="flex items-center justify-center gap-3 px-4 py-2 border shadow-[0_2px_8px_rgba(30,35,40,0.04)] mb-6" 
                    style={{
                      background: '#FFFFFF',
                      borderColor: 'var(--color-border)',
                      borderRadius: '0.875rem',
                      width: 'fit-content',
                      height: '42px',
                    }}
                  >
                    <div className="flex items-center gap-3.5 text-[var(--color-ink)]">
                      {tier.logos}
                    </div>
                  </div>

                  {/* Label */}
                  <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-[rgba(30,35,40,0.65)] mb-1.5">
                    {tier.label}
                  </p>

                  {/* Heading */}
                  <h3 className="text-[19px] font-extrabold text-[var(--color-ink)] leading-tight px-1">
                    {tier.title}
                  </h3>

                  {/* Tech stack description */}
                  <span className="inline-block mt-2 font-mono text-[10.5px] font-bold text-[rgba(30,35,40,0.75)]">
                    {tier.tech}
                  </span>

                  {/* Divider separating heading from points */}
                  <div className="my-5 w-12 h-[1.5px] bg-[rgba(30,35,40,0.12)]" />

                  {/* Feature Points (centered) */}
                  <ul className="flex flex-col gap-3.5 text-center px-1">
                    {tier.points.map((point) => (
                      <li 
                        key={point} 
                        className="text-[13.5px] leading-relaxed text-[var(--color-ink)]"
                        style={{ fontWeight: 500 }}
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
