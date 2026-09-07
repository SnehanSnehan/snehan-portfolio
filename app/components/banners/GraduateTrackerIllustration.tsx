// Flat, single-color silhouette: a person seated at a desk beside an open
// laptop — job-hunting / tech-work theme for the Graduate Job Tracker.
// Person and laptop are kept spatially separate (not overlapping) since two
// same-color shapes merge seamlessly where they overlap — separation is what
// keeps each element individually readable as a silhouette.
export default function GraduateTrackerIllustration() {
  return (
    <g fill="var(--accent)">
      {/* desk, spanning under both the person and the laptop */}
      <rect x="55" y="118" width="290" height="6" rx="2" />

      {/* person: head + seated torso, flush with the desk top */}
      <circle cx="130" cy="52" r="16" />
      <path d="M 108 74 Q 108 70 113 70 L 147 70 Q 152 70 152 74 L 158 118 L 102 118 Z" />

      {/* laptop: upright screen + base tray on the desk */}
      <rect x="235" y="74" width="70" height="44" rx="3" />
      <rect x="222" y="118" width="96" height="6" rx="2" />
    </g>
  );
}
