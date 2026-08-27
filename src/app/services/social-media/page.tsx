import type { Metadata } from "next";
import Link from "next/link";
import Contact from "@/components/Contact";
import ScrollEffects from "@/components/ScrollEffects";
import { waLink } from "@/lib/whatsapp";

const title = "Social Media Management — Surendhar Venkatesh";
const description =
  "Ongoing content creation, page handling, and social media marketing built to convert followers into customers, backed by 10+ years in sales.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services/social-media" },
  openGraph: { title, description, url: "/services/social-media" },
  twitter: { title, description },
};

export default function SocialMediaPage() {
  return (
    <>
      <section className="section service-hero">
        <div className="container">
          <p className="eyebrow">Services · Social Media Management</p>
          <h1>A page that builds trust before they even visit.</h1>
          <p className="background-intro">
            Your social page is often seen before your website. I manage it to build
            confidence and familiarity consistently — not just to keep up appearances.
          </p>
          <div className="hero-actions">
            <a
              className="btn btn-accent"
              href={waLink(
                "Hi, I'm interested in Social Media Management and would like to discuss."
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Let&apos;s discuss
            </a>
            <Link className="btn btn-outline" href="/about">
              About the sales background
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <h2>Day-to-day page handling</h2>
          <div className="capability-rows">
            <div className="capability-row">
              <p className="mini-heading">Content creation</p>
              <p>Posts and captions planned around what your audience actually responds to, not just posting for the sake of it.</p>
            </div>
            <div className="capability-row">
              <p className="mini-heading">Page handling</p>
              <p>Day-to-day management so your page stays active, responsive, and on-brand without it falling on you.</p>
            </div>
            <div className="capability-row">
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
