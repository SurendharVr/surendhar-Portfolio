export default function Contact() {
  return (
    <section className="section section-dark" id="contact">
      <div className="container contact-grid">
        <div>
          <p className="eyebrow eyebrow-on-dark">Contact</p>
          <h2>Have a business problem worth solving?</h2>
          <p className="contact-sub">
            Tell me what you&apos;re building, what&apos;s not working, and where you want
            to go. We&apos;ll figure out whether I&apos;m the right person to help.
          </p>
          <div className="hero-actions">
            <a
              className="btn btn-accent"
              href="mailto:venkateshsurendhar@gmail.com?subject=Start%20a%20Project"
            >
              Start a Project
            </a>
            <a
              className="btn btn-outline"
              href="mailto:venkateshsurendhar@gmail.com?subject=Website%20Audit%20request"
            >
              Get a Website Audit
            </a>
          </div>
        </div>

        <ul className="contact-list">
          <li>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 4h16v16H4V4z" stroke="currentColor" strokeWidth="2" />
              <path
                d="M4 6l8 7 8-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <a href="mailto:venkateshsurendhar@gmail.com">venkateshsurendhar@gmail.com</a>
          </li>
          <li>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.68 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0122 16.92z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <a href="tel:+917013333935">+91 70133 33935</a>
          </li>
          <li>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M16 8a6 6 0 016 6v6h-4v-6a2 2 0 00-4 0v6h-4v-6a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <a
              href="https://www.linkedin.com/in/surendhar-venkatesh"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/in/surendhar-venkatesh
            </a>
          </li>
          <li>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 21s-7-5.33-7-11a7 7 0 0114 0c0 5.67-7 11-7 11z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span>Chennai, India</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
