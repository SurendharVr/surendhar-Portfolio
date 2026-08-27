import type { NextConfig } from "next";

// Content-Security-Policy.
//
// script-src carries 'unsafe-inline' and that is a deliberate, evidence-based
// compromise rather than an oversight. The App Router emits three executable
// inline <script> tags into every prerendered page -- the beforeInteractive
// theme script, `(self.__next_f=...).push([0])`, and a ~28KB
// `self.__next_f.push([1,...])` RSC payload whose contents change with every
// content edit and every build. Hashing that is unmaintainable, and the only
// other option is a per-request nonce, which requires middleware and would
// turn all 16 statically prerendered routes into dynamically rendered ones.
// Trading the site's entire static-generation model for script-src hardening
// is a bad deal on an application with no authentication, no cookies, no user
// input and no server-side rendering of untrusted data.
//
// Note that hashes and nonces are NOT used anywhere in this policy on purpose:
// a browser that sees either one starts ignoring 'unsafe-inline', which would
// break the page.
//
// Everything else is tight. frame-ancestors, base-uri, form-action and
// object-src still do real work against an injected payload even while inline
// script is permitted.
//
// Origin allowlists were derived from the built output, not guessed:
//  - Fonts are self-hosted. `next/font/google` downloads them at build time and
//    serves them from /_next/static/media/*.woff2, so neither
//    fonts.googleapis.com nor fonts.gstatic.com is needed.
//  - The external origins in the HTML (wa.me, linkedin.com, amzn.in and the two
//    client sites) are all anchor hrefs. CSP does not govern top-level
//    navigation, so none of them needs allowlisting.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  // Same-origin only: the RSC payload fetches on client-side navigation. There
  // is no analytics, telemetry or third-party API call anywhere in the app, so
  // this also means an injected script has nowhere to send what it steals.
  "connect-src 'self'",
  "object-src 'none'",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  // The application contains no <form> at all, so nothing legitimate submits
  // anywhere. 'none' means an injected form cannot post credentials offsite.
  "form-action 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Redundant with frame-ancestors for modern browsers, kept for older ones
  // that never implemented it.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Ignored over plain HTTP, so harmless locally; the host must terminate TLS
  // for it to mean anything. Not submitted to the preload list -- that is a
  // one-way door and should be a deliberate, separate decision.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  // The site uses none of these. Denying them up front means an injected
  // script cannot silently reach for a camera or a location prompt.
  {
    key: "Permissions-Policy",
    value: [
      "accelerometer=()",
      "autoplay=()",
      "camera=()",
      "display-capture=()",
      "encrypted-media=()",
      "geolocation=()",
      "gyroscope=()",
      "magnetometer=()",
      "microphone=()",
      "midi=()",
      "payment=()",
      "usb=()",
      "xr-spatial-tracking=()",
    ].join(", "),
  },
];

const nextConfig: NextConfig = {
  // SEC-06: stop advertising the framework in every response.
  poweredByHeader: false,

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // SEC-07, caching half. Files under /public are served with
      // `max-age=0`, so the raw paths re-transfer from origin on every hit
      // even though pages reference them through next/image. These are
      // content assets that only change when their filename changes, so a
      // long immutable lifetime is safe and stops the raw path being a free
      // way to run up origin bandwidth.
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
