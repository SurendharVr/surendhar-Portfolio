import Link from "next/link";
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
  showEyebrow = false,
}: {
  headingLevel?: "h1" | "h2";
  showEyebrow?: boolean;
}) {
  const Heading = headingLevel;
  // Card titles sit directly under the section heading, so their level has
  // to follow it: h2 under the standalone page's h1, h3 under a section h2.
  // Hardcoding h3 skipped a level on this page, where headingLevel is "h1".
  const CardHeading = headingLevel === "h1" ? "h2" : "h3";
  return (
    <section className="section section-muted" id="products">
      <div className="container">
        {showEyebrow && <p className="eyebrow">Digital Products</p>}
        <Heading>Not every business needs me to build it for them.</Heading>
        <p className="background-intro">
          Sometimes you just need the right starting point. If you&apos;d rather have one
          built for you, that&apos;s{" "}
          <Link href="/services/digital-products">digital product design</Link>.
        </p>
        <div className="work-grid work-grid-2">
          <article className="work-card">
            <WorkThumb
              src="/assets/work-ebook-cover.webp"
              alt="Eight Hours, Still Exhausted book cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              cover
            />
            <p className="work-tag">Live now · Kindle Ebook</p>
            <CardHeading>&quot;Eight Hours, Still Exhausted&quot;</CardHeading>
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
            <CardHeading>Templates, tools, and resources</CardHeading>
            <p>
              Ready-made structures instead of a blank screen, practical systems for
              making better digital decisions, and frameworks built from real project work
              — in development.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
