import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import SnapProve from "@/components/SnapProve";
import SnapExplain from "@/components/SnapExplain";
import SignatureOffer from "@/components/SignatureOffer";
import SnapTrust from "@/components/SnapTrust";
import SnapConvert from "@/components/SnapConvert";
import SnapController from "@/components/SnapController";
import ScrollEffects from "@/components/ScrollEffects";

// INTRODUCE -> PROBLEM -> PROVE -> EXPLAIN -> OFFER -> TRUST -> CONVERT.
// Full-screen scroll-snap: native CSS (.snap-container / .snap-section in
// site.css) drives the actual scrolling; SnapController only adds keyboard
// support and the progress dots on top of it. See
// C:\Users\ASUS\.claude\plans\tingly-hugging-journal.md for the plan this
// implements.
export default function Home() {
  return (
    <>
      <div className="snap-container">
        <Hero className="snap-section" />
        <Problem className="snap-section" />
        <SnapProve />
        <SnapExplain />
        <SignatureOffer className="snap-section" />
        <SnapTrust />
        <SnapConvert />
      </div>
      <SnapController />
      <ScrollEffects />
    </>
  );
}
