"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase } from "lucide-react";
import { profile } from "@/data/profile";
import { Reveal } from "./Reveal";

export function ExperienceSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineScaleY = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div ref={timelineRef} className="relative space-y-8 pl-7 sm:pl-10">
          {/* Background static rail */}
          <div
            aria-hidden="true"
            className="absolute bottom-6 left-2.5 top-4 w-0.5 rounded-full bg-border sm:left-3.5"
          />

          {/* Scroll-drawn gradient line */}
          <motion.div
            aria-hidden="true"
            style={{ scaleY: lineScaleY }}
            className="absolute bottom-6 left-2.5 top-4 w-0.5 origin-top rounded-full bg-gradient-to-b from-accent via-accent-2 to-accent sm:left-3.5"
          />

          {profile.experience.map((job, idx) => {
            const subtitle =
              job.employmentType && job.employmentType !== job.company
                ? `${job.company} · ${job.employmentType}`
                : job.company;

            return (
              <Reveal key={`${job.company}-${job.role}`} delayMs={idx * 90}>
                <div className="relative rounded-2xl border border-border bg-surface/90 p-6 shadow-card backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/45 hover:shadow-card-hover sm:p-8">
                  {/* Timeline node */}
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[1.6rem] top-8 h-3.5 w-3.5 rounded-full ring-4 ring-bg sm:-left-[2.1rem] ${
                      idx === 0
                        ? "bg-gradient-to-r from-accent to-accent-2"
                        : "bg-accent-2"
                    }`}
                  />

                  <div className="flex flex-col gap-3 border-b border-border/80 pb-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          idx === 0
                            ? "bg-gradient-to-br from-accent to-accent-2 text-on-accent shadow-glow"
                            : "border border-accent-2/30 bg-accent-2/10 text-accent-2"
                        }`}
                      >
                        <Briefcase className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="font-display text-xl font-bold text-text">
                          {job.role}
                        </h2>
                        <p className="mt-0.5 text-sm font-medium text-text-muted">
                          {subtitle}
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex self-start rounded-xl border border-accent/25 bg-accent/10 px-3 py-1 font-mono text-xs font-semibold text-accent sm:self-auto">
                      {job.period}
                    </span>
                  </div>

                  <ul className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-x-8">
                    {job.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-text-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-accent to-accent-2"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
