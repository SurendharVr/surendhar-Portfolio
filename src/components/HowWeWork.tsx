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

const questionIcon = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M9.5 9a2.5 2.5 0 115 1c0 1.5-2.5 1.8-2.5 3.5"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="17.3" r="1" fill="currentColor" />
  </svg>
);

export default function HowWeWork({
  showEyebrow = true,
}: {
  showEyebrow?: boolean;
}) {
  return (
    <section className="section" id="how-we-work">
      <div className="container">
        {showEyebrow && <p className="eyebrow">How I Work</p>}
        <h2>Good design isn&apos;t the starting point. Understanding is.</h2>
        <p className="background-intro">
          Before I design a page, I figure out what it needs to accomplish.
        </p>
        <ul className="question-grid">
          {questions.map((q) => (
            <li className="question-card" key={q}>
              <span className="question-mark" aria-hidden="true">
                {questionIcon}
              </span>
              <p>{q}</p>
            </li>
          ))}
        </ul>
        <p className="mini-heading process-label">
          The process — same five steps every time
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
