import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Muhammad Arsalan — Laravel Developer at Netrix Cloud with freelance ASP.NET Core and MVC experience, education, and full technical stack.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="About Me"
        headline={profile.aboutHeading}
        subline="Backend developer at Netrix Cloud focused on clean PHP and Laravel systems, relational database design, and dependable ASP.NET applications."
      />
      <AboutSection />
      <SkillsSection />
    </>
  );
}
