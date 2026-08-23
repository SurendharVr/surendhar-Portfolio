import type { Metadata } from "next";
import Background from "@/components/Background";
import WhyUs from "@/components/WhyUs";
import HowWeWork from "@/components/HowWeWork";
import Contact from "@/components/Contact";
import ScrollEffects from "@/components/ScrollEffects";

const title = "About — Surendhar Venkatesh";
const description =
  "10+ years in B2B/B2C sales, now building websites, social media, and digital products for small businesses.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: { title, description, url: "/about" },
  twitter: { title, description },
};

export default function AboutPage() {
  return (
    <>
      <Background showHowIWork={false} headingLevel="h1" priority />
      <WhyUs />
      <HowWeWork showEyebrow={false} />
      <Contact showEyebrow={false} />
      <ScrollEffects />
    </>
  );
}
