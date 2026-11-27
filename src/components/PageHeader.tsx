import React from "react";
import { Reveal } from "./Reveal";

interface PageHeaderProps {
  label: string;
  headline: string;
  subline: string;
}

export function PageHeader({ label, headline, subline }: PageHeaderProps) {
  return (
    <section className="border-b border-border/80 bg-bg-soft/60 py-14 backdrop-blur-sm sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
            {label}
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-3xl font-bold tracking-tight text-text sm:text-5xl sm:leading-[1.1]">
            {headline}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
            {subline}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
