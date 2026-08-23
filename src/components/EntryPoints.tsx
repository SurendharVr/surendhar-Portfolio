const arrowIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const rungs = [
  {
    tier: "Low commitment",
    title: "Explore the Work",
    body: "See real, live projects before you decide anything.",
    cta: "View Work",
    href: "/work",
  },
  {
    tier: "Take a look",
    title: "Get a Website Audit",
    body: "A specific look at what's working and what isn't on your current site.",
    cta: "Request an Audit",
    href: "mailto:venkateshsurendhar@gmail.com?subject=Website%20Audit%20request",
  },
  {
    tier: "Ready-made",
    title: "Explore Digital Products",
    body: "Start with something already built, like the published ebook.",
    cta: "See Digital Products",
    href: "/products",
  },
  {
    tier: "High intent",
    title: "Start a Project",
    body: "Ready to build something real, from a website to a full campaign.",
    cta: "Start a Project",
    href: "mailto:venkateshsurendhar@gmail.com?subject=Start%20a%20Project",
  },
  {
    tier: "Premium",
    title: "The Digital Presence System",
    body: "The full system, end to end — strategy through to optimisation.",
    cta: "See the System",
    href: "/services#digital-presence-system",
  },
];

export default function EntryPoints() {
  return (
    <section className="section section-muted">
      <div className="container">
        <p className="eyebrow">Where to Start</p>
        <h2>Choose your starting point.</h2>
        <p className="background-intro">
          Not every visitor is ready for the same thing — pick whatever fits where you are
          right now.
        </p>
        <ol className="ladder-list">
          {rungs.map((rung) => (
            <li className="ladder-item" key={rung.title}>
              <div className="ladder-meta">
                <p className="ladder-tier">{rung.tier}</p>
                <h3>{rung.title}</h3>
                <p>{rung.body}</p>
              </div>
              <a className="offer-link ladder-link" href={rung.href}>
                {rung.cta} {arrowIcon}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
