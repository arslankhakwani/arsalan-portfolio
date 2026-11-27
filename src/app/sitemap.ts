import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://arsalan-khakwani-portfolio.vercel.app";
  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.85 },
    { path: "/projects", priority: 0.9 },
    { path: "/experience", priority: 0.85 },
    { path: "/contact", priority: 0.8 },
  ].map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route.priority,
  }));

  const projects = getAllProjects().map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...projects];
}
