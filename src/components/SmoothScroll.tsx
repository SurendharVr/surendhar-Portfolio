"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // The homepage drives its own scroll via native CSS scroll-snap; Lenis's
    // virtualized scroll would fight that (and violates "no scroll hijacking"
    // for the snap experience), so it only runs on every other page.
    if (pathname === "/") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let cancelled = false;
    let lenis: Lenis | undefined;
    let frame: number | undefined;

    const requestIdle =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback
        : (cb: () => void) => window.setTimeout(cb, 200);

    requestIdle(() => {
      if (cancelled) return;
      import("lenis").then(({ default: Lenis }) => {
        if (cancelled) return;
        lenis = new Lenis({ duration: 1.1, smoothWheel: true });
        function raf(time: number) {
          lenis!.raf(time);
          frame = requestAnimationFrame(raf);
        }
        frame = requestAnimationFrame(raf);
      });
    });

    return () => {
      cancelled = true;
      if (frame !== undefined) cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, [pathname]);

  return null;
}
