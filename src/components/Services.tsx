import Link from "next/link";
import { arrowIcon, offers, partnerships } from "@/lib/offers";
import { waLink } from "@/lib/contact";

export default function Services({
  headingLevel = "h2",
  showEyebrow = false,
}: {
  headingLevel?: "h1" | "h2";
  showEyebrow?: boolean;
}) {
  const Heading = headingLevel;
  // Card titles sit directly under the section heading, so their level has
  // to follow it: h2 under the standalone page's h1, h3 under a section h2.
  // Hardcoding h3 skipped a level on /services, where headingLevel is "h1".
  const CardHeading = headingLevel === "h1" ? "h2" : "h3";
  return (
    <section className="section section-muted" id="services">
      <div className="container">
        {showEyebrow && <p className="eyebrow">Services</p>}
        <Heading>Ways I can help</Heading>
        <div className="offer-grid">
          {offers.map((offer) => (
            <article className="offer-card" key={offer.title}>
              <div className="offer-card-head">
                <div className="icon-badge" aria-hidden="true">
                  {offer.icon}
                </div>
                <div>
                  <p className="offer-category">{offer.category}</p>
                  <CardHeading>{offer.title}</CardHeading>
                </div>
              </div>
              <p>{offer.body}</p>
              <Link className="offer-link" href={`/services/${offer.slug}`}>
                {offer.cta} {arrowIcon}
              </Link>
            </article>
          ))}
        </div>

        <div className="services-subgroup">
          <CardHeading className="mini-heading">Ongoing partnerships</CardHeading>
          <p className="background-intro">
            Not every engagement ends at launch — these are ongoing ways to keep working
            together once a website, page, or product is live.
          </p>
        </div>
        <div className="offer-grid">
          {partnerships.map((plan) => (
            <article className="offer-card" key={plan.title}>
              <div className="offer-card-head">
                <div className="icon-badge" aria-hidden="true">
                  {plan.icon}
                </div>
                <h3>{plan.title}</h3>
              </div>
              <p>{plan.body}</p>
              <a
                className="offer-link"
                href={waLink(
                  `Hi, I'm interested in your ${plan.title} partnership and would like to discuss.`
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                {plan.cta} {arrowIcon}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
