import type { Metadata } from "next";
import Link from "next/link";
import WorkThumb from "@/components/WorkThumb";
import Breadcrumbs from "@/components/Breadcrumbs";
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
          <Breadcrumbs
            trail={[
              { label: "Services", href: "/services" },
              { label: "Website Design" },
            ]}
          />
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

      <section className="section">
        <div className="container">
          <h2>The site isn&apos;t the problem. The silence after it is.</h2>
          <p className="background-intro">
            Nobody emails to say your website confused them. They just don&apos;t get in
            touch, and you read that as a quiet month.
          </p>
          <p className="background-intro">
            What&apos;s usually going wrong is narrower than a redesign. A visitor arrives
            with three questions — what do you actually do, is it for someone like me,
            and what happens if I reach out — and the page answers a different one. It
            looks professional the whole time. That&apos;s what makes it hard to spot from
            the inside.
          </p>
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


      <section className="section">
        <div className="container">
          <h2>How long it takes</h2>
          <p className="background-intro">
            Most basic projects go from signed contract to live in seven to ten days.
          </p>
          <p className="background-intro">
            Anything more custom takes longer, and the real timeline is written into the
            contract before you sign it — agreed up front rather than estimated
            afterwards and revised while you wait.
          </p>
          <p className="background-intro">
            The build is a one-off project, not a subscription. Ongoing maintenance, SEO and
            optimisation after launch are available as{" "}
            <Link href="/services">an optional monthly retainer</Link>, and optional is
            meant literally: nothing about the build depends on taking one.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>What a build includes, and what it doesn&apos;t.</h2>
          <p className="background-intro">
            Scope is what quietly turns a fixed price into an open one. Here is where the
            line sits, so nothing has to be renegotiated halfway through.
          </p>
          <div className="reasons-grid reasons-grid-2">
            <div className="capability-card">
              <p className="mini-heading">Included</p>
              <ul className="scope-list">
                <li>Custom design and development from the approved brief</li>
                <li>Responsive across desktop, tablet, and mobile</li>
                <li>The agreed pages, sections, and reusable components</li>
                <li>Navigation, contact forms, CTAs, and basic interactions</li>
                <li>Performance and responsive testing</li>
                <li>On-page and technical SEO essentials — page titles, meta descriptions, heading structure, image alt text, clean URLs, and a sitemap</li>
                <li>Analytics and tracking set up, where you provide access</li>
                <li>Deployment to your hosting and domain</li>
                <li>Final QA, launch support, and handover of access and credentials</li>
              </ul>
            </div>
            <div className="capability-card">
              <p className="mini-heading">Not included, unless the proposal says so</p>
              <ul className="scope-list scope-list-out">
                <li>Pages or design concepts beyond the agreed scope, and redesigns after approval</li>
                <li>Major changes requested after design or development sign-off</li>
                <li>Full copywriting, content strategy, or ongoing content publishing</li>
                <li>Professional photography and videography</li>
                <li>Paid stock images, fonts, plugins, or software</li>
                <li>Advanced SEO campaigns and backlink acquisition</li>
                <li>E-commerce, custom web applications, or complex functionality</li>
                <li>Third-party integrations not named in the scope</li>
                <li>Hosting and domain fees</li>
                <li>
                  Ongoing maintenance and support, available as{" "}
                  <Link href="/services">an optional monthly retainer</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="capability-rows">
            <div className="capability-row">
              <p className="mini-heading">Copy</p>
              <p>
                Your copy is included, along with minor editing and formatting of it. Full
                copywriting is in scope only when the proposal says so.
              </p>
            </div>
            <div className="capability-row">
              <p className="mini-heading">Images</p>
              <p>
                Your own images are preferred. Stock can be sourced where we agree on it,
                but licensing costs are billed separately rather than absorbed quietly.
              </p>
            </div>
            <div className="capability-row">
              <p className="mini-heading">SEO</p>
              <p>
                The build covers technical and on-page essentials. It is not an SEO campaign
                and it carries no ranking guarantees — nobody can honestly promise those.
              </p>
            </div>
            <div className="capability-row">
              <p className="mini-heading">Hosting and handover</p>
              <p>
                The site is deployed to the hosting environment we agree on. Hosting, domain
                registration, premium plugins, paid themes, third-party APIs and
                subscriptions are recurring costs you own, and at handover the accounts are
                in your name.
              </p>
            </div>
          </div>
          <p className="background-intro">
            Anything outside the agreed scope is quoted separately, before the work begins.
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
