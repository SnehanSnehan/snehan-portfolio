import Link from "next/link";
import type { Project } from "../lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-6 transition-colors hover:border-accent"
    >
      <h3 className="font-display text-lg font-semibold">{project.title}</h3>
      <p className="text-sm text-muted">{project.situation}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border px-2.5 py-0.5 font-mono text-xs text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
      <span className="mt-auto pt-2 text-sm font-medium text-accent">
        Full case study →
      </span>
    </Link>
  );
}
