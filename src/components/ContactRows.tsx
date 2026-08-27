import type { ReactNode } from "react";
import { waLink, PHONE_E164, PHONE_DISPLAY } from "@/lib/whatsapp";
import WhatsAppIcon from "@/components/WhatsAppIcon";

// The contact list is rendered in two places with different subsets: five rows
// in the page-level Contact section, and a trimmed three on the scroll-snap
// homepage's CONVERT screen. Those were two copies of identical markup, down to
// the SVG path data -- and the row-count difference between them was invisible
// without diffing the files. That fork has already misled one reader into
// checking a CSS rule against the wrong component's markup.
//
// Only the rows are shared here, deliberately. The two sections *around* them
// differ six ways (wrapper class, section id, heading level, eyebrow handling,
// row count, copyright line), so merging those would take five props to
// express and would be harder to read than the duplication. The rows are the
// part that actually drifts, so the rows are the part that gets extracted.
//
// Order is the caller's, and it matters: site.css hides
// `.contact-list li:nth-child(n + 3)` on the mobile snap homepage, so which
// rows survive at that width is decided by the array passed in.
type RowId = "email" | "phone" | "whatsapp" | "linkedin" | "location";

const ROWS: Record<RowId, ReactNode> = {
  email: (
    <>
      <span className="icon-badge icon-badge-sm" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M4 4h16v16H4V4z" stroke="currentColor" strokeWidth="2" />
          <path
            d="M4 6l8 7 8-7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <a href="mailto:venkateshsurendhar@gmail.com">venkateshsurendhar@gmail.com</a>
    </>
  ),
  phone: (
    <>
      <span className="icon-badge icon-badge-sm" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.68 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0122 16.92z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <a href={`tel:${PHONE_E164}`}>{PHONE_DISPLAY}</a>
    </>
  ),
  whatsapp: (
    <>
      <span className="whatsapp-badge" aria-hidden="true">
        <WhatsAppIcon size={28} />
      </span>
      <a
        href={waLink("Hi, I'd like to get in touch.")}
        target="_blank"
        rel="noopener noreferrer"
      >
        WhatsApp
      </a>
    </>
  ),
  linkedin: (
    <>
      <span className="icon-badge icon-badge-sm" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M16 8a6 6 0 016 6v6h-4v-6a2 2 0 00-4 0v6h-4v-6a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <a
        href="https://www.linkedin.com/in/surendhar-venkatesh"
        target="_blank"
        rel="noopener noreferrer"
      >
        linkedin.com/in/surendhar-venkatesh
      </a>
    </>
  ),
  location: (
    <>
      <span className="icon-badge icon-badge-sm" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 21s-7-5.33-7-11a7 7 0 0114 0c0 5.67-7 11-7 11z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
        </svg>
      </span>
      <span>Chennai, India</span>
    </>
  ),
};

export default function ContactRows({ rows }: { rows: readonly RowId[] }) {
  return (
    <ul className="contact-list">
      {rows.map((id) => (
        <li key={id}>{ROWS[id]}</li>
      ))}
    </ul>
  );
}
