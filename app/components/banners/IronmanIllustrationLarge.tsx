// Larger swim/bike/run trio, more spread out: extra wave lines, a wheel with
// spokes, and a runner beside a small finish flag.
export default function IronmanIllustrationLarge() {
  return (
    <g>
      <g
        stroke="var(--accent)"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      >
        <path d="M 40 110 Q 60 90 80 110 Q 100 130 120 110" />
        <path d="M 40 135 Q 60 115 80 135 Q 100 155 120 135" />
        <path d="M 40 160 Q 60 140 80 160 Q 100 180 120 160" />
      </g>

      <circle
        cx="280"
        cy="130"
        r="46"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="6"
      />
      <circle cx="280" cy="130" r="7" fill="var(--accent)" />
      <g stroke="var(--accent)" strokeWidth="3">
        <line x1="280" y1="84" x2="280" y2="176" />
        <line x1="234" y1="130" x2="326" y2="130" />
        <line x1="248" y1="98" x2="312" y2="162" />
        <line x1="248" y1="162" x2="312" y2="98" />
      </g>

      <circle cx="470" cy="70" r="14" fill="var(--accent)" />
      <path
        d="M 464 92 L 458 128 L 434 150 M 458 128 L 488 140 M 464 92 L 488 110 L 502 96"
        stroke="var(--accent)"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* finish flag */}
      <g fill="var(--accent)">
        <rect x="580" y="70" width="6" height="110" />
        <path d="M 586 70 L 640 85 L 586 100 Z" />
      </g>
    </g>
  );
}
