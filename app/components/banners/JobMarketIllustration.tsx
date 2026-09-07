// A simple ascending bar chart on a baseline — skill-demand ranking theme.
export default function JobMarketIllustration() {
  return (
    <g fill="var(--accent)">
      <rect x="60" y="118" width="280" height="5" rx="2" />
      <rect x="90" y="90" width="24" height="28" rx="2" />
      <rect x="130" y="70" width="24" height="48" rx="2" />
      <rect x="170" y="100" width="24" height="18" rx="2" />
      <rect x="210" y="50" width="24" height="68" rx="2" />
      <rect x="250" y="80" width="24" height="38" rx="2" />
      <rect x="290" y="95" width="24" height="23" rx="2" />
    </g>
  );
}
