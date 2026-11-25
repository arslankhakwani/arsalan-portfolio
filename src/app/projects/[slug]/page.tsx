import type { Metadata } from "next";
import Link from "next/link";
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
} from "@/lib/projects";
import { ContactSection } from "@/components/ContactSection";

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

  return (
    <>
      {/* Dark Case Study Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1120] via-[#0F172A] to-[#0B192E] pb-16 pt-12 text-white sm:pb-20 sm:pt-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 right-0 h-[320px] w-[320px] rounded-full bg-blue-600/20 blur-[110px]"
        />
        <div className="relative mx-auto max-w-5xl px-6">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to all work</span>
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            <span className="rounded-md bg-gradient-to-r from-blue-600 to-cyan-600 px-2.5 py-1 font-mono text-xs font-semibold text-white">
              {formatStackLabel(project.stack)}
            </span>
            <span className="rounded-md border border-slate-700 bg-slate-900/80 px-2.5 py-1 font-mono text-xs font-medium text-slate-200">
              {formatProjectTypeLabel(project.type)}
            </span>
            <span className="font-mono text-xs text-slate-400">
              · {project.date}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-[1.1]">
            {project.title}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">
            {project.shortDescription}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/25 transition-all hover:from-blue-500 hover:to-cyan-500"
              >
                <Github className="h-4 w-4" />
                <span>View on GitHub</span>
                <ExternalLink className="h-3.5 w-3.5 opacity-80" />
              </a>
            )}
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-5 py-2.5 text-sm font-semibold text-slate-100 transition-colors hover:border-blue-400/50 hover:bg-slate-800"
              >
                <ExternalLink className="h-4 w-4 text-cyan-400" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Case Study Content */}
      <article className="bg-[#F8FAFC] py-16 dark:bg-[#0B1120] sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          {/* Cover Visual */}
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-950 shadow-lg dark:border-zinc-800">
            <img
              src={project.coverImage}
              alt={`${project.title} cover`}
              className="aspect-[16/9] w-full object-cover"
            />
          </div>

          {/* Overview & My Role */}
          <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                Overview
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-lg">
                {project.overview}
              </p>

              <h2 className="mt-10 font-mono text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                My Role
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                {project.role}
              </p>
            </div>

            {/* Tech Stack Sidebar Card */}
            <aside className="lg:col-span-5">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-[#111216]">
                <div className="flex items-center gap-2 text-sm font-bold text-zinc-950 dark:text-white">
                  <Layers className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span>Tech Stack</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 font-mono text-xs font-medium text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          {/* Features */}
          <section className="mt-14 border-t border-zinc-200 pt-12 dark:border-zinc-800">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Key Features
            </h2>
            <ul className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-zinc-50/60 p-4 dark:border-zinc-800 dark:bg-[#111216]"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Challenges & Solutions */}
          <section className="mt-14 border-t border-zinc-200 pt-12 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <Wrench className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                Challenges &amp; Solutions
              </h2>
            </div>

            <div className="mt-6 space-y-5">
              {project.challengesAndSolutions.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 gap-4 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-[#111216] md:grid-cols-2 md:gap-8"
                >
                  <div>
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      Challenge
                    </span>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
                      {item.challenge}
                    </p>
                  </div>
                  <div className="border-t border-zinc-100 pt-4 dark:border-zinc-800 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Solution
                    </span>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                      {item.solution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Screenshots */}
          {project.screenshots && project.screenshots.length > 0 && (
            <section className="mt-14 border-t border-zinc-200 pt-12 dark:border-zinc-800">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                Screenshots &amp; Architecture
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-6">
                {project.screenshots.map((shot, idx) => (
                  <figure
                    key={idx}
                    className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-[#111216]"
                  >
                    <img
                      src={shot.src}
                      alt={shot.alt}
                      className="w-full object-cover"
                    />
                    {shot.caption && (
                      <figcaption className="border-t border-zinc-200 px-5 py-3 text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
                        {shot.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </section>
          )}

          {/* Previous / Next Navigation */}
          <nav
            aria-label="Project navigation"
            className="mt-16 grid grid-cols-1 gap-4 border-t border-zinc-200 pt-10 dark:border-zinc-800 sm:grid-cols-2"
          >
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="group flex flex-col rounded-xl border border-zinc-200 p-5 transition-colors hover:border-blue-500 dark:border-zinc-800 dark:hover:border-blue-500"
              >
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                  <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                  Previous Project
                </span>
                <span className="mt-1.5 font-semibold text-zinc-950 dark:text-white">
                  {prevProject.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextProject && (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group flex flex-col items-end rounded-xl border border-zinc-200 p-5 text-right transition-colors hover:border-blue-500 dark:border-zinc-800 dark:hover:border-blue-500"
              >
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                  Next Project
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
                <span className="mt-1.5 font-semibold text-zinc-950 dark:text-white">
                  {nextProject.title}
                </span>
              </Link>
            )}
          </nav>
        </div>
      </article>

      <ContactSection />
    </>
  );
}
