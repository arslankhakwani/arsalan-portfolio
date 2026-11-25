"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { profile } from "@/data/profile";
import { Reveal } from "./Reveal";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="scroll-mt-20 bg-[#F8FAFC] py-20 dark:bg-[#0B1120] sm:py-28"
    >
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <div className="text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
              FAQ
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Quick answers for hiring teams
            </h2>
          </div>
        </Reveal>

        <Reveal delayMs={80}>
          <div className="mt-12 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm dark:divide-slate-800 dark:border-slate-800 dark:bg-[#11192C]">
            {profile.faqs.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={item.question} className="px-6 py-5 sm:px-8">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 text-left focus:outline-none"
                  >
                    <span className="text-base font-semibold text-slate-950 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-cyan-400 sm:text-lg">
                      {item.question}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-all duration-300 ${
                        isOpen
                          ? "rotate-45 border-blue-600 bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-sm"
                          : "border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-400"
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen
                        ? "mt-3 grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pr-10 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
