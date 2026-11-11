import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "../../lib/projects";
import StagedReveal from "../../components/StagedReveal";
import ActionReveal from "../../components/ActionReveal";
import MetricChips from "../../components/MetricChips";
import ChurnSegmentExplorer from "../../components/graphics/ChurnSegmentExplorer";
import CardPattern from "../../components/patterns";
import DetailBanner, {
  hasDetailBanner,
} from "../../components/banners/DetailBanner";

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
        {hasDetailBanner(project.slug) ? (
          <DetailBanner slug={project.slug} />
        ) : (
          <CardPattern slug={project.slug} />
        )}

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
        <StagedReveal direction="left">
          <section>
            <h2 className="font-mono text-xs uppercase tracking-wide text-muted">
              Situation
            </h2>
            <p className="mt-2 text-muted">{project.situation}</p>
          </section>
        </StagedReveal>

        <StagedReveal direction="right">
          <section>
            <h2 className="font-mono text-xs uppercase tracking-wide text-muted">
              Task
            </h2>
            <p className="mt-2 text-muted">{project.task}</p>
          </section>
        </StagedReveal>

        <ActionReveal>
          <h2 className="font-mono text-xs uppercase tracking-wide text-accent">
            Action
          </h2>
          <p className="mt-3 text-base leading-relaxed text-foreground">
            {project.action}
          </p>
        </ActionReveal>

        <StagedReveal direction="left">
          <section>
            <h2 className="font-mono text-xs uppercase tracking-wide text-muted">
              Result
            </h2>
            <p className="mt-2 text-muted">{project.result}</p>
          </section>
        </StagedReveal>

        {project.metrics.length > 0 && (
          <MetricChips metrics={project.metrics} />
        )}

        {slug === "ecommerce-churn-analysis" && (
          <section aria-labelledby="explore-data">
            <h2
              id="explore-data"
              className="font-mono text-xs uppercase tracking-wide text-muted"
            >
              Explore the data
            </h2>
            <div className="mt-4">
              <ChurnSegmentExplorer />
            </div>
            <p className="mt-3 font-mono text-xs text-muted">
              Source: project README
            </p>
          </section>
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
