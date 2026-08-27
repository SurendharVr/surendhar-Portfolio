import { waLink } from "@/lib/contact";
import ContactRows from "@/components/ContactRows";

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

        <ContactRows rows={["email", "whatsapp", "location"]} />

        <p className="snap-convert-copyright">&copy; {year} Surendhar Venkatesh. All rights reserved.</p>
      </div>
    </section>
  );
}
