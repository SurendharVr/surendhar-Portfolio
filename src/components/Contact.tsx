import { waLink } from "@/lib/whatsapp";
import ContactRows from "@/components/ContactRows";

export default function Contact({
  headingLevel = "h2",
  standalone = false,
  showEyebrow = false,
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

        <ContactRows rows={["email", "phone", "whatsapp", "linkedin", "location"]} />
      </div>
    </section>
  );
}
