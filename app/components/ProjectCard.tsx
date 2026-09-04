import Link from "next/link";
import type { Project } from "../lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col gap-3 rounded-[7px] border border-border bg-surface p-6 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:border-accent hover:shadow-[0_0_24px_-4px_rgba(232,163,61,0.25)] motion-safe:hover:-translate-y-1"
    >
      <h3 className="font-display text-lg font-semibold">{project.title}</h3>
      <p className="text-sm text-muted">{project.situation}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border px-2.5 py-0.5 font-mono text-xs text-muted transition-colors duration-300 group-hover:border-accent/60 group-hover:text-accent"
          >
            {tag}
          </span>
        ))}
      </div>
      <span className="mt-auto flex items-center gap-1 pt-2 text-sm font-medium text-accent">
        Full case study
        <span className="transition-transform duration-300 motion-safe:group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  );
}
