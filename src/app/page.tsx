import { HeroSection } from "@/components/home/hero-section";
import { HomeMotion } from "@/components/home/home-motion";
import { SiteHeader } from "@/components/layout/site-header";

export default function HomePage() {
  return (
    <>
      <HomeMotion />
      <SiteHeader />
      <main>
        <HeroSection />
      </main>
    </>
  );
}
