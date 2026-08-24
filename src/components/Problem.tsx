const problems = [
  "The offer is unclear.",
  "The positioning is weak.",
  "The website talks about the business instead of the customer.",
  "The path to action is buried.",
];

const crossIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M6 6l12 12M18 6L6 18"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

export default function Problem({ className }: { className?: string } = {}) {
  return (
    <section
      className={`section section-muted${className ? ` ${className}` : ""}`}
      id="snap-problem"
    >
      <div className="container">
        <h2>Most businesses don&apos;t have a design problem. They have a clarity problem.</h2>
        <ul className="problem-grid">
          {problems.map((text) => (
            <li className="problem-card" key={text}>
              <span className="problem-mark" aria-hidden="true">
                {crossIcon}
              </span>
              <p>{text}</p>
            </li>
          ))}
        </ul>
        <p className="philosophy-line pivot-line">
          I fix those problems before I start polishing pixels.
        </p>
      </div>
    </section>
  );
}
