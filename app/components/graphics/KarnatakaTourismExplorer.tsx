"use client";

import { motion, useReducedMotion } from "framer-motion";

// Source: project README. Only these figures are used; nothing derived or estimated.
const BY_TYPE = [
  { name: "Attractions", n: 691 },
  { name: "Hotels", n: 1499 },
  { name: "Restaurants", n: 5854 },
];
const MUSEUMS = [
  { name: "Bangalore", n: 20, note: "42% of Karnataka's museums" },
  { name: "Mysore", n: 6, note: "" },
];

const BAR_W = 400; // bar length for the largest value
const ROW_H = 50;
const MAX = Math.max(...BY_TYPE.map((r) => r.n));
const fmt = (n: number) => n.toLocaleString("en-US");

export default function KarnatakaTourismExplorer() {
  const reduce = useReducedMotion();
  const caption =
    "691 attractions, 1,499 hotels and 5,854 restaurants: 8,044 facilities in the dataset.";

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-mono text-xs uppercase tracking-wide text-muted">By type</h3>

      <svg
        viewBox={`0 0 ${BAR_W} ${BY_TYPE.length * ROW_H}`}
        role="img"
        aria-label={`Horizontal bars. ${caption}`}
        className="h-auto w-full max-w-md"
      >
        {BY_TYPE.map((r, i) => {
          const w = (r.n / MAX) * BAR_W;
          const y = i * ROW_H;
          return (
            <g key={r.name}>
              <text x={0} y={y + 16} fontSize={15} fill="var(--foreground)" className="font-display">
                {r.name} · {fmt(r.n)}
              </text>
              <motion.rect
                x={0}
                y={y + 24}
                height={16}
                fill="var(--accent)"
                initial={reduce ? { width: w } : { width: 0 }}
                animate={{ width: w }}
                transition={
                  reduce ? { duration: 0 } : { duration: 0.6, ease: "easeOut", delay: i * 0.1 }
                }
              />
            </g>
          );
        })}
      </svg>

      <p className="text-sm text-muted">{caption}</p>

      <div className="rounded-lg border border-border bg-surface p-4">
        <h3 className="font-mono text-xs uppercase text-muted">Museums</h3>
        <dl className="mt-2 grid grid-cols-2 gap-3 text-sm">
          {MUSEUMS.map((m) => (
            <div key={m.name}>
              <dt className="text-muted">{m.name}</dt>
              <dd className="font-display text-base font-semibold text-foreground">
                {m.n}
                {m.note && (
                  <span className="ml-2 text-sm font-normal text-muted">({m.note})</span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="sr-only">
        <table>
          <caption>Facilities in the dataset by type (total 8,044)</caption>
          <thead>
            <tr>
              <th scope="col">Type</th>
              <th scope="col">Facilities</th>
            </tr>
          </thead>
          <tbody>
            {BY_TYPE.map((r) => (
              <tr key={r.name}>
                <th scope="row">{r.name}</th>
                <td>{fmt(r.n)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table>
          <caption>Museums</caption>
          <thead>
            <tr>
              <th scope="col">District</th>
              <th scope="col">Museums</th>
              <th scope="col">Note</th>
            </tr>
          </thead>
          <tbody>
            {MUSEUMS.map((m) => (
              <tr key={m.name}>
                <th scope="row">{m.name}</th>
                <td>{m.n}</td>
                <td>{m.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
