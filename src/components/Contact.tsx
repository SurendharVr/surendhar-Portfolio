import { waLink } from "@/lib/whatsapp";

export default function Contact({
  headingLevel = "h2",
  standalone = false,
  showEyebrow = true,
}: {
  headingLevel?: "h1" | "h2";
  standalone?: boolean;
  showEyebrow?: boolean;
}) {
  const Heading = headingLevel;
  return (
    <section
      className={`section section-dark${standalone ? " section-standalone" : ""}`}
      id="contact"
    >
      <div className="container contact-grid">
        <div>
          {showEyebrow && <p className="eyebrow eyebrow-on-dark">Contact</p>}
          <Heading className="cta-heading">Have a business problem worth solving?</Heading>
          <p className="contact-sub">
            Tell me what you&apos;re building, what&apos;s not working, and where you want
            to go. We&apos;ll figure out whether I&apos;m the right person to help.
          </p>
          <div className="hero-actions">
            <a
              className="btn btn-accent"
              href={waLink("Hi, I'd like to start a project.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Start a Project
            </a>
            <a
              className="btn btn-outline"
              href={waLink("Hi, I'd like to request a website audit.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get a Website Audit
            </a>
          </div>
        </div>

        <ul className="contact-list">
          <li>
            <span className="icon-badge icon-badge-sm" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M4 4h16v16H4V4z" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M4 6l8 7 8-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <a href="mailto:venkateshsurendhar@gmail.com">venkateshsurendhar@gmail.com</a>
          </li>
          <li>
            <span className="icon-badge icon-badge-sm" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.68 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0122 16.92z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <a href="tel:+919655326333">+91 96553 26333</a>
          </li>
          <li>
            <span className="icon-badge icon-badge-sm" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
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
            </span>
            <a
              href={waLink("Hi, I'd like to get in touch.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </li>
          <li>
            <span className="icon-badge icon-badge-sm" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M16 8a6 6 0 016 6v6h-4v-6a2 2 0 00-4 0v6h-4v-6a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <a
              href="https://www.linkedin.com/in/surendhar-venkatesh"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/in/surendhar-venkatesh
            </a>
          </li>
          <li>
            <span className="icon-badge icon-badge-sm" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 21s-7-5.33-7-11a7 7 0 0114 0c0 5.67-7 11-7 11z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
              </svg>
            </span>
            <span>Chennai, India</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
