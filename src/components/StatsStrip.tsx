"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Building2 } from "lucide-react";
import { profile, StatItem } from "@/data/profile";

function AnimatedStatValue({ stat }: { stat: StatItem }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(
    stat.numericValue !== undefined ? 0 : null
  );

  useEffect(() => {
    if (!inView || stat.numericValue === undefined) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) {
      setDisplayValue(stat.numericValue);
      return;
    }

    const target = stat.numericValue;
    const duration = 800;
    const startTime = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.max(1, Math.round(eased * target)));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setDisplayValue(target);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [inView, stat.numericValue]);

  if (stat.numericValue === undefined) {
    return <span>{stat.value}</span>;
  }

  const count = displayValue ?? stat.numericValue;
  return (
    <span ref={ref}>
      {count}
      {stat.suffix || ""}
    </span>
  );
}

export function StatsStrip() {
  return (
    <section
      aria-label="Key career highlights"
      className="relative border-y border-border/80 bg-surface/65 backdrop-blur-md"
    >
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {profile.stats.map((stat) => (
            <div
              key={stat.label}
              className={`flex flex-col justify-center rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card ${
                stat.isTag
                  ? "border-accent/35 bg-gradient-to-br from-accent/10 via-surface to-accent-2/10"
                  : "border-border/80 bg-surface/90"
              }`}
            >
              {stat.isTag ? (
                <>
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs font-semibold text-accent">
                    <Building2 className="h-3.5 w-3.5" />
                    <span>{stat.value}</span>
                  </span>
                  <span className="mt-2.5 text-sm font-medium text-text-muted">
                    {stat.label}
                  </span>
                </>
              ) : (
                <>
                  <div className="font-display bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                    <AnimatedStatValue stat={stat} />
                  </div>
                  <div className="mt-1.5 text-sm font-medium text-text-muted">
                    {stat.label}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
