// Run with the production build serving on :3000
//   npm run build && npm start
//   node tests/p0-crawl.mjs
// Exits non-zero on any failure, so it drops straight into CI.
//
// P0 crawl tests against the running production build.
// Covers: CONV-01 (consistency half), CONV-02, NAV-01, SEO-01, SEO-02,
// MOTION-01 (no-JS content half).
import { readdir, stat } from "node:fs/promises";

const BASE = "http://localhost:3000";

const ROUTES = [
  "/", "/services", "/services/website-design", "/services/social-media",
  "/services/growth-strategy", "/services/digital-products",
  "/work", "/products", "/about", "/contact",
];

const results = [];
function record(id, name, pass, detail) {
  results.push({ id, name, pass, detail });
}

const pages = {};
for (const r of ROUTES) {
  const res = await fetch(BASE + r);
  pages[r] = { status: res.status, html: await res.text() };
}

const all = Object.entries(pages);

// ---------- CONV-02: every wa.me link, correct number + message ----------
const waRe = /href="(https:\/\/wa\.me\/[^"]+)"/g;
const waLinks = [];
for (const [route, { html }] of all) {
  for (const m of html.matchAll(waRe)) {
    waLinks.push({ route, url: m[1].replace(/&amp;/g, "&") });
  }
}
const waNumbers = new Set();
const waMessages = new Set();
let malformed = [];
for (const { route, url } of waLinks) {
  const m = url.match(/^https:\/\/wa\.me\/(\d+)\?text=(.+)$/);
  if (!m) { malformed.push({ route, url }); continue; }
  waNumbers.add(m[1]);
  try {
    const msg = decodeURIComponent(m[2]);
    if (!msg.trim()) malformed.push({ route, url, why: "empty message" });
    waMessages.add(msg);
  } catch { malformed.push({ route, url, why: "undecodable text param" }); }
}
record("CONV-02", "Every CTA opens WhatsApp with a correct prefilled message",
  waLinks.length > 0 && malformed.length === 0 && waNumbers.size === 1,
  `${waLinks.length} links across ${ROUTES.length} routes · numbers=${[...waNumbers].join(",")} · ${waMessages.size} distinct messages · malformed=${malformed.length}` +
  (malformed.length ? " " + JSON.stringify(malformed) : "") +
  "\n      messages: " + [...waMessages].map(m => JSON.stringify(m)).join("  "));

// ---------- CONV-01 (automatable half): three number copies agree ----------
const home = pages["/"].html;
const contact = pages["/contact"].html;
const jsonLdMatch = home.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
const jsonLd = jsonLdMatch ? JSON.parse(jsonLdMatch[1]) : null;
const telMatch = contact.match(/href="tel:(\+?[\d]+)"/);
const numbers = new Set([
  ...waNumbers,
  jsonLd?.telephone?.replace("+", ""),
  telMatch?.[1]?.replace("+", ""),
].filter(Boolean));
record("CONV-01a", "wa.me digits, JSON-LD telephone and tel: href all agree",
  numbers.size === 1,
  `distinct=${[...numbers].join(", ")} · jsonLd=${jsonLd?.telephone} · tel=${telMatch?.[1]}`);

// ---------- CONV-01b: the email agrees across all three surfaces ----------
// Same reasoning as the number above: the address is single-sourced in
// lib/contact.ts, so this asserts the *rendered* surfaces still agree rather
// than importing the constant -- a test that imports the value it is checking
// would pass just as happily with a wrong value in it.
const EXPECTED_EMAIL = "venkateshsurendhar@gmail.com";
const mailtoHrefs = new Set(
  [...contact.matchAll(/href="mailto:([^"]+)"/g)].map((m) => m[1])
);
const emailLinkText = new Set(
  [...contact.matchAll(/href="mailto:[^"]+"[^>]*>([^<]+)</g)].map((m) => m[1])
);
const emails = new Set([...mailtoHrefs, ...emailLinkText, jsonLd?.email].filter(Boolean));
record("CONV-01b", "mailto href, visible link text and JSON-LD email all agree",
  emails.size === 1 && emails.has(EXPECTED_EMAIL),
  `distinct=${[...emails].join(", ")} · hrefs=${mailtoHrefs.size} · jsonLd=${jsonLd?.email}`);

// ---------- NAV-01: every internal link resolves ----------
const internal = new Set();
for (const [, { html }] of all) {
  for (const m of html.matchAll(/href="(\/[^"#?][^"]*)"/g)) {
    const href = m[1].replace(/&amp;/g, "&");
    if (href.startsWith("//")) continue;
    if (/\.(png|jpg|jpeg|svg|ico|webp|txt|xml|js|css)$/i.test(href)) continue;
    if (href.startsWith("/_next")) continue;
    internal.add(href);
  }
}
const broken = [];
for (const href of internal) {
  const res = await fetch(BASE + href, { redirect: "manual" });
  if (res.status !== 200) broken.push(`${href} -> ${res.status}`);
}
record("NAV-01", "Every internal link reaches a real page",
  broken.length === 0,
  `${internal.size} distinct internal hrefs checked · broken=${broken.length}` + (broken.length ? " " + broken.join(", ") : ""));

// ---------- SEO-01: canonicals absolute, unique, one host ----------
const canonicals = {};
const hosts = new Set();
for (const [route, { html }] of all) {
  const m = html.match(/<link rel="canonical" href="([^"]+)"\/?>/);
  canonicals[route] = m?.[1] ?? null;
  if (m) { try { hosts.add(new URL(m[1]).host); } catch { hosts.add("INVALID"); } }
}
const missingCanonical = Object.entries(canonicals).filter(([, v]) => !v).map(([k]) => k);
const canonValues = Object.values(canonicals).filter(Boolean);
const uniqueCanon = new Set(canonValues).size === canonValues.length;
record("SEO-01", "Canonical URLs absolute, unique, single host",
  missingCanonical.length === 0 && hosts.size === 1 && uniqueCanon,
  `host=${[...hosts].join(",")} · ${canonValues.length}/${ROUTES.length} present · unique=${uniqueCanon}` +
  (missingCanonical.length ? ` · MISSING: ${missingCanonical.join(", ")}` : ""));

// ---------- SEO-02: sitemap set == route set ----------
const sitemapXml = await (await fetch(BASE + "/sitemap.xml")).text();
const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const sitemapPaths = new Set(sitemapUrls.map(u => new URL(u).pathname.replace(/\/$/, "") || "/"));
const routeSet = new Set(ROUTES);
const missingFromSitemap = [...routeSet].filter(r => !sitemapPaths.has(r));
const extraInSitemap = [...sitemapPaths].filter(p => !routeSet.has(p));
const sitemap404s = [];
for (const u of sitemapUrls) {
  const res = await fetch(BASE + new URL(u).pathname, { redirect: "manual" });
  if (res.status !== 200) sitemap404s.push(`${new URL(u).pathname} -> ${res.status}`);
}
record("SEO-02", "Sitemap lists every route and only real routes",
  missingFromSitemap.length === 0 && extraInSitemap.length === 0 && sitemap404s.length === 0,
  `${sitemapUrls.length} entries · missing=${missingFromSitemap.join(",") || "none"} · extra=${extraInSitemap.join(",") || "none"} · non-200=${sitemap404s.join(",") || "none"}`);

// ---------- MOTION-01 (no-JS half): content present in prerendered HTML ----------
const noJsChecks = [
  ["/", "Your business has something worth choosing."],
  ["/", "Have a business problem worth solving?"],
  ["/work", "Flavours Tec Kitchen"],
  ["/contact", "venkateshsurendhar@gmail.com"],
  ["/about", "10+ years in sales"],
];
const missingContent = noJsChecks.filter(([r, needle]) => !pages[r].html.includes(needle))
  .map(([r, n]) => `${r}: "${n}"`);
const inlineHidden = all.filter(([, { html }]) => /style="[^"]*opacity:\s*0/.test(html)).map(([r]) => r);
record("MOTION-01a", "Content present in prerendered HTML, nothing hidden server-side",
  missingContent.length === 0 && inlineHidden.length === 0,
  `${noJsChecks.length} key strings checked · missing=${missingContent.join(" | ") || "none"} · pages with server-rendered opacity:0 = ${inlineHidden.join(",") || "none"}`);

// ---------- SEC-01/SEC-06: security headers on every route ----------
// Without this assertion the headers decay silently the first time someone
// edits next.config.ts -- there is nothing else in the pipeline that would
// notice a missing CSP.
const REQUIRED_HEADERS = {
  "content-security-policy": (v) =>
    // The directives that do the real work here. script-src intentionally
    // carries 'unsafe-inline' (see next.config.ts for why), so it is not
    // asserted as strict -- but these three must never quietly disappear.
    v.includes("frame-ancestors 'none'") &&
    v.includes("object-src 'none'") &&
    v.includes("base-uri 'self'"),
  "x-frame-options": (v) => v.toUpperCase() === "DENY",
  "x-content-type-options": (v) => v.toLowerCase() === "nosniff",
  "referrer-policy": (v) => v.length > 0,
  "strict-transport-security": (v) => /max-age=\d{7,}/.test(v),
  "permissions-policy": (v) => v.includes("camera=()") && v.includes("geolocation=()"),
};

const headerProblems = [];
for (const r of ROUTES) {
  const res = await fetch(BASE + r);
  for (const [name, ok] of Object.entries(REQUIRED_HEADERS)) {
    const value = res.headers.get(name);
    if (value === null) headerProblems.push(`${r}: missing ${name}`);
    else if (!ok(value)) headerProblems.push(`${r}: ${name} failed check ("${value.slice(0, 60)}")`);
  }
  // SEC-06: the framework should not announce itself.
  if (res.headers.get("x-powered-by")) headerProblems.push(`${r}: x-powered-by is exposed`);
}
record("SEC-01", "Security headers present and correct on every route",
  headerProblems.length === 0,
  `${ROUTES.length} routes x ${Object.keys(REQUIRED_HEADERS).length} headers + x-powered-by check · problems=${headerProblems.length}` +
  (headerProblems.length ? "\n      " + headerProblems.slice(0, 8).join("\n      ") : ""));

// ---------- SEC-07: asset weight and cache lifetime ----------
// Two photos were shipped as 1.8MB and 1.7MB PNGs. next/image meant normal
// visitors never saw that, but the raw paths did -- uncached, straight from
// origin. This keeps both halves fixed: a size budget so an oversized asset
// cannot be committed unnoticed, and a cache assertion so the header cannot
// quietly disappear from next.config.ts.
const ASSET_BUDGET_BYTES = 400 * 1024;
const assetDir = new URL("../public/assets/", import.meta.url);
const assetProblems = [];
const assetFiles = await readdir(assetDir);
for (const name of assetFiles) {
  const { size } = await stat(new URL(name, assetDir));
  if (size > ASSET_BUDGET_BYTES) {
    assetProblems.push(`${name} is ${(size / 1024).toFixed(0)}KB, over the ${ASSET_BUDGET_BYTES / 1024}KB budget`);
  }
  const res = await fetch(`${BASE}/assets/${name}`);
  const cc = res.headers.get("cache-control") || "";
  const maxAge = Number(cc.match(/max-age=(\d+)/)?.[1] ?? 0);
  if (res.status !== 200) assetProblems.push(`${name} -> HTTP ${res.status}`);
  else if (maxAge < 86400) assetProblems.push(`${name} has no meaningful cache lifetime ("${cc}")`);
}
const totalKb = (
  await Promise.all(assetFiles.map(async (n) => (await stat(new URL(n, assetDir))).size))
).reduce((a, b) => a + b, 0) / 1024;
record("SEC-07", "Public assets are within budget and cacheable",
  assetProblems.length === 0,
  `${assetFiles.length} assets, ${totalKb.toFixed(0)}KB total · budget=${ASSET_BUDGET_BYTES / 1024}KB each · problems=${assetProblems.length}` +
  (assetProblems.length ? "\n      " + assetProblems.join("\n      ") : ""));

// ---------- report ----------
let failed = 0;
console.log("\n" + "=".repeat(78));
for (const r of results) {
  if (!r.pass) failed++;
  console.log(`${r.pass ? "PASS" : "FAIL"}  ${r.id.padEnd(10)} ${r.name}`);
  console.log(`      ${r.detail}`);
}
console.log("=".repeat(78));
console.log(`${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
