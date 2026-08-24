const cases = [
  {
    tag: "Website · Corporate Catering",
    title: "Flavours Tec Kitchen",
    outcome: "Live and positioned to compete for higher-value catering contracts.",
  },
  {
    tag: "Website · Kitchen & Caterers",
    title: "VAAV Kitchen & Caterers",
    outcome: "A live, dedicated web presence ready for local discovery.",
  },
  {
    tag: "Digital Product · Kindle Ebook",
    title: '"Eight Hours, Still Exhausted"',
    outcome: "Published and live on Amazon Kindle.",
  },
];

const arrowIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function SnapProve() {
  return (
    <section className="snap-section" id="snap-prove">
      <div className="container">
        <p className="eyebrow">Proof</p>
        <h2>Real businesses, real results.</h2>
        <div className="stat-grid stat-grid-3">
          <div className="stat-card">
            <span className="stat-number">Built</span>
            <span className="stat-label">Business websites designed &amp; built end to end</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">Launched</span>
            <span className="stat-label">A research-backed ebook, published on Amazon</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">10+ yrs</span>
            <span className="stat-label">Sales experience behind every decision</span>
          </div>
        </div>
        <div className="proof-cases">
          {cases.map((c) => (
            <div className="proof-case-card" key={c.title}>
              <p className="work-tag">{c.tag}</p>
              <h3>{c.title}</h3>
              <p>{c.outcome}</p>
              <a className="work-link" href="/work">
                See the full case study {arrowIcon}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
