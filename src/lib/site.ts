// Every absolute URL on the site -- sitemap, canonical links, Open Graph,
// JSON-LD -- is built from SITE_URL, so pointing it at the wrong host tells
// search engines to credit a domain that may not be yours. That is slow and
// painful to undo, and nothing about it looks broken while it is happening.
//
// This file is imported only by server code (layout.tsx, robots.ts,
// sitemap.ts), so reading environment variables here is safe -- none of this
// reaches the client bundle.
//
// Resolution order:
//   1. NEXT_PUBLIC_SITE_URL -- set this explicitly in the host's environment.
//   2. VERCEL_PROJECT_PRODUCTION_URL -- Vercel's stable production domain,
//      injected automatically. Deliberately not VERCEL_URL, which is the
//      per-deployment hostname and would make every preview emit canonicals
//      pointing at itself.
//   3. FALLBACK_SITE_URL -- the registered domain, used for local dev.
//
// If the fallback is ever reached during a production build, that is a
// misconfiguration rather than a default, so it warns loudly instead of
// failing silently.
const FALLBACK_SITE_URL = "https://surendharvenkatesh.com";

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProduction) return `https://${vercelProduction}`;

  if (process.env.NODE_ENV === "production") {
    console.warn(
      "[site] Neither NEXT_PUBLIC_SITE_URL nor VERCEL_PROJECT_PRODUCTION_URL is " +
        `set. Falling back to ${FALLBACK_SITE_URL} for canonical URLs, the ` +
        "sitemap, Open Graph and JSON-LD. If that is not the domain this build " +
        "is served from, set NEXT_PUBLIC_SITE_URL before deploying."
    );
  }
  return FALLBACK_SITE_URL;
}

export const SITE_URL = resolveSiteUrl();

export const SITE_NAME = "Surendhar Venkatesh — Digital Studio";
