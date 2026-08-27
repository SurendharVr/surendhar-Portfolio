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
