import { defineConfig, devices } from "@playwright/test";

// Snapshot names carry a platform suffix, so baselines rendered on one OS are
// never compared against another's. Linux baselines (the ones CI produces) are
// the committed, authoritative set; see .gitignore, which keeps developers'
// local win32/darwin baselines out of the repo.
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI
    ? [["github"], ["html", { open: "never" }]]
    : [["list"], ["html", { open: "never" }]],

  use: {
    baseURL: "http://localhost:3000",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },

  expect: {
    toHaveScreenshot: {
      // Antialiasing differs by a pixel or two between runs even on identical
      // hardware. This tolerates that without hiding a real layout shift --
      // anything that moves an element produces far more than 0.2% of pixels.
      maxDiffPixelRatio: 0.002,
      animations: "disabled",
    },
  },

  projects: [
    // REG-02 only measures geometry, so it needs neither theme nor motion
    // emulation and runs once.
    {
      name: "overflow",
      testMatch: /reg-02-overflow\.spec\.ts/,
      use: { ...devices["Desktop Chrome"] },
    },
    // REG-01 runs once per theme. reducedMotion is what makes it
    // deterministic: it stops GSAP and Lenis from starting at all, so there is
    // no tween mid-flight when the shot is taken.
    {
      name: "visual-light",
      testMatch: /reg-01-visual\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        colorScheme: "light",
        // reducedMotion is a browser-context option, not a top-level test
        // option like colorScheme, so it has to be set through contextOptions.
        contextOptions: { reducedMotion: "reduce" },
      },
    },
    {
      name: "visual-dark",
      testMatch: /reg-01-visual\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        colorScheme: "dark",
        contextOptions: { reducedMotion: "reduce" },
      },
    },
    // REG-03 runs once per theme and deliberately does NOT set reducedMotion.
    // That omission is the whole point: SnapController treats reduced motion as
    // a reason to fall back to plain long-scroll, so the two projects above can
    // never photograph snap mode -- they photograph the page it replaces.
    //
    // Determinism is recovered by waiting for GSAP to finish rather than
    // stopping it from starting; see settleReveals in tests/routes.ts.
    //
    // Do not add contextOptions.reducedMotion here to "stabilise" a flake. It
    // would make the suite pass while covering nothing, which is the failure it
    // was written to prevent -- the spec asserts the mode and fails loudly with
    // that explanation if it is ever added.
    {
      name: "snap-light",
      testMatch: /reg-03-snap\.spec\.ts/,
      use: { ...devices["Desktop Chrome"], colorScheme: "light" },
    },
    {
      name: "snap-dark",
      testMatch: /reg-03-snap\.spec\.ts/,
      use: { ...devices["Desktop Chrome"], colorScheme: "dark" },
    },
  ],

  webServer: {
    // The production build is what ships, so it is what gets tested — `next
    // dev` renders differently enough (no minification, dev overlay, HMR
    // socket) that snapshots taken against it would be worthless.
    command: "npm run build && npm start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
  },
});
