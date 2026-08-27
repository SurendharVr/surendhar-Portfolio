import type { MetadataRoute } from "next";

// Crawling is disabled while the site is served from its Vercel-assigned
// hostname. SITE_URL resolves from the deployment environment, so with no
// domain registered yet it currently resolves to
// surendhar-portfolio-two.vercel.app -- and every canonical, Open Graph URL
// and sitemap entry names that host. Anything indexed under it now would have
// to be migrated to the real domain later rather than simply published, which
// is slower to undo than it is to prevent.
//
// TO GO LIVE, in this order -- the order matters, because pointing SITE_URL at
// a domain that does not resolve yet is worse than pointing it at this one:
//   1. Register the domain and add it to the Vercel project.
//   2. Set NEXT_PUBLIC_SITE_URL to it (first in the resolution order in
//      lib/site.ts, so it overrides the Vercel-assigned host).
//   3. Restore this file to:
//        import { SITE_URL } from "@/lib/site";
//        rules: { userAgent: "*", allow: "/" },
//        sitemap: `${SITE_URL}/sitemap.xml`,
//
// Note the limit of what this does: it asks crawlers not to fetch, which is
// not a guarantee of non-indexing. A URL discovered through an inbound link
// can still surface as a bare result with no snippet. Nothing links to this
// host yet, which is why the cheap directive is enough for now. The stronger
// tool is `X-Robots-Tag: noindex` in next.config.ts, and note that the two do
// not stack: noindex only works if the crawl is *allowed*, so that the header
// can actually be read.
//
// /sitemap.xml stays routed and correct, it is just no longer advertised here.
// The P0 suite's SEO-02 check fetches it directly and is unaffected.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
