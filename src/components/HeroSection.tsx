import Link from "next/link";
import { ArrowDownRight, Database, Mail, MapPin, Server, ShieldCheck } from "lucide-react";
import { profile } from "@/data/profile";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1120] via-[#0F172A] to-[#0B192E] text-white">
      {/* Architectural grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #93C5FD 1px, transparent 1px), linear-gradient(to bottom, #93C5FD 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* Ambient colored radial glows */}
      <div
        aria-hidden="true"
        className="animate-glow-pulse pointer-events-none absolute -top-32 right-0 h-[440px] w-[440px] rounded-full bg-blue-600/25 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="animate-glow-pulse pointer-events-none absolute -bottom-32 -left-20 h-[360px] w-[360px] rounded-full bg-cyan-500/20 blur-[110px]"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-16 sm:pb-28 sm:pt-24 lg:py-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left Hero Copy */}
          <div className="lg:col-span-7">
            <div
              className="animate-hero-rise mb-7 inline-flex flex-wrap items-center gap-2.5 rounded-full border border-blue-400/25 bg-blue-950/50 px-3.5 py-1.5 text-xs font-medium text-blue-100 backdrop-blur-sm"
              style={{ animationDelay: "40ms" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span>Laravel Developer at {profile.company}</span>
              <span className="text-slate-500">•</span>
              <span className="inline-flex items-center gap-1 text-slate-300">
                <MapPin className="h-3 w-3 text-cyan-400" />
                Islamabad · Open to remote &amp; relocation
              </span>
            </div>

            <h1
              className="animate-hero-rise text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-[4rem] lg:leading-[1.07]"
              style={{ animationDelay: "120ms" }}
            >
              I build reliable{" "}
              <em className="bg-gradient-to-r from-blue-400 via-sky-300 to-cyan-300 bg-clip-text font-semibold italic text-transparent">
                backend
              </em>{" "}
              systems.
            </h1>

            <p
              className="animate-hero-rise mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl"
              style={{ animationDelay: "200ms" }}
            >
              Laravel developer at Netrix Cloud. Freelance .NET experience.
              Based in Islamabad.
            </p>

            <div
              className="animate-hero-rise mt-9 flex flex-wrap items-center gap-4"
              style={{ animationDelay: "280ms" }}
            >
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-500 hover:to-cyan-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <Mail className="h-4 w-4" />
                <span>Contact me</span>
              </Link>

              <Link
                href="#work"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-6 py-3.5 text-sm font-semibold text-slate-100 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400/60 hover:bg-slate-800/80 hover:text-white"
              >
                <span>See my work</span>
                <ArrowDownRight className="h-4 w-4 text-cyan-400" />
              </Link>
            </div>
          </div>

          {/* Right Architectural Stack Card */}
          <div
            className="animate-hero-rise lg:col-span-5"
            style={{ animationDelay: "340ms" }}
          >
            <div className="animate-float-slow relative rounded-2xl border border-blue-400/20 bg-slate-900/75 p-6 shadow-2xl shadow-blue-950/50 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <span className="font-mono text-xs text-cyan-300">
                  backend-stack.config
                </span>
              </div>

              <div className="mt-5 space-y-4">
                <div className="rounded-xl border border-blue-500/25 bg-blue-950/35 p-4 transition-colors hover:border-blue-400/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Server className="h-4 w-4 text-cyan-400" />
                      <span className="text-sm font-semibold text-white">
                        Primary · Daily Stack
                      </span>
                    </div>
                    <span className="rounded-md bg-blue-500/20 px-2 py-0.5 font-mono text-[11px] font-medium text-blue-300">
                      Netrix Cloud
                    </span>
                  </div>
                  <p className="mt-2 font-mono text-xs leading-relaxed text-slate-300">
                    PHP · Laravel · MySQL · REST APIs · Multi-Tenancy · Pusher
                  </p>
                </div>

                <div className="rounded-xl border border-slate-700/70 bg-slate-900/80 p-4 transition-colors hover:border-indigo-400/40">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Database className="h-4 w-4 text-indigo-400" />
                      <span className="text-sm font-semibold text-white">
                        Secondary · Freelance
                      </span>
                    </div>
                    <span className="rounded-md bg-indigo-500/20 px-2 py-0.5 font-mono text-[11px] font-medium text-indigo-300">
                      .NET
                    </span>
                  </div>
                  <p className="mt-2 font-mono text-xs leading-relaxed text-slate-300">
                    C# · ASP.NET Core &amp; MVC · EF Core · SQL Server · IIS
                  </p>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-950/20 px-4 py-3 text-xs text-emerald-300">
                  <span className="inline-flex items-center gap-2 font-medium">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    Clean schemas, RBAC &amp; query performance
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
