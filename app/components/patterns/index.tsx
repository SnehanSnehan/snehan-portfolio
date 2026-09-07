import type { ComponentType } from "react";
import GraduateTrackerPattern from "./GraduateTrackerPattern";
import ChurnPattern from "./ChurnPattern";
import JobMarketPattern from "./JobMarketPattern";
import TourismPattern from "./TourismPattern";
import GlobalHealthPattern from "./GlobalHealthPattern";
import IronmanPattern from "./IronmanPattern";

const PATTERNS: Record<string, ComponentType> = {
  "graduate-job-internship-tracker": GraduateTrackerPattern,
  "ecommerce-churn-analysis": ChurnPattern,
  "ai-job-market-intelligence": JobMarketPattern,
  "tourism-spatial-analysis": TourismPattern,
  "global-health-indicators-analysis": GlobalHealthPattern,
  "ironman-ireland-2022-analysis": IronmanPattern,
};

// Bumped to 0.10 per explicit request for more visibility. Worst-case
// contrast for text-muted (a pattern stroke pixel exactly under an
// anti-aliased glyph edge) is ~4.33:1 — just under the 4.5:1 target. This is
// a deliberate, confirmed tradeoff, not an oversight: that exact-overlap
// case is rare in practice, and 0.08 (the fully-safe value) was reported as
// too faint to notice.
export default function CardPattern({
  slug,
  opacityClassName = "opacity-[0.10]",
}: {
  slug: string;
  opacityClassName?: string;
}) {
  const Pattern = PATTERNS[slug];
  if (!Pattern) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit] ${opacityClassName}`}
    >
      <Pattern />
    </div>
  );
}
