import type { Metadata } from "next";
import Background from "@/components/Background";
import HowWeWork from "@/components/HowWeWork";
import Contact from "@/components/Contact";
import ScrollEffects from "@/components/ScrollEffects";

export const metadata: Metadata = {
  title: "About — Surendhar Venkatesh",
  description:
    "10+ years in B2B/B2C sales, now building websites, social media, and digital products for small businesses.",
};

export default function AboutPage() {
  return (
    <>
      <Background showHowIWork={false} />
      <HowWeWork />
      <Contact />
      <ScrollEffects />
    </>
  );
}
