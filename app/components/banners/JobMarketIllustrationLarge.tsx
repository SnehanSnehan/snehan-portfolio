// Larger bar chart with more bars, a magnifying glass over the tallest one
// (skill-demand "analysis"), and a couple of floating tag chips above.
export default function JobMarketIllustrationLarge() {
  return (
    <g fill="var(--accent)">
      <rect x="50" y="190" width="700" height="7" rx="2" />
      <rect x="80" y="140" width="34" height="50" rx="3" />
      <rect x="130" y="105" width="34" height="85" rx="3" />
      <rect x="180" y="155" width="34" height="35" rx="3" />
      <rect x="230" y="70" width="34" height="120" rx="3" />
      <rect x="280" y="120" width="34" height="70" rx="3" />
      <rect x="330" y="160" width="34" height="30" rx="3" />
      <rect x="380" y="95" width="34" height="95" rx="3" />
      <rect x="430" y="135" width="34" height="55" rx="3" />

      {/* floating skill tag chips */}
      <rect x="500" y="80" width="80" height="24" rx="12" opacity="0.85" />
      <rect x="590" y="115" width="64" height="24" rx="12" opacity="0.85" />
      <rect x="510" y="150" width="70" height="24" rx="12" opacity="0.85" />

      {/* magnifying glass over the tallest bar */}
      <circle
        cx="247"
        cy="70"
        r="26"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="5"
      />
      <line
        x1="266"
        y1="89"
        x2="286"
        y2="109"
        stroke="var(--accent)"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </g>
  );
}
