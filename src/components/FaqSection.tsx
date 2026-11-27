"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { profile } from "@/data/profile";
import { Reveal } from "./Reveal";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="scroll-mt-20 border-t border-border/80 bg-bg-soft/60 py-16 backdrop-blur-sm sm:py-24"
    >
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <div className="text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
              FAQ
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
              Quick answers for hiring teams
            </h2>
          </div>
        </Reveal>

        <Reveal delayMs={80}>
          <div className="mt-10 divide-y divide-border/80 rounded-2xl border border-border bg-surface/90 shadow-card backdrop-blur-md">
            {profile.faqs.map((item, idx) => {
              const isOpen = openIndex === idx;
              const panelId = `faq-panel-${idx}`;
              return (
                <div key={item.question} className="px-6 py-5 sm:px-8">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="group flex w-full items-center justify-between gap-4 rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                  >
                    <span className="font-display text-base font-semibold text-text transition-colors group-hover:text-accent sm:text-lg">
                      {item.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
                        isOpen
                          ? "rotate-45 border-transparent bg-gradient-to-r from-accent to-accent-2 text-on-accent shadow-glow"
                          : "border-border bg-bg-soft text-text-muted group-hover:border-accent/50 group-hover:text-accent"
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.25,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <p className="pt-3.5 pr-8 text-sm leading-relaxed text-text-muted sm:text-base">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
