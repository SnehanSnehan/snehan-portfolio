export default function GraduateTrackerPattern() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="pattern-graduate-tracker"
          width="26"
          height="26"
          patternUnits="userSpaceOnUse"
        >
          {/* circuit-style traces */}
          <path
            d="M 0 13 H 8 M 18 13 H 26 M 13 0 V 8 M 13 18 V 26"
            stroke="var(--accent)"
            strokeWidth="2"
            fill="none"
          />
          {/* corner connector traces */}
          <path
            d="M 8 13 L 13 8 M 13 18 L 18 13"
            stroke="var(--accent)"
            strokeWidth="2"
            fill="none"
          />
          {/* nodes */}
          <circle cx="13" cy="13" r="3.5" fill="var(--accent)" />
          <circle cx="0" cy="13" r="2.25" fill="var(--accent)" />
          <circle cx="26" cy="13" r="2.25" fill="var(--accent)" />
          <circle cx="13" cy="0" r="2.25" fill="var(--accent)" />
          <circle cx="13" cy="26" r="2.25" fill="var(--accent)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pattern-graduate-tracker)" />
    </svg>
  );
}
