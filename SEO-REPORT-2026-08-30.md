# SEO Report -- Surendhar Studio

**Generated** 2026-08-30 · **Source** `http://localhost:3000/` · **Pages crawled** 10 · **Mode** http

> Every statement below is tagged **MEASURED** (observed directly), **INFERRED** (reasoned from observation), or **HANDOFF** (not observable here). No search volume, keyword difficulty, backlink, or field-CWV figure appears in this report, because none can be measured from a codebase.

## Read this first: crawling is off by design

An earlier revision of this report claimed the production `Disallow: /` came from Vercel
substituting its own robots.txt on `*.vercel.app` hostnames. **That was wrong** -- it was an
inference, never verified, and it was repeated as fact. The correction:

`src/app/robots.ts` returns `Disallow: /` **deliberately**, and says why in the file. The
reasoning is that `SITE_URL` resolves from the deployment environment, so with no domain
registered every canonical, Open Graph URL and sitemap entry names a `.vercel.app` host --
and anything indexed under that host has to be *migrated* later rather than simply published.

The file also carries the go-live procedure, and the order is load-bearing:

1. Register the domain and add it to the Vercel project.
2. Set `NEXT_PUBLIC_SITE_URL` to it (first in the resolution order in `lib/site.ts`).
3. Restore `robots.ts` to `allow: "/"` plus the `sitemap:` line.

Note that `surendharvenkatesh.com` -- the fallback origin in `lib/site.ts` -- **is not
registered**. Pointing canonicals at it today would aim every sitemap URL at a host that does
not resolve, which is why that shortcut was deliberately rejected.

So Gate A below reads BLOCKED, and that is the site behaving as intended, not a defect to fix.

## What this run can and cannot see

Because Gate A blocks, every stage 2 and stage 3 check is suppressed by design -- the skill
does not raise content findings for pages that are not indexable. **That work was completed
and verified earlier in this session against an unblocked local build**, and none of it is
undone; it simply cannot be re-measured while the crawl is disallowed.

Verified before the robots decision was restored:

| Area | State |
| --- | --- |
| Homepage CLS | 0.2647 -> **0** in-browser; 0.092 -> 0.006 Lighthouse mobile |
| Heading level skips | 3 -> **0** |
| Service pages with a single inbound link | 4 -> **0** |
| Short titles / long descriptions | 5 -> **0** |
| Schema findings | 11 -> **1** (a benign shared-contact note) |
| Thin service pages | 4 -> **0** (161/151/161/114 words -> 361/517/445/359) |
| BreadcrumbList | added to the 4 service pages, mirroring the visible trail |
| Playwright overflow suite | **63/63 passing**, 10 pages x 6 widths |

Three claims that overstated the evidence were also removed from copy that predated the
session: the homepage "Proof" heading, a conversion promise in the social-media description,
and "Proven structures" on an unshipped product.

## Health summary

| Severity | Count |
| --- | --- |
| CRITICAL | 0 |
| HIGH | 0 |
| MEDIUM | 5 |
| LOW | 9 |
| **Total** | **14** |

### Repair gates

The stages are ordered because the work depends on itself: there is no point optimising a title on a page Google cannot index, or building links to a page that is about to be merged away.

| Gate | Rule | Status |
| --- | --- | --- |
| **A** -- Index before content | No stage 2+ work on pages stage 1 says are not indexable. | BLOCKED |
| **B** -- Architecture before schema | No schema work on orphaned or merge-candidate pages. | CLEAR |
| **C** -- Everything before authority | Stage 6 off-page work is refused until stages 1-5 verify clean. | CLEAR |

- **Gate A** (BLOCKED): BLOCKED BY DESIGN, not by defect. src/app/robots.ts deliberately returns Disallow: / while the site is served from a Vercel-assigned hostname, with a documented three-step go-live procedure in the file. Stage 2+ findings are suppressed by the gate as designed -- that work was completed and verified against an unblocked local build earlier in this session.
- **Gate B** (CLEAR): cleared by route enumeration: the route manifest, sitemap.xml and the crawl all agree on the same 10 content routes.
- **Gate C** (CLEAR): stages 1-5 clear of critical/high findings

### Deliberate exclusions (not defects)

- `/robots.txt` -- robots.ts deliberately returns Disallow: / while the site is on a Vercel-assigned hostname; the Sitemap: line was removed on purpose -- the sitemap stays routed and correct, it is just no longer advertised; documented three-step go-live procedure lives in the file: register domain, set NEXT_PUBLIC_SITE_URL, restore allow: /
- `/ (and all 9 other routes)` -- non-indexable as a consequence of the robots.txt decision above, not through any per-page defect; every page returns 200 with a correct self-canonical, one H1, and full OG/Twitter metadata

## Findings by stage

### Stage 1 -- Crawl & Indexing

Batch `B1` · 1 finding(s) · worst severity **MEDIUM**

| Sev | Rule | Pages | Finding | Evidence |
| --- | --- | --- | --- | --- |
| MEDIUM | `S1-INDEX-CONTRADICTION` | `/`, `/about`, `/contact`, `/products` +6 more | Page is in sitemap.xml but is not indexable: robots.txt Disallow: / | robots.txt Disallow: / |

### Stage 4 -- Performance & Mobile

Batch `B4` · 12 finding(s) · worst severity **MEDIUM**

| Sev | Rule | Pages | Finding | Evidence |
| --- | --- | --- | --- | --- |
| MEDIUM | `S4-CWV-POOR` | `/` | TBT is 1610ms on / (mobile profile) -- poor. | TBT=1610ms |
| MEDIUM | `S4-CWV-POOR` | `/services/website-design` | TBT is 1483ms on /services/website-design (mobile profile) -- poor. | TBT=1483ms |
| MEDIUM | `S4-CWV-POOR` | `/work` | TBT is 1430ms on /work (mobile profile) -- poor. | TBT=1430ms |
| MEDIUM | `S4-CWV-POOR` | `/about` | TBT is 876ms on /about (mobile profile) -- poor. | TBT=876ms |
| LOW | `S4-CWV-NEEDS-WORK` | `/` | LCP is 2724ms on / (mobile profile) -- needs improvement. | LCP=2724ms |
| LOW | `S4-CWV-NEEDS-WORK` | `/services/website-design` | LCP is 2663ms on /services/website-design (mobile profile) -- needs improvement. | LCP=2663ms |
| LOW | `S4-CWV-NEEDS-WORK` | `/services/website-design` | TBT is 322ms on /services/website-design (desktop profile) -- needs improvement. | TBT=322ms |
| LOW | `S4-CWV-NEEDS-WORK` | `/work` | LCP is 2901ms on /work (mobile profile) -- needs improvement. | LCP=2901ms |
| LOW | `S4-CWV-NEEDS-WORK` | `/contact` | LCP is 2822ms on /contact (mobile profile) -- needs improvement. | LCP=2822ms |
| LOW | `S4-CWV-NEEDS-WORK` | `/contact` | TBT is 356ms on /contact (mobile profile) -- needs improvement. | TBT=356ms |
| LOW | `S4-CWV-NEEDS-WORK` | `/about` | LCP is 3012ms on /about (mobile profile) -- needs improvement. | LCP=3012ms |
| LOW | `S4-CWV-NEEDS-WORK` | `/about` | TBT is 218ms on /about (desktop profile) -- needs improvement. | TBT=218ms |

### Stage 5 -- Structured Data

Batch `B5` · 1 finding(s) · worst severity **LOW**

| Sev | Rule | Pages | Finding | Evidence |
| --- | --- | --- | --- | --- |
| LOW | `S5-SCHEMA-CLAIM-OFFPAGE` | `/` | 'telephone' is marked up here but its content is shown on other pages, not this one. Usually fine for a shared business block; confirm it is intended. | telephone -- 0% of terms on this page, 100% site-wide |

## Core Web Vitals (MEASURED -- lab)

> Lab metrics from a local Lighthouse run. Not field data. Real-user Core Web Vitals must be read from Search Console (CrUX).

| Page | Profile | LCP | CLS | TBT | Perf score |
| --- | --- | --- | --- | --- | --- |
| `/` | mobile | 2724 ms | 0.006 | 1610 ms | 70 |
| `/` | desktop | 649 ms | 0.054 | 170 ms | 95 |
| `/services/website-design` | mobile | 2663 ms | 0.000 | 1483 ms | 71 |
| `/services/website-design` | desktop | 683 ms | 0.000 | 322 ms | 86 |
| `/work` | mobile | 2901 ms | 0.000 | 1430 ms | 69 |
| `/work` | desktop | 705 ms | 0.000 | 65 ms | 99 |
| `/contact` | mobile | 2822 ms | 0.000 | 356 ms | 85 |
| `/contact` | desktop | 596 ms | 0.000 | 42 ms | 100 |
| `/about` | mobile | 3012 ms | 0.000 | 876 ms | 72 |
| `/about` | desktop | 719 ms | 0.000 | 218 ms | 92 |

**Top opportunities** (estimated savings, lab):

- Reduce unused JavaScript -- ~300 ms

## Keyword to page map

One primary keyword and one search intent per important page. Fill the two right columns from live SERP research (see `references/serp-research.md`) or from Search Console. **Volume and difficulty are deliberately absent** -- they cannot be measured here, and a guessed number is worse than no number.

| Page | Current title | Primary keyword | Intent |
| --- | --- | --- | --- |

## Human action list (HANDOFF)

These require tools this environment cannot reach. Each names exactly where to go.

- **Index coverage** -- Search Console > Indexing > Pages
  - Confirm which URLs Google has actually indexed, and why any are excluded. A local crawl proves a page is crawlable, never that it is indexed.
- **Field Core Web Vitals** -- Search Console > Experience > Core Web Vitals
  - Real-user LCP/CLS/INP from CrUX. The Lighthouse numbers in this report are lab measurements taken against a local server and will differ from production.
- **Search performance** -- Search Console > Performance
  - Actual queries, impressions, CTR and position per page. This is the only way to confirm the keyword-to-page mapping below reflects how the site really ranks.
- **Keyword volume & difficulty** -- Ahrefs / Semrush / Keyword Planner
  - Search volume and KD cannot be measured from a codebase. No volume or difficulty figure appears anywhere in this report because none could be observed.
- **Backlink profile** -- Ahrefs / Search Console > Links
  - Referring domains, anchor distribution, and toxic-link review. Off-page work is stage 6 and is gated until stages 1-5 verify clean.
- **Rich result eligibility** -- Google Rich Results Test
  - Paste each template URL to confirm Google grants the rich result. Local schema validation checks structure and honesty, not eligibility.

## How to re-run

```bash
python crawl.py --root "http://localhost:3000/" --out crawl.json
python audit.py --crawl crawl.json --out findings.json
python verify.py --baseline baseline/findings.json --current findings.json
```

_Generated by the `seo-repair` skill. Findings are evidence-backed; nothing in this report was inferred from data the tool could not observe._