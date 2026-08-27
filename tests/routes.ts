import type { Page } from "@playwright/test";

/** Every route the sitemap claims. Keep in step with src/app/sitemap.ts. */
export const ROUTES = [
  "/",
  "/services",
  "/services/website-design",
  "/services/social-media",
  "/services/growth-strategy",
  "/services/digital-products",
  "/work",
  "/products",
  "/about",
  "/contact",
] as const;

/** Slug used in snapshot filenames — "/" would be a path separator. */
export const slug = (route: string) =>
  route === "/" ? "home" : route.slice(1).replace(/\//g, "-");

/**
 * REG-02 sweeps the full set: 320 is the narrowest width the stylesheet
 * claims to support, 1024 is the desktop breakpoint, and the rest are the
 * common phone widths in between.
 */
export const OVERFLOW_WIDTHS = [320, 360, 390, 414, 768, 1024] as const;

/**
 * REG-01 uses three, one per layout tier, rather than all six. Overflow is
 * already covered at every width by REG-02; what a screenshot adds is
 * catching a layout change *within* a tier, and a third shot inside the same
 * tier mostly duplicates the second while doubling the bytes in the repo.
 */
export const VISUAL_VIEWPORTS = [
  { label: "mobile", width: 390, height: 844 },
  { label: "tablet", width: 768, height: 1024 },
  { label: "desktop", width: 1440, height: 900 },
] as const;

/**
 * Removes the sources of frame-to-frame variance that would otherwise make a
 * screenshot differ from itself: in-flight transitions, a blinking caret, and
 * fonts or images that have not finished arriving.
 *
 * Motion is already suppressed by the projects' `reducedMotion: "reduce"`,
 * which stops GSAP and Lenis from initialising at all. The stylesheet here is
 * belt-and-braces for plain CSS transitions, which that setting does not stop.
 */
export async function stabilize(page: Page) {
  await page.addStyleTag({
    content: `*, *::before, *::after {
      animation: none !important;
      transition: none !important;
      caret-color: transparent !important;
    }`,
  });
  // next/image lazy-loads anything below the fold, so on a full-page shot the
  // lower images would still be blank when the screenshot is taken. Walking to
  // the bottom triggers them; going back to the top restores the scroll
  // position the shot is expected to start from.
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => requestAnimationFrame(() => r(null)));
    }
    window.scrollTo(0, 0);
  });

  await page.waitForLoadState("networkidle");
  await page.evaluate(() => document.fonts.ready);

  // Bounded on purpose. An <img> that never enters the viewport can stay
  // incomplete forever, and awaiting decode() on it hangs the test until the
  // whole spec times out — which is exactly what an unbounded version did
  // here. A capped wait degrades to "shoot it anyway" instead of failing the
  // run over one image that was never going to load.
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        const done = Promise.all(
          Array.from(document.images)
            .filter((img) => !img.complete)
            .map((img) => img.decode().catch(() => undefined))
        );
        const cap = new Promise<void>((r) => setTimeout(r, 5000));
        Promise.race([done, cap]).then(() => resolve());
      })
  );
}

/**
 * The homepage's scroll-snap sequence. Mirrors SECTIONS in
 * src/components/SnapController.tsx, in order — REG-03 walks these top to
 * bottom, so a reordering there without a matching change here shows up as a
 * pile of failed snapshots rather than a silent gap.
 */
export const SNAP_SECTIONS = [
  { id: "top", label: "introduce" },
  { id: "snap-problem", label: "problem" },
  { id: "snap-prove", label: "prove" },
  { id: "snap-explain", label: "explain" },
  { id: "digital-presence-system", label: "offer" },
  { id: "snap-trust", label: "trust" },
  { id: "snap-convert", label: "convert" },
] as const;

/**
 * Snap mode only engages while every section fits the viewport — SnapController
 * measures them and falls back to plain long-scroll otherwise. Its own comment
 * records that at 1024px wide the OFFER section alone needs ~999px, so a
 * short-and-narrow viewport would silently put REG-03 in plain mode and have it
 * re-photograph what REG-01 already covers. 1440x900 is the widest REG-01 tier
 * and clears the ~710px the tallest section needs at that width.
 *
 * REG-03 asserts the mode rather than trusting this number; see the spec.
 */
export const SNAP_VIEWPORT = { width: 1440, height: 900 } as const;

/** The scrolling element in snap mode. The document itself does not scroll. */
const SNAP_CONTAINER = ".snap-container";

/**
 * Waits until no reveal animation is still in flight inside `sectionId`.
 *
 * REG-03 deliberately runs without `reducedMotion`, which is the only reason
 * snap mode engages at all — so unlike REG-01 it cannot rely on GSAP never
 * starting. Instead it waits for GSAP to finish, and the finish condition is
 * precise: ScrollEffects passes `clearProps: "opacity,transform"` on every
 * tween and arms a 1.5s fallback that calls removeProperty on the same two.
 * Either path ends with no inline opacity or transform anywhere in the group,
 * so their absence *is* the settled state.
 *
 * Capped, and degrades to shooting anyway, for the same reason stabilize()'s
 * image wait is capped: a hang here would burn the whole spec's timeout.
 */
export async function settleReveals(page: Page, sectionId: string) {
  await page
    .waitForFunction(
      (id) => {
        const root = document.getElementById(id);
        if (!root) return false;
        return (
          root.querySelectorAll('[style*="opacity"], [style*="transform"]')
            .length === 0
        );
      },
      sectionId,
      { timeout: 6000 }
    )
    .catch(() => {
      // Shoot it anyway. A stuck reveal is itself worth seeing in the diff.
    });
}

/**
 * Scrolls the snap container to a section and waits for the snap to settle.
 *
 * Deliberately does NOT wait for reveal animations — callers that are about to
 * photograph the section call settleReveals() themselves. Folding the two
 * together made snapStabilize()'s eight-section priming walk wait up to 6s per
 * section for animations nobody was going to look at, which blew the default
 * 30s test timeout before the first screenshot was taken.
 */
export async function gotoSnapSection(page: Page, sectionId: string) {
  await page.evaluate((id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "instant", block: "start" });
  }, sectionId);

  // Even an instant scrollIntoView can be adjusted by the snap engine on the
  // next frame, so wait for the container's offset to stop moving rather than
  // assuming it landed.
  await page
    .waitForFunction(
      (sel) => {
        const el = document.querySelector(sel);
        if (!el) return false;
        const w = window as unknown as { __regPrevTop?: number };
        const prev = w.__regPrevTop;
        w.__regPrevTop = el.scrollTop;
        return prev === el.scrollTop;
      },
      SNAP_CONTAINER,
      { timeout: 5000, polling: 100 }
    )
    .catch(() => {});
}

/**
 * The snap-mode counterpart to stabilize(). It cannot reuse that one: it walks
 * `window` to the bottom to trigger lazy images, and in snap mode the window
 * does not scroll at all, so every image below the first screen would still be
 * blank. This walks the snap container instead, then returns to the top.
 */
export async function snapStabilize(page: Page) {
  await page.addStyleTag({
    content: `*, *::before, *::after {
      animation: none !important;
      transition: none !important;
      caret-color: transparent !important;
    }`,
  });

  // Priming walk: touch every section so next/image loads what is below the
  // first screen, then return to the top. No settleReveals here — see above.
  for (const section of SNAP_SECTIONS) {
    await gotoSnapSection(page, section.id);
  }
  await gotoSnapSection(page, SNAP_SECTIONS[0].id);

  await page.waitForLoadState("networkidle");
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        const done = Promise.all(
          Array.from(document.images)
            .filter((img) => !img.complete)
            .map((img) => img.decode().catch(() => undefined))
        );
        const cap = new Promise<void>((r) => setTimeout(r, 5000));
        Promise.race([done, cap]).then(() => resolve());
      })
  );
}
