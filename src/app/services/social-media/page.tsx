import type { Metadata } from "next";
import Link from "next/link";
import Contact from "@/components/Contact";
import ScrollEffects from "@/components/ScrollEffects";

export const metadata: Metadata = {
  title: "Social Media Management — Surendhar Venkatesh",
  description:
    "Ongoing content creation, page handling, and social media marketing built to convert followers into customers, backed by 10+ years in sales.",
};

export default function SocialMediaPage() {
  return (
    <>
      <section className="section service-hero">
        <div className="container">
          <p className="eyebrow">Services · Social Media Management</p>
          <h1>A page that builds trust before they even visit.</h1>
          <p className="background-intro">
            Your social page is often seen before your website. We manage it to build
            confidence and familiarity consistently — not just to keep up appearances.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-accent" href="/contact">
              Let&apos;s discuss
            </Link>
            <Link className="btn btn-outline" href="/about">
              About the sales background
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <p className="eyebrow">What&apos;s included</p>
          <h2>Day-to-day page handling</h2>
          <div className="capability-grid">
            <div className="capability-card">
              <p className="mini-heading">Content creation</p>
              <p>Posts and captions planned around what your audience actually responds to, not just posting for the sake of it.</p>
            </div>
            <div className="capability-card">
              <p className="mini-heading">Page handling</p>
              <p>Day-to-day management so your page stays active, responsive, and on-brand without it falling on you.</p>
            </div>
            <div className="capability-card">
              <p className="mini-heading">Sales-backed strategy</p>
              <p>A decade of sales experience shapes what gets posted and why — built to move people toward a decision.</p>
            </div>
          </div>
        </div>
      </section>

      <Contact />
      <ScrollEffects />
    </>
  );
}
