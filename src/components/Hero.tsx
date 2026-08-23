"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function Hero() {
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = [line1Ref.current, line2Ref.current].filter(
      (el): el is HTMLSpanElement => el !== null
    );
    if (!targets.length) return;

    gsap.set(targets, { opacity: 0, y: 16 });
    gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.12,
      delay: 0.1,
    });
  }, []);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });

    function handleMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      xTo((e.clientX - rect.left - rect.width / 2) * 0.3);
      yTo((e.clientY - rect.top - rect.height / 2) * 0.3);
    }
    function handleLeave() {
      xTo(0);
      yTo(0);
    }

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <section className="hero" id="top">
      <div className="container">
        <div className="hero-copy hero-copy-solo">
          <p className="eyebrow">Independent Digital Studio</p>
          <h1>
            <span className="hero-line" ref={line1Ref}>
              Your business has something worth choosing.
            </span>{" "}
            <span className="hl hero-line" ref={line2Ref}>
              Your digital presence should make that obvious.
            </span>
          </h1>
          <p className="hero-sub">
            We turn complex businesses, offers and ideas into clear digital experiences
            that people understand, trust and act on.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-accent" href="/contact" ref={ctaRef}>
              Start a Project
            </Link>
            <Link className="btn btn-outline" href="/work">
              See the Work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
