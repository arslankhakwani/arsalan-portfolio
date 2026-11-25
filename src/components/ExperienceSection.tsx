import { Briefcase, GraduationCap } from "lucide-react";
import { profile } from "@/data/profile";
import { Reveal } from "./Reveal";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="scroll-mt-20 border-y border-slate-200 bg-white py-20 dark:border-slate-800 dark:bg-[#0F172A] sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
            Experience &amp; Education
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            Where I&apos;ve contributed
          </h2>
        </Reveal>

        <div className="relative mt-12 space-y-8 pl-6 before:absolute before:bottom-6 before:left-2 before:top-4 before:w-0.5 before:rounded-full before:bg-gradient-to-b before:from-blue-600 before:via-cyan-500 before:to-indigo-500 sm:pl-9 sm:before:left-3">
          {profile.experience.map((job, idx) => (
            <Reveal key={`${job.company}-${job.role}`} delayMs={idx * 90}>
              <div className="relative rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-white hover:shadow-md dark:border-slate-800 dark:bg-[#11192C] dark:hover:border-blue-500/50 sm:p-8">
                {/* Timeline node */}
                <span
                  aria-hidden="true"
                  className={`absolute -left-[1.45rem] top-8 h-3.5 w-3.5 rounded-full ring-4 ring-white dark:ring-[#0F172A] sm:-left-[2.05rem] ${
                    idx === 0
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500"
                      : "bg-indigo-500"
                  }`}
                />

                <div className="flex flex-col gap-3 border-b border-slate-200/80 pb-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        idx === 0
                          ? "bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-sm shadow-blue-600/25"
                          : "bg-indigo-100 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400"
                      }`}
                    >
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-950 dark:text-white">
                        {job.role}
                      </h3>
                      <p className="mt-0.5 text-sm font-medium text-slate-600 dark:text-slate-400">
                        {job.company} · {job.employmentType}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex self-start rounded-lg border border-blue-200 bg-blue-50 px-3 py-1 font-mono text-xs font-semibold text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-cyan-300 sm:self-auto">
                    {job.period}
                  </span>
                </div>

                <ul className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-x-8">
                  {job.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}

          {/* Education */}
          <Reveal delayMs={180}>
            <div className="relative rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 shadow-sm transition-all duration-300 hover:border-indigo-300 hover:bg-white dark:border-slate-800 dark:bg-[#11192C] sm:p-8">
              <span
                aria-hidden="true"
                className="absolute -left-[1.45rem] top-8 h-3.5 w-3.5 rounded-full bg-cyan-500 ring-4 ring-white dark:ring-[#0F172A] sm:-left-[2.05rem]"
              />

              <div className="flex items-center gap-3.5 border-b border-slate-200/80 pb-5 dark:border-slate-800">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
                    Education
                  </p>
                  <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                    Academic Background
                  </h3>
                </div>
              </div>

              <div className="mt-5 divide-y divide-slate-200/70 dark:divide-slate-800">
                {profile.education.map((edu) => (
                  <div
                    key={edu.degree}
                    className="flex flex-col gap-2 py-3.5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <h4 className="text-base font-semibold text-slate-950 dark:text-white">
                        {edu.degree}
                      </h4>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        {edu.level}
                      </p>
                    </div>
                    <span className="inline-flex self-start rounded-lg border border-slate-200 bg-white px-3 py-1 font-mono text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 sm:self-auto">
                      {edu.period}
                    </span>
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
