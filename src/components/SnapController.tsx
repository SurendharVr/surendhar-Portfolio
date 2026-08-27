"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

// Slack when comparing a section's height against the viewport, so rounding
// and the small padding difference between snap and plain mode can't flip the
// decision back and forth. Roughly one line of body text.
const OVERFLOW_TOLERANCE = 24;

export default function SnapController() {
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);
  // Snap mode is only viable while every section fits one screen. `plain`
  // means we've fallen back to an ordinary long-scroll page instead.
  const [plain, setPlain] = useState(false);

  // Scopes the header's position:fixed override (see .snap-page .site-header
  // in site.css) and the reduced-motion-aware snap CSS to just this page —
  // the header lives in the root layout, outside this component's own DOM
  // subtree, so a body class is the only way to reach it from here.
  useEffect(() => {
    document.body.classList.add("snap-page");
    return () => document.body.classList.remove("snap-page");
  }, []);

  // A scroll-snap sequence only works while every section fits one screen.
  // Where one doesn't, `scroll-snap-type: y mandatory` doesn't merely look
  // wrong -- it makes the overflowing copy unreachable, because the browser
  // refuses to let the scroll rest anywhere except a snap point and pulls it
  // straight back to the section start. No amount of care in the wheel and
  // keyboard handlers can defeat that; it's the compositor undoing it.
  //
  // Measured, not assumed from a media query, because the threshold moves with
  // width as much as height: at 1280px wide the tallest section needs ~710px,
  // but at 1024px wide the OFFER section alone needs ~999px and so overflows
  // even a 900px-tall window. (Making those sections fit is the real fix and
  // belongs in the stylesheet -- this is the safety net for where they don't.)
  //
  // Compared against window.innerHeight rather than the container's own height
  // so the result is stable in both modes and can't oscillate: in snap mode a
  // section measures max(content, 100svh), in plain mode it measures its
  // content, and both exceed innerHeight under exactly the same condition.
  const syncMode = useCallback(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPlain(true);
      return;
    }
    const overflows = SECTIONS.some((s) => {
      const el = document.getElementById(s.id);
      return (
        !!el &&
        el.getBoundingClientRect().height > window.innerHeight + OVERFLOW_TOLERANCE
      );
    });
    setPlain(overflows);
  }, []);

  useEffect(() => {
    // Measured on the next frame rather than synchronously on mount, so
    // layout has settled before the sections are compared against the
    // viewport -- a measurement taken mid-layout would decide the mode from
    // heights that are about to change.
    const frame = requestAnimationFrame(syncMode);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    window.addEventListener("resize", syncMode);
    reduced.addEventListener("change", syncMode);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", syncMode);
      reduced.removeEventListener("change", syncMode);
    };
  }, [syncMode]);

  // Drives the CSS that turns the snap container back into an ordinary
  // document flow (see body.snap-plain in site.css).
  useEffect(() => {
    document.body.classList.toggle("snap-plain", plain);
    return () => document.body.classList.remove("snap-plain");
  }, [plain]);

  // Track whichever section covers the container's midline, rather than
  // whichever occupies more than half of it. Intersection ratio is measured
  // against the *target's* area, so a section taller than the container can
  // never reach 0.5 once it is more than twice the container's height -- and
  // short of that it still crosses the threshold late and unevenly. Because
  // goToAdjacentSection derives every move from activeIdRef, a stale value
  // there sends arrow keys back to a section the visitor has already passed.
  //
  // Collapsing the root to a zero-height line at the centre makes exactly one
  // section intersecting at any scroll position, whatever its height.
  useEffect(() => {
    if (plain) return;
    const container = document.querySelector<HTMLElement>(".snap-container");
    if (!container) return;
    const sectionEls = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (!sectionEls.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { root: container, rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [plain]);

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
    if (plain) return;

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
  }, [plain]);

  // Wheel assist: native scroll-snap-stop:always is supposed to guarantee a
  // fast wheel/trackpad fling still stops at every section in between, but
  // that guarantee isn't reliable across every browser/OS combination under
  // real momentum -- reported behavior here was the Prove section getting
  // skipped past before it could be read. This doesn't hijack scroll in
  // general: it only steps in once a wheel gesture crosses a real intent
  // threshold, completes the same single-section move native snap already
  // promises, then gets out of the way. Touch is untouched -- mobile
  // touch-scroll deceleration doesn't exhibit the same skip.
  //
  // It only runs in snap mode. In plain mode the page is an ordinary document
  // and the browser's own scrolling is the correct behaviour.
  useEffect(() => {
    if (plain) return;
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
  }, [plain]);

  // The dots address snap sections; in plain mode there are no snap positions
  // for them to point at and the page scrolls normally instead.
  if (plain) return null;

  return <SnapProgress sections={SECTIONS} activeId={activeId} />;
}
