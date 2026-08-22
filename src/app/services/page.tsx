import type { Metadata } from "next";
import Services from "@/components/Services";
import SignatureOffer from "@/components/SignatureOffer";
import Contact from "@/components/Contact";
import ScrollEffects from "@/components/ScrollEffects";

export const metadata: Metadata = {
  title: "Services — Surendhar Venkatesh",
  description:
    "Website design, social media management, digital product design, and growth strategy for small businesses — plus ongoing partnerships for after launch.",
};

export default function ServicesPage() {
  return (
    <>
      <Services />
      <SignatureOffer />
      <Contact />
      <ScrollEffects />
    </>
  );
}
