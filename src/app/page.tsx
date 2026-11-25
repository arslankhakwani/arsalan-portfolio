import { HeroSection } from "@/components/HeroSection";
import { StatsStrip } from "@/components/StatsStrip";
import { SelectedWork } from "@/components/SelectedWork";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { FaqSection } from "@/components/FaqSection";
import { ContactSection } from "@/components/ContactSection";
import { getAllProjects } from "@/lib/projects";

export default function HomePage() {
  const projects = getAllProjects();

  return (
    <>
      <HeroSection />
      <StatsStrip />
      <SelectedWork projects={projects} />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
