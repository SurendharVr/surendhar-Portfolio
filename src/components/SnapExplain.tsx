const steps = [
  { n: "01", title: "Discover", body: "Understand the business." },
  { n: "02", title: "Define", body: "Find the positioning and opportunity." },
  { n: "03", title: "Design", body: "Build the experience." },
  { n: "04", title: "Develop", body: "Turn the system into reality." },
  { n: "05", title: "Optimise", body: "Measure, improve, grow." },
];

export default function SnapExplain() {
  return (
    <section className="snap-section" id="snap-explain">
      <div className="container">
        <p className="eyebrow">How I Work</p>
        <h2>The same five steps, every time.</h2>
        <p className="background-intro">
          Before I design a page, I figure out what it needs to accomplish.
        </p>
        <ol className="process-steps">
          {steps.map((step) => (
            <li key={step.n}>
              <span className="process-number">{step.n}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
