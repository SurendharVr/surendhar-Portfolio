import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Crawling is allowed, and the host it is allowed on is a Vercel-assigned one
// -- currently surendhar-space.vercel.app. That is a deliberate trade, made
// with the cost in view, and it reverses the earlier decision in this file.
//
// What it costs. Every signal Google accumulates accrues to a hostname that is
// meant to be temporary, and results will display "surendhar-space.vercel.app"
// rather than a brand. For a studio that sells website design, the second of
// those is the sharper cost, and it is visible to every person who sees the
// listing.
//
// Why it is acceptable anyway. The migration this file previously warned about
// scales with the authority already earned, and a site nobody links to yet has
// almost none to carry across. Waiting does not preserve authority that does
// not exist; it only postpones the point at which any is earned at all, and
// keeps Search Console empty in the meantime.
//
// WHEN THE DOMAIN ARRIVES, in this order:
//   1. Register it and add it to the Vercel project.
//   2. Make it the project's primary domain. SITE_URL resolves from
//      VERCEL_PROJECT_PRODUCTION_URL (see lib/site.ts), so every canonical,
//      Open Graph URL, JSON-LD id and sitemap entry follows automatically --
//      no code change, no env var to remember. Setting NEXT_PUBLIC_SITE_URL
//      would pin it instead, and is only worth doing if the production domain
//      must differ from the one Vercel considers primary.
//   3. Configure the .vercel.app host to 301 to the new domain, in the Vercel
//      dashboard. This is the step that carries the signals over, and it is
//      the one with no code in it, so it is the one most likely to be
//      forgotten.
//   4. Re-run the audit. The canonical host changing is exactly the kind of
//      thing worth a crawl afterwards.
//
// Note what allow does and does not do. It permits fetching; it is not a
// request to index, and the two are separate. If the goal ever becomes
// "crawlable but not indexed" -- reasonable on a staging host -- the tool is
// `X-Robots-Tag: noindex` in next.config.ts, and it only works while the crawl
// is allowed, so that the header can be read at all. The two do not stack in
// the other direction: a disallowed crawl cannot see a noindex header.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
