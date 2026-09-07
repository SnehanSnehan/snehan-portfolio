// Larger globe (more meridian lines) beside a longer heartbeat pulse line
// and a small medical cross for extra context.
export default function GlobalHealthIllustrationLarge() {
  return (
    <g>
      <circle cx="140" cy="120" r="60" fill="var(--accent)" />
      <g fill="none" stroke="var(--surface)" strokeWidth="3">
        <ellipse cx="140" cy="120" rx="22" ry="60" />
        <ellipse cx="140" cy="120" rx="44" ry="60" />
        <line x1="80" y1="120" x2="200" y2="120" />
      </g>

      <path
        d="M 240 130 L 300 130 L 315 85 L 340 175 L 365 130 L 700 130"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* small medical cross */}
      <g fill="var(--accent)">
        <rect x="640" y="60" width="16" height="46" rx="3" />
        <rect x="625" y="75" width="46" height="16" rx="3" />
      </g>
    </g>
  );
}
