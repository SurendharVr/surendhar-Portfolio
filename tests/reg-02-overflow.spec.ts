import { test, expect } from "@playwright/test";
import { ROUTES, OVERFLOW_WIDTHS, slug } from "./routes";

// REG-02 — no horizontal overflow at any supported width.
//
// This class of bug has now shipped twice: commit 2610bdd fixed two 320px
// overflows, and a decorative glow on /about (.hero-media::before at
// right: -30px, in a section with no clip) pushed every width from 320px up
// 6px wide until it was caught by this check. It is invisible on a developer's
// own wide screen and makes the site feel broken on the devices most visitors
// actually use, which is exactly the profile of a bug worth asserting forever.
//
// scrollWidth is compared against clientWidth on documentElement, with 1px of
// slack for sub-pixel layout at fractional device ratios.
test.describe("REG-02 horizontal overflow", () => {
  for (const route of ROUTES) {
    for (const width of OVERFLOW_WIDTHS) {
      test(`${slug(route)} @ ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(route, { waitUntil: "networkidle" });

        const { scrollWidth, clientWidth, offender } = await page.evaluate(() => {
          const d = document.documentElement;
          // Name the widest offending element so a failure says what to fix
          // rather than only that something is wrong.
          let offender: string | null = null;
          if (d.scrollWidth > d.clientWidth + 1) {
            let worst = d.clientWidth;
            for (const el of Array.from(document.querySelectorAll("*"))) {
              const r = el.getBoundingClientRect();
              if (r.width > 0 && r.right > worst) {
                worst = r.right;
                const cls = String(
                  (el as HTMLElement).className?.valueOf?.() ?? ""
                ).trim();
                offender = el.tagName.toLowerCase() + (cls ? `.${cls.split(/\s+/).join(".")}` : "");
              }
            }
          }
          return { scrollWidth: d.scrollWidth, clientWidth: d.clientWidth, offender };
        });

        expect(
          scrollWidth,
          `${route} scrolls sideways at ${width}px (${scrollWidth} > ${clientWidth})` +
            (offender
              ? ` — widest element past the edge: ${offender}`
              : " — no element rect exceeds the viewport, so the cause is most" +
                " likely a ::before/::after inset past its parent (that is what" +
                " .hero-media::before did on /about). Look for a decorative" +
                " pseudo-element in a section with no overflow clip.")
        ).toBeLessThanOrEqual(clientWidth + 1);
      });
    }
  }

  // The mobile dropdown is fixed-position and full-bleed, so it can overflow
  // even when the page beneath it does not. Only meaningful below the 1024px
  // desktop breakpoint, where the toggle exists at all.
  for (const width of [320, 390, 768] as const) {
    test(`home with nav menu open @ ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/", { waitUntil: "networkidle" });
      await page.locator("#nav-toggle").click();
      await expect(page.locator("#main-nav")).toHaveClass(/open/);

      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(
        scrollWidth,
        `open menu overflows at ${width}px (${scrollWidth} > ${clientWidth})`
      ).toBeLessThanOrEqual(clientWidth + 1);
    });
  }
});
