import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ExperienceSection } from "@/components/ExperienceSection";
import { HomeCtaSection } from "@/components/HomeCtaSection";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Work experience of Muhammad Arsalan — Laravel Developer at Netrix Cloud and Freelance .NET Developer.",
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        label="Experience"
        headline="Where I've contributed"
        subline="Full-time Laravel backend development at Netrix Cloud alongside freelance ASP.NET MVC and ASP.NET Core deliveries."
      />
      <ExperienceSection />
      <HomeCtaSection />
    </>
  );
}
