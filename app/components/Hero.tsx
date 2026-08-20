import Link from "next/link";
import NetworkGraph from "./NetworkGraph";
import { GITHUB_URL, LINKEDIN_URL } from "../lib/links";

const TECH_STACK = [
  "Python",
  "R",
  "SQL",
  "PostgreSQL / PostGIS",
  "Scikit-learn",
  "Streamlit",
  "Power BI",
];

export default function Hero() {
  return (
    <section className="mx-auto grid w-full max-w-5xl flex-1 items-center gap-10 px-6 py-16 sm:grid-cols-2">
      <div className="flex flex-col items-start gap-6">
        <div>
          <p className="font-mono text-sm text-accent">Snehan</p>
          <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Data Scientist &amp; Analytics Engineer
          </h1>
        </div>

        <p className="max-w-md text-muted">
          MSc Data Science &amp; Analytics. I turn messy, real-world data — job
          postings, tourism GPS records, crop imagery — into models and
          dashboards people can actually act on.
        </p>

        <div className="flex flex-wrap gap-2">
          {TECH_STACK.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/projects"
            className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            View projects
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div className="h-64 w-full sm:h-80">
        <NetworkGraph />
      </div>
    </section>
  );
}
