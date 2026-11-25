import projectsData from "../../data/projects.json";

export type ProjectStack = "laravel" | "dotnet";
export type ProjectType = "employment" | "freelance" | "personal";

export interface ChallengeSolution {
  challenge: string;
  solution: string;
}

export interface ProjectScreenshot {
  src: string;
  alt: string;
  caption?: string;
}

export interface Project {
  title: string;
  slug: string;
  shortDescription: string;
  coverImage: string;
  tags: string[];
  stack: ProjectStack;
  type: ProjectType;
  date: string;
  overview: string;
  role: string;
  features: string[];
  techStack: string[];
  challengesAndSolutions: ChallengeSolution[];
  screenshots: ProjectScreenshot[];
  githubUrl?: string;
  liveDemoUrl?: string;
}

export function getAllProjects(): Project[] {
  return projectsData as Project[];
}

export function getProjectBySlug(slug: string): Project | undefined {
  return (projectsData as Project[]).find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return (projectsData as Project[]).map((project) => project.slug);
}

export function formatProjectTypeLabel(type: ProjectType): string {
  switch (type) {
    case "employment":
      return "Employment";
    case "freelance":
      return "Freelance";
    case "personal":
      return "Personal";
    default:
      return type;
  }
}

export function formatStackLabel(stack: ProjectStack): string {
  return stack === "laravel" ? "Laravel" : ".NET";
}
