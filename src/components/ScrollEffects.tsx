"use client";

import { useEffect } from "react";

const HEADING_SELECTOR = "section:not(.hero) .eyebrow, section:not(.hero) h2";

const GROUPS: { container: string; item: string }[] = [
  { container: ".offer-grid", item: ".offer-card" },
  { container: ".work-grid", item: ".work-card" },
  { container: ".stat-grid", item: ".stat-card" },
  { container: ".reasons-grid", item: ".capability-card" },
  { container: ".process-steps", item: "li" },
  { container: ".system-chain", item: "li" },
  { container: ".problem-grid", item: ".problem-card" },
  { container: ".question-grid", item: ".question-card" },
  { container: ".contact-list", item: "li" },
  { container: ".proof-cases", item: ".proof-case-card" },
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
    //
    // Removing the inline properties rather than assigning end values is the
    // whole point: writing `transform: none` here pinned an inline style onto
    // every revealed element, and inline styles outrank stylesheet rules
    // regardless of specificity -- so 1.5s after each group appeared, its CSS
    // hover transforms (.work-card:hover, .contact-list li:hover, and the rest
    // of GROUPS) stopped working permanently, sitewide. Clearing the props
    // instead lets the element fall back to its stylesheet values, which for
    // these elements *is* the true end state, and leaves hover intact.
    function armFallback(els: HTMLElement[]) {
      const id = window.setTimeout(() => {
        if (cancelled) return;
        els.forEach((el) => {
          el.style.removeProperty("opacity");
          el.style.removeProperty("transform");
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

          // The scroll-snap homepage scrolls inside .snap-container, not the
          // document -- ScrollTrigger defaults to watching window/document,
          // so without pointing it at the real scroller every trigger here
          // would sit stuck at "not yet entered" and content would stay
          // permanently at its from(opacity:0) state.
          const snapContainer = document.querySelector<HTMLElement>(".snap-container");
          const scroller = snapContainer ?? undefined;

          ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>(HEADING_SELECTOR).forEach((el) => {
              gsap.from(el, {
                opacity: 0,
                y: 16,
                duration: 0.5,
                ease: "power2.out",
                // Without this GSAP leaves its own inline opacity/transform on
                // the element after the tween finishes, which outranks every
                // CSS hover rule for exactly the same reason the old fallback
                // did. A completed `from` tween ends at the element's natural
                // state, so clearing is equivalent -- and reversible by CSS.
                clearProps: "opacity,transform",
                scrollTrigger: {
                  trigger: el,
                  scroller,
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
                  clearProps: "opacity,transform",
                  scrollTrigger: {
                    trigger: group,
                    scroller,
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
