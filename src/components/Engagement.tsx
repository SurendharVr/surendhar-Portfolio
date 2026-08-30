const steps = [
  {
    n: "01",
    title: "Contract",
    body:
      "Nothing starts until the agreement is signed. It protects you exactly as much as it protects me, and it is where the timeline for your project is fixed in writing.",
  },
  {
    n: "02",
    title: "Welcome document",
    body:
      "What you can expect from me, how the work runs, how we stay in touch, and which access points I will need from you.",
  },
  {
    n: "03",
    title: "Invoice",
    body:
      "Payment details in writing, so there is nothing ambiguous about what is owed or when.",
  },
  {
    n: "04",
    title: "Access request",
    body:
      "One email asking for your brand assets and the account logins the work needs. They are already listed in the welcome document, so nothing arrives as a surprise.",
  },
  {
    n: "05",
    title: "Kick-off call",
    body:
      "A call on Google Meet to walk through the plan together before any of the work begins.",
  },
  {
    n: "06",
    title: "Client portal",
    body:
      "One place to see where things stand, instead of reconstructing it from a chain of emails.",
  },
  {
    n: "07",
    title: "Delivery",
    body:
      "Files handed over in a structured Google Drive alongside the portal. You end up holding everything, not just the finished thing.",
  },
];

/**
 * The engagement process, as opposed to the creative process. The five
 * Discover/Define/Design/Develop/Optimise steps describe how the *work* happens;
 * this describes how the *arrangement* happens, and it is identical whichever
 * service someone buys.
 *
 * Deliberately rendered on /services only, with the four service pages linking
 * here instead of repeating it. Four near-identical ~200-word blocks across four
 * sibling pages is how a small site talks itself into a near-duplicate problem.
 */
export default function Engagement() {
  return (
    <section className="section" id="how-working-together-works">
      <div className="container">
        <p className="mini-heading">Working together</p>
        <h2>What happens after you say yes.</h2>
        <p className="background-intro">
          Working with a studio of one should not mean working informally. Every engagement
          runs the same way, and you know what is coming before it arrives.
        </p>
        <p className="background-intro">
          Cost depends on the project, so it gets worked out on a call before anything is
          drawn up. What you agree on that call is what goes into the contract — along
          with the timeline.
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
