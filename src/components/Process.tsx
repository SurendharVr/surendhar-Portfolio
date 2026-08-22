const steps = [
  { n: "01", title: "Discover", body: "Understand the business." },
  { n: "02", title: "Define", body: "Find the positioning and opportunity." },
  { n: "03", title: "Design", body: "Build the experience." },
  { n: "04", title: "Develop", body: "Turn the system into reality." },
  { n: "05", title: "Optimise", body: "Measure, improve, grow." },
];

export default function Process() {
  return (
    <section className="section section-muted" id="process">
      <div className="container">
        <p className="eyebrow">Process</p>
        <h2>How I work</h2>
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
