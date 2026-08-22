import type { Metadata } from "next";
import Link from "next/link";
import Contact from "@/components/Contact";
import ScrollEffects from "@/components/ScrollEffects";

export const metadata: Metadata = {
  title: "Digital Growth & Strategy — Surendhar Venkatesh",
  description:
    "Sales-backed strategy behind every page, post, and product decision — for small businesses that want to grow smarter, not just louder.",
};

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
          <p className="eyebrow">The approach</p>
          <h2>Discover, define, design, develop, optimise</h2>
          <p className="background-intro">
            Every strategy engagement runs through the same system used for full builds
            like Flavours Tec Kitchen and VAAV Kitchen &amp; Caterers — grounded in over a
            decade of B2B/B2C sales experience, not guesswork.
          </p>
          <div className="capability-grid">
            <div className="capability-card">
              <p className="mini-heading">What I build</p>
              <p>Websites, social media management, and digital products — planned, designed, and shipped end to end.</p>
            </div>
            <div className="capability-card">
              <p className="mini-heading">How I work</p>
              <p>Discover, Define, Design, Develop, Optimise — so decisions are based on the business, not guesswork.</p>
            </div>
            <div className="capability-card">
              <p className="mini-heading">What you get</p>
              <p>10+ years of reading what makes people buy shapes every page, post, and product decision.</p>
            </div>
          </div>
        </div>
      </section>

      <Contact />
      <ScrollEffects />
    </>
  );
}
