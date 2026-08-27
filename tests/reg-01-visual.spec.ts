import { test, expect } from "@playwright/test";
import { ROUTES, VISUAL_VIEWPORTS, slug, stabilize } from "./routes";

// REG-01 — full-page visual baseline, every route x three layout tiers x both
// themes (60 shots per platform).
//
// The argument for it: nine of the last thirty commits before this suite
// existed were fixes to earlier commits, in a 1,700-line stylesheet where
// `body.snap-page` overrides fight base rules hundreds of lines apart and
// nothing mechanical noticed when a fix broke something else. This converts
// that whole class of regression from post-release discovery into a red build.
//
// KNOWN GAP: `reducedMotion: "reduce"` is what makes these shots
// deterministic — it stops GSAP and Lenis initialising, so no tween is ever
// mid-flight — but SnapController treats reduced motion as a reason to fall
// back to plain scrolling. So the homepage is captured in its plain long-scroll
// form, and the scroll-snap presentation is NOT covered here. The separate
// snap-mode assertions live in the P0 suite; if snap-mode visuals are wanted
// later they need per-section element screenshots, because in snap mode the
// document itself does not scroll and a full-page shot captures only the first
// screen.
test.describe("REG-01 visual baseline", () => {
  for (const route of ROUTES) {
    for (const vp of VISUAL_VIEWPORTS) {
      test(`${slug(route)} @ ${vp.label}`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(route);
        await stabilize(page);

        await expect(page).toHaveScreenshot(`${slug(route)}-${vp.label}.png`, {
          fullPage: true,
          // The FAB is fixed-position: on a full-page shot it is composited at
          // the viewport's bottom-right, which lands over arbitrary content
          // depending on page length. Masking it keeps the shot about layout.
          mask: [page.locator(".whatsapp-fab")],
        });
      });
    }
  }
});
