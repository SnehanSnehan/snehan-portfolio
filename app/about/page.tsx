const SKILLS = [
  {
    category: "Data & Analysis",
    items: ["Python", "R", "SQL", "Power BI", "Data Cleaning"],
  },
  {
    category: "ML & AI",
    items: [
      "Scikit-learn",
      "Deep Learning",
      "Explainable AI",
      "Statistical Modelling",
    ],
  },
  {
    category: "Databases & Geo",
    items: ["PostgreSQL", "PostGIS", "QGIS", "Data Modelling"],
  },
  {
    category: "Engineering",
    items: ["Streamlit", "Java", "C++", "HTML/CSS/JS"],
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <h1 className="font-display text-3xl font-semibold">About</h1>

      <div className="mt-8 flex flex-col gap-4 text-muted">
        <p>
          I&apos;m an MSc Data Science &amp; Analytics student at Maynooth
          University, originally from Bangalore and now based in Dublin. I
          like problems where the data is messy before it&apos;s useful —
          cleaning, modelling, and turning it into something a non-technical
          person can actually act on.
        </p>
        <p>
          My background combines computer science engineering with applied
          data science — I studied Machine Learning, Bayesian Data Analysis,
          Spatial Databases, and Deep Learning at Maynooth, on top of a BEng
          in Computer Science &amp; Engineering. Along the way I&apos;ve
          worked across recommendation systems, spatial analysis, and
          explainable AI.
        </p>
        <p>
          Alongside my studies I teach Indian classical dance, which is where
          most of my patience for repetition and detail comes from.
          I&apos;m currently job-hunting across Data Analyst, Data Scientist,
          and ML Engineer roles in Ireland — Dublin, Cork, Limerick, or
          remote/hybrid.
        </p>
      </div>

      <h2 className="mt-14 font-display text-2xl font-semibold">Skills</h2>
      <div className="mt-6 grid gap-8 sm:grid-cols-2">
        {SKILLS.map((group) => (
          <div key={group.category}>
            <h3 className="font-mono text-xs uppercase tracking-wide text-muted">
              {group.category}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-border bg-surface px-3 py-1 text-sm text-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
