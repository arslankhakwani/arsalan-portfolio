import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { getAllProjects } from "@/lib/projects";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const projects = getAllProjects();

  return (
    <footer className="relative z-10 border-t border-border/80 bg-bg/85 text-text-muted backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-14 sm:pb-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand + Tagline */}
          <div className="md:col-span-4">
            <Link
              href="/"
              className="inline-flex items-baseline rounded-lg font-display text-2xl font-bold tracking-tight text-text transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span>{profile.brandName}</span>
              <span className="text-accent">.</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-text-muted">
              {profile.tagline}
            </p>
            <p className="mt-4 font-mono text-xs text-text-muted">
              {profile.location}
            </p>
          </div>

          {/* Column 1: Navigation */}
          <div className="md:col-span-2">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-text">
              Navigation
            </h2>
            <ul className="mt-4 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded text-sm text-text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: My Work */}
          <div className="md:col-span-3">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-text">
              My Work
            </h2>
            <ul className="mt-4 space-y-2.5">
              {projects.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="rounded text-sm text-text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {project.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Find Me */}
          <div className="md:col-span-3">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-text">
              Find Me
            </h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded text-sm text-text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Github className="h-4 w-4 text-accent" />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded text-sm text-text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Linkedin className="h-4 w-4 text-accent" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 rounded text-sm text-text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Mail className="h-4 w-4 text-accent-2" />
                  <span>Email</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border/80 pt-6 text-xs text-text-muted sm:flex-row sm:items-center">
          <p>© 2026 {profile.name}. All rights reserved.</p>
          <p className="font-mono">{profile.footerStack}</p>
        </div>
      </div>
    </footer>
  );
}
