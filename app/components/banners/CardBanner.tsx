import type { ComponentType } from "react";
import GraduateTrackerIllustration from "./GraduateTrackerIllustration";
import ChurnIllustration from "./ChurnIllustration";
import JobMarketIllustration from "./JobMarketIllustration";
import TourismIllustration from "./TourismIllustration";
import GlobalHealthIllustration from "./GlobalHealthIllustration";
import IronmanIllustration from "./IronmanIllustration";

const ILLUSTRATIONS: Record<string, ComponentType> = {
  "graduate-job-internship-tracker": GraduateTrackerIllustration,
  "ecommerce-churn-analysis": ChurnIllustration,
  "ai-job-market-intelligence": JobMarketIllustration,
  "tourism-spatial-analysis": TourismIllustration,
  "global-health-indicators-analysis": GlobalHealthIllustration,
  "ironman-ireland-2022-analysis": IronmanIllustration,
};

export function hasBanner(slug: string) {
  return slug in ILLUSTRATIONS;
}

export default function CardBanner({ slug }: { slug: string }) {
  const Illustration = ILLUSTRATIONS[slug];
  if (!Illustration) return null;

  const gradientId = `banner-fade-${slug}`;

  return (
    <div
      aria-hidden="true"
      className="relative h-36 w-full overflow-hidden bg-surface"
    >
      <svg
        viewBox="0 0 400 160"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMax slice"
      >
        <Illustration />
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--surface)" stopOpacity="0" />
            <stop offset="100%" stopColor="var(--surface)" stopOpacity="1" />
          </linearGradient>
        </defs>
        <rect width="400" height="160" fill={`url(#${gradientId})`} />
      </svg>
    </div>
  );
}
