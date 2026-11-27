"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 380);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 14, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.92 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-4 right-4 z-40 flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-surface/90 text-text shadow-card backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:bottom-6 sm:right-6 sm:h-11 sm:w-11"
        >
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
