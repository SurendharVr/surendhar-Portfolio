import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Contact from "@/components/Contact";
import ScrollEffects from "@/components/ScrollEffects";
import { waLink } from "@/lib/contact";

const title = "Digital Growth & Strategy — Surendhar Venkatesh";
const description =
  "Sales-backed strategy behind every page, post, and product decision — for small businesses that want to grow smarter, not just louder.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services/growth-strategy" },
  openGraph: { title, description, url: "/services/growth-strategy" },
  twitter: { title, description },
};

const steps = [
  {
    n: "01",
    title: "Discover",
    body:
      "Understand the business. Four questions come first: who is it for, what are they trying to decide, what is stopping them, and why should they choose you.",
  },
  {
    n: "02",
    title: "Define",
    body:
      "Find the positioning and the opportunity, which are often narrower than expected. For Flavours Tec Kitchen it was corporate and high-value events, not everyday catering enquiries.",
  },
  {
    n: "03",
    title: "Design",
    body:
      "Build the experience around the audience you actually want, and around the enquiry you actually want to receive — not around what a competitor's site happens to look like.",
  },
  {
    n: "04",
    title: "Develop",
    body:
      "Turn the system into a real, working thing: a responsive site, the supporting collateral, and the technical groundwork underneath it.",
  },
  {
    n: "05",
    title: "Optimise",
    body:
      "Measure, improve, grow. This is the step most work skips, and the reason a launch is a starting point rather than a finish line.",
  },
];

export default function GrowthStrategyPage() {
  return (
    <>
      <section className="section service-hero">
        <div className="container">
          <Breadcrumbs
            trail={[
              { label: "Services", href: "/services" },
              { label: "Digital Growth & Strategy" },
            ]}
          />
          <h1>Your digital presence may not need a redesign. It may need better decisions.</h1>
          <p className="background-intro">
            I identify where visitors hesitate, get confused, or disappear — then improve
            the experience around those moments, backed by 10+ years of sales insight.
          </p>
          <div className="hero-actions">
            <a
              className="btn btn-accent"
              href={waLink(
                "Hi, I'd like to request a Digital Growth & Strategy audit."
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Request an Audit
            </a>
            <Link className="btn btn-outline" href="/services">
              See the full system
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Rebuilding is the expensive way to find out.</h2>
          <p className="background-intro">
            When results go flat, the instinct is to rebuild. It feels like progress, and
            it is the one option everyone recognises.
          </p>
          <p className="background-intro">
            The trouble is that a redesign changes everything at once. If it works, you
            don&apos;t know which part worked; if it doesn&apos;t, you have spent the
            budget and still don&apos;t know where people were dropping off. Often the
            thing costing you enquiries is one unclear paragraph, one missing answer, or
            one step that asks for too much too early — and none of those need a new
            website to fix.
          </p>
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


      <section className="section">
        <div className="container">
          <h2>The audit isn&apos;t a separate spend.</h2>
          <p className="background-intro">
            If the audit turns into a build, what you paid for it is credited against the
            build.
          </p>
          <p className="background-intro">
            So there is no decision to make between finding out what is actually costing
            you enquiries and doing something about it. You are not paying twice to answer
            one question.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="background-intro">
            Every engagement runs the same way, from signed contract through to a
            structured handover you keep:{" "}
            <Link href="/services#how-working-together-works">
              see what happens after you say yes
            </Link>
            .
          </p>
        </div>
      </section>

      <Contact />
      <ScrollEffects />
    </>
  );
}
