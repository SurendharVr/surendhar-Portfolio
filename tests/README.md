# Tests

| Suite | What it guards | Run |
| --- | --- | --- |
| `reg-01-visual.spec.ts` | Full-page appearance of all 10 routes × 3 layout tiers × both themes (60 shots) | `npm run test:visual` |
| `reg-02-overflow.spec.ts` | No horizontal overflow at 320/360/390/414/768/1024px, menu open and closed (63 checks) | `npm run test:overflow` |
| `p0-crawl.mjs` | WhatsApp links, internal links, canonicals, sitemap, no-JS content | `npm run test:p0` |

`npm run test:e2e` runs both Playwright suites. The config builds and starts the
**production** server itself — `next dev` renders differently enough that
snapshots taken against it would be worthless.

`npm run test:p0` needs a production server already running (`npm run build && npm start`).

## First-time setup: create the Linux baselines

**The first CI run will fail** until this is done, with `A snapshot doesn't exist
at …-linux.png`. That is expected, not a broken pipeline.

Playwright suffixes every snapshot with the OS that rendered it, because font
rasterisation differs between platforms — a baseline made on Windows would never
match CI's Linux run. CI's Linux set is the authoritative one, and `.gitignore`
keeps developers' local `-win32`/`-darwin` baselines out of the repo.

To create them:

1. GitHub → **Actions** → **Update visual baselines** → **Run workflow**.
2. Download the `updated-visual-baselines` artifact.
3. Unzip it into `tests/reg-01-visual.spec.ts-snapshots/` and commit the
   `*-linux.png` files.

Re-run that same workflow whenever a visual change is **intentional**, and commit
the updated baselines with the change that caused them. The workflow uploads
rather than auto-commits on purpose: accepting a baseline is a statement that the
new rendering is correct, and someone should look at the diff first.

## When a visual test fails

Download the `playwright-report` artifact from the failed run and open it — it
shows expected, actual, and a diff for every failure. Locally, `npx playwright
show-report`.

If the change was intended, follow the bootstrap steps above to refresh the
baselines. If it wasn't, you just caught a regression.

## When Dependabot bumps Playwright

`@playwright/test` in `package.json` and the `mcr.microsoft.com/playwright:vX.Y.Z-noble`
image tag in **both** workflow files have to stay on the same version. Dependabot
updates the package but cannot know about the image tag, so CI asserts they match
and fails with an explicit message if they drift.

On a Playwright bump PR:

1. Update the image tag in `ci.yml` and `update-visual-baselines.yml` to match.
2. Expect the visual baselines to need regenerating — a new browser build
   rasterises text slightly differently. Run the **Update visual baselines**
   workflow and commit the result with the bump.

Without the guard this drift shows up as all 60 visual tests failing at once,
which reads like "the site broke" rather than "the container is a version
behind."

## Known gaps

- **Snap mode isn't snapshotted.** `reducedMotion: "reduce"` is what makes the
  shots deterministic (it stops GSAP and Lenis initialising), but
  `SnapController` treats reduced motion as a reason to fall back to plain
  scrolling. So the homepage is captured in its long-scroll form. Covering the
  scroll-snap presentation needs per-section element screenshots, because in
  snap mode the document itself doesn't scroll and a full-page shot would
  capture only the first screen.
- **Baselines cost ~17MB** per platform. If that becomes a problem, the cheapest
  trim is dropping the `tablet` viewport from `VISUAL_VIEWPORTS` in `routes.ts` —
  REG-02 already covers every width for overflow, and the tablet shot is the one
  that most duplicates its neighbours.
