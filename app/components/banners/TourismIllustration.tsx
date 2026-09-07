// A mountain range silhouette (merged shapes — a continuous skyline is the
// intended read here) beside a separate map-pin marker.
export default function TourismIllustration() {
  return (
    <g fill="var(--accent)">
      <path d="M 40 118 L 95 65 L 140 118 Z" />
      <path d="M 110 118 L 175 50 L 240 118 Z" />
      <circle cx="320" cy="55" r="20" />
      <path d="M 300 62 L 340 62 L 320 108 Z" />
    </g>
  );
}
