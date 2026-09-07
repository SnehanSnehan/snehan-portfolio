// Three separate motifs across the banner — swim waves, a bike wheel, and a
// running figure — matching the race's swim/bike/run segment breakdown.
export default function IronmanIllustration() {
  return (
    <g>
      <g
        stroke="var(--accent)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      >
        <path d="M 40 92 Q 55 78 70 92 Q 85 106 100 92" />
        <path d="M 40 112 Q 55 98 70 112 Q 85 126 100 112" />
      </g>

      <circle
        cx="200"
        cy="95"
        r="26"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="5"
      />
      <circle cx="200" cy="95" r="5" fill="var(--accent)" />

      <circle cx="303" cy="55" r="9" fill="var(--accent)" />
      <path
        d="M 300 70 L 296 92 L 280 106 M 296 92 L 316 100 M 300 70 L 316 82 L 326 72"
        stroke="var(--accent)"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}
