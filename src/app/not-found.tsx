import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center bg-white px-6 py-24 text-center dark:bg-[#09090B]">
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
        404
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-sm text-zinc-600 dark:text-zinc-400">
        The project or page you are looking for does not exist or may have been
        moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Return Home</span>
      </Link>
    </section>
  );
}
