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
// SCOPE: `reducedMotion: "reduce"` is what makes these shots deterministic —
// it stops GSAP and Lenis initialising, so no tween is ever mid-flight — but
// SnapController treats reduced motion as a reason to fall back to plain
// scrolling. The homepage is therefore captured here in its plain long-scroll
// form, which is a real rendering the site serves (reduced-motion visitors, and
// any viewport too short for the sequence), not an artefact.
//
// The scroll-snap presentation is covered by REG-03 instead, which runs without
// reducedMotion and shoots per-section viewports — in snap mode the document
// does not scroll, so a full-page shot here would only ever capture the first
// screen. The two suites are complementary: this one owns every route in its
// long-scroll form, REG-03 owns the homepage in its snap form.
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
