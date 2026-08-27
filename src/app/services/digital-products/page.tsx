import type { Metadata } from "next";
import Link from "next/link";
import WorkThumb from "@/components/WorkThumb";
import Contact from "@/components/Contact";
import ScrollEffects from "@/components/ScrollEffects";
import { waLink } from "@/lib/contact";

const title = "Digital Product Design — Surendhar Venkatesh";
const description =
  "Turn an idea into a polished, sellable digital product — from ebooks to tools and templates, including the published Kindle ebook 'Eight Hours, Still Exhausted.'";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services/digital-products" },
  openGraph: { title, description, url: "/services/digital-products" },
  twitter: { title, description },
};

export default function DigitalProductsServicePage() {
  return (
    <>
      <section className="section service-hero">
        <div className="container">
          <p className="eyebrow">Services · Digital Product Design</p>
          <h1>Turn a good idea into something people can actually use.</h1>
          <p className="background-intro">
            From ebooks to tools and templates, I turn ideas into intuitive products that
            are useful, understandable, and commercially viable.
          </p>
          <div className="hero-actions">
            <a
              className="btn btn-accent"
              href={waLink(
                "Hi, I'm interested in Digital Product Design and would like to discuss."
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Let&apos;s discuss
            </a>
            <Link className="btn btn-outline" href="/products">
              See digital products
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <h2>A real digital product, live on Amazon</h2>
          <div className="work-grid work-grid-2">
            <article className="work-card">
              <WorkThumb
                src="/assets/work-ebook-cover.webp"
                alt="Eight Hours, Still Exhausted book cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                cover
              />
              <p className="work-tag">Live now · Kindle Ebook</p>
              <h3>&quot;Eight Hours, Still Exhausted&quot;</h3>
              <p>
                Researched, written, structured, and designed solo — a complete,
                sales-ready digital product.
              </p>
              <a
                className="work-link"
                href="https://amzn.in/d/0fsbhHBE"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Amazon
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
