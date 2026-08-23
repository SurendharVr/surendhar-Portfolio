import Hero from "@/components/Hero";
import HomeQuickNav from "@/components/HomeQuickNav";
import Problem from "@/components/Problem";
import TrustStrip from "@/components/TrustStrip";
import HowWeWork from "@/components/HowWeWork";
import Work from "@/components/Work";
import WhyUs from "@/components/WhyUs";
import Services from "@/components/Services";
import SignatureOffer from "@/components/SignatureOffer";
import EntryPoints from "@/components/EntryPoints";
import Products from "@/components/Products";
import Background from "@/components/Background";
import Contact from "@/components/Contact";
import ScrollEffects from "@/components/ScrollEffects";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeQuickNav />
      <Problem />
      <TrustStrip />
      <Work showEyebrow={false} />
      <Services showEyebrow={false} />
      <SignatureOffer />
      <HowWeWork />
      <Products showEyebrow={false} />
      <WhyUs />
      <Background showEyebrow={false} />
      <EntryPoints />
      <Contact showEyebrow={false} />
      <ScrollEffects />
    </>
  );
}
