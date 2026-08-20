import { projects } from "../lib/projects";
import ProjectCard from "./ProjectCard";

// Home shows the 3 strongest projects, in spec order — the first 3 entries
// of the projects array (see PROJECT_DATA_UPDATE.md "Featured order").
const featuredProjects = projects.slice(0, 3);

export default function FeaturedProjects() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-16">
      <h2 className="font-display text-2xl font-semibold">
        Featured projects
      </h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
