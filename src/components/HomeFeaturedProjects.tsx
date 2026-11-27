import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Project } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";

export function HomeFeaturedProjects({ projects }: { projects: Project[] }) {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
                Featured Work
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
                Recent backend systems
              </h2>
              <p className="mt-3 max-w-xl text-base text-text-muted">
                A look at production Laravel modules and full-stack web
                applications.
              </p>
            </div>

            <Link
              href="/projects"
              className="group inline-flex w-fit items-center gap-2 rounded-xl border border-border bg-surface/90 px-4 py-2.5 text-sm font-semibold text-text shadow-card transition-all duration-200 hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span>View all projects</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <ProjectCard key={project.slug} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
