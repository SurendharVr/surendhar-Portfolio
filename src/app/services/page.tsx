import type { Metadata } from "next";
import Services from "@/components/Services";
import SignatureOffer from "@/components/SignatureOffer";
import Contact from "@/components/Contact";
import ScrollEffects from "@/components/ScrollEffects";

const title = "Services — Surendhar Venkatesh";
const description =
  "Website design, social media management, digital product design, and growth strategy for small businesses — plus ongoing partnerships for after launch.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services" },
  openGraph: { title, description, url: "/services" },
  twitter: { title, description },
};

export default function ServicesPage() {
  return (
    <>
      <Services headingLevel="h1" />
      <SignatureOffer showEyebrow={false} />
      <Contact showEyebrow={false} />
      <ScrollEffects />
    </>
  );
}
