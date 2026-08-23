"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { waLink } from "@/lib/whatsapp";

export default function Hero() {
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = [
      eyebrowRef.current,
      line1Ref.current,
      line2Ref.current,
      subRef.current,
      actionsRef.current,
    ].filter((el): el is HTMLElement => el !== null);
    if (!targets.length) return;

    let cancelled = false;
    import("gsap").then(({ default: gsap }) => {
      if (cancelled) return;
      gsap.set(targets, { opacity: 0, y: 16 });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.12,
        delay: 0.1,
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let detach: (() => void) | undefined;

    import("gsap").then(({ default: gsap }) => {
      if (cancelled) return;
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
      detach = () => {
        el.removeEventListener("mousemove", handleMove);
        el.removeEventListener("mouseleave", handleLeave);
      };
    });

    return () => {
      cancelled = true;
      detach?.();
    };
  }, []);

  return (
    <section className="hero" id="top">
      <div className="container">
        <div className="hero-copy hero-copy-solo">
          <p className="eyebrow" ref={eyebrowRef}>
            Independent Digital Studio
          </p>
          <h1>
            <span className="hero-line" ref={line1Ref}>
              Your business has something worth choosing.
            </span>{" "}
            <span className="hl hero-line" ref={line2Ref}>
              Your digital presence should make that obvious.
            </span>
          </h1>
          <p className="hero-sub" ref={subRef}>
            We turn complex businesses, offers and ideas into clear digital experiences
            that people understand, trust and act on.
          </p>
          <div className="hero-actions" ref={actionsRef}>
            <a
              className="btn btn-accent"
              href={waLink("Hi, I'd like to start a project.")}
              target="_blank"
              rel="noopener noreferrer"
              ref={ctaRef}
            >
              Start a Project
            </a>
            <Link className="btn btn-outline" href="/work">
              See the Work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
