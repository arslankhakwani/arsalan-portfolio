"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Download,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { profile } from "@/data/profile";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 32,
    restDelta: 0.001,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setCvOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
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

  const isDark = mounted && resolvedTheme === "dark";
  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  const isRouteActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "border-b border-border/80 bg-bg/85 shadow-card backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      {/* Scroll progress bar */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-accent to-accent-2"
      />

      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        {/* Brand Logo: Arsalan. */}
        <Link
          href="/"
          className="group inline-flex items-baseline rounded-lg font-display text-xl font-bold tracking-tight text-text transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          <span>{profile.brandName}</span>
          <span className="text-accent">.</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {navLinks.map((link) => {
            const active = isRouteActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-xl px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  active ? "text-accent" : "text-text-muted hover:text-text"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="navbar-active-indicator"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 -z-10 rounded-xl bg-accent/10 ring-1 ring-accent/25"
                  />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden items-center gap-2.5 lg:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              mounted
                ? `Switch to ${isDark ? "light" : "dark"} mode`
                : "Toggle color theme"
            }
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface/85 text-text-muted backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-accent/50 hover:bg-surface-hover hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {mounted ? (
              isDark ? (
                <Sun className="h-4 w-4 text-accent" />
              ) : (
                <Moon className="h-4 w-4 text-accent-2" />
              )
            ) : (
              <span className="h-4 w-4" aria-hidden="true" />
            )}
          </button>

          {/* Download CV Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setCvOpen((o) => !o)}
              aria-expanded={cvOpen}
              aria-haspopup="menu"
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface/85 px-3.5 py-2 text-sm font-semibold text-text backdrop-blur-md transition-all duration-200 hover:border-accent/50 hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Download className="h-4 w-4 text-accent" />
              <span>Download CV</span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-text-muted transition-transform duration-200 ${
                  cvOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {cvOpen && (
                <motion.div
                  role="menu"
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.16 }}
                  className="absolute right-0 mt-2 w-60 overflow-hidden rounded-2xl border border-border bg-surface/95 p-1.5 shadow-card-hover backdrop-blur-xl"
                >
                  <a
                    href={profile.links.laravelCv}
                    download="Muhammad-Arsalan-Laravel-CV.pdf"
                    role="menuitem"
                    onClick={() => setCvOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-text transition-colors hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <div>
                      <div className="font-semibold">Laravel CV</div>
                      <div className="text-xs text-text-muted">
                        Primary PHP / Laravel
                      </div>
                    </div>
                    <Download className="h-4 w-4 text-accent" />
                  </a>
                  <a
                    href={profile.links.dotnetCv}
                    download="Muhammad-Arsalan-DotNet-CV.pdf"
                    role="menuitem"
                    onClick={() => setCvOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-text transition-colors hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <div>
                      <div className="font-semibold">.NET CV</div>
                      <div className="text-xs text-text-muted">
                        ASP.NET Core &amp; MVC
                      </div>
                    </div>
                    <Download className="h-4 w-4 text-accent-2" />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Filled Hire Me CTA */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-accent to-accent-2 px-4 py-2 text-sm font-semibold text-on-accent shadow-glow transition-all duration-200 hover:scale-[1.02] hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            <span>Hire Me</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile Right Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              mounted
                ? `Switch to ${isDark ? "light" : "dark"} mode`
                : "Toggle color theme"
            }
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface/85 text-text-muted transition-colors hover:border-accent/50 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {mounted ? (
              isDark ? (
                <Sun className="h-4 w-4 text-accent" />
              ) : (
                <Moon className="h-4 w-4 text-accent-2" />
              )
            ) : (
              <span className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface/85 text-text transition-colors hover:border-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-border bg-bg/95 backdrop-blur-xl lg:hidden"
          >
            <div className="mx-auto max-w-6xl px-6 pb-6 pt-4">
              <nav
                aria-label="Mobile navigation"
                className="flex flex-col gap-1"
              >
                {navLinks.map((link) => {
                  const active = isRouteActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setMobileOpen(false)}
                      className={`rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                        active
                          ? "bg-accent/10 text-accent"
                          : "text-text-muted hover:bg-surface-hover hover:text-text"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-4 space-y-2.5 border-t border-border pt-4">
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={profile.links.laravelCv}
                    download="Muhammad-Arsalan-Laravel-CV.pdf"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-3 py-2.5 text-xs font-semibold text-text hover:bg-surface-hover"
                  >
                    <Download className="h-3.5 w-3.5 text-accent" />
                    <span>Laravel CV</span>
                  </a>
                  <a
                    href={profile.links.dotnetCv}
                    download="Muhammad-Arsalan-DotNet-CV.pdf"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-3 py-2.5 text-xs font-semibold text-text hover:bg-surface-hover"
                  >
                    <Download className="h-3.5 w-3.5 text-accent-2" />
                    <span>.NET CV</span>
                  </a>
                </div>

                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-2 px-4 py-2.5 text-sm font-semibold text-on-accent shadow-glow"
                >
                  <span>Hire Me</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
