import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Independent Digital Studio</p>
          <h1>
            Your business has something worth choosing.{" "}
            <span className="hl">Your digital presence should make that obvious.</span>
          </h1>
          <p className="hero-sub">
            We turn complex businesses, offers and ideas into clear digital experiences
            that people understand, trust and act on.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-accent" href="/contact">
              Start a Project
            </Link>
            <Link className="btn btn-outline" href="/work">
              See the Work
            </Link>
          </div>
        </div>
        <div className="hero-media">
          <div className="hero-portrait">
            <Image
              src="/assets/profile.png"
              alt="Portrait of Surendhar Venkatesh"
              width={360}
              height={360}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
