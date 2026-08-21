import Reveal from "../components/Reveal";

const VOLUNTEERING = [
  {
    role: "Secretary, Kalarava Cultural Club",
    dates: "2023–2025",
    description:
      "Organized major cultural events for colleges, coordinated volunteers, timings, stage, and logistics, and introduced new formats to increase participation.",
  },
  {
    role: "Coordinator, Technical & Academic Events",
    dates: "2022",
    description:
      "Arranged coding contests, hackathons, and workshops; organized IEEE events with faculty and student teams; prepared reports and handled event documentation.",
  },
  {
    role: "Content & Media Volunteer",
    dates: "2023",
    description:
      "Developed content for college event promotions, coordinated choreography, videos, and social media content.",
  },
];

const CERTIFICATIONS = [
  {
    name: "Oracle Cloud Infrastructure 2025 Certified Data Science Professional",
    issuer: "Oracle",
    date: "Oct 2025",
  },
  {
    name: "Actuarial Analyst Virtual Job Simulation",
    issuer: "Forage",
    date: "Feb 2026",
  },
  {
    name: "Building REST APIs with Python",
    issuer: "Infosys Springboard",
    date: "Jul 2024",
  },
  {
    name: "Build Web Projects using Django and Python",
    issuer: "Infosys Springboard",
    date: "Jul 2024",
  },
  {
    name: "Artificial Intelligence Foundation",
    issuer: "Infosys Springboard",
    date: "Sep 2023",
  },
];

const HOBBIES = [
  "Teaches Indian classical dance",
  "Group travel planning",
  "Building side projects",
];

export default function AchievementsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <h1 className="font-display text-3xl font-semibold">
        Achievements &amp; Hobbies
      </h1>

      <h2 className="mt-12 font-display text-2xl font-semibold">
        Volunteering
      </h2>
      <div className="mt-6 flex flex-col gap-4">
        {VOLUNTEERING.map((item, i) => (
          <Reveal key={item.role} delay={i * 0.1}>
            <div className="rounded-lg border border-border bg-surface p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-base font-semibold">
                  {item.role}
                </h3>
                <span className="font-mono text-xs text-muted">
                  {item.dates}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted">{item.description}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <h2 className="mt-12 font-display text-2xl font-semibold">
        Certifications
      </h2>
      <Reveal className="mt-6 flex flex-col divide-y divide-border rounded-lg border border-border bg-surface">
        {CERTIFICATIONS.map((cert) => (
          <div
            key={cert.name}
            className="flex flex-wrap items-baseline justify-between gap-2 px-6 py-4"
          >
            <div>
              <p className="text-sm text-foreground">{cert.name}</p>
              <p className="mt-0.5 text-xs text-muted">{cert.issuer}</p>
            </div>
            <span className="font-mono text-xs text-accent">{cert.date}</span>
          </div>
        ))}
      </Reveal>

      <h2 className="mt-12 font-display text-2xl font-semibold">Hobbies</h2>
      <Reveal className="mt-6 flex flex-wrap gap-2">
        {HOBBIES.map((hobby) => (
          <span
            key={hobby}
            className="rounded-full border border-border px-3 py-1 font-mono text-xs text-accent"
          >
            {hobby}
          </span>
        ))}
      </Reveal>
    </main>
  );
}
