"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { waLink } from "@/lib/contact";
import ThemeToggle from "@/components/ThemeToggle";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // The header's rendered height was hardcoded as 76px (68px on mobile) in
  // four unrelated stylesheet rules -- the dropdown's top offset, the quick
  // nav's sticky offset, and the snap sections' top padding and
  // scroll-margin -- with nothing deriving them from the header itself. Raise
  // the browser's minimum font size or zoom the page and the header grows past
  // the constant, so the dropdown detaches from it and section headings slide
  // underneath it.
  //
  // Publishing the measured height as --header-h makes those rules follow the
  // real element at any zoom or font size. ResizeObserver rather than a resize
  // listener because the header also changes height when the nav wraps, which
  // no window event reports.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const publish = () => {
      document.documentElement.style.setProperty(
        "--header-h",
        `${Math.round(el.getBoundingClientRect().height)}px`
      );
    };
    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const links = [
    { href: "/services", label: "Services" },
    { href: "/work", label: "Work" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  // The dropdown and its focus trap only exist below 1024px -- at and above
  // that width .nav-toggle is display:none and .main-nav is a static inline
  // row (see site.css). But `open` is React state that nothing was resetting,
  // so opening the menu on a narrow window and then widening it (or rotating a
  // tablet to landscape) left the trap armed over a nav that no longer looks
  // like a menu: a keyboard user cycled the five header links indefinitely
  // with nothing on screen explaining why, and Escape as the only way out.
  // Closing on the breakpoint crossing ties the state to the layout that
  // justifies it.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    function sync() {
      if (desktop.matches) setOpen(false);
    }
    sync();
    desktop.addEventListener("change", sync);
    return () => desktop.removeEventListener("change", sync);
  }, []);

  // The toggle button sits after <nav> in DOM order, so without this a
  // keyboard user who opens the menu and presses Tab skips straight past
  // its links into the page behind — not just "no trap" but backwards tab
  // order. Moving focus in on open and cycling within it on Tab/Shift+Tab
  // fixes both; Escape closes and returns focus to the toggle button.
  useEffect(() => {
    if (!open) return;
    const nav = navRef.current;
    if (!nav) return;

    const focusable = Array.from(
      nav.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")
    );
    focusable[0]?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="site-header" ref={headerRef}>
      <div className="container nav-row">
        <Link href="/" className="logo">
          Surendhar Venkatesh<span className="logo-mark">.</span>
        </Link>

        <nav ref={navRef} className={`main-nav${open ? " open" : ""}`} id="main-nav">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={
                pathname === link.href || pathname.startsWith(link.href + "/")
                  ? "active"
                  : undefined
              }
            >
              {link.label}
            </Link>
          ))}
          {/* Duplicate of the row's ThemeToggle below, shown only at the
              narrowest widths where there isn't room for logo + theme
              toggle + hamburger all in one row (see .nav-row > .theme-toggle). */}
          <ThemeToggle />
        </nav>

        <a
          className="btn btn-accent nav-cta"
          href={waLink("Hi, I'd like to start a project.")}
          target="_blank"
          rel="noopener noreferrer"
        >
          Start a Project
        </a>

        <ThemeToggle />

        <button
          ref={toggleRef}
          className="nav-toggle"
          id="nav-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
