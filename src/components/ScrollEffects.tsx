"use client";

import { useEffect } from "react";

export default function ScrollEffects() {
  useEffect(() => {
    const revealTargets = Array.prototype.slice.call(
      document.querySelectorAll(
        ".stat-card, .offer-card, .work-card, .capability-card, .hero-copy, .hero-media, .background-intro"
      )
    ) as HTMLElement[];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let revealObserver: IntersectionObserver | undefined;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealTargets.forEach((el) => el.classList.add("in-view"));
    } else {
      revealTargets.forEach((el) => el.classList.add("reveal"));
      revealObserver = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
      );
      revealTargets.forEach((el) => revealObserver!.observe(el));
    }

    return () => {
      revealObserver?.disconnect();
    };
  }, []);

  return null;
}
