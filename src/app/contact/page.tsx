import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ContactSection } from "@/components/ContactSection";
import { FaqSection } from "@/components/FaqSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Muhammad Arsalan for Laravel backend or .NET opportunities, plus answers to common hiring questions.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="Contact"
        headline="Let's build something together."
        subline="Looking for a dependable Laravel backend developer or someone who can also step into an ASP.NET codebase? Send a note or reach out directly."
      />
      <ContactSection />
      <FaqSection />
    </>
  );
}
