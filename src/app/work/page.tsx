import type { Metadata } from "next";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import ScrollEffects from "@/components/ScrollEffects";

const title = "Work — Websites & Digital Products | Surendhar Venkatesh";
const description =
  "Real websites and digital products built by Surendhar Venkatesh, including Flavours Tec Kitchen, VAAV Kitchen & Caterers, and a published Kindle ebook.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work" },
  openGraph: { title, description, url: "/work" },
  twitter: { title, description },
};

export default function WorkPage() {
  return (
    <>
      <Work headingLevel="h1" showEyebrow />
      <Contact />
      <ScrollEffects />
    </>
  );
}
