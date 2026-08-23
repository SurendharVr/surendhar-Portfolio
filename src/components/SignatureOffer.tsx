const steps = [
  "Strategy",
  "Positioning",
  "UX",
  "Visual Design",
  "Website",
  "Conversion",
  "Launch",
  "Optimisation",
];

export default function SignatureOffer({
  showEyebrow = true,
}: {
  showEyebrow?: boolean;
}) {
  return (
    <section className="section signature-offer" id="digital-presence-system">
      <div className="container">
        {showEyebrow && <p className="eyebrow">The Flagship Offer</p>}
        <h2>The Digital Presence System</h2>
        <p className="background-intro">
          Instead of a website, a social page, and a digital product built separately and
          disconnected, this is one connected system, built end to end — the same approach
          behind Flavours Tec Kitchen and VAAV Kitchen &amp; Caterers.
        </p>
        <ol className="system-chain">
          {steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <a className="btn btn-accent" href="/contact">
          Start a Project
        </a>
      </div>
    </section>
  );
}
