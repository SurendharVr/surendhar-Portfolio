export const arrowIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export type Offer = {
  slug: string;
  icon: React.ReactNode;
  category?: string;
  title: string;
  body: string;
  cta: string;
};

export const offers: Offer[] = [
  {
    slug: "website-design",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M8 21h8M12 18v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    category: "Website Design",
    title: "A website that does more than look professional.",
    body: "Your website is often the first serious interaction someone has with your business. We design it to answer the questions that matter, build confidence quickly, and move the right visitors toward action.",
    cta: "Explore Website Design",
  },
  {
    slug: "social-media",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M17 20v-1a4 4 0 00-4-4H7a4 4 0 00-4 4v1M9 11a4 4 0 100-8 4 4 0 000 8zM23 20v-1a4 4 0 00-3-3.87M16 3.13A4 4 0 0119 7a4 4 0 01-3 3.87"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    category: "Social Media Management",
    title: "A page that builds trust before they even visit.",
    body: "Your social page is often seen before your website. We manage it to build confidence and familiarity consistently — not just to keep up appearances.",
    cta: "Explore Social Media Management",
  },
  {
    slug: "digital-products",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 006.5 22H20V2H6.5A2.5 2.5 0 004 4.5v15z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    category: "Digital Product Design",
    title: "Turn a good idea into something people can actually use.",
    body: "From ebooks to tools and templates, we turn ideas into intuitive products that are useful, understandable, and commercially viable.",
    cta: "Explore Digital Products",
  },
  {
    slug: "growth-strategy",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 12h4l3 8 4-16 3 8h4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    category: "Digital Growth & Strategy",
    title: "Your digital presence may not need a redesign. It may need better decisions.",
    body: "We identify where visitors hesitate, get confused, or disappear — then improve the experience around those moments, backed by 10+ years of sales insight.",
    cta: "Request an Audit",
  },
];

export const partnerships: Offer[] = [
  {
    slug: "website-care",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Website Care",
    body: "Ongoing maintenance, updates, and monitoring so your website stays fast, secure, and current after launch.",
    cta: "Let's discuss",
  },
  {
    slug: "growth",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4 19V9m6 10V5m6 14v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Growth",
    body: "Continued content and campaign work to keep bringing in traffic and leads after the initial launch.",
    cta: "Let's discuss",
  },
  {
    slug: "optimisation",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    title: "Optimisation",
    body: "Ongoing testing and refinement to improve conversion over time, not just on launch day.",
    cta: "Let's discuss",
  },
  {
    slug: "retainers",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M3 9h18M8 3v3M16 3v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Retainers",
    body: "A fixed monthly arrangement for ongoing design, content, or development support — planned around your calendar.",
    cta: "Start a conversation",
  },
];
