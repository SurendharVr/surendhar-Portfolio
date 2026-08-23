import type { Metadata } from "next";
import Products from "@/components/Products";
import Contact from "@/components/Contact";
import ScrollEffects from "@/components/ScrollEffects";

export const metadata: Metadata = {
  title: "Digital Products — Surendhar Venkatesh",
  description:
    "Digital products by Surendhar Venkatesh, including the research-backed Kindle ebook 'Eight Hours, Still Exhausted.'",
};

export default function ProductsPage() {
  return (
    <>
      <Products headingLevel="h1" />
      <Contact />
      <ScrollEffects />
    </>
  );
}
