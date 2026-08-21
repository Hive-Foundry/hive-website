import { Hero } from "@/components/hero/Hero";
import { StatusStrip } from "@/components/home/StatusStrip";
import { Intro } from "@/components/home/Intro";
import { ModelsSection } from "@/components/home/ModelsSection";
import { OpenWeights } from "@/components/home/OpenWeights";
import { ResearchIndex } from "@/components/home/ResearchIndex";
import { FoundryPipeline } from "@/components/home/FoundryPipeline";
import { DevelopersSection } from "@/components/home/DevelopersSection";
import { RoadmapSection } from "@/components/home/RoadmapSection";
import { Manifesto } from "@/components/home/Manifesto";
import { UpdatesSection } from "@/components/home/UpdatesSection";
import { WaitlistCTA } from "@/components/home/WaitlistCTA";
import { usePageMeta } from "@/lib/usePageMeta";

export function Home() {
  usePageMeta(undefined);
  return (
    <>
      <Hero />
      <StatusStrip />
      <Intro />
      <ModelsSection />
      <OpenWeights />
      <ResearchIndex />
      <FoundryPipeline />
      <DevelopersSection />
      <RoadmapSection />
      <Manifesto />
      <UpdatesSection />
      <WaitlistCTA id="waitlist" />
    </>
  );
}
