const reasons = [
  {
    title: "Senior thinking, without the agency layers.",
    body: "You work directly with the person solving the problem.",
  },
  {
    title: "Business before aesthetics.",
    body: "We don't start with colours and animations. We start with what needs to change.",
  },
  {
    title: "Designed around your customer.",
    body: "The experience is built around what people need to understand, believe, and do.",
  },
  {
    title: "Built to evolve.",
    body: "We create systems rather than one-off pages that become obsolete six months later.",
  },
];

export default function WhyUs() {
  const [lead, ...rest] = reasons;
  return (
    <section className="section section-muted">
      <div className="container">
        <h2>Why work with a small studio?</h2>
        <div className="reasons-grid">
          <div className="capability-card reasons-lead">
            <p className="mini-heading">{lead.title}</p>
            <p>{lead.body}</p>
          </div>
          {rest.map((reason) => (
            <div className="capability-card" key={reason.title}>
              <p className="mini-heading">{reason.title}</p>
              <p>{reason.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
