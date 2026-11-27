"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Download,
  Github,
  Linkedin,
  Mail,
  Terminal,
} from "lucide-react";
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
      className="mt-4 flex min-h-[2rem] items-center gap-2 font-mono text-sm font-medium text-accent sm:text-base"
      aria-live="polite"
    >
      <span className="text-text-muted" aria-hidden="true">
        &gt;
      </span>
      <span>{text}</span>
      {!reducedMotion && (
        <span
          aria-hidden="true"
          className="inline-block h-4 w-0.5 animate-pulse bg-accent-2"
        />
      )}
    </div>
  );
}

export function HeroSection() {
  const [cvOpen, setCvOpen] = useState(false);
  const cvRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (cvRef.current && !cvRef.current.contains(e.target as Node)) {
        setCvOpen(false);
      }
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCvOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  return (
    <section className="relative flex min-h-[calc(100vh-4.5rem)] items-center overflow-hidden">
      <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-12 sm:pb-24 sm:pt-16 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/85 px-4 py-1.5 text-xs font-medium text-text shadow-card backdrop-blur-md">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              <span>{profile.heroBadge}</span>
            </div>

            <h1 className="font-display text-4xl font-bold tracking-tight text-text sm:text-6xl lg:text-[4rem] lg:leading-[1.06]">
              I build reliable{" "}
              <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
                backend
              </span>{" "}
              systems.
            </h1>

            <TypewriterRoles roles={profile.heroRoles} />

            <p className="mt-5 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
              {profile.heroSummary}
            </p>

            {/* Primary CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-2 px-6 py-3.5 text-sm font-semibold text-on-accent shadow-glow transition-all duration-200 hover:scale-[1.02] hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                <span>See my work</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <div className="relative" ref={cvRef}>
                <button
                  type="button"
                  onClick={() => setCvOpen((o) => !o)}
                  aria-expanded={cvOpen}
                  aria-haspopup="menu"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface/85 px-6 py-3.5 text-sm font-semibold text-text shadow-card backdrop-blur-md transition-all duration-200 hover:scale-[1.02] hover:border-accent/50 hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  <Download className="h-4 w-4 text-accent" />
                  <span>Download CV</span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 text-text-muted transition-transform duration-200 ${
                      cvOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {cvOpen && (
                  <div
                    role="menu"
                    className="absolute left-0 z-30 mt-2 w-60 overflow-hidden rounded-2xl border border-border bg-surface/95 p-1.5 shadow-card-hover backdrop-blur-xl"
                  >
                    <a
                      href={profile.links.laravelCv}
                      download="Muhammad-Arsalan-Laravel-CV.pdf"
                      role="menuitem"
                      onClick={() => setCvOpen(false)}
                      className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-text transition-colors hover:bg-surface-hover"
                    >
                      <div>
                        <div className="font-semibold">Laravel CV</div>
                        <div className="text-xs text-text-muted">
                          Primary PHP / Laravel
                        </div>
                      </div>
                      <Download className="h-4 w-4 text-accent" />
                    </a>
                    <a
                      href={profile.links.dotnetCv}
                      download="Muhammad-Arsalan-DotNet-CV.pdf"
                      role="menuitem"
                      onClick={() => setCvOpen(false)}
                      className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-text transition-colors hover:bg-surface-hover"
                    >
                      <div>
                        <div className="font-semibold">.NET CV</div>
                        <div className="text-xs text-text-muted">
                          ASP.NET Core &amp; MVC
                        </div>
                      </div>
                      <Download className="h-4 w-4 text-accent-2" />
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Social Icons */}
            <div className="mt-7 flex items-center gap-3">
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface/85 text-text-muted shadow-card backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface/85 text-text-muted shadow-card backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email Muhammad Arsalan"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface/85 text-text-muted shadow-card backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          {/* Right column: Floating Glass Code Editor + Overlapping Stack Pill */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="relative pb-6 lg:col-span-5"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-4 rounded-3xl opacity-35 blur-3xl"
              style={{
                background:
                  "linear-gradient(135deg, rgb(var(--accent) / 0.35), rgb(var(--accent-2) / 0.35))",
              }}
            />

            <div className="animate-float-slow relative overflow-hidden rounded-2xl border border-border bg-surface/90 shadow-card-hover backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-border/80 bg-bg-soft/75 px-4 py-3">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-accent-2/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
                </div>
                <div className="inline-flex items-center gap-1.5 font-mono text-xs text-text-muted">
                  <Terminal className="h-3.5 w-3.5 text-accent" />
                  <span>routes/api.php</span>
                </div>
                <span className="rounded-md bg-accent/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-accent">
                  Laravel
                </span>
              </div>

              <div className="overflow-x-auto p-5 font-mono text-xs leading-6 text-text sm:text-[13px]">
                <pre className="m-0">
                  <code>
                    <span className="text-text-muted">
                      {"// Example Laravel API route group"}
                    </span>
                    {"\n"}
                    <span className="text-accent-2">Route</span>
                    <span className="text-text-muted">::</span>
                    <span className="text-accent">middleware</span>
                    {"(["}
                    <span className="text-success">&apos;auth:sanctum&apos;</span>
                    {", "}
                    <span className="text-success">&apos;tenant&apos;</span>
                    {"])\n  ->"}
                    <span className="text-accent">prefix</span>
                    {"("}
                    <span className="text-success">&apos;v1/tasks&apos;</span>
                    {")\n  ->"}
                    <span className="text-accent">group</span>
                    {"("}
                    <span className="text-accent-2">function</span>
                    {" () {\n    "}
                    <span className="text-accent-2">Route</span>
                    <span className="text-text-muted">::</span>
                    <span className="text-accent">get</span>
                    {"("}
                    <span className="text-success">&apos;/&apos;</span>
                    {", [TaskController::"}
                    <span className="text-accent-2">class</span>
                    {", "}
                    <span className="text-success">&apos;index&apos;</span>
                    {"]);\n    "}
                    <span className="text-accent-2">Route</span>
                    <span className="text-text-muted">::</span>
                    <span className="text-accent">post</span>
                    {"("}
                    <span className="text-success">&apos;/&apos;</span>
                    {", [TaskController::"}
                    <span className="text-accent-2">class</span>
                    {", "}
                    <span className="text-success">&apos;store&apos;</span>
                    {"]);\n    "}
                    <span className="text-accent-2">Route</span>
                    <span className="text-text-muted">::</span>
                    <span className="text-accent">patch</span>
                    {"("}
                    <span className="text-success">
                      &apos;/{`{task}`}&apos;
                    </span>
                    {", [TaskController::"}
                    <span className="text-accent-2">class</span>
                    {", "}
                    <span className="text-success">&apos;update&apos;</span>
                    {"]);\n  });"}
                  </code>
                </pre>
              </div>
            </div>

            {/* Overlapping stack card */}
            <div className="animate-float-slow-alt relative -mt-5 ml-auto mr-3 flex w-fit items-center gap-3 rounded-2xl border border-border bg-surface/95 px-4 py-3 shadow-card-hover backdrop-blur-xl sm:mr-5">
              <div
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2 font-mono text-xs font-bold text-on-accent shadow-glow"
              >
                {profile.initials}
              </div>
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">
                  Backend Stack
                </p>
                <p className="font-mono text-xs font-medium text-text">
                  Laravel · MySQL · Pusher · .NET
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
