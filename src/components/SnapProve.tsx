import { arrowIcon } from "@/lib/offers";

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
