"use client";

import { useState } from "react";
import WorkThumb from "./WorkThumb";

const externalIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M7 17L17 7M17 7H8M17 7v9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const chevronIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type CaseStudy = {
  id: string;
  src: string;
  alt: string;
  cover?: boolean;
  tag: string;
  title: string;
  client: string;
  outcome: string;
  details: { label: string; body: string }[];
  linkHref: string;
  linkLabel: string;
};

const caseStudies: CaseStudy[] = [
  {
    id: "flavourstec",
    src: "/assets/work-flavourstec.png",
    alt: "Flavours Tec Kitchen website homepage",
    tag: "Website · Corporate Catering",
    title: "From catering company to premium event experience.",
    client: "Flavours Tec Kitchen",
    outcome: "Live and positioned to compete for higher-value catering contracts.",
    details: [
      {
        label: "Challenge",
        body: "Flavours Tec Kitchen already had the capability to serve high-value events. The problem was that their digital presence didn't communicate that level of experience.",
      },
      {
        label: "Business",
        body: "The real opportunity was in corporate and high-value events — executive dining, convention catering, and VIP events — not everyday catering enquiries.",
      },
      {
        label: "Approach",
        body: "Redesigned the website around the audiences they wanted to attract and the enquiries they wanted to generate — positioned around Executive Dining, Convention Catering, and Celebrity & VIP Events.",
      },
      {
        label: "Experience",
        body: "A full responsive website built from the client's own materials, with a technical SEO and accessibility (WCAG) pass.",
      },
    ],
    linkHref: "https://flavoursteckitchen.com/",
    linkLabel: "Visit site",
  },
  {
    id: "vaav",
    src: "/assets/work-vaav.png",
    alt: "VAAV Kitchen and Caterers website homepage",
    tag: "Website · Kitchen & Caterers",
    title: "From traditional kitchen to a modern, discoverable brand.",
    client: "VAAV Kitchen & Caterers",
    outcome: "A live, dedicated web presence ready for local discovery.",
    details: [
      {
        label: "Challenge",
        body: "VAAV needed an online presence that reflected both its traditional roots and a modern operation.",
      },
      {
        label: "Business",
        body: "What mattered was being found locally and trusted quickly — not just having a website that existed.",
      },
      {
        label: "Approach",
        body: 'Built a dedicated website — "Taste of Tradition, Quality of Modernity" — alongside supporting collateral for local discovery.',
      },
      {
        label: "Experience",
        body: "Live website plus a Google Business QR code setup for easy customer access.",
      },
    ],
    linkHref: "https://vaavkitchenandcaterers.com/",
    linkLabel: "Visit site",
  },
  {
    id: "ebook",
    src: "/assets/work-ebook-cover.webp",
    alt: "Eight Hours, Still Exhausted book cover",
    cover: true,
    tag: "Digital Product · Kindle Ebook",
    title: "From a health insight to a published, sellable product.",
    client: '"Eight Hours, Still Exhausted"',
    outcome: "Published and live on Amazon Kindle.",
    details: [
      {
        label: "Challenge",
        body: "Turn a widely misunderstood problem — sleeping a full eight hours and still waking up exhausted — into a research-backed, sellable digital product.",
      },
      {
        label: "Business",
        body: "The opportunity was in specificity: not another generic wellness book, but one built around four fixable mechanisms.",
      },
      {
        label: "Approach",
        body: "Researched and wrote a book grounded in published sleep science (Czeisler, Roenneberg), packaged as a practical four-night self-test system.",
      },
      {
        label: "Experience",
        body: '"Eight Hours, Still Exhausted: Why the standard fixes didn\'t hold — and four nights to find out what will" — a complete, skimmable, tactical ebook.',
      },
    ],
    linkHref: "https://amzn.in/d/0fsbhHBE",
    linkLabel: "View on Amazon",
  },
];

function WorkCard({ study }: { study: CaseStudy }) {
  const [open, setOpen] = useState(false);
  const detailsId = `${study.id}-details`;

  return (
    <article className="work-card">
      <WorkThumb
        src={study.src}
        alt={study.alt}
        sizes="(max-width: 768px) 100vw, 33vw"
        cover={study.cover}
      />
      <p className="work-tag">{study.tag}</p>
      <h3>{study.title}</h3>
      <p className="work-client">{study.client}</p>
      <dl className="work-details">
        <div>
          <dt>Status</dt>
          <dd>{study.outcome}</dd>
        </div>
      </dl>
      <button
        type="button"
        className="work-expand-toggle"
        aria-expanded={open}
        aria-controls={detailsId}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "Show less" : "Read the full case study"}
        <span className={`work-expand-icon${open ? " is-open" : ""}`}>{chevronIcon}</span>
      </button>
      <div className={`work-details-collapsible${open ? " is-open" : ""}`} id={detailsId}>
        <div>
          <dl className="work-details">
            {study.details.map((d) => (
              <div key={d.label}>
                <dt>{d.label}</dt>
                <dd>{d.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <a className="work-link" href={study.linkHref} target="_blank" rel="noopener noreferrer">
        {study.linkLabel} {externalIcon}
      </a>
    </article>
  );
}

export default function Work({
  headingLevel = "h2",
  showEyebrow = false,
}: {
  headingLevel?: "h1" | "h2";
  showEyebrow?: boolean;
}) {
  const Heading = headingLevel;
  return (
    <section className="section" id="work">
      <div className="container">
        {showEyebrow && <p className="eyebrow">Work</p>}
        <Heading>Selected work</Heading>

        <div className="work-grid">
          {caseStudies.map((study) => (
            <WorkCard key={study.id} study={study} />
          ))}
        </div>
      </div>
    </section>
  );
}
