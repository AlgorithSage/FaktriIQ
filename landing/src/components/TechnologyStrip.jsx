const TIERS = [
  {
    label: 'Mobile · Field Technician',
    engine: 'llama.cpp + Vulkan',
    model: 'Gemma 4 E2B · GGUF',
    points: [
      'On-device GPU inference via Dart FFI',
      'Multimodal: text, image, audio hazard logs',
      '100% offline & private — nothing leaves the device',
    ],
  },
  {
    label: 'Desktop Local · Safety Officer',
    engine: 'LiteRT.js + WebGPU',
    model: 'Gemma 4 E2B · .litertlm',
    points: [
      'Runs fully in-browser, zero server cost',
      'BGE-small-en embeddings via Transformers.js',
      'Documents never leave the browser tab',
    ],
  },
  {
    label: 'Desktop Cloud · Safety Officer',
    engine: 'Agno + Groq LPU',
    model: 'openai/gpt-oss-120b · MoE',
    points: [
      'Sparse MoE — 5.1B active params per token',
      'Up to 500 tokens/sec compliance auditing',
      'Explicit opt-in consent before any upload',
    ],
  },
];

export default function TechnologyStrip() {
  return (
    <section className="tech section" id="technology">
      <div className="container">
        <div className="tech__header">
          <p className="overline">Under the Hood</p>
          <h2 className="section-heading">A three-tier hybrid AI runtime</h2>
          <p className="section-subheading">
            The same grounded intelligence, matched to your hardware and
            connectivity&mdash;from an offline phone on the plant floor to
            LPU-accelerated cloud audits.
          </p>
        </div>
        <div className="tech__grid" id="architecture">
          {TIERS.map((tier) => (
            <article key={tier.label} className="tech__card card">
              <p className="tech__label">{tier.label}</p>
              <h3 className="tech__engine">{tier.engine}</h3>
              <code className="tech__model">{tier.model}</code>
              <ul className="tech__points">
                {tier.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
