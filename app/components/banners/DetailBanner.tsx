import type { ComponentType } from "react";
import GraduateTrackerIllustrationLarge from "./GraduateTrackerIllustrationLarge";
import ChurnIllustrationLarge from "./ChurnIllustrationLarge";
import JobMarketIllustrationLarge from "./JobMarketIllustrationLarge";
import TourismIllustrationLarge from "./TourismIllustrationLarge";
import GlobalHealthIllustrationLarge from "./GlobalHealthIllustrationLarge";
import IronmanIllustrationLarge from "./IronmanIllustrationLarge";

const ILLUSTRATIONS: Record<string, ComponentType> = {
  "graduate-job-internship-tracker": GraduateTrackerIllustrationLarge,
  "ecommerce-churn-analysis": ChurnIllustrationLarge,
  "ai-job-market-intelligence": JobMarketIllustrationLarge,
  "tourism-spatial-analysis": TourismIllustrationLarge,
  "global-health-indicators-analysis": GlobalHealthIllustrationLarge,
  "ironman-ireland-2022-analysis": IronmanIllustrationLarge,
};

export function hasDetailBanner(slug: string) {
  return slug in ILLUSTRATIONS;
}

export default function DetailBanner({ slug }: { slug: string }) {
  const Illustration = ILLUSTRATIONS[slug];
  if (!Illustration) return null;

  const gradientId = `detail-banner-fade-${slug}`;

  return (
    <div
      aria-hidden="true"
      className="relative -mx-6 -mt-6 h-56 overflow-hidden sm:-mx-8 sm:-mt-8 sm:h-64"
    >
      <svg
        viewBox="0 0 800 260"
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
        <rect width="800" height="260" fill={`url(#${gradientId})`} />
      </svg>
    </div>
  );
}
