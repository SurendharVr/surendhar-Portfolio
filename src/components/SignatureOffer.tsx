import { waLink } from "@/lib/whatsapp";

const steps = [
  { label: "Strategy", x: 50, y: 10 },
  { label: "Positioning", x: 78.3, y: 21.7 },
  { label: "UX", x: 90, y: 50 },
  { label: "Visual Design", x: 78.3, y: 78.3 },
  { label: "Website", x: 50, y: 90 },
  { label: "Conversion", x: 21.7, y: 78.3 },
  { label: "Launch", x: 10, y: 50 },
  { label: "Optimisation", x: 21.7, y: 21.7 },
];

export default function SignatureOffer({
  showEyebrow = false,
  className,
}: {
  showEyebrow?: boolean;
  className?: string;
}) {
  return (
    <section
      className={`section signature-offer${className ? ` ${className}` : ""}`}
      id="digital-presence-system"
    >
      <div className="container">
        {showEyebrow && <p className="eyebrow">The Flagship Offer</p>}
        <h2>The Digital Presence System</h2>
        <p className="background-intro">
          Instead of a website, a social page, and a digital product built separately and
          disconnected, this is one connected system, built end to end — the same approach
          behind Flavours Tec Kitchen and VAAV Kitchen &amp; Caterers.
        </p>

        <div className="mindmap">
          <div className="mindmap-canvas">
            <svg
              className="mindmap-lines"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {steps.map((step) => (
                <line key={step.label} x1="50" y1="50" x2={step.x} y2={step.y} />
              ))}
            </svg>
            <p className="mindmap-hub">Digital Presence System</p>
            <ol className="mindmap-nodes">
              {steps.map((step, i) => (
                <li
                  className="mindmap-node"
                  key={step.label}
                  style={
                    {
                      "--x": `${step.x}%`,
                      "--y": `${step.y}%`,
                    } as React.CSSProperties
                  }
                >
                  <span className="mindmap-node-number">{i + 1}</span>
                  <span>{step.label}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <a
          className="btn btn-accent"
          href={waLink(
            "Hi, I'm interested in the Digital Presence System and would like to discuss a project."
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          Start a Project
        </a>
      </div>
    </section>
  );
}
