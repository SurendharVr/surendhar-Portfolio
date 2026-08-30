import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export type Crumb = {
  label: string;
  /** Omitted on the last crumb: the current page is not a link to itself. */
  href?: string;
};

/**
 * Renders the visible trail AND the BreadcrumbList JSON-LD from one array, so
 * the two cannot drift apart. That is the whole point: structured data has to
 * mirror what the page actually shows, and a breadcrumb marked up but never
 * rendered is the same class of defect as the addressRegion claim that used to
 * sit in layout.tsx.
 *
 * These pages already displayed the trail as plain text ("Services · Website
 * Design"); this keeps that exact wording and separator, and makes the parent
 * crumb an actual link.
 */
export default function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      // The last crumb is the current page, so it carries no `item` -- per
      // Google's guidance the final element may omit it.
      ...(crumb.href ? { item: `${SITE_URL}${crumb.href}` } : {}),
    })),
  };

  return (
    <>
      <nav className="eyebrow breadcrumbs" aria-label="Breadcrumb">
        <ol>
          {trail.map((crumb, i) => {
            const isLast = i === trail.length - 1;
            return (
              <li key={crumb.label}>
                {crumb.href && !isLast ? (
                  <Link href={crumb.href}>{crumb.label}</Link>
                ) : (
                  <span aria-current="page">{crumb.label}</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
