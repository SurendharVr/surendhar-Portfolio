import type { Metadata } from "next";
import Products from "@/components/Products";
import Contact from "@/components/Contact";
import ScrollEffects from "@/components/ScrollEffects";

const title = "Digital Products — Surendhar Venkatesh";
const description =
  "Digital products by Surendhar Venkatesh, including the research-backed Kindle ebook 'Eight Hours, Still Exhausted.'";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/products" },
  openGraph: { title, description, url: "/products" },
  twitter: { title, description },
};

export default function ProductsPage() {
  return (
    <>
      <Products headingLevel="h1" />
      <Contact showEyebrow={false} />
      <ScrollEffects />
    </>
  );
}
