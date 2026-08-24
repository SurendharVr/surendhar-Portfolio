"use client";

import { useEffect, useRef, useState } from "react";
import SnapProgress, { type SnapSection } from "@/components/SnapProgress";

const SECTIONS: SnapSection[] = [
  { id: "top", label: "Introduce" },
  { id: "snap-problem", label: "Problem" },
  { id: "snap-prove", label: "Prove" },
  { id: "snap-explain", label: "Explain" },
  { id: "digital-presence-system", label: "Offer" },
  { id: "snap-trust", label: "Trust" },
  { id: "snap-convert", label: "Convert" },
];

export default function SnapController() {
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);

  // Scopes the header's position:fixed override (see .snap-page .site-header
  // in site.css) and the reduced-motion-aware snap CSS to just this page —
  // the header lives in the root layout, outside this component's own DOM
  // subtree, so a body class is the only way to reach it from here.
  useEffect(() => {
    document.body.classList.add("snap-page");
    return () => document.body.classList.remove("snap-page");
  }, []);

  useEffect(() => {
    const container = document.querySelector<HTMLElement>(".snap-container");
    if (!container) return;
    const sectionEls = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (!sectionEls.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveId(entry.target.id);
          }
        });
      },
      { root: container, threshold: [0.5] }
    );
    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Shared by keyboard and the wheel assist below, so both move through the
  // same section list the same way.
  const activeIdRef = useRef(activeId);
  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  function goToAdjacentSection(forward: boolean) {
    const sectionEls = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (!sectionEls.length) return;
    const currentIndex = Math.max(
      sectionEls.findIndex((el) => el.id === activeIdRef.current),
      0
    );
    const nextIndex = forward
      ? Math.min(currentIndex + 1, sectionEls.length - 1)
      : Math.max(currentIndex - 1, 0);
    sectionEls[nextIndex]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Arrow/Page keys move exactly one section — a bare ArrowDown otherwise
  // just nudges the scroll position a few pixels, which reads as broken
  // next to mandatory snap.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const isEditable =
        !!target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable);
      if (isEditable) return;

      const forward = e.key === "ArrowDown" || e.key === "PageDown";
      const backward = e.key === "ArrowUp" || e.key === "PageUp";
      if (!forward && !backward) return;

      e.preventDefault();
      goToAdjacentSection(forward);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Wheel assist: native scroll-snap-stop:always is supposed to guarantee a
  // fast wheel/trackpad fling still stops at every section in between, but
  // that guarantee isn't reliable across every browser/OS combination under
  // real momentum -- reported behavior here was the Prove section getting
  // skipped past before it could be read. This doesn't hijack scroll in
  // general: it only steps in once a wheel gesture crosses a real intent
  // threshold, completes the same single-section move native snap already
  // promises, then gets out of the way. Touch is untouched -- mobile
  // touch-scroll deceleration doesn't exhibit the same skip.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const container = document.querySelector<HTMLElement>(".snap-container");
    if (!container) return;

    let locked = false;
    let accumulated = 0;
    let resetTimer: number | undefined;
    const GESTURE_THRESHOLD = 40;
    const LOCK_MS = 650;

    function onWheel(e: WheelEvent) {
      if (locked) {
        e.preventDefault();
        return;
      }

      accumulated += e.deltaY;
      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        accumulated = 0;
      }, 120);

      if (Math.abs(accumulated) < GESTURE_THRESHOLD) return;

      const forward = accumulated > 0;
      accumulated = 0;
      e.preventDefault();
      locked = true;
      goToAdjacentSection(forward);
      window.setTimeout(() => {
        locked = false;
      }, LOCK_MS);
    }

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", onWheel);
      window.clearTimeout(resetTimer);
    };
  }, []);

  return <SnapProgress sections={SECTIONS} activeId={activeId} />;
}
