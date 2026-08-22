const questions = [
  "Who is it for?",
  "What are they trying to decide?",
  "What's stopping them?",
  "Why should they choose you?",
];

export default function Understanding() {
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">How we work</p>
        <h2>Good design isn&apos;t the starting point. Understanding is.</h2>
        <p className="background-intro">
          Before we design a page, we figure out what the page needs to accomplish.
        </p>
        <ul className="highlight-list">
          {questions.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
        <p className="background-intro">Only then do we design the experience.</p>
      </div>
    </section>
  );
}
