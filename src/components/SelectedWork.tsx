"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  formatProjectTypeLabel,
  formatStackLabel,
  Project,
  ProjectStack,
} from "@/lib/projects";
import { Reveal } from "./Reveal";

type FilterValue = "all" | ProjectStack;

interface SelectedWorkProps {
  projects: Project[];
}

export function SelectedWork({ projects }: SelectedWorkProps) {
  const [filter, setFilter] = useState<FilterValue>("all");

  const counts = useMemo(() => {
    const laravel = projects.filter((p) => p.stack === "laravel").length;
    const dotnet = projects.filter((p) => p.stack === "dotnet").length;
    return { all: projects.length, laravel, dotnet };
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((project) => project.stack === filter);
  }, [projects, filter]);

  const filters: { label: string; value: FilterValue; count: number }[] = [
    { label: "All", value: "all", count: counts.all },
    { label: "Laravel", value: "laravel", count: counts.laravel },
    { label: ".NET", value: "dotnet", count: counts.dotnet },
  ];

  return (
    <section
      id="work"
      className="scroll-mt-20 bg-[#F8FAFC] py-20 dark:bg-[#0B1120] sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
                Selected Work
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                Systems &amp; applications I&apos;ve built
              </h2>
              <p className="mt-3 max-w-xl text-base text-slate-600 dark:text-slate-400">
                Production Laravel work alongside freelance ASP.NET MVC and
                ASP.NET Core deliveries. Click any project for architecture and
                implementation details.
              </p>
            </div>

            <div
              role="group"
              aria-label="Filter projects by backend stack"
              className="inline-flex self-start rounded-xl border border-slate-200 bg-white p-1 shadow-xs dark:border-slate-800 dark:bg-slate-900"
            >
              {filters.map((item) => {
                const active = filter === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setFilter(item.value)}
                    aria-pressed={active}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                      active
                        ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-slate-100"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`font-mono text-xs ${
                        active
                          ? "text-blue-100"
                          : "text-slate-400 dark:text-slate-500"
                      }`}
                    >
                      {item.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {filteredProjects.map((project, idx) => (
            <Reveal key={project.slug} delayMs={(idx % 2) * 90}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/10 dark:border-slate-800 dark:bg-[#11192C] dark:hover:border-blue-500/50 dark:hover:shadow-blue-950/50">
                <Link
                  href={`/projects/${project.slug}`}
                  className="relative block aspect-[16/10] overflow-hidden bg-slate-950"
                >
                  <img
                    src={project.coverImage}
                    alt={`${project.title} cover graphic`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-60" />
                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <span className="rounded-md bg-slate-950/85 px-2.5 py-1 font-mono text-xs font-medium text-slate-100 backdrop-blur-sm ring-1 ring-white/15">
                      {formatProjectTypeLabel(project.type)}
                    </span>
                    <span
                      className={`rounded-md px-2.5 py-1 font-mono text-xs font-semibold text-white backdrop-blur-sm ${
                        project.stack === "laravel"
                          ? "bg-gradient-to-r from-blue-600 to-cyan-600"
                          : "bg-gradient-to-r from-indigo-600 to-violet-600"
                      }`}
                    >
                      {formatStackLabel(project.stack)}
                    </span>
                  </div>
                </Link>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-bold tracking-tight text-slate-950 dark:text-white">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="transition-colors group-hover:text-blue-600 dark:group-hover:text-cyan-400"
                      >
                        {project.title}
                      </Link>
                    </h3>
                    <span className="shrink-0 font-mono text-xs text-slate-500 dark:text-slate-400">
                      {project.date}
                    </span>
                  </div>

                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-[0.95rem]">
                    {project.shortDescription}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs text-slate-700 transition-colors group-hover:border-blue-200 dark:border-slate-700/80 dark:bg-slate-900 dark:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-cyan-400 dark:hover:text-cyan-300"
                    >
                      <span>Read more</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
