// Larger, more detailed version of the same person-at-laptop-desk motif used
// on the compact card banner — same single-accent-color silhouette style,
// with added props (chair, resume paper, coffee mug, plant) for the wider
// detail-page hero area.
export default function GraduateTrackerIllustrationLarge() {
  return (
    <g fill="var(--accent)">
      {/* chair back, peeking out behind the person's shoulders */}
      <rect x="200" y="140" width="130" height="90" rx="14" />

      {/* desk, spanning the full composition */}
      <rect x="60" y="190" width="680" height="8" rx="2" />

      {/* person: head + seated torso, flush with the desk top */}
      <circle cx="260" cy="90" r="26" />
      <path d="M 214 122 Q 214 116 220 116 L 300 116 Q 306 116 306 122 L 316 190 L 204 190 Z" />

      {/* resume / paper, lying on the desk between person and laptop */}
      <rect
        x="330"
        y="175"
        width="52"
        height="36"
        rx="3"
        transform="rotate(-8 356 193)"
      />

      {/* laptop: upright screen + base tray on the desk */}
      <rect x="430" y="108" width="140" height="90" rx="6" />
      <rect x="410" y="182" width="180" height="10" rx="3" />

      {/* coffee mug beside the laptop */}
      <rect x="638" y="163" width="30" height="28" rx="5" />
      <path
        d="M 668 170 a 9 9 0 0 1 0 16"
        stroke="var(--accent)"
        strokeWidth="4"
        fill="none"
      />

      {/* small potted plant, far right, for depth */}
      <circle cx="716" cy="158" r="19" />
      <path d="M 700 176 L 732 176 L 727 202 L 705 202 Z" />
    </g>
  );
}
