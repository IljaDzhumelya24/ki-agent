import { HeroSection } from "@/components/home/hero-section";
import { EntryIntro } from "@/components/home/entry-intro";
import { HomeMotion } from "@/components/home/home-motion";
import { ChannelStory } from "@/components/home/channel-story";
import { CapabilitySection } from "@/components/home/capability-section";
import { IndustryExplorer } from "@/components/home/industry-explorer";
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
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
