import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Contact from "@/components/Contact";
import ScrollEffects from "@/components/ScrollEffects";
import { waLink } from "@/lib/contact";

const title = "Social Media Management — Surendhar Venkatesh";
const description =
  "Ongoing content creation and day-to-day page handling, so your social page builds trust before someone reaches your website. Backed by 10+ years in sales.";

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
          <Breadcrumbs
            trail={[
              { label: "Services", href: "/services" },
              { label: "Social Media Management" },
            ]}
          />
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

      <section className="section">
        <div className="container">
          <h2>A quiet page answers a question you didn&apos;t want asked.</h2>
          <p className="background-intro">
            Someone hears your name and looks you up before they ever reach your website.
            Whatever is at the top of that page is your first impression, whether you
            planned it or not.
          </p>
          <p className="background-intro">
            A page that hasn&apos;t posted in months doesn&apos;t read as busy. It reads as
            uncertain — still trading? still taking work? A page posting daily
            with nothing to say has the opposite problem, and costs you the same trust.
            Consistency is the point, and it is the part that quietly slides when the
            business gets busy.
          </p>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <h2>Day-to-day page handling</h2>
          <div className="capability-rows">
            <div className="capability-row">
              <p className="mini-heading">Content creation</p>
              <p>
                Posts and captions planned around what your audience actually responds
                to, not just posting for the sake of it. That means fewer posts that
                exist to fill a slot, and more that answer something a customer was
                already wondering.
              </p>
            </div>
            <div className="capability-row">
              <p className="mini-heading">Page handling</p>
              <p>
                Day-to-day management so your page stays active, responsive, and
                on-brand without it falling on you. Comments and messages get answered
                while the person is still interested, not a week later.
              </p>
            </div>
            <div className="capability-row">
              <p className="mini-heading">Sales-backed strategy</p>
              <p>
                A decade of sales experience shapes what gets posted and why — built
                to move people toward a decision rather than to chase reach. A page that
                looks busy and sells nothing is not the goal.
              </p>
            </div>
          </div>
        </div>
      </section>


      <section className="section">
        <div className="container">
          <h2>What a month looks like.</h2>
          <p className="background-intro">
            Three posts a week, twelve a month, as the standard cadence. The mix depends on
            what the strategy calls for: Reels, carousels, static posts, and supporting
            Stories.
          </p>
          <div className="capability-card">
            <p className="mini-heading">What the monthly retainer can cover</p>
            <ul className="scope-list">
                <li>Content strategy</li>
                <li>Content ideas and planning</li>
                <li>Copywriting and captions</li>
                <li>Creative direction</li>
                <li>Post and reel design</li>
                <li>Basic content scheduling</li>
                <li>Performance review and monthly optimisation</li>
            </ul>
          </div>
          <div className="capability-rows">
            <div className="capability-row">
              <p className="mini-heading">Social is a retainer, not an add-on</p>
              <p>
                Website development and social media management are separate services. A
                website project does not quietly include ongoing posting — social content
                starts only under its own monthly agreement, so neither side ends up
                assuming the other was covered.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Start with the page I run myself.</h2>
          <p className="background-intro">
            The most useful thing I can show you here is not a slide about strategy. It is a
            page you can open right now and judge on your own terms.
          </p>
          <p className="background-intro">
            <a
              href="https://www.instagram.com/surendhar_space/"
              target="_blank"
              rel="noopener noreferrer"
            >
              @surendhar_space
            </a>{" "}
            is mine, not a client&apos;s — so treat it as a sample of how I think about a
            page rather than as a case study. If the way it reads is the way you would want
            your own page to read, that is the conversation worth having.
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
