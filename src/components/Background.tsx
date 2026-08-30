import Image from "next/image";
import Link from "next/link";

export default function Background({
  headingLevel = "h2",
  showEyebrow = false,
  priority = false,
}: {
  headingLevel?: "h1" | "h2";
  showEyebrow?: boolean;
  priority?: boolean;
}) {
  const Heading = headingLevel;
  return (
    <section className="section" id="background">
      <div className="container">
        <div className="about-grid">
          <div>
            {showEyebrow && <p className="eyebrow">About</p>}
            <Heading>10+ years in sales, now building digital growth</Heading>
            <p className="philosophy-line">
              I don&apos;t believe businesses need more digital noise — they need clarity
              in what they offer, who it&apos;s for, and why someone should care.
            </p>
            <p className="background-intro">
              That&apos;s where design becomes valuable: turning that clarity into
              something people can see, understand, and act on. Before websites and social
              media, I spent over a decade in Sales Operations, Business Development,
              SaaS, and Key Account Management — learning first-hand what makes a customer
              say yes. That&apos;s the lens behind every site, page, and product I build
              today.
            </p>
          </div>
          <div className="hero-media">
            <div className="hero-portrait">
              <Image
                src="/assets/profile.webp"
                alt="Portrait of Surendhar Venkatesh"
                width={360}
                height={360}
                priority={priority}
              />
            </div>
          </div>
        </div>

        <div className="capability-rows">
          <div className="capability-row">
            <p className="mini-heading">What I build</p>
            <p>
              <Link href="/services/website-design">Websites</Link>,{" "}
              <Link href="/services/social-media">social media management</Link>, and{" "}
              <Link href="/services/digital-products">digital products</Link> — planned,
              designed, and shipped end to end, not handed off in pieces.
            </p>
          </div>
          <div className="capability-row">
            <p className="mini-heading">What you get</p>
            <p>
              10+ years of reading what makes people buy shapes every page, post, and
              product — real, live work like Flavours Tec Kitchen, VAAV Kitchen &amp;
              Caterers, and a research-backed ebook on Amazon.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
