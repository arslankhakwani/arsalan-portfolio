"use client";

import React, { useEffect, useState } from "react";

export function AnimatedBackground() {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const onVisibilityChange = () => {
      setPaused(document.hidden);
    };
    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      data-bg-paused={paused ? "true" : "false"}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Faint dot grid with radial fade */}
      <div className="bg-grid-pattern absolute inset-0" />

      {/* Slow-moving theme-aware gradient orbs (fewer on mobile) */}
      <div
        className="animate-orb-a absolute -left-24 -top-28 h-[22rem] w-[22rem] rounded-full blur-[100px] sm:h-[34rem] sm:w-[34rem] sm:blur-[115px]"
        style={{
          background:
            "radial-gradient(circle, rgb(var(--accent) / var(--orb-opacity)) 0%, transparent 70%)",
        }}
      />
      <div
        className="animate-orb-b absolute -right-24 top-[22%] h-[20rem] w-[20rem] rounded-full blur-[100px] sm:h-[32rem] sm:w-[32rem] sm:blur-[115px]"
        style={{
          background:
            "radial-gradient(circle, rgb(var(--accent-2) / var(--orb-opacity)) 0%, transparent 70%)",
        }}
      />
      <div
        className="animate-orb-c hidden sm:block absolute bottom-[-10rem] left-[28%] h-[30rem] w-[30rem] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgb(var(--glow) / var(--orb-opacity)) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
