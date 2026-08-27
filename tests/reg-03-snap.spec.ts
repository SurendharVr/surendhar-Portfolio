import { test, expect } from "@playwright/test";
import {
  SNAP_SECTIONS,
  SNAP_VIEWPORT,
  gotoSnapSection,
  settleReveals,
  snapStabilize,
} from "./routes";

// REG-03 — visual baseline for the homepage's scroll-snap presentation.
//
// Closes the gap REG-01 documents and cannot cover itself. REG-01 owes its
// determinism to `reducedMotion: "reduce"`, and SnapController treats reduced
// motion as a reason to fall back to plain long-scroll -- so the snap sequence,
// which is the most intricate and most rewritten code in the app, had no visual
// coverage at all. Everything REG-01 photographs of the homepage is the page
// snap mode is the alternative to.
//
// Two things follow from running without reducedMotion.
//
// It cannot rely on GSAP never starting, so it waits for GSAP to finish
// instead. The finish condition is exact rather than a sleep: ScrollEffects
// clears opacity and transform on tween completion and again from a 1.5s
// fallback, so "no inline opacity or transform left in this section" is
// precisely the settled state. See settleReveals in routes.ts.
//
// It captures the viewport, not the full page. In snap mode the document does
// not scroll -- the .snap-container does -- so `fullPage: true` would return
// the first screen seven times over. A viewport shot also keeps the fixed
// header and the progress dots in frame, and those are exactly the elements
// REG-01 can never see, because neither is in its snap-mode form there.
test.describe("REG-03 snap-mode visual baseline", () => {
  // Seven sections, each needing a scroll, a settle and a full-viewport
  // screenshot, plus a priming walk before any of it — inherently slower than
  // REG-01's one-shot-per-page and well past the 30s default. Raised here
  // rather than globally so the other suites keep the tighter budget.
  test.setTimeout(120_000);

  test("snap sequence", async ({ page }) => {
    await page.setViewportSize(SNAP_VIEWPORT);
    await page.goto("/");
    await snapStabilize(page);

    // Hard gate, and deliberately placed after stabilize() rather than before.
    //
    // `plain` starts false and is corrected on the frame after mount, once
    // SnapController has measured the sections, so asserting on a freshly
    // loaded page would race the measurement and pass before the real decision
    // was made. By this point the page has been walked end to end and the
    // measurement has certainly run.
    //
    // Without this gate the suite degrades into a duplicate of REG-01 without
    // anyone noticing: if a section grows past the viewport, or reducedMotion
    // leaks back into the project config, SnapController falls back to plain
    // mode and all seven shots below would still be taken, still be stable, and
    // still pass -- re-photographing the long-scroll page while the gap this
    // suite exists to close quietly reopens under a green build.
    const body = page.locator("body");
    await expect(body, "homepage should carry the snap-page class").toHaveClass(
      /\bsnap-page\b/
    );
    await expect(
      body,
      "SnapController fell back to plain long-scroll, so this run would " +
        "photograph the same page REG-01 already covers. Check whether a " +
        "section now exceeds " +
        `${SNAP_VIEWPORT.height}px tall, or whether reducedMotion leaked into ` +
        "the snap-* projects in playwright.config.ts."
    ).not.toHaveClass(/\bsnap-plain\b/);
    await expect(
      page.locator(".snap-progress"),
      "progress dots render only while snap mode is live"
    ).toBeVisible();

    // Soft, so one changed section reports as one failure instead of hiding the
    // six after it -- a visual suite is most useful when it shows the whole
    // diff in a single run.
    for (const section of SNAP_SECTIONS) {
      await gotoSnapSection(page, section.id);
      await settleReveals(page, section.id);
      await expect.soft(page).toHaveScreenshot(`snap-${section.label}.png`, {
        // Fixed-position, composited over whichever section is on screen.
        // Masking keeps these shots about the section, not the FAB.
        mask: [page.locator(".whatsapp-fab")],
      });
    }
  });
});
