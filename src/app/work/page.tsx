import type { Metadata } from "next";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import ScrollEffects from "@/components/ScrollEffects";

export const metadata: Metadata = {
  title: "Work — Surendhar Venkatesh",
  description:
    "Real websites and digital products built by Surendhar Venkatesh, including Flavours Tec Kitchen, VAAV Kitchen & Caterers, and a published Kindle ebook.",
};

export default function WorkPage() {
  return (
    <>
      <Work />
      <Contact />
      <ScrollEffects />
    </>
  );
}
