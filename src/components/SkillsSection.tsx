"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Database, Server, Wrench } from "lucide-react";
import { profile, SkillGroup } from "@/data/profile";
import { Reveal } from "./Reveal";

const iconMap = {
  server: Server,
  database: Database,
  code: Code2,
  wrench: Wrench,
};

function SkillCard({
  group,
  highlighted,
}: {
  group: SkillGroup;
  highlighted?: boolean;
}) {
  const Icon = iconMap[group.icon];

  return (
    <div
      className={`group rounded-2xl border p-6 shadow-card backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover sm:p-8 ${
        highlighted
          ? "border-accent/35 bg-gradient-to-br from-accent/10 via-surface/95 to-accent-2/10 hover:border-accent/60"
          : "border-border bg-surface/90 hover:border-accent-2/45"
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
            highlighted
              ? "bg-gradient-to-br from-accent to-accent-2 text-on-accent shadow-glow"
              : "border border-border bg-bg-soft text-accent-2"
          }`}
        >
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-display text-lg font-bold text-text">
            {group.category}
          </h3>
          <p
            className={`font-mono text-xs font-medium ${
              highlighted ? "text-accent" : "text-text-muted"
            }`}
          >
            {group.subtitle}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {group.items.map((skill, idx) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.3,
              delay: idx * 0.025,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`rounded-xl border px-3 py-1.5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${
              highlighted
                ? "border-accent/25 bg-surface text-text hover:border-accent hover:text-accent hover:shadow-glow"
                : "border-border bg-bg-soft/85 text-text hover:border-accent-2/60 hover:bg-surface hover:text-accent-2 hover:shadow-card"
            }`}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="scroll-mt-20 border-t border-border/80 bg-bg-soft/60 py-16 backdrop-blur-sm sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
            Technical Stack
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Focused on Laravel, experienced in .NET
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-muted">
            {profile.skillsIntro}
          </p>
        </Reveal>

        <div className="mt-12 space-y-12">
          {/* Primary · Daily Use */}
          <Reveal delayMs={60}>
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="inline-flex items-center rounded-xl bg-gradient-to-r from-accent to-accent-2 px-3.5 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-on-accent shadow-glow">
                  Primary · Daily Use
                </span>
                <span className="h-px flex-1 bg-border" />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {profile.skills.primary.map((group) => (
                  <SkillCard key={group.category} group={group} highlighted />
                ))}
              </div>
            </div>
          </Reveal>

          {/* Also Experienced In · Freelance & Shared Tooling */}
          <Reveal delayMs={120}>
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="inline-flex items-center rounded-xl border border-accent-2/35 bg-accent-2/10 px-3.5 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-accent-2">
                  Also Experienced In · Freelance
                </span>
                <span className="h-px flex-1 bg-border" />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {profile.skills.secondary.map((group) => (
                  <SkillCard key={group.category} group={group} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
