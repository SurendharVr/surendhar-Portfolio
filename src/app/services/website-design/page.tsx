import type { Metadata } from "next";
import Link from "next/link";
import WorkThumb from "@/components/WorkThumb";
import Contact from "@/components/Contact";
import ScrollEffects from "@/components/ScrollEffects";
import { waLink } from "@/lib/contact";

const title = "Website Design — Surendhar Venkatesh";
const description =
  "Strategic websites designed around credibility, clarity, and conversion for small businesses — including Flavours Tec Kitchen and VAAV Kitchen & Caterers.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services/website-design" },
  openGraph: { title, description, url: "/services/website-design" },
  twitter: { title, description },
};

export default function WebsiteDesignPage() {
  return (
    <>
      <section className="section service-hero">
        <div className="container">
          <p className="eyebrow">Services · Website Design</p>
          <h1>A website that does more than look professional.</h1>
          <p className="background-intro">
            Your website is often the first serious interaction someone has with your
            business. I design it to answer the questions that matter, build confidence
            quickly, and move the right visitors toward action.
          </p>
          <div className="hero-actions">
            <a
              className="btn btn-accent"
              href={waLink(
                "Hi, I'm interested in Website Design and would like to discuss a project."
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Start a Project
            </a>
            <Link className="btn btn-outline" href="/work">
              See full case studies
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <h2>Two real websites, built end to end</h2>
          <div className="work-grid">
            <article className="work-card">
              <WorkThumb
                src="/assets/work-flavourstec.png"
                alt="Flavours Tec Kitchen website homepage"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <p className="work-tag">Website · Corporate Catering</p>
              <h3>Flavours Tec Kitchen</h3>
              <p>
                A positioning-led site covering Executive Dining, Convention Catering, and
                Celebrity &amp; VIP Events, with a technical SEO and accessibility (WCAG)
                pass.
              </p>
              <a
                className="work-link"
                href="https://flavoursteckitchen.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit site
              </a>
            </article>
            <article className="work-card">
              <WorkThumb
                src="/assets/work-vaav.png"
                alt="VAAV Kitchen and Caterers website homepage"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <p className="work-tag">Website · Kitchen &amp; Caterers</p>
              <h3>VAAV Kitchen &amp; Caterers</h3>
              <p>
                A dedicated website — &quot;Taste of Tradition, Quality of Modernity&quot;
                — alongside supporting collateral for local discovery.
              </p>
              <a
                className="work-link"
                href="https://vaavkitchenandcaterers.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit site
              </a>
            </article>
          </div>
        </div>
      </section>

      <Contact />
      <ScrollEffects />
    </>
  );
}
