import { HeroSection } from "@/components/home/hero-section";
import { EntryIntro } from "@/components/home/entry-intro";
import { HomeMotion } from "@/components/home/home-motion";
import { ChannelStory } from "@/components/home/channel-story";
import { CapabilitySection } from "@/components/home/capability-section";
import { IndustryExplorer } from "@/components/home/industry-explorer";
import { RoiSection } from "@/components/home/roi-section";
import { ProcessSection } from "@/components/home/process-section";
import { PricingPreview } from "@/components/home/pricing-preview";
import { FinalCta } from "@/components/home/final-cta";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default function HomePage() {
  return (
    <>
      <EntryIntro />
      <HomeMotion />
      <SiteHeader />
      <main>
        <HeroSection />
        <ChannelStory />
        <CapabilitySection />
        <IndustryExplorer />
        <RoiSection />
        <ProcessSection />
        <PricingPreview />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
