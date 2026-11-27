"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Project } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";

type FilterValue = "all" | "laravel" | "dotnet" | "freelance";

interface SelectedWorkProps {
  projects: Project[];
}

export function SelectedWork({ projects }: SelectedWorkProps) {
  const [filter, setFilter] = useState<FilterValue>("all");

  const counts = useMemo(() => {
    const laravel = projects.filter((p) => p.stack === "laravel").length;
    const dotnet = projects.filter((p) => p.stack === "dotnet").length;
    const freelance = projects.filter((p) => p.type === "freelance").length;
    return { all: projects.length, laravel, dotnet, freelance };
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (filter === "all") return projects;
    if (filter === "freelance") {
      return projects.filter((project) => project.type === "freelance");
    }
    return projects.filter((project) => project.stack === filter);
  }, [projects, filter]);

  const featuredCaseStudy = useMemo(
    () => projects.find((p) => p.slug === "task-management-system"),
    [projects]
  );

  const filters: { label: string; value: FilterValue; count: number }[] = [
    { label: "All", value: "all", count: counts.all },
    { label: "Laravel", value: "laravel", count: counts.laravel },
    { label: ".NET", value: "dotnet", count: counts.dotnet },
    { label: "Freelance", value: "freelance", count: counts.freelance },
  ];

  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Filter Tabs */}
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div
              role="group"
              aria-label="Filter projects"
              className="inline-flex flex-wrap items-center gap-1 rounded-2xl border border-border bg-surface/90 p-1.5 shadow-card backdrop-blur-md"
            >
              {filters.map((item) => {
                const active = filter === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setFilter(item.value)}
                    aria-pressed={active}
                    className={`relative inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      active
                        ? "text-on-accent"
                        : "text-text-muted hover:text-text"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="projects-filter-pill"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent to-accent-2 shadow-glow"
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                    <span
                      className={`relative z-10 font-mono text-xs ${
                        active ? "text-on-accent/85" : "text-text-muted"
                      }`}
                    >
                      {item.count}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="font-mono text-xs text-text-muted">
              Showing {filteredProjects.length} of {projects.length} projects
            </p>
          </div>
        </Reveal>

        {/* Animated Project Grid */}
        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <ProjectCard key={project.slug} project={project} index={idx} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Featured Case Study Highlight Banner */}
        {featuredCaseStudy && (
          <Reveal delayMs={80} className="mt-16 sm:mt-20">
            <div className="rounded-3xl bg-gradient-to-br from-accent/60 via-accent-2/45 to-border p-[1px] shadow-card-hover">
              <div className="grid grid-cols-1 items-center gap-8 overflow-hidden rounded-[calc(1.5rem-1px)] bg-surface/95 p-6 backdrop-blur-xl sm:p-10 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Case Study</span>
                  </div>

                  <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-text sm:text-3xl">
                    {featuredCaseStudy.title}
                  </h2>

                  <p className="mt-3 text-sm leading-relaxed text-text-muted sm:text-base">
                    A collaborative Laravel module organized into projects,
                    folders, lists, and tasks—supporting task assignments,
                    threaded comments, real-time Pusher notifications, and
                    automated overdue task workflows via Laravel Scheduler.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {featuredCaseStudy.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-border bg-bg-soft px-2.5 py-1 font-mono text-xs text-text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7">
                    <Link
                      href={`/projects/${featuredCaseStudy.slug}`}
                      className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-2 px-5 py-3 text-sm font-semibold text-on-accent shadow-glow transition-all duration-200 hover:scale-[1.02] hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                    >
                      <span>Read the case study</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <Link
                    href={`/projects/${featuredCaseStudy.slug}`}
                    aria-label={`Open ${featuredCaseStudy.title} case study`}
                    className="group relative block aspect-[16/10] overflow-hidden rounded-2xl border border-border shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <Image
                      src={featuredCaseStudy.coverImage}
                      alt={`${featuredCaseStudy.title} architecture visual`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 440px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
