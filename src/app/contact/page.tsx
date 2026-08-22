import type { Metadata } from "next";
import Contact from "@/components/Contact";
import ScrollEffects from "@/components/ScrollEffects";

export const metadata: Metadata = {
  title: "Contact — Surendhar Venkatesh",
  description:
    "Start a project or request a website audit. Websites, social media, and digital products for small businesses.",
};

export default function ContactPage() {
  return (
    <>
      <Contact />
      <ScrollEffects />
    </>
  );
}
