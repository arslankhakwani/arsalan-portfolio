import { Globe, GraduationCap, Mail, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { Reveal } from "./Reveal";

export function AboutSection() {
  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
                Overview
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-text sm:text-3xl">
                {profile.aboutHeading}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-text-muted sm:text-lg">
                {profile.summary}
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-border bg-surface/90 p-6 shadow-card backdrop-blur-md transition-all duration-300 hover:border-accent/40 hover:shadow-card-hover sm:p-8">
                <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                  Profile Snapshot
                </h3>

                <dl className="mt-5 space-y-5 divide-y divide-border/80">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <div>
                      <dt className="text-xs font-medium text-text-muted">
                        Location
                      </dt>
                      <dd className="mt-0.5 text-sm font-semibold text-text">
                        {profile.location} ({profile.locationNote.toLowerCase()})
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-4">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <div>
                      <dt className="text-xs font-medium text-text-muted">
                        Direct Email
                      </dt>
                      <dd className="mt-0.5 text-sm font-semibold">
                        <a
                          href={`mailto:${profile.email}`}
                          className="rounded text-text underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                          {profile.email}
                        </a>
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-4">
                    <Globe className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <div>
                      <dt className="text-xs font-medium text-text-muted">
                        Languages
                      </dt>
                      <dd className="mt-2 flex flex-wrap gap-1.5">
                        {profile.languages.map((lang) => (
                          <span
                            key={lang}
                            className="rounded-lg border border-border bg-bg-soft px-2.5 py-1 text-xs font-medium text-text"
                          >
                            {lang}
                          </span>
                        ))}
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Education */}
        <Reveal delayMs={80} className="mt-14">
          <div className="rounded-2xl border border-border bg-surface/90 p-6 shadow-card backdrop-blur-md sm:p-8">
            <div className="flex items-center gap-3.5 border-b border-border/80 pb-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                  Education
                </p>
                <h2 className="font-display text-xl font-bold text-text">
                  Academic Background
                </h2>
              </div>
            </div>

            <div className="mt-5 divide-y divide-border/80">
              {profile.education.map((edu) => (
                <div
                  key={edu.degree}
                  className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="font-display text-base font-semibold text-text">
                      {edu.degree}
                    </h3>
                    <p className="text-xs font-medium text-text-muted">
                      {edu.level}
                    </p>
                  </div>
                  <span className="inline-flex self-start rounded-xl border border-border bg-bg-soft px-3 py-1 font-mono text-xs font-medium text-text-muted sm:self-auto">
                    {edu.period}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
