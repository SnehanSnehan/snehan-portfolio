import type { Metadata } from "next";

// IMPORTANT: change this when the site moves to a custom domain. It feeds
// metadataBase, canonical URLs, Open Graph URLs, robots.txt and sitemap.xml.
export const SITE_URL = "https://snehan-portfolio-six.vercel.app";

export const SITE_NAME = "Snehan";
export const SITE_TITLE = "Snehan — Data Scientist & Analytics Engineer";
export const SITE_DESCRIPTION =
  "Portfolio of Snehan, MSc Data Science & Analytics — job market intelligence, spatial analysis, and explainable AI projects.";
export const SITE_LOCALE = "en_IE";

// Absolute URL for a site path ("/about" -> "https://…/about").
export const absoluteUrl = (path: string) => new URL(path, SITE_URL).toString();

// Preview image routes (app/opengraph-image.tsx, app/twitter-image.tsx). A page that
// defines its own `openGraph` / `twitter` replaces the root layout's, which drops the
// file-convention image, so each page references the image explicitly.
const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: SITE_TITLE };

// Per-page metadata: unique title and description, a canonical URL, and matching
// Open Graph / Twitter fields, all pointing at the shared preview image.
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = absoluteUrl(path);
  const full = `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      url,
      title: full,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: full,
      description,
      images: ["/twitter-image"],
    },
  };
}
