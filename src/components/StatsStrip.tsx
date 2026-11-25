import { profile } from "@/data/profile";

export function StatsStrip() {
  return (
    <section
      aria-label="Key career highlights"
      className="relative border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-[#0F172A]"
    >
      <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600" />
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 divide-y divide-slate-200 dark:divide-slate-800 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {profile.stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`group py-6 transition-colors hover:bg-blue-50/40 dark:hover:bg-slate-800/30 sm:px-6 ${
                idx === 0 ? "sm:pl-0" : ""
              } ${
                idx >= 2
                  ? "sm:border-t sm:border-slate-200 dark:sm:border-slate-800 lg:border-t-0"
                  : ""
              } ${idx % 2 === 1 ? "sm:border-l sm:border-slate-200 dark:sm:border-slate-800 lg:border-l-0" : ""}`}
            >
              <div className="bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-2xl font-bold tracking-tight text-transparent dark:from-blue-400 dark:to-cyan-300 sm:text-[1.7rem]">
                {stat.value}
              </div>
              <div className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
