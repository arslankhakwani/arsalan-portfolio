import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SelectedWork } from "@/components/SelectedWork";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A selection of backend applications built by Muhammad Arsalan with Laravel, MySQL, ASP.NET Core, ASP.NET MVC, and SQL Server.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <>
      <PageHeader
        label="My Work"
        headline="5 Projects. 2 Stacks. Real Systems."
        subline="A selection of backend applications I've built with Laravel and .NET, each focused on clean architecture and reliable data handling."
      />
      <SelectedWork projects={projects} />
    </>
  );
}
