export default function IronmanPattern() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="pattern-ironman"
          width="64"
          height="64"
          patternUnits="userSpaceOnUse"
        >
          {/* a jagged route/path line with waypoint markers, evoking a race course */}
          <path
            d="M 2 50 L 16 30 L 28 42 L 40 12 L 52 26 L 62 6"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <circle cx="2" cy="50" r="3" fill="var(--accent)" />
          <circle cx="28" cy="42" r="2.25" fill="var(--accent)" />
          <circle cx="40" cy="12" r="2.25" fill="var(--accent)" />
          <circle cx="62" cy="6" r="3" fill="var(--accent)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pattern-ironman)" />
    </svg>
  );
}
