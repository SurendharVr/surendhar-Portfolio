# Tests

| Suite | What it guards | Run |
| --- | --- | --- |
| `reg-01-visual.spec.ts` | Full-page appearance of all 10 routes × 3 layout tiers × both themes (60 shots) | `npm run test:visual` |
| `reg-02-overflow.spec.ts` | No horizontal overflow at 320/360/390/414/768/1024px, menu open and closed (63 checks) | `npm run test:overflow` |
| `reg-03-snap.spec.ts` | The homepage's scroll-snap sequence — 7 sections × both themes at 1440×900 (14 shots) | `npm run test:snap` |
| `p0-crawl.mjs` | WhatsApp links, internal links, canonicals, sitemap, no-JS content | `npm run test:p0` |

REG-01 and REG-03 divide the homepage between them. REG-01 uses
`reducedMotion`, which makes SnapController fall back to plain long-scroll, so
it owns every route in its long-scroll form. REG-03 runs *without* it — the only
way snap mode engages at all — and owns the homepage in its snap form. REG-03
asserts the mode it is in and fails loudly rather than quietly re-photographing
what REG-01 already covers.

`npm run test:e2e` runs all three Playwright suites. The config builds and starts the
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

**Before the branch is on `main`**, the CI run itself produces them. GitHub only
offers the *Run workflow* button for `workflow_dispatch` workflows that already
exist on the default branch, so on a first PR there is no button to press — the
`e2e` job bootstraps instead:

1. Let CI run. It fails (correctly) on the missing baselines.
2. Download the **`bootstrap-visual-baselines`** artifact from that run.
3. Unzip it into **`tests/`** — not into a snapshot folder. Both workflows
   upload `tests/**/*-linux.png`, so the archive already contains the
   `reg-01-visual.spec.ts-snapshots/` and `reg-03-snap.spec.ts-snapshots/`
   directories at its top level; unzipping one level deeper nests them and
   Playwright still reports the baselines missing.
4. **Look at the images**, then commit the `*-linux.png` files.

That bootstrap step fires only when no Linux baseline is committed at all. Once
they exist it does nothing, so it can never be used to rubber-stamp a real
visual regression as the new reference.

**Afterwards**, use the dedicated workflow whenever a visual change is
*intentional*:

1. GitHub → **Actions** → **Update visual baselines** → **Run workflow**.
2. Download the `updated-visual-baselines` artifact.
3. Unzip into **`tests/`** (see the note above) and commit the `*-linux.png`
   files with the change that caused them.

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
