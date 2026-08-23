const questions = [
  "Who is it for?",
  "What are they trying to decide?",
  "What's stopping them?",
  "Why should they choose you?",
];

const steps = [
  { n: "01", title: "Discover", body: "Understand the business." },
  { n: "02", title: "Define", body: "Find the positioning and opportunity." },
  { n: "03", title: "Design", body: "Build the experience." },
  { n: "04", title: "Develop", body: "Turn the system into reality." },
  { n: "05", title: "Optimise", body: "Measure, improve, grow." },
];

export default function HowWeWork({
  showEyebrow = true,
}: {
  showEyebrow?: boolean;
}) {
  return (
    <section className="section" id="how-we-work">
      <div className="container">
        {showEyebrow && <p className="eyebrow">How We Work</p>}
        <h2>Good design isn&apos;t the starting point. Understanding is.</h2>
        <p className="background-intro">
          Before we design a page, we figure out what the page needs to accomplish.
        </p>
        <ul className="highlight-list">
          {questions.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
        <p className="background-intro">
          Only then do we design the experience — the same five steps every time:
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
