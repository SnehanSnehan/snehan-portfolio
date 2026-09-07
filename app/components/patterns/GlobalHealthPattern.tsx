export default function GlobalHealthPattern() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="pattern-global-health"
          width="60"
          height="30"
          patternUnits="userSpaceOnUse"
        >
          {/* flowing sine-like lines, evoking trend curves across time */}
          <path
            d="M 0 20 C 10 5 20 5 30 20 C 40 35 50 35 60 20"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path
            d="M 0 10 C 10 -5 20 -5 30 10 C 40 25 50 25 60 10"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.25"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pattern-global-health)" />
    </svg>
  );
}
