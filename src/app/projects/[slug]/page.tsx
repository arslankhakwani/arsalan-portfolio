import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Github,
  Layers,
  Wrench,
} from "lucide-react";
import {
  formatProjectTypeLabel,
  formatStackLabel,
  getAllProjects,
  getAllProjectSlugs,
  getProjectBySlug,
  getProjectFeatureBadge,
} from "@/lib/projects";
import { Reveal } from "@/components/Reveal";
import { HomeCtaSection } from "@/components/HomeCtaSection";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} — Muhammad Arsalan`,
      description: project.shortDescription,
      images: [
        {
          url: project.coverImage,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const prevProject =
    currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : null;

  const extraScreenshots = (project.screenshots || []).filter(
    (shot) => shot.src !== project.coverImage
  );
  const coverCaption = project.screenshots?.find(
    (shot) => shot.src === project.coverImage
  )?.caption;

  return (
    <>
      {/* Theme-Aware Case Study Header */}
      <section className="border-b border-border/80 bg-bg-soft/60 pb-14 pt-10 backdrop-blur-sm sm:pb-16 sm:pt-14">
        <div className="mx-auto max-w-5xl px-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg text-sm font-medium text-text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to all projects</span>
          </Link>

          <div className="mt-7 flex flex-wrap items-center gap-2.5">
            <span className="rounded-lg bg-gradient-to-r from-accent to-accent-2 px-3 py-1 font-mono text-xs font-semibold text-on-accent shadow-glow">
              {formatStackLabel(project.stack)}
            </span>
            <span className="rounded-lg border border-border bg-surface px-3 py-1 font-mono text-xs font-medium text-text">
              {formatProjectTypeLabel(project.type)}
            </span>
            <span className="rounded-lg border border-border bg-surface px-3 py-1 text-xs font-medium text-text">
              {getProjectFeatureBadge(project)}
            </span>
            <span className="font-mono text-xs text-text-muted">
              · {project.date}
            </span>
          </div>

          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-text sm:text-5xl sm:leading-[1.1]">
            {project.title}
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-relaxed text-text-muted sm:text-lg">
            {project.shortDescription}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-2 px-5 py-2.5 text-sm font-semibold text-on-accent shadow-glow transition-all duration-200 hover:scale-[1.02] hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Github className="h-4 w-4" />
                <span>View on GitHub</span>
                <ExternalLink className="h-3.5 w-3.5 opacity-85" />
              </a>
            )}
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-text shadow-card transition-all duration-200 hover:scale-[1.02] hover:border-accent/50 hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <ExternalLink className="h-4 w-4 text-accent" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Case Study Content */}
      <article className="py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          {/* Existing Project Cover Visual (untouched) */}
          <Reveal>
            <figure className="overflow-hidden rounded-2xl border border-border bg-surface shadow-card-hover">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={project.coverImage}
                  alt={`${project.title} cover graphic`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                />
              </div>
              {coverCaption && (
                <figcaption className="border-t border-border/80 px-5 py-3 text-xs text-text-muted">
                  {coverCaption}
                </figcaption>
              )}
            </figure>
          </Reveal>

          {/* Overview & My Role */}
          <Reveal delayMs={60}>
            <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
                  Overview
                </h2>
                <p className="mt-3 text-base leading-relaxed text-text-muted sm:text-lg">
                  {project.overview}
                </p>

                <h2 className="mt-10 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
                  My Role
                </h2>
                <p className="mt-3 text-base leading-relaxed text-text-muted">
                  {project.role}
                </p>
              </div>

              {/* Tech Stack Sidebar Card */}
              <aside className="lg:col-span-5">
                <div className="rounded-2xl border border-border bg-surface/90 p-6 shadow-card backdrop-blur-md">
                  <div className="flex items-center gap-2 font-display text-sm font-bold text-text">
                    <Layers className="h-4 w-4 text-accent" />
                    <span>Tech Stack</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-xl border border-border bg-bg-soft px-3 py-1.5 font-mono text-xs font-medium text-text transition-colors hover:border-accent/50 hover:text-accent"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </Reveal>

          {/* Features */}
          <Reveal delayMs={80}>
            <section className="mt-14 border-t border-border/80 pt-12">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
                Key Features
              </h2>
              <ul className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 rounded-2xl border border-border bg-surface/90 p-4 shadow-card backdrop-blur-md"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span className="text-sm leading-relaxed text-text">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          {/* Challenges & Solutions */}
          <Reveal delayMs={100}>
            <section className="mt-14 border-t border-border/80 pt-12">
              <div className="flex items-center gap-2">
                <Wrench className="h-4 w-4 text-accent" />
                <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
                  Challenges &amp; Solutions
                </h2>
              </div>

              <div className="mt-6 space-y-5">
                {project.challengesAndSolutions.map((item, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 gap-4 rounded-2xl border border-border bg-surface/90 p-6 shadow-card backdrop-blur-md md:grid-cols-2 md:gap-8"
                  >
                    <div>
                      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
                        Challenge
                      </span>
                      <p className="mt-2 text-sm leading-relaxed text-text">
                        {item.challenge}
                      </p>
                    </div>
                    <div className="border-t border-border/80 pt-4 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                        Solution
                      </span>
                      <p className="mt-2 text-sm leading-relaxed text-text-muted">
                        {item.solution}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          {/* Additional distinct screenshots if present */}
          {extraScreenshots.length > 0 && (
            <Reveal delayMs={120}>
              <section className="mt-14 border-t border-border/80 pt-12">
                <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
                  Additional Visuals
                </h2>
                <div className="mt-6 grid grid-cols-1 gap-6">
                  {extraScreenshots.map((shot, idx) => (
                    <figure
                      key={idx}
                      className="overflow-hidden rounded-2xl border border-border bg-surface shadow-card"
                    >
                      <div className="relative aspect-[16/9] w-full">
                        <Image
                          src={shot.src}
                          alt={shot.alt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 1024px"
                          className="object-cover"
                        />
                      </div>
                      {shot.caption && (
                        <figcaption className="border-t border-border/80 px-5 py-3 text-xs text-text-muted">
                          {shot.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </section>
            </Reveal>
          )}

          {/* Previous / Next Navigation */}
          <nav
            aria-label="Project navigation"
            className="mt-16 grid grid-cols-1 gap-4 border-t border-border/80 pt-10 sm:grid-cols-2"
          >
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-surface/90 p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-text-muted">
                  <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                  Previous Project
                </span>
                <span className="mt-1.5 font-display font-semibold text-text group-hover:text-accent">
                  {prevProject.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextProject && (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group flex flex-col items-end rounded-2xl border border-border bg-surface/90 p-5 text-right shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-text-muted">
                  Next Project
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="mt-1.5 font-display font-semibold text-text group-hover:text-accent">
                  {nextProject.title}
                </span>
              </Link>
            )}
          </nav>
        </div>
      </article>

      <HomeCtaSection />
    </>
  );
}
