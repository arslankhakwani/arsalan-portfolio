import { profile } from "@/data/profile";
import { Reveal } from "./Reveal";

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="scroll-mt-20 bg-[#F8FAFC] py-20 dark:bg-[#0B1120] sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
            Technical Stack
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            Focused on Laravel, experienced in .NET
          </h2>
          <p className="mt-3 max-w-2xl text-base text-slate-600 dark:text-slate-400">
            Laravel and MySQL are my daily tools at Netrix Cloud. Alongside
            that, I have delivered real client projects using ASP.NET MVC,
            ASP.NET Core, and SQL Server.
          </p>
        </Reveal>

        <div className="mt-12 space-y-12">
          {/* Primary Stack */}
          <Reveal delayMs={60}>
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-white shadow-sm">
                  Primary · Daily Use
                </span>
                <span className="h-px flex-1 bg-blue-200/80 dark:bg-slate-800" />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {profile.skills.primary.map((group) => (
                  <div
                    key={group.category}
                    className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50/80 via-white to-cyan-50/50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md dark:border-blue-900/60 dark:from-[#111C33] dark:via-[#10182B] dark:to-[#0E1E32] sm:p-8"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                        {group.category}
                      </h3>
                      <span className="font-mono text-xs font-medium text-blue-700 dark:text-cyan-400">
                        {group.subtitle}
                      </span>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {group.items.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-lg border border-blue-200/80 bg-white px-3 py-1.5 text-sm font-medium text-slate-900 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-100 dark:hover:border-cyan-500/60 dark:hover:text-cyan-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Secondary & Shared Stack */}
          <Reveal delayMs={120}>
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="inline-flex items-center rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:border-indigo-900/60 dark:bg-indigo-950/40 dark:text-indigo-300">
                  Also Experienced In · Freelance &amp; Tooling
                </span>
                <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {profile.skills.secondary.map((group) => (
                  <div
                    key={group.category}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-[#11192C] sm:p-8"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                        {group.category}
                      </h3>
                      <span className="font-mono text-xs font-medium text-indigo-600 dark:text-indigo-400">
                        {group.subtitle}
                      </span>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {group.items.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-white hover:text-indigo-700 dark:border-slate-700/80 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-indigo-500/60 dark:hover:text-indigo-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
