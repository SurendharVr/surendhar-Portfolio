import Image from "next/image";

export default function SnapTrust() {
  return (
    <section className="snap-section" id="snap-trust">
      <div className="container">
        <div className="about-grid">
          <div>
            <p className="eyebrow">About</p>
            <h2>10+ years in sales, now building digital growth</h2>
            <p className="philosophy-line">
              I don&apos;t believe businesses need more digital noise — they need clarity
              in what they offer, who it&apos;s for, and why someone should care.
            </p>
          </div>
          <div className="hero-media">
            <div className="hero-portrait">
              <Image
                src="/assets/profile.webp"
                alt="Portrait of Surendhar Venkatesh"
                width={360}
                height={360}
              />
            </div>
          </div>
        </div>

        <div className="capability-rows">
          <div className="capability-row">
            <p className="mini-heading">What I build</p>
            <p>
              Websites, social media management, and digital products — planned, designed,
              and shipped end to end, not handed off in pieces.
            </p>
          </div>
          <div className="capability-row">
            <p className="mini-heading">What you get</p>
            <p>
              10+ years of reading what makes people buy shapes every page, post, and
              product decision.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
