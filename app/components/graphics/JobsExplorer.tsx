"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

// Source: 12,217 LinkedIn job postings, project pipeline (skills_by_role_v2.py).
// Counts are distinct postings per (posting, skill); shares are % of that role's
// postings. Figures are used exactly as supplied; nothing is derived here except
// display formatting.
type Skill = [name: string, postings: number, pct: number];
const JOBS: { totalPostings: number; roles: Record<string, { n: number; skills: Skill[] }> } = {
  totalPostings: 12217,
  roles: {
    "All postings": { n: 12217, skills: [["SQL",5597,45.8],["Python",4986,40.8],["Data analysis",4336,35.5],["Communication",4175,34.2],["Machine learning",3190,26.1],["Data engineering",3181,26.0],["AWS",2503,20.5],["Data visualization",2286,18.7],["Spark",1905,15.6],["Tableau",1720,14.1]] },
    "Data analyst": { n: 1888, skills: [["Data analysis",1528,80.9],["SQL",1269,67.2],["Data visualization",983,52.1],["Communication",860,45.6],["Python",859,45.5],["Tableau",747,39.6],["Power BI",658,34.9],["Statistics",595,31.5],["Excel",587,31.1],["R",562,29.8]] },
    "Data scientist": { n: 810, skills: [["Python",692,85.4],["Machine learning",670,82.7],["Data science",546,67.4],["SQL",497,61.4],["Statistics",466,57.5],["R",394,48.6],["Data analysis",379,46.8],["Data visualization",312,38.5],["Communication",301,37.2],["Spark",223,27.5]] },
    "Data engineer": { n: 1753, skills: [["SQL",1421,81.1],["Python",1355,77.3],["Data engineering",1283,73.2],["Spark",947,54.0],["AWS",881,50.3],["Java",662,37.8],["Snowflake",655,37.4],["Scala",635,36.2],["Data warehousing",627,35.8],["Azure",617,35.2]] },
    "Machine learning engineer": { n: 465, skills: [["Machine learning",459,98.7],["Python",426,91.6],["TensorFlow",335,72.0],["PyTorch",259,55.7],["AWS",225,48.4],["Deep learning",182,39.1],["GCP",152,32.7],["Azure",148,31.8],["Java",141,30.3],["Spark",135,29.0]] },
  },
};
const ROLES = Object.keys(JOBS.roles);
const fmt = (n: number) => n.toLocaleString("en-US");
const AXIS = [0, 25, 50, 75, 100];

const CHIPS = ["12,217 postings analysed", "SQL in 46% of postings", "SQL in 67% of data analyst postings"];

export default function JobsExplorer() {
  const reduce = useReducedMotion();
  const [role, setRoleState] = useState<string>("All postings");
  // first paint grows the bars in rank order; after a role change they all move at once
  const [interacted, setInteracted] = useState(false);
  const setRole = (r: string) => {
    setInteracted(true);
    setRoleState(r);
  };
  const [pinned, setPinned] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const roleRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const listRef = useRef<HTMLUListElement>(null);
  const seen = useInView(listRef, { once: true, margin: "-40px" });

  const data = JOBS.roles[role];
  const activeName = hovered ?? pinned;
  const active = data.skills.find((s) => s[0] === activeName) ?? null;
  const grown = reduce || seen;

  function onRoleKey(e: React.KeyboardEvent, i: number) {
    let j = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") j = (i + 1) % ROLES.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") j = (i - 1 + ROLES.length) % ROLES.length;
    else if (e.key === "Home") j = 0;
    else if (e.key === "End") j = ROLES.length - 1;
    else return;
    e.preventDefault();
    setRole(ROLES[j]);
    roleRefs.current[ROLES[j]]?.focus();
  }

  return (
    // Min-heights = tallest role at each width (labels wrap differently per role), measured:
    // 1370px @375, 1206 @414, 1068 @480, ~1060 @600-700, 954 @768+. Same values as the placeholder.
    <div className="flex min-h-[85.625rem] flex-col gap-5 min-[400px]:min-h-[75.375rem] min-[480px]:min-h-[66.75rem] min-[760px]:min-h-[59.625rem]">
      <h3 className="font-mono text-xs uppercase tracking-wide text-muted">Skills employers ask for</h3>

      <div role="group" aria-label="Choose a role" className="flex flex-wrap gap-2">
        {ROLES.map((r, i) => {
          const on = role === r;
          return (
            <button
              key={r}
              ref={(el) => {
                roleRefs.current[r] = el;
              }}
              type="button"
              aria-pressed={on}
              onClick={() => setRole(r)}
              onKeyDown={(e) => onRoleKey(e, i)}
              className={`min-h-11 rounded-full border px-3.5 py-2 text-sm motion-safe:transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground ${
                on
                  ? "border-accent bg-accent font-semibold text-background"
                  : "border-border bg-surface text-foreground hover:border-muted"
              }`}
            >
              {r}
            </button>
          );
        })}
      </div>

      <div className="rounded-lg border border-border bg-surface p-3 sm:p-4">
        <p className="text-sm text-muted">
          {role}: {fmt(data.n)} postings. Bar length is the share of those postings that mention the
          skill.
        </p>

        <p aria-live="polite" className="mt-2 min-h-6 font-mono text-sm text-foreground">
          {active ? (
            <>
              {active[0]}: {fmt(active[1])} of {fmt(data.n)} postings ({active[2].toFixed(1)}%)
            </>
          ) : (
            <span className="font-sans text-muted">Hover, tap or focus a bar to see its exact count.</span>
          )}
        </p>

        <ul ref={listRef} className="mt-2 flex flex-col">
          {data.skills.map(([name, count, pct], i) => {
            const isActive = activeName === name;
            return (
              <motion.li
                key={name}
                layout={reduce ? false : "position"}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={reduce ? { duration: 0 } : { layout: { duration: 0.45, ease: "easeInOut" }, opacity: { duration: 0.3 } }}
              >
                <button
                  type="button"
                  aria-pressed={pinned === name}
                  onMouseEnter={() => setHovered(name)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(name)}
                  onBlur={() => setHovered(null)}
                  onClick={() => setPinned((p) => (p === name ? null : name))}
                  className={`block w-full cursor-pointer rounded-md px-2 py-2 text-left focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-foreground ${
                    isActive ? "bg-foreground/[0.04] shadow-[inset_0_0_0_1px_var(--muted)]" : ""
                  }`}
                >
                  <span className="flex flex-wrap items-baseline gap-x-2 text-sm">
                    <span className="w-5 shrink-0 font-mono text-muted">{i + 1}</span>
                    <span className="text-foreground">{name}</span>
                    <span className="font-mono text-foreground">{pct.toFixed(1)}%</span>
                    <span className="text-muted">
                      ({fmt(count)} of {fmt(data.n)} postings)
                    </span>
                  </span>
                  <span className="mt-1.5 block h-3 w-full rounded-sm bg-background">
                    <motion.span
                      className="block h-3 rounded-sm"
                      style={{ background: "var(--accent)" }}
                      initial={{ width: reduce ? `${pct}%` : "0%" }}
                      animate={{ width: grown ? `${pct}%` : "0%" }}
                      transition={reduce ? { duration: 0 } : { duration: 0.5, ease: "easeOut", delay: interacted ? 0 : i * 0.04 }}
                    />
                  </span>
                </button>
              </motion.li>
            );
          })}
        </ul>

        <div className="relative mx-2 mt-1 h-7" aria-hidden="true">
          {AXIS.map((t) => (
            <span
              key={t}
              className="absolute top-0 flex flex-col font-mono text-xs text-muted"
              style={{
                left: `${t}%`,
                transform: t === 0 ? "none" : t === 100 ? "translateX(-100%)" : "translateX(-50%)",
                alignItems: t === 0 ? "flex-start" : t === 100 ? "flex-end" : "center",
              }}
            >
              <span className="block h-1 w-px bg-muted" />
              {t}%
            </span>
          ))}
        </div>
      </div>

      <details className="group rounded-lg border border-border bg-surface">
        <summary className="min-h-11 cursor-pointer list-none px-4 py-3 text-sm font-semibold text-foreground focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-foreground [&::-webkit-details-marker]:hidden">
          <span aria-hidden="true" className="mr-2 inline-block font-mono text-muted group-open:rotate-90 motion-safe:transition-transform">
            ›
          </span>
          Method note
        </summary>
        <p className="px-4 pb-4 text-foreground">
          My first pipeline counted rows, not postings: &apos;sql&apos; showed 9,300. Counting each
          posting once and matching whole words gives 5,597 postings (46%) for SQL. Roles are
          postings whose title contains the role name. Skills are as listed in the data; aliases are
          merged (PostgreSQL, MySQL, T-SQL to SQL; NoSQL is kept separate).
        </p>
      </details>

      <p className="font-mono text-xs text-muted">
        Source: 12,217 LinkedIn job postings (about 79% US locations, 89% Mid-senior level, so this
        reflects experienced-role requirements). Shares are distinct postings mentioning each skill.
      </p>

      <div className="flex flex-wrap gap-2">
        {CHIPS.map((c) => (
          <span key={c} className="rounded-full border border-border px-3 py-1 text-sm text-foreground">
            {c}
          </span>
        ))}
      </div>

      {/* hidden accessible table: all five roles */}
      <div className="sr-only">
        <table>
          <caption>
            Top 10 skills by role: distinct postings mentioning each skill and share of that role&apos;s
            postings (12,217 postings in total)
          </caption>
          <thead>
            <tr>
              <th scope="col">Role</th>
              <th scope="col">Postings in role</th>
              <th scope="col">Rank</th>
              <th scope="col">Skill</th>
              <th scope="col">Postings mentioning skill</th>
              <th scope="col">Share of role&apos;s postings (%)</th>
            </tr>
          </thead>
          <tbody>
            {ROLES.flatMap((r) =>
              JOBS.roles[r].skills.map(([name, count, pct], i) => (
                <tr key={`${r}-${name}`}>
                  <th scope="row">{r}</th>
                  <td>{fmt(JOBS.roles[r].n)}</td>
                  <td>{i + 1}</td>
                  <td>{name}</td>
                  <td>{fmt(count)}</td>
                  <td>{pct.toFixed(1)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
