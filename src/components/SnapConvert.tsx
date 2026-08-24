import { waLink } from "@/lib/whatsapp";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export default function SnapConvert() {
  const year = new Date().getFullYear();
  return (
    <section className="snap-section section-dark" id="snap-convert">
      <div className="container contact-grid">
        <div>
          <p className="eyebrow eyebrow-on-dark">Contact</p>
          <h2 className="cta-heading">Have a business problem worth solving?</h2>
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
            <span className="whatsapp-badge" aria-hidden="true">
              <WhatsAppIcon size={28} />
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

        <p className="snap-convert-copyright">&copy; {year} Surendhar Venkatesh. All rights reserved.</p>
      </div>
    </section>
  );
}
