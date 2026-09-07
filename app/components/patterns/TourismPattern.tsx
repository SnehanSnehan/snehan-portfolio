export default function TourismPattern() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="pattern-tourism"
          width="70"
          height="70"
          patternUnits="userSpaceOnUse"
        >
          {/* concentric contour lines, evoking a topographic map */}
          <path
            d="M 35 5 C 55 5 65 20 65 35 C 65 50 55 65 35 65 C 15 65 5 50 5 35 C 5 20 15 5 35 5"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.75"
          />
          <path
            d="M 35 18 C 47 18 52 27 52 35 C 52 43 47 52 35 52 C 23 52 18 43 18 35 C 18 27 23 18 35 18"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.75"
          />
          <circle cx="35" cy="35" r="4" fill="var(--accent)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pattern-tourism)" />
    </svg>
  );
}
