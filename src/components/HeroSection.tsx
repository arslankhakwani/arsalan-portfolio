"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Github, Layers, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";

function TypewriterRoles({ roles }: { roles: string[] }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState(roles[0] || "");
  const [isDeleting, setIsDeleting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion || roles.length === 0) {
      setText(roles[0] || "");
      return;
    }

    const current = roles[roleIndex];
    let timeoutId: number;

    if (!isDeleting && text === current) {
      timeoutId = window.setTimeout(() => setIsDeleting(true), 1900);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      const nextText = isDeleting
        ? current.slice(0, text.length - 1)
        : current.slice(0, text.length + 1);
      timeoutId = window.setTimeout(
        () => setText(nextText),
        isDeleting ? 34 : 62
      );
    }

    return () => window.clearTimeout(timeoutId);
  }, [text, isDeleting, roleIndex, roles, reducedMotion]);

  return (
    <div
      className="mt-4 flex min-h-[2.25rem] items-center gap-2 font-mono text-sm font-medium tracking-normal text-accent sm:min-h-[2.5rem] sm:text-base"
      aria-live="polite"
    >
      <span className="shrink-0 text-text-muted" aria-hidden="true">
        &gt;
      </span>
      <span>{text}</span>
      {!reducedMotion && (
        <span
          aria-hidden="true"
          className="inline-block h-4 w-0.5 shrink-0 animate-pulse bg-accent-2"
        />
      )}
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100svh-4.25rem)] items-center overflow-hidden">
      <div className="relative mx-auto w-full max-w-6xl px-6 py-8 sm:py-12 lg:py-14">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-10">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="mb-5 inline-flex max-w-full flex-wrap items-center gap-2.5 rounded-full border border-border bg-surface/85 px-4 py-1.5 text-xs font-medium tracking-normal text-text shadow-card backdrop-blur-md">
              <span
                className="relative flex h-2 w-2 shrink-0"
                aria-hidden="true"
              >
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              <span>{profile.heroBadge}</span>
            </div>

            <h1 className="font-display text-4xl font-bold tracking-[-0.02em] text-text sm:text-5xl lg:text-[3.75rem] lg:leading-[1.08]">
              I build reliable{" "}
              <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
                backend
              </span>{" "}
              systems.
            </h1>

            <TypewriterRoles roles={profile.heroRoles} />

            <p className="mt-4 max-w-xl text-base leading-relaxed tracking-normal text-text-muted sm:text-lg">
              {profile.heroSummary}
            </p>

            {/* Primary CTA Button + Social Icons */}
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-2 px-6 py-3.5 text-sm font-semibold tracking-normal text-on-accent shadow-glow transition-all duration-200 hover:scale-[1.02] hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                <span>See my work</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <div className="flex items-center gap-2.5">
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface/85 text-text-muted shadow-card backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface/85 text-text-muted shadow-card backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  aria-label="Email Muhammad Arsalan"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface/85 text-text-muted shadow-card backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right column: Single clean floating glass card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:col-span-5"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-3 rounded-3xl opacity-35 blur-3xl"
              style={{
                background:
                  "linear-gradient(135deg, rgb(var(--accent) / 0.32), rgb(var(--accent-2) / 0.32))",
              }}
            />

            <div className="animate-float-slow relative overflow-hidden rounded-2xl border border-border bg-surface/90 p-6 shadow-card-hover backdrop-blur-xl sm:p-7">
              <div className="flex items-center gap-3 border-b border-border/80 pb-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-on-accent shadow-glow">
                  <Layers className="h-4 w-4" />
                </span>
                <h2 className="font-display text-lg font-bold tracking-normal text-text">
                  Tech I work with
                </h2>
              </div>

              <div className="mt-5 space-y-4">
                <div className="rounded-xl border border-accent/25 bg-accent/5 p-4">
                  <p className="text-sm leading-relaxed tracking-normal text-text">
                    <span className="font-semibold text-accent">Laravel:</span>{" "}
                    PHP · MySQL · REST APIs · Pusher · Multi-Tenancy · RBAC · Laravel Scheduler · Seeders · Eloquent ORM · factories · Middleware · Observer · Events · Listeners · Laravel Broadcast
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-bg-soft/80 p-4">
                  <p className="text-sm leading-relaxed tracking-normal text-text">
                    <span className="font-semibold text-accent-2">.NET:</span>{" "}
                    C# · ASP.NET Core · SQL Server · Entity Framework · Web Forms · MVC  · Razor Pages · LINQ · Dependency Injection · REST APIs · Data Access . Classes · Middleware
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
