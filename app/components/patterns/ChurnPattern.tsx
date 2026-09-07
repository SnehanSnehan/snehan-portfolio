export default function ChurnPattern() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="pattern-churn"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          {/* radial segments, evoking a pie/RFM-segment chart */}
          <circle
            cx="30"
            cy="30"
            r="22"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <circle
            cx="30"
            cy="30"
            r="13"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path
            d="M 30 8 L 30 52 M 8 30 L 52 30 M 14 14 L 46 46 M 46 14 L 14 46"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pattern-churn)" />
    </svg>
  );
}
