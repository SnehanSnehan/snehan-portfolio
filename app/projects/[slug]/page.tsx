import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "../../lib/projects";
import Reveal from "../../components/Reveal";
import ActionReveal from "../../components/ActionReveal";
import MetricChips from "../../components/MetricChips";
import CardPattern from "../../components/patterns";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <Link
        href="/projects"
        className="text-sm text-muted transition-colors hover:text-foreground"
      >
        ← Back to all projects
      </Link>

      <div className="relative mt-6 overflow-hidden rounded-lg border border-border bg-surface p-6 sm:p-8">
        <CardPattern slug={project.slug} />

        <h1 className="font-display text-3xl font-semibold sm:text-4xl">
          {project.title}
        </h1>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2.5 py-0.5 font-mono text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-4">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-accent hover:opacity-80"
          >
            Source code →
          </a>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-accent hover:opacity-80"
            >
              Live demo →
            </a>
          )}
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-8">
        <Reveal>
          <section>
            <h2 className="font-mono text-xs uppercase tracking-wide text-muted">
              Situation
            </h2>
            <p className="mt-2 text-muted">{project.situation}</p>
          </section>
        </Reveal>

        <Reveal>
          <section>
            <h2 className="font-mono text-xs uppercase tracking-wide text-muted">
              Task
            </h2>
            <p className="mt-2 text-muted">{project.task}</p>
          </section>
        </Reveal>

        <ActionReveal>
          <h2 className="font-mono text-xs uppercase tracking-wide text-accent">
            Action
          </h2>
          <p className="mt-3 text-base leading-relaxed text-foreground">
            {project.action}
          </p>
        </ActionReveal>

        <Reveal>
          <section>
            <h2 className="font-mono text-xs uppercase tracking-wide text-muted">
              Result
            </h2>
            <p className="mt-2 text-muted">{project.result}</p>
          </section>
        </Reveal>

        {project.metrics.length > 0 && (
          <MetricChips metrics={project.metrics} />
        )}
      </div>

      <Link
        href="/projects"
        className="mt-10 inline-block text-sm text-muted transition-colors hover:text-foreground"
      >
        ← Back to all projects
      </Link>
    </main>
  );
}
