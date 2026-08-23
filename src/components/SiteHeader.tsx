"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { waLink } from "@/lib/whatsapp";

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
        </nav>

        <a
          className="btn btn-accent nav-cta"
          href={waLink("Hi, I'd like to start a project.")}
          target="_blank"
          rel="noopener noreferrer"
        >
          Start a Project
        </a>

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
