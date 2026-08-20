import Hero from "./components/Hero";
import FeaturedProjects from "./components/FeaturedProjects";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <FeaturedProjects />
    </main>
  );
}
