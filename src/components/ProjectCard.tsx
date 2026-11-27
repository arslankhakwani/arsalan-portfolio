"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  formatProjectTypeLabel,
  formatStackLabel,
  getProjectFeatureBadge,
  Project,
} from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const categoryLabel = `${formatStackLabel(
    project.stack
  )} · ${formatProjectTypeLabel(project.type)}`;
  const featureBadge = getProjectFeatureBadge(project);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rotateX: Number((-y * 3.5).toFixed(2)),
      rotateY: Number((x * 3.5).toFixed(2)),
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        duration: 0.38,
        delay: (index % 3) * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ perspective: 900 }}
      className="h-full"
    >
      <article
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transformStyle: "preserve-3d",
        }}
        className="group relative flex h-full flex-col rounded-2xl p-[1px] transition-all duration-300 hover:-translate-y-1.5"
      >
        {/* Static border vs hover gradient glow border */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl bg-border opacity-100 transition-opacity duration-300 group-hover:opacity-0"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/75 via-accent-2/60 to-accent/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(1rem-1px)] bg-surface shadow-card transition-shadow duration-300 group-hover:shadow-card-hover">
          {/* Untouched existing project cover image */}
          <Link
            href={`/projects/${project.slug}`}
            aria-label={`View ${project.title} case study`}
            className="relative block aspect-[16/10] w-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
          >
            <Image
              src={project.coverImage}
              alt={`${project.title} cover graphic`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 560px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          {/* Card content */}
          <div className="flex flex-1 flex-col p-6">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                {categoryLabel}
              </span>
              <span className="font-mono text-xs text-text-muted">
                {project.date}
              </span>
            </div>

            <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-text">
              <Link
                href={`/projects/${project.slug}`}
                className="rounded transition-colors group-hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {project.title}
              </Link>
            </h3>

            <p className="mt-2.5 flex-1 text-sm leading-relaxed text-text-muted">
              {project.shortDescription}
            </p>

            {/* Tech tags */}
            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-border bg-bg-soft/85 px-2.5 py-1 font-mono text-xs text-text-muted transition-colors group-hover:border-accent/35 group-hover:text-text"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Bottom feature badge + Read more */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border/80 pt-4">
              <span className="inline-flex items-center rounded-lg border border-border bg-bg-soft px-2.5 py-1 text-xs font-medium text-text">
                {featureBadge}
              </span>

              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1.5 rounded text-sm font-semibold text-accent transition-colors hover:text-accent-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span>Read more</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1.5" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    </motion.div>
  );
}
