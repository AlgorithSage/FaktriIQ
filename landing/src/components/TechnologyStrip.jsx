import ScrollReveal from './ui/ScrollReveal.jsx';

const TIERS = [
  {
    label: 'Hybrid Mobile & Desktop Deployment',
    title: 'On-Device Edge Engine',
    tech: 'Phi-4 Mini · BM25 RAG · Android · Windows',
    logos: (
      <>
        {/* Android Logo */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 150" className="tech__logo" style={{ height: '20px', width: 'auto' }} aria-label="Android support">
          <path fill="#34A853" d="M255.285 143.47c-.084-.524-.164-1.042-.251-1.56a128.119 128.119 0 0 0-12.794-38.288 128.778 128.778 0 0 0-23.45-31.86 129.166 129.166 0 0 0-22.713-18.005c.049-.08.09-.168.14-.25 2.582-4.461 5.172-8.917 7.755-13.38l7.576-13.068c1.818-3.126 3.632-6.26 5.438-9.386a11.776 11.776 0 0 0 .662-10.484 11.668 11.668 0 0 0-4.823-5.536 11.85 11.85 0 0 0-5.004-1.61 11.963 11.963 0 0 0-2.218.018 11.738 11.738 0 0 0-8.968 5.798c-1.814 3.127-3.628 6.26-5.438 9.386l-7.576 13.069c-2.583 4.462-5.173 8.918-7.755 13.38-.282.487-.567.973-.848 1.467-.392-.157-.78-.313-1.172-.462-14.24-5.43-29.688-8.4-45.836-8.4-.442 0-.879 0-1.324.006-14.357.143-28.152 2.64-41.022 7.12a119.434 119.434 0 0 0-4.42 1.642c-.262-.455-.532-.911-.79-1.367-2.583-4.462-5.173-8.918-7.755-13.38L65.123 15.25c-1.818-3.126-3.632-6.259-5.439-9.386A11.736 11.736 0 0 0 48.5.048 11.71 11.71 0 0 0 43.49 1.66a11.716 11.716 0 0 0-4.077 4.063c-.281.474-.532.967-.742 1.473a11.808 11.808 0 0 0-.365 8.188c.259.786.594 1.554 1.023 2.296a3973.32 3973.32 0 0 1 5.439 9.386c2.53 4.357 5.054 8.713 7.58 13.069 2.582 4.462 5.168 8.918 7.75 13.38.02.038.046.075.065.112A129.184 129.184 0 0 0 45.32 64.38a129.693 129.693 0 0 0-22.2 24.015 127.737 127.737 0 0 0-9.34 15.24 128.238 128.238 0 0 0-10.843 28.764 130.743 130.743 0 0 0-1.951 9.524c-.087.518-.167 1.042-.247 1.56A124.978 124.978 0 0 0 0 149.118h256c-.205-1.891-.449-3.77-.734-5.636l.019-.012Z"/>
          <path fill="#202124" d="M194.59 113.712c5.122-3.41 5.867-11.3 1.661-17.62-4.203-6.323-11.763-8.682-16.883-5.273-5.122 3.41-5.868 11.3-1.662 17.621 4.203 6.322 11.764 8.682 16.883 5.272ZM78.518 108.462c4.206-6.321 3.46-14.21-1.662-17.62-5.123-3.41-12.68-1.05-16.886 5.27-4.203 6.323-3.458 14.212 1.662 17.622 5.122 3.41 12.683 1.05 16.886-5.272Z"/>
        </svg>

        {/* Windows Logo */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="tech__logo" style={{ height: '17px', width: 'auto' }} aria-label="Windows support">
          <path fill="#0078d4" d="M67.328 67.331h60.669V128H67.328zm-67.325 0h60.669V128H.003zM67.328 0h60.669v60.669H67.328zM.003 0h60.669v60.669H.003z" />
        </svg>
      </>
    ),
    points: [
      'On-device local synthesis via Phi-4 Mini 3.8B GGUF (llama.cpp)',
      'Query plant manuals, safety SOPs, and 9 statutory databases fully offline',
      '100% data sovereignty - zero external network dependency',
    ],
  },
  {
    label: 'Online High-Accuracy Reasoning',
    title: 'Cloud Reasoning Engine',
    tech: 'Groq LPU · GPT-OSS-120B · Agno · FastAPI',
    logos: (
      <>
        {/* Python (FastAPI backend) */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 255" className="tech__logo" style={{ height: '22px', width: 'auto' }} aria-label="Python FastAPI backend">
          <path fill="#387EB8" d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S234.71.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z"/>
          <path fill="#FFC331" d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127h-61.868v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 102.559 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.131 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z"/>
        </svg>

        {/* Groq LPU (lightning) */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#F55036" className="tech__logo" style={{ height: '22px', width: 'auto' }} aria-label="Groq LPU inference">
          <path d="M13 2 3 14h7v8l10-12h-7z"/>
        </svg>
      </>
    ),
    points: [
      'Groq LPU running openai/gpt-oss-120b for fast, structured answers',
      'Agno agent framework orchestrates retrieval-augmented prompts',
      'FastAPI backend serves cited answers grounded in the statutory index',
    ],
  },
  {
    label: 'Grounding & Document Ingestion',
    title: 'Retrieval & Ingestion Layer',
    tech: 'BM25 · PyMuPDF · Structured JSON',
    logos: (
      <>
        {/* Database (BM25 statutory index) */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="tech__logo" style={{ height: '22px', width: 'auto' }} aria-label="BM25 statutory index">
          <ellipse cx="12" cy="5" rx="9" ry="3"/>
          <path d="M3 5v14a9 3 0 0 0 18 0V5"/>
          <path d="M3 12a9 3 0 0 0 18 0"/>
        </svg>

        {/* File-search (PDF ingestion) */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="tech__logo" style={{ height: '22px', width: 'auto' }} aria-label="PDF ingestion pipeline">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <path d="M14 2v6h6"/>
          <circle cx="11.5" cy="14.5" r="2.5"/>
          <path d="m13.3 16.3 1.7 1.7"/>
        </svg>
      </>
    ),
    points: [
      'BM25 keyword retrieval over 9,803 pre-indexed statutory clauses',
      'PDF ingestion via PyMuPDF with regex equipment, clause, and date tagging',
      'Structured JSON grounding keeps every answer traceable to source text',
    ],
  },
];

export default function TechnologyStrip() {
  return (
    <section className="tech section" id="technology">
      <div className="container">

        {/* Header */}
        <ScrollReveal preset="fadeUp" className="tech__header mx-auto text-center max-w-[720px] mb-16">
          <p className="overline" style={{ display: 'inline-block' }}>Under the Hood</p>
          <h2 className="section-heading">A three-tier hybrid AI runtime</h2>
          <p className="section-subheading" style={{ marginInline: 'auto' }}>
            The same grounded intelligence, matched to your hardware and
            connectivity-from a hybrid-mode phone on the plant floor to
            high-accuracy cloud reasoning at the desk.
          </p>
        </ScrollReveal>

        {/* Outer Glassmorphic Modal Wrapper */}
        <ScrollReveal
          preset="scaleUp"
          delay={0.1}
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch" id="architecture">
            {TIERS.map((tier, idx) => (
              <ScrollReveal
                key={tier.title}
                preset="fadeUp"
                delay={0.15 + idx * 0.08}
                as="article"
                className="tech__card flex flex-col items-center text-center grain-bg-parent"
                style={{
                  background: 'var(--color-subtle)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '1.75rem',
                  boxShadow: 'var(--shadow)',
                  padding: '2rem 1.75rem',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                {/* Icon row pill */}
                <div
                  className="flex items-center justify-center gap-3 px-4 py-2 border shadow-[0_2px_8px_rgba(30,35,40,0.04)] mb-5"
                  style={{
                    background: 'var(--color-white)',
                    borderColor: 'var(--color-border)',
                    borderRadius: '0.875rem',
                    width: 'fit-content',
                    height: '42px',
                  }}
                >
                  <div className="flex items-center gap-3.5 text-(--color-ink)">
                    {tier.logos}
                  </div>
                </div>

                {/* Label - height reserved for 2 lines so every card's title
                    starts at the same y regardless of how the label wraps. */}
                <p
                  className="flex items-center justify-center font-mono text-[10px] font-extrabold italic tracking-wider mb-2"
                  style={{ color: 'var(--color-accent-dark)', minHeight: '26px', lineHeight: 1.4 }}
                >
                  {tier.label}
                </p>

                {/* Heading - height reserved for 2 lines so the tags row below
                    starts at the same y whether the title wraps or not. */}
                <h3
                  className="flex items-center justify-center text-[19px] font-extrabold text-(--color-ink) leading-tight mb-4"
                  style={{ minHeight: '46px' }}
                >
                  {tier.title}
                </h3>

                {/* Tech stack tags - every tier has exactly 4, so a fixed 2x2
                    grid keeps the wrap identical and symmetric across cards
                    (avoids the lopsided "3 then 1 alone" wrap). */}
                <div className="grid grid-cols-2 gap-2 w-full max-w-[230px] mb-6">
                  {tier.tech.split(' · ').map((techItem) => (
                    <span
                      key={techItem}
                      className="px-2.5 py-1.5 border font-mono text-[9.5px] font-bold text-(--color-ink) bg-white/70 shadow-[0_1px_3px_rgba(30,35,40,0.03)] truncate"
                      style={{
                        borderColor: 'var(--color-border)',
                        borderRadius: '0.375rem',
                      }}
                    >
                      {techItem}
                    </span>
                  ))}
                </div>

                {/* Points - stacked in series (one after another), each a short
                    horizontal strip rather than a tall padded box, so the card
                    doesn't elongate vertically. */}
                <ul className="flex flex-col gap-2 w-full">
                  {tier.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-[12.5px] leading-snug text-left border"
                      style={{
                        fontWeight: 600,
                        color: 'var(--color-ink)',
                        background: 'var(--color-white)',
                        borderColor: 'var(--color-border)',
                        borderRadius: '0.75rem',
                        padding: '10px 12px',
                      }}
                    >
                      <span
                        className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: 'var(--orange)' }}
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
