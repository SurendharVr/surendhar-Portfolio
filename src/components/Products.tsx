import WorkThumb from "./WorkThumb";

const externalIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M7 17L17 7M17 7H8M17 7v9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Products({
  headingLevel = "h2",
}: {
  headingLevel?: "h1" | "h2";
}) {
  const Heading = headingLevel;
  return (
    <section className="section section-muted" id="products">
      <div className="container">
        <p className="eyebrow">Digital Products</p>
        <Heading>Not every business needs us to build it for them.</Heading>
        <p className="background-intro">
          Sometimes you just need the right starting point.
        </p>
        <div className="work-grid work-grid-2">
          <article className="work-card">
            <WorkThumb
              src="/assets/work-ebook-cover.png"
              alt="Eight Hours, Still Exhausted book cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              cover
            />
            <p className="work-tag">Live now · Kindle Ebook</p>
            <h3>&quot;Eight Hours, Still Exhausted&quot;</h3>
            <p>A research-backed digital product, written, designed, and published solo.</p>
            <a
              className="work-link"
              href="https://amzn.in/d/0fsbhHBE"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Amazon {externalIcon}
            </a>
          </article>
          <article className="work-card work-card-soon">
            <p className="work-tag">Coming soon</p>
            <h3>Templates, tools, and resources</h3>
            <p>
              Proven structures without starting from a blank screen, practical systems for
              making better digital decisions, and frameworks built from real project work
              — in development.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
