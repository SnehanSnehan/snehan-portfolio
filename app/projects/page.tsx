import { projects } from "../lib/projects";
import ProjectCard from "../components/ProjectCard";
import StagedReveal from "../components/StagedReveal";

export default function ProjectsPage() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-16">
      <StagedReveal>
        <h1 className="font-display text-3xl font-semibold">Projects</h1>
        <p className="mt-2 text-muted">
          6 projects — click through to a full STAR case study for each.
        </p>
      </StagedReveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <StagedReveal
            key={project.slug}
            delay={(i % 3) * 0.1}
            direction={i % 2 === 0 ? "left" : "right"}
          >
            <ProjectCard project={project} />
          </StagedReveal>
        ))}
      </div>
    </main>
  );
}
