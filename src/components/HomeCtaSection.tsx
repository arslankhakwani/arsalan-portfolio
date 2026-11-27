import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { Reveal } from "./Reveal";

export function HomeCtaSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="rounded-3xl bg-gradient-to-br from-accent/50 via-accent-2/40 to-border p-[1px] shadow-card-hover">
            <div className="relative overflow-hidden rounded-[calc(1.5rem-1px)] bg-surface/95 px-6 py-12 text-center backdrop-blur-xl sm:px-12 sm:py-16">
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
                Get In Touch
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-text sm:text-5xl">
                Let&apos;s build something{" "}
                <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
                  together
                </span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
                Looking for a dependable Laravel backend developer who can also
                step into an ASP.NET codebase? Reach out directly by email or
                send a note through the contact page.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-2 px-6 py-3.5 text-sm font-semibold text-on-accent shadow-glow transition-all duration-200 hover:scale-[1.02] hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                >
                  <Mail className="h-4 w-4" />
                  <span>{profile.email}</span>
                </a>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-xl border border-border bg-bg-soft/80 px-6 py-3.5 text-sm font-semibold text-text transition-all duration-200 hover:border-accent/50 hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span>Contact Page</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
