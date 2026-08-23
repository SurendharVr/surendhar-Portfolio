import type { Metadata } from "next";
import Link from "next/link";
import Contact from "@/components/Contact";
import ScrollEffects from "@/components/ScrollEffects";

export const metadata: Metadata = {
  title: "Digital Growth & Strategy — Surendhar Venkatesh",
  description:
    "Sales-backed strategy behind every page, post, and product decision — for small businesses that want to grow smarter, not just louder.",
};

const steps = [
  { n: "01", title: "Discover", body: "Understand the business." },
  { n: "02", title: "Define", body: "Find the positioning and opportunity." },
  { n: "03", title: "Design", body: "Build the experience." },
  { n: "04", title: "Develop", body: "Turn the system into reality." },
  { n: "05", title: "Optimise", body: "Measure, improve, grow." },
];

export default function GrowthStrategyPage() {
  return (
    <>
      <section className="section service-hero">
        <div className="container">
          <p className="eyebrow">Services · Digital Growth &amp; Strategy</p>
          <h1>Your digital presence may not need a redesign. It may need better decisions.</h1>
          <p className="background-intro">
            We identify where visitors hesitate, get confused, or disappear — then improve
            the experience around those moments, backed by 10+ years of sales insight.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-accent" href="/contact">
              Request an Audit
            </Link>
            <Link className="btn btn-outline" href="/services">
              See the full system
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <h2>Discover, define, design, develop, optimise</h2>
          <p className="background-intro">
            Every strategy engagement runs through the same system used for full builds
            like Flavours Tec Kitchen and VAAV Kitchen &amp; Caterers — grounded in over a
            decade of B2B/B2C sales experience, not guesswork.
          </p>
          <ol className="process-steps">
            {steps.map((step) => (
              <li key={step.n}>
                <span className="process-number">{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Contact showEyebrow={false} />
      <ScrollEffects />
    </>
  );
}
