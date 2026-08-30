import type { Metadata } from "next";
import Link from "next/link";
import WorkThumb from "@/components/WorkThumb";
import Breadcrumbs from "@/components/Breadcrumbs";
import Contact from "@/components/Contact";
import ScrollEffects from "@/components/ScrollEffects";
import { waLink } from "@/lib/contact";

const title = "Digital Product Design — Surendhar Venkatesh";
const description =
  "Turn an idea into a polished, sellable digital product — from ebooks to tools and templates, including the Kindle ebook 'Eight Hours, Still Exhausted.'";

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
          <Breadcrumbs
            trail={[
              { label: "Services", href: "/services" },
              { label: "Digital Product Design" },
            ]}
          />
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

      <section className="section">
        <div className="container">
          <h2>The idea isn&apos;t the hard part.</h2>
          <p className="background-intro">
            Most digital products die somewhere between &quot;that would be useful&quot;
            and a finished thing someone can buy.
          </p>
          <p className="background-intro">
            The gap is rarely the concept. It is the decisions after it — what to leave
            out, how to structure it so a reader can actually follow it, what makes it
            worth paying for rather than searching for, and how it gets published at all.
            Those decisions are the work, and they are the ones that stall an idea for
            years.
          </p>
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
              <p>
                The subject is a widely misunderstood one: sleeping a full eight hours and
                still waking up exhausted. Rather than another generic wellness book, it is
                built around four fixable mechanisms, grounded in published sleep science,
                and packaged as a practical four-night self-test a reader can actually run.
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


      <section className="section">
        <div className="container">
          <h2>You own what you paid for.</h2>
          <p className="background-intro">
            A product I build for you is yours. It publishes under your name, you hold the
            files, and you keep it whether or not we work together again.
          </p>
          <p className="background-intro">
            &quot;Eight Hours, Still Exhausted&quot; is the exception on this page, and only
            because it is mine — my own idea, published under my own name. It is here as
            evidence that I can take something from a first thought to a finished product on
            a shelf, not as an example of what happens to yours.
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
