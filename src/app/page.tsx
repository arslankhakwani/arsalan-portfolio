import { HeroSection } from "@/components/HeroSection";
import { StatsStrip } from "@/components/StatsStrip";
import { SelectedWork } from "@/components/SelectedWork";
import { HomeSkillsPreview } from "@/components/HomeSkillsPreview";
import { HomeCtaSection } from "@/components/HomeCtaSection";
import { getAllProjects } from "@/lib/projects";

export default function HomePage() {
  const projects = getAllProjects();

  return (
    <>
      <HeroSection />
      <StatsStrip />
      <SelectedWork
        projects={projects}
        showSectionHeader
        showCaseStudyBanner={false}
      />
      <HomeSkillsPreview />
      <HomeCtaSection />
    </>
  );
}
