"use client";

import { useEffect } from "react";

const HEADING_SELECTOR = "section:not(.hero) .eyebrow, section:not(.hero) h2";

const GROUPS: { container: string; item: string }[] = [
  { container: ".offer-grid", item: ".offer-card" },
  { container: ".work-grid", item: ".work-card" },
  { container: ".stat-grid", item: ".stat-card" },
  { container: ".reasons-grid", item: ".capability-card" },
  { container: ".ladder-list", item: ".ladder-item" },
  { container: ".process-steps", item: "li" },
  { container: ".system-chain", item: "li" },
  { container: ".problem-grid", item: ".problem-card" },
  { container: ".question-grid", item: ".question-card" },
  { container: ".contact-list", item: "li" },
];

export default function ScrollEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let ctx: { revert: () => void } | undefined;
    const fallbacks: number[] = [];

    // Safety net: if GSAP's rAF-driven ticker ever stalls (backgrounded tab,
    // throttling, etc.) a scroll-triggered tween can freeze at its "from"
    // state and leave content permanently invisible. Force the true end
    // state via a plain timer, scheduled from the moment each trigger fires,
    // so nothing can stay stuck hidden.
    function armFallback(els: HTMLElement[]) {
      const id = window.setTimeout(() => {
        if (cancelled) return;
        els.forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "none";
        });
      }, 1500);
      fallbacks.push(id);
    }

    const requestIdle =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback
        : (cb: () => void) => window.setTimeout(cb, 200);

    requestIdle(() => {
      if (cancelled) return;
      Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
        ([{ default: gsap }, { ScrollTrigger }]) => {
          if (cancelled) return;
          gsap.registerPlugin(ScrollTrigger);

          ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>(HEADING_SELECTOR).forEach((el) => {
              gsap.from(el, {
                opacity: 0,
                y: 16,
                duration: 0.5,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 88%",
                  toggleActions: "play none none none",
                  onEnter: () => armFallback([el]),
                },
              });
            });

            GROUPS.forEach(({ container, item }) => {
              document.querySelectorAll<HTMLElement>(container).forEach((group) => {
                const items = group.querySelectorAll<HTMLElement>(item);
                if (!items.length) return;
                gsap.from(items, {
                  opacity: 0,
                  y: 16,
                  duration: 0.5,
                  ease: "power2.out",
                  stagger: 0.08,
                  scrollTrigger: {
                    trigger: group,
                    start: "top 88%",
                    toggleActions: "play none none none",
                    onEnter: () => armFallback(Array.from(items)),
                  },
                });
              });
            });
          });
        }
      );
    });

    return () => {
      cancelled = true;
      ctx?.revert();
      fallbacks.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  return null;
}
