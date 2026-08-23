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
    const activeLink = navRef.current?.querySelector('a[aria-current="true"]');
    activeLink?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [active]);

  return (
    <nav className="quick-nav" aria-label="Jump to section" ref={navRef}>
      <div className="container quick-nav-inner">
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
    </nav>
  );
}
