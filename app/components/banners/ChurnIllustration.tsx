// Clustered bubbles of varying size, evoking customer segments — with one
// ringed to suggest the highlighted "at-risk" segment from RFM analysis.
export default function ChurnIllustration() {
  return (
    <g>
      <g fill="var(--accent)">
        <circle cx="110" cy="70" r="20" />
        <circle cx="160" cy="100" r="13" />
        <circle cx="80" cy="105" r="9" />
        <circle cx="220" cy="55" r="15" />
        <circle cx="260" cy="90" r="24" />
        <circle cx="310" cy="60" r="10" />
      </g>
      <circle
        cx="260"
        cy="90"
        r="33"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="3"
      />
    </g>
  );
}
