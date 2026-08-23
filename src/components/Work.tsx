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

export default function Work({
  headingLevel = "h2",
  showEyebrow = true,
}: {
  headingLevel?: "h1" | "h2";
  showEyebrow?: boolean;
}) {
  const Heading = headingLevel;
  return (
    <section className="section" id="work">
      <div className="container">
        {showEyebrow && <p className="eyebrow">Work</p>}
        <Heading>Selected work</Heading>

        <div className="work-grid">
          <article className="work-card">
            <WorkThumb
              src="/assets/work-flavourstec.png"
              alt="Flavours Tec Kitchen website homepage"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <p className="work-tag">Website · Corporate Catering</p>
            <h3>From catering company to premium event experience.</h3>
            <p className="work-client">Flavours Tec Kitchen</p>
            <dl className="work-details">
              <div>
                <dt>Challenge</dt>
                <dd>
                  Flavours Tec Kitchen already had the capability to serve high-value
                  events. The problem was that their digital presence didn&apos;t
                  communicate that level of experience.
                </dd>
              </div>
              <div>
                <dt>Business</dt>
                <dd>
                  The real opportunity was in corporate and high-value events — executive
                  dining, convention catering, and VIP events — not everyday catering
                  enquiries.
                </dd>
              </div>
              <div>
                <dt>Approach</dt>
                <dd>
                  Redesigned the website around the audiences they wanted to attract and
                  the enquiries they wanted to generate — positioned around Executive
                  Dining, Convention Catering, and Celebrity &amp; VIP Events.
                </dd>
              </div>
              <div>
                <dt>Experience</dt>
                <dd>
                  A full responsive website built from the client&apos;s own materials,
                  with a technical SEO and accessibility (WCAG) pass.
                </dd>
              </div>
              <div>
                <dt>Outcome</dt>
                <dd>Live and positioned to compete for higher-value catering contracts.</dd>
              </div>
            </dl>
            <a
              className="work-link"
              href="https://flavoursteckitchen.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit site {externalIcon}
            </a>
          </article>

          <article className="work-card">
            <WorkThumb
              src="/assets/work-vaav.png"
              alt="VAAV Kitchen and Caterers website homepage"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <p className="work-tag">Website · Kitchen &amp; Caterers</p>
            <h3>From traditional kitchen to a modern, discoverable brand.</h3>
            <p className="work-client">VAAV Kitchen &amp; Caterers</p>
            <dl className="work-details">
              <div>
                <dt>Challenge</dt>
                <dd>
                  VAAV needed an online presence that reflected both its traditional roots
                  and a modern operation.
                </dd>
              </div>
              <div>
                <dt>Business</dt>
                <dd>
                  What mattered was being found locally and trusted quickly — not just
                  having a website that existed.
                </dd>
              </div>
              <div>
                <dt>Approach</dt>
                <dd>
                  Built a dedicated website — &quot;Taste of Tradition, Quality of
                  Modernity&quot; — alongside supporting collateral for local discovery.
                </dd>
              </div>
              <div>
                <dt>Experience</dt>
                <dd>Live website plus a Google Business QR code setup for easy customer access.</dd>
              </div>
              <div>
                <dt>Outcome</dt>
                <dd>A live, dedicated web presence ready for local discovery.</dd>
              </div>
            </dl>
            <a
              className="work-link"
              href="https://vaavkitchenandcaterers.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit site {externalIcon}
            </a>
          </article>

          <article className="work-card">
            <WorkThumb
              src="/assets/work-ebook-cover.png"
              alt="Eight Hours, Still Exhausted book cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              cover
            />
            <p className="work-tag">Digital Product · Kindle Ebook</p>
            <h3>From a health insight to a published, sellable product.</h3>
            <p className="work-client">&quot;Eight Hours, Still Exhausted&quot;</p>
            <dl className="work-details">
              <div>
                <dt>Challenge</dt>
                <dd>
                  Turn a widely misunderstood problem — sleeping a full eight hours and
                  still waking up exhausted — into a research-backed, sellable digital
                  product.
                </dd>
              </div>
              <div>
                <dt>Business</dt>
                <dd>
                  The opportunity was in specificity: not another generic wellness book,
                  but one built around four fixable mechanisms.
                </dd>
              </div>
              <div>
                <dt>Approach</dt>
                <dd>
                  Researched and wrote a book grounded in published sleep science
                  (Czeisler, Roenneberg), packaged as a practical four-night self-test
                  system.
                </dd>
              </div>
              <div>
                <dt>Experience</dt>
                <dd>
                  &quot;Eight Hours, Still Exhausted: Why the standard fixes didn&apos;t
                  hold — and four nights to find out what will&quot; — a complete,
                  skimmable, tactical ebook.
                </dd>
              </div>
              <div>
                <dt>Outcome</dt>
                <dd>Published and live on Amazon Kindle.</dd>
              </div>
            </dl>
            <a
              className="work-link"
              href="https://amzn.in/d/0fsbhHBE"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Amazon {externalIcon}
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
