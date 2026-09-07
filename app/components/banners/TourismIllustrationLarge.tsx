// Larger mountain range (three peaks) with two map-pin markers of differing
// size, connected by a dotted route line suggesting spatial distribution.
export default function TourismIllustrationLarge() {
  return (
    <g fill="var(--accent)">
      <path d="M 40 200 L 130 100 L 210 200 Z" />
      <path d="M 150 200 L 260 70 L 370 200 Z" />
      <path d="M 300 200 L 380 120 L 460 200 Z" />

      <path
        d="M 210 150 L 480 90"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="3"
        strokeDasharray="2 12"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/* larger pin */}
      <circle cx="540" cy="80" r="28" />
      <path d="M 512 90 L 568 90 L 540 152 Z" />

      {/* smaller pin */}
      <circle cx="670" cy="120" r="18" />
      <path d="M 652 128 L 688 128 L 670 172 Z" />
    </g>
  );
}
