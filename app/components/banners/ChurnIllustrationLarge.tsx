// Larger version of the bubble-cluster motif: more segments spread across
// the wider composition, two of them ringed (e.g. "at-risk" and "champions"),
// plus a simple trend line suggesting analysis over time.
export default function ChurnIllustrationLarge() {
  return (
    <g>
      <g fill="var(--accent)">
        <circle cx="120" cy="90" r="26" />
        <circle cx="190" cy="140" r="16" />
        <circle cx="90" cy="150" r="11" />
        <circle cx="260" cy="70" r="19" />
        <circle cx="330" cy="130" r="30" />
        <circle cx="410" cy="80" r="13" />
        <circle cx="470" cy="150" r="22" />
        <circle cx="550" cy="95" r="15" />
        <circle cx="620" cy="140" r="34" />
        <circle cx="700" cy="85" r="12" />
      </g>
      <circle
        cx="330"
        cy="130"
        r="40"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="3.5"
      />
      <circle
        cx="620"
        cy="140"
        r="44"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="3.5"
      />
      <path
        d="M 60 210 L 160 195 L 260 215 L 360 180 L 460 200 L 560 175 L 660 190 L 740 165"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.6"
      />
    </g>
  );
}
