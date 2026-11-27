import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[65vh] flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
        404
      </p>
      <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-sm text-text-muted">
        The project or page you are looking for does not exist or may have been
        moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-2 px-5 py-2.5 text-sm font-semibold text-on-accent shadow-glow transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Return Home</span>
      </Link>
    </section>
  );
}
