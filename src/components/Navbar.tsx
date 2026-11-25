"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Download, Menu, Moon, Sun, X } from "lucide-react";
import { profile } from "@/data/profile";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const { theme, toggleTheme, mounted } = useTheme();
  const [cvOpen, setCvOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCvOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCvOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0B1120]/90 backdrop-blur-lg border-b border-slate-800/90 shadow-lg shadow-slate-950/20"
          : "bg-[#0B1120]/95 border-b border-slate-800/60"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 font-mono text-xs font-bold tracking-tight text-white shadow-md shadow-blue-500/25 transition-transform duration-200 group-hover:scale-105">
            MA
          </span>
          <span className="text-sm font-semibold tracking-tight text-slate-100 transition-colors group-hover:text-white">
            {profile.name}
          </span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 md:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="relative py-1 text-sm font-medium text-slate-300 transition-colors hover:text-white after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-gradient-to-r after:from-blue-400 after:to-cyan-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              mounted
                ? `Switch to ${theme === "light" ? "dark" : "light"} mode`
                : "Toggle color mode"
            }
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700/80 bg-slate-900/80 text-slate-300 transition-all hover:border-blue-500/60 hover:text-white"
          >
            {mounted && theme === "dark" ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-sky-300" />
            )}
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setCvOpen((o) => !o)}
              aria-expanded={cvOpen}
              aria-haspopup="menu"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-600/25 transition-all hover:from-blue-500 hover:to-cyan-500 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <Download className="h-4 w-4" />
              <span>Download CV</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  cvOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {cvOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-60 overflow-hidden rounded-xl border border-slate-700/80 bg-slate-900/95 p-1.5 shadow-2xl backdrop-blur-md"
              >
                <a
                  href={profile.links.laravelCv}
                  download="Muhammad-Arsalan-Laravel-CV.pdf"
                  role="menuitem"
                  onClick={() => setCvOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-slate-200 transition-colors hover:bg-slate-800 hover:text-white"
                >
                  <div>
                    <div className="font-semibold">Laravel CV</div>
                    <div className="text-xs text-slate-400">Primary PHP / Laravel</div>
                  </div>
                  <Download className="h-4 w-4 text-cyan-400" />
                </a>
                <a
                  href={profile.links.dotnetCv}
                  download="Muhammad-Arsalan-DotNet-CV.pdf"
                  role="menuitem"
                  onClick={() => setCvOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-slate-200 transition-colors hover:bg-slate-800 hover:text-white"
                >
                  <div>
                    <div className="font-semibold">.NET CV</div>
                    <div className="text-xs text-slate-400">ASP.NET Core &amp; MVC</div>
                  </div>
                  <Download className="h-4 w-4 text-blue-400" />
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle color mode"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-300 hover:text-white"
          >
            {mounted && theme === "dark" ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-sky-300" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-200 hover:text-white"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-800 bg-[#0B1120] px-6 pb-6 pt-4 md:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-900 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 grid grid-cols-2 gap-2.5 border-t border-slate-800 pt-4">
            <a
              href={profile.links.laravelCv}
              download="Muhammad-Arsalan-Laravel-CV.pdf"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-2.5 text-xs font-semibold text-white"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Laravel CV</span>
            </a>
            <a
              href={profile.links.dotnetCv}
              download="Muhammad-Arsalan-DotNet-CV.pdf"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-800"
            >
              <Download className="h-3.5 w-3.5" />
              <span>.NET CV</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
