import Link from "next/link";
import { ArrowRight, Code2, Database, Server } from "lucide-react";
import { profile } from "@/data/profile";
import { Reveal } from "./Reveal";

export function HomeSkillsPreview() {
  const laravelGroup = profile.skills.primary[0];
  const dbGroup = profile.skills.primary[1];
  const dotnetGroup = profile.skills.secondary[0];

  return (
    <section className="border-y border-border/80 bg-bg-soft/60 py-20 backdrop-blur-sm sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
                Technical Stack
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
                Focused on Laravel, experienced in .NET
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-muted">
                {profile.skillsIntro}
              </p>
            </div>

            <Link
              href="/about"
              className="group inline-flex w-fit items-center gap-2 rounded-xl border border-border bg-surface/90 px-4 py-2.5 text-sm font-semibold text-text shadow-card transition-all duration-200 hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span>Full stack &amp; about</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Laravel Primary */}
          <Reveal delayMs={40}>
            <div className="h-full rounded-2xl border border-accent/35 bg-gradient-to-br from-accent/10 via-surface/95 to-accent-2/10 p-6 shadow-card">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-on-accent shadow-glow">
                  <Server className="h-5 w-5" />
                </span>
                <div>
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">
                    Primary
                  </span>
                  <h3 className="font-display text-lg font-bold text-text">
                    {laravelGroup.category}
                  </h3>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {laravelGroup.items.slice(0, 8).map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-accent/25 bg-surface px-2.5 py-1 text-xs font-medium text-text"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Database Primary */}
          <Reveal delayMs={90}>
            <div className="h-full rounded-2xl border border-accent/35 bg-gradient-to-br from-accent/10 via-surface/95 to-accent-2/10 p-6 shadow-card">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-on-accent shadow-glow">
                  <Database className="h-5 w-5" />
                </span>
                <div>
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">
                    Primary
                  </span>
                  <h3 className="font-display text-lg font-bold text-text">
                    {dbGroup.category}
                  </h3>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {dbGroup.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-accent/25 bg-surface px-2.5 py-1 text-xs font-medium text-text"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* .NET Secondary */}
          <Reveal delayMs={140}>
            <div className="h-full rounded-2xl border border-border bg-surface/90 p-6 shadow-card">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent-2/30 bg-accent-2/10 text-accent-2">
                  <Code2 className="h-5 w-5" />
                </span>
                <div>
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-accent-2">
                    Also Experienced In
                  </span>
                  <h3 className="font-display text-lg font-bold text-text">
                    {dotnetGroup.category}
                  </h3>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {dotnetGroup.items.slice(0, 8).map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-border bg-bg-soft px-2.5 py-1 text-xs font-medium text-text"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
