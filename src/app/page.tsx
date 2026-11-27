import { HeroSection } from "@/components/HeroSection";
import { StatsStrip } from "@/components/StatsStrip";
import { HomeFeaturedProjects } from "@/components/HomeFeaturedProjects";
import { HomeSkillsPreview } from "@/components/HomeSkillsPreview";
import { HomeCtaSection } from "@/components/HomeCtaSection";
import { getFeaturedProjects } from "@/lib/projects";

export default function HomePage() {
  const featuredProjects = getFeaturedProjects(3);

  return (
    <>
      <HeroSection />
      <StatsStrip />
      <HomeFeaturedProjects projects={featuredProjects} />
      <HomeSkillsPreview />
      <HomeCtaSection />
    </>
  );
}
