import type { Metadata } from "next";
import Contact from "@/components/Contact";
import ScrollEffects from "@/components/ScrollEffects";

const title = "Contact — Surendhar Venkatesh";
const description =
  "Start a project or request a website audit. Websites, social media, and digital products for small businesses.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title, description, url: "/contact" },
  twitter: { title, description },
};

export default function ContactPage() {
  return (
    <>
      <Contact headingLevel="h1" standalone showEyebrow />
      <ScrollEffects />
    </>
  );
}
