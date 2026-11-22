import Hero from "./components/Hero";
import FeaturedProjects from "./components/FeaturedProjects";
import { absoluteUrl } from "./lib/site";

// Title, description and Open Graph come from the root layout; only the canonical is set here.
export const metadata = { alternates: { canonical: absoluteUrl("/") } };

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <FeaturedProjects />
    </main>
  );
}
