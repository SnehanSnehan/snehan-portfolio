// A globe (filled circle with thin cutout meridian/equator lines) beside a
// separate heartbeat pulse line — population health / vitals theme.
export default function GlobalHealthIllustration() {
  return (
    <g>
      <circle cx="100" cy="80" r="38" fill="var(--accent)" />
      <g fill="none" stroke="var(--surface)" strokeWidth="2.5">
        <ellipse cx="100" cy="80" rx="14" ry="38" />
        <line x1="62" y1="80" x2="138" y2="80" />
      </g>
      <path
        d="M 170 85 L 205 85 L 215 55 L 230 115 L 245 85 L 360 85"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}
