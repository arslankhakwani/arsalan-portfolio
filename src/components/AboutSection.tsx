import { Globe, Mail, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { Reveal } from "./Reveal";

export function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-20 border-y border-slate-200 bg-white py-20 dark:border-slate-800 dark:bg-[#0F172A] sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
                About Me
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                {profile.title}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-slate-700 dark:text-slate-300 sm:text-lg">
                {profile.summary}
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/70 via-white to-cyan-50/50 p-6 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-md dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/30 sm:p-8">
                <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-cyan-400">
                  Profile Snapshot
                </h3>

                <dl className="mt-5 space-y-5 divide-y divide-slate-200/70 dark:divide-slate-800">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-cyan-400" />
                    <div>
                      <dt className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        Location
                      </dt>
                      <dd className="mt-0.5 text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {profile.location} ({profile.locationNote.toLowerCase()})
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-4">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-cyan-400" />
                    <div>
                      <dt className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        Direct Email
                      </dt>
                      <dd className="mt-0.5 text-sm font-semibold">
                        <a
                          href={`mailto:${profile.email}`}
                          className="text-slate-900 underline decoration-blue-300 underline-offset-4 transition-colors hover:text-blue-600 hover:decoration-blue-600 dark:text-slate-100 dark:decoration-slate-600 dark:hover:text-cyan-400"
                        >
                          {profile.email}
                        </a>
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-4">
                    <Globe className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-cyan-400" />
                    <div>
                      <dt className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        Languages
                      </dt>
                      <dd className="mt-2 flex flex-wrap gap-1.5">
                        {profile.languages.map((lang) => (
                          <span
                            key={lang}
                            className="rounded-md border border-blue-200/80 bg-white px-2.5 py-0.5 text-xs font-medium text-slate-700 shadow-2xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
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
      </div>
    </section>
  );
}
