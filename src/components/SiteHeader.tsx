"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { waLink } from "@/lib/whatsapp";
import ThemeToggle from "@/components/ThemeToggle";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/services", label: "Services" },
    { href: "/work", label: "Work" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="site-header">
      <div className="container nav-row">
        <Link href="/" className="logo">
          Surendhar Venkatesh
        </Link>

        <nav className={`main-nav${open ? " open" : ""}`} id="main-nav">
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
              narrowest widths where there isn't room for logo + WhatsApp +
              theme toggle + hamburger all in one row (see .nav-row > .theme-toggle). */}
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

        <a
          className="theme-toggle whatsapp-btn"
          href={waLink("Hi, I'd like to get in touch.")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M17.6 6.32A7.85 7.85 0 0012.05 4a7.94 7.94 0 00-6.9 11.89L4 20l4.24-1.11a7.93 7.93 0 003.8.97c4.38 0 7.94-3.56 7.94-7.94a7.9 7.9 0 00-2.38-5.6z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.5 8.5h-.6c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1 0 1.2.9 2.4 1 2.6.1.1 1.7 2.7 4.2 3.7 2.1.8 2.5.7 3 .6.4-.1 1.3-.5 1.5-1 .2-.5.2-1 .1-1-.1-.1-.2-.2-.5-.3l-1.3-.6c-.2-.1-.4-.1-.5.1l-.5.7c-.1.1-.2.2-.4.1-.2-.1-.9-.3-1.7-1-.6-.6-1-1.3-1.2-1.5-.1-.2 0-.3.1-.4l.4-.5c.1-.1.1-.3.1-.4"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        <ThemeToggle />

        <button
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
