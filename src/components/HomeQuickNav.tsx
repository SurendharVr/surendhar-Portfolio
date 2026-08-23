"use client";

import { useEffect, useRef, useState } from "react";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#digital-presence-system", label: "The System" },
  { href: "#how-we-work", label: "Process" },
  { href: "#products", label: "Products" },
  { href: "#contact", label: "Contact" },
];

export default function HomeQuickNav() {
  const [active, setActive] = useState<string>("");
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const sections = LINKS.map((link) => document.getElementById(link.href.slice(1))).filter(
      (el): el is HTMLElement => el !== null
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-140px 0px -70% 0px", threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const activeLink = navRef.current?.querySelector<HTMLAnchorElement>('a[aria-current="true"]');
    activeLink?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });

    const indicator = indicatorRef.current;
    if (!indicator) return;
    if (!activeLink) {
      indicator.style.opacity = "0";
      return;
    }
    indicator.style.opacity = "1";
    indicator.style.width = `${activeLink.offsetWidth}px`;
    indicator.style.transform = `translateX(${activeLink.offsetLeft}px)`;
  }, [active]);

  useEffect(() => {
    const startEl = document.getElementById("work");
    const endEl = document.getElementById("contact");
    if (!startEl || !endEl) return;

    let frame = 0;
    const update = () => {
      const start = startEl.offsetTop;
      const end = endEl.offsetTop + endEl.offsetHeight;
      const total = end - start;
      const pct = total > 0 ? Math.min(1, Math.max(0, (window.scrollY - start) / total)) : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${pct})`;
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <nav className="quick-nav" aria-label="Jump to section" ref={navRef}>
      <div className="container quick-nav-inner">
        <span className="quick-nav-indicator" ref={indicatorRef} aria-hidden="true" />
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={active === link.href ? "active" : undefined}
            aria-current={active === link.href ? "true" : undefined}
          >
            {link.label}
          </a>
        ))}
      </div>
      <span className="quick-nav-progress-track" aria-hidden="true">
        <span className="quick-nav-progress-fill" ref={progressRef} />
      </span>
    </nav>
  );
}
