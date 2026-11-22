import type { MetadataRoute } from "next";
import { projects } from "./lib/projects";
import { absoluteUrl } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/projects", "/about", "/achievements", "/contact"];
  return [
    ...pages.map((path) => ({ url: absoluteUrl(path) })),
    ...projects.map((p) => ({ url: absoluteUrl(`/projects/${p.slug}`) })),
  ];
}
