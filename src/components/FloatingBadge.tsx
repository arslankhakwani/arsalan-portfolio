"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FloatingBadge() {
  const [hiddenForInput, setHiddenForInput] = useState(false);

  useEffect(() => {
    const onFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT")
      ) {
        setHiddenForInput(true);
      }
    };

    const onFocusOut = () => {
      setHiddenForInput(false);
    };

    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  if (hiddenForInput) return null;

  return (
    <Link
      href="/contact"
      aria-label="Available for work — go to contact page"
      className="group fixed bottom-4 left-4 z-40 inline-flex max-w-[calc(100vw-5.5rem)] items-center gap-2 rounded-full border border-border bg-surface/90 px-3.5 py-2 text-xs font-medium tracking-normal text-text shadow-card backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:bottom-6 sm:left-6 sm:max-w-none sm:gap-2.5 sm:px-4 sm:py-2.5"
    >
      <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
      </span>
      <span className="truncate">Available for Work</span>
      <span className="shrink-0 text-border" aria-hidden="true">
        ·
      </span>
      <span className="inline-flex shrink-0 items-center gap-1 font-semibold text-accent">
        <span>Let&apos;s talk</span>
        <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
