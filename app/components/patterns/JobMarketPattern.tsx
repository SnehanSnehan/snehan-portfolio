export default function JobMarketPattern() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="pattern-job-market"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          {/* grid of small bar-chart / tag-chip shapes, varying height like a ranked skill list */}
          <rect x="4" y="22" width="6" height="14" rx="1.5" fill="var(--accent)" />
          <rect x="14" y="14" width="6" height="22" rx="1.5" fill="var(--accent)" />
          <rect x="24" y="26" width="6" height="10" rx="1.5" fill="var(--accent)" />
          <rect x="34" y="8" width="6" height="28" rx="1.5" fill="var(--accent)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pattern-job-market)" />
    </svg>
  );
}
