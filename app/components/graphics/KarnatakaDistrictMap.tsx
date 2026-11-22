"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  KARNATAKA_CLASS_RANGES,
  KARNATAKA_DISTRICTS,
  KARNATAKA_VIEWBOX,
} from "../../lib/karnatakaMap";
import KarnatakaMapFrame, { MAP_GUTTER } from "./KarnatakaMapFrame";

// Five amber steps built from the site tokens. Every step is >= 3:1 against the
// card surface (#1A2230): 3.13, 3.97, 4.94, 6.09, 7.40.
const CLASS_FILL: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: "#8d6731",
  2: "#a47634",
  3: "#ba8537",
  4: "#d1943a",
  5: "#e8a33d",
};

const VB_X = -MAP_GUTTER;
const VB_W = KARNATAKA_VIEWBOX.width + MAP_GUTTER;
const VB_H = KARNATAKA_VIEWBOX.height;
const BANGALORE_ID = "bangalore";
const TAP_RADIUS = 60; // 2 x 60 x 0.384 (scale at 375px) = 46px, above the 44px minimum

// Labels are spread evenly down the gutter so they never overlap; leader lines
// join each one to its district's label point.
const LABELS: { id: string; full: string; short: string; y: number }[] = [
  { id: "uttara-kannada", full: "Uttara Kannada", short: "U. Kannada", y: 420 },
  { id: "haveri", full: "Haveri", short: "Haveri", y: 520 },
  { id: "udupi", full: "Udupi", short: "Udupi", y: 620 },
  { id: "dakshina-kannada", full: "Dakshina Kannada", short: "D. Kannada", y: 720 },
  { id: "bangalore", full: "Bangalore", short: "Bangalore", y: 810 },
  { id: "mysore", full: "Mysore", short: "Mysore", y: 900 },
];

const fmt = (n: number) => n.toLocaleString("en-US");
const byId = Object.fromEntries(KARNATAKA_DISTRICTS.map((d) => [d.id, d]));
const MAX_COUNT = Math.max(...KARNATAKA_DISTRICTS.map((d) => d.count ?? 0));

// Bangalore is tiny and ringed by Bangalore Rural, Ramanagara and Kolar, so its 44px+
// tap circle overlaps them. Inside the circle, a tap/hover goes to whichever of
// Bangalore and the district actually under the pointer has the nearer label point,
// so every neighbour stays selectable and Bangalore still gets a generous target.
function pickDistrict(e: { clientX: number; clientY: number; currentTarget: Element }) {
  const svg = (e.currentTarget as SVGElement).ownerSVGElement as SVGSVGElement;
  const rect = svg.getBoundingClientRect();
  const scale = rect.width / VB_W;
  const x = VB_X + (e.clientX - rect.left) / scale;
  const y = (e.clientY - rect.top) / scale;
  const under = document
    .elementsFromPoint(e.clientX, e.clientY)
    .map((el) => el.closest("g[data-district]")?.getAttribute("data-district"))
    .find(Boolean) as string | undefined;
  if (!under || under === BANGALORE_ID) return BANGALORE_ID;
  const b = byId[BANGALORE_ID];
  const u = byId[under];
  return Math.hypot(x - b.cx, y - b.cy) <= Math.hypot(x - u.cx, y - u.cy) ? BANGALORE_ID : under;
}

export default function KarnatakaDistrictMap() {
  const reduce = !!useReducedMotion();
  const [pinned, setPinned] = useState<string>(BANGALORE_ID);
  const [hovered, setHovered] = useState<string | null>(null);

  const activeId = hovered ?? pinned;
  const active = byId[activeId];
  const blr = byId[BANGALORE_ID];

  // draw order: class 1 -> 5, Bangalore last (also the entrance order)
  const ordered = [...KARNATAKA_DISTRICTS].sort(
    (a, b) => a.cls - b.cls || Number(a.id === BANGALORE_ID) - Number(b.id === BANGALORE_ID)
  );

  return (
    <div className="grid gap-4 lg:grid-cols-[1.15fr_1fr]">
      <KarnatakaMapFrame>
        <svg
          viewBox={`${VB_X} 0 ${VB_W} ${VB_H}`}
          role="group"
          aria-label="Map of Karnataka districts coloured by number of tourism facilities"
          className="absolute inset-0 block h-full w-full"
        >
          <defs>
            <filter id="blr-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {ordered.map((d) => {
            const isBlr = d.id === BANGALORE_ID;
            const delay = (d.cls - 1) * 0.15 + (isBlr ? 0.15 : 0);
            return (
              <g
                key={d.id}
                role="button"
                data-district={d.id}
                tabIndex={0}
                aria-label={`${d.name}, ${
                  d.count != null
                    ? `${fmt(d.count)} facilities`
                    : `${KARNATAKA_CLASS_RANGES[d.cls]} facilities, colour class`
                }`}
                aria-pressed={pinned === d.id}
                className="cursor-pointer outline-none"
                onMouseEnter={() => setHovered(d.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(d.id)}
                onBlur={() => setHovered(null)}
                onClick={() => setPinned(d.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setPinned(d.id);
                  }
                }}
              >
                <motion.path
                  d={d.d}
                  fill={CLASS_FILL[d.cls]}
                  stroke="var(--surface)"
                  strokeWidth={1.2}
                  strokeLinejoin="round"
                  filter={isBlr ? "url(#blr-glow)" : undefined}
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={reduce ? { duration: 0 } : { duration: 0.5, delay }}
                />
              </g>
            );
          })}

          <circle
            cx={blr.cx}
            cy={blr.cy}
            r={TAP_RADIUS}
            fill="transparent"
            aria-hidden="true"
            className="cursor-pointer"
            onPointerMove={(e) => setHovered(pickDistrict(e))}
            onPointerLeave={() => setHovered(null)}
            onClick={(e) => setPinned(pickDistrict(e))}
          />

          {LABELS.map((l) => {
            const d = byId[l.id];
            return (
              <g key={l.id} pointerEvents="none">
                <line x1={-8} y1={l.y} x2={d.cx} y2={d.cy} stroke="var(--surface)" strokeWidth={3.5} opacity={0.7} />
                <line x1={-8} y1={l.y} x2={d.cx} y2={d.cy} stroke="var(--foreground)" strokeWidth={1.2} opacity={0.85} />
                <circle cx={d.cx} cy={d.cy} r={3.5} fill="var(--foreground)" stroke="var(--surface)" strokeWidth={1} />
              </g>
            );
          })}

          {reduce ? (
            <circle
              cx={blr.cx}
              cy={blr.cy}
              r={28}
              fill="none"
              stroke="var(--accent)"
              strokeWidth={2}
              opacity={0.8}
              pointerEvents="none"
            />
          ) : (
            <motion.circle
              cx={blr.cx}
              cy={blr.cy}
              fill="none"
              stroke="var(--accent)"
              strokeWidth={2}
              pointerEvents="none"
              initial={{ r: 20, opacity: 0 }}
              animate={{ r: [20, 44], opacity: [0.9, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1.2 }}
            />
          )}

          {/* Active-district outline: one overlay as the LAST element so no neighbour can
              paint over it. Uses the active district's own path; non-scaling so the
              2px white line and the amber outer ring stay the same width at any size. */}
          <g pointerEvents="none" fill="none" strokeLinejoin="round" strokeLinecap="round">
            <path d={active.d} stroke="var(--accent)" strokeWidth={5} vectorEffect="non-scaling-stroke" />
            <path d={active.d} stroke="#ffffff" strokeWidth={2} vectorEffect="non-scaling-stroke" />
          </g>
        </svg>

        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {LABELS.map((l) => {
            const d = byId[l.id];
            return (
              <div
                key={l.id}
                className="absolute left-0 -translate-y-1/2 pr-1 text-right text-xs leading-tight text-foreground"
                style={{
                  top: `${(l.y / VB_H) * 100}%`,
                  width: `${(MAP_GUTTER / VB_W) * 100 - 1}%`,
                }}
              >
                <span className="sm:hidden">{l.short}</span>
                <span className="hidden whitespace-nowrap sm:inline">{l.full}</span>
                <br />
                <span className="font-semibold">{fmt(d.count as number)}</span>
              </div>
            );
          })}
        </div>
      </KarnatakaMapFrame>

      <div className="flex flex-col gap-4">
        <div aria-live="polite" className="min-h-48 rounded-2xl bg-surface p-5">
          <p className="font-mono text-xs uppercase tracking-wide text-accent">Selected</p>
          <h3 className="font-display text-2xl font-semibold text-foreground">{active.name}</h3>
          {active.count != null ? (
            <>
              <p className="font-display text-5xl font-bold leading-tight text-accent">
                {fmt(active.count)}
              </p>
              <p className="text-sm text-muted">
                facilities (attractions, hotels and restaurants)
              </p>
              <div className="mt-3 h-2 w-full rounded-full bg-background">
                <div
                  className="h-2 rounded-full bg-accent"
                  style={{ width: `${(active.count / MAX_COUNT) * 100}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-muted">
                bar = share of the busiest district&apos;s count
              </p>
            </>
          ) : (
            <p className="mt-3 text-base text-foreground">
              <span className="font-display text-2xl font-semibold text-accent">
                {KARNATAKA_CLASS_RANGES[active.cls]}
              </span>{" "}
              facilities
              <span className="mt-1 block text-sm text-muted">
                (colour class from the project&apos;s QGIS map)
              </span>
            </p>
          )}
        </div>

        <div className="rounded-2xl bg-surface p-5">
          <h3 className="font-mono text-xs uppercase tracking-wide text-accent">
            Facilities per district
          </h3>
          <ul className="mt-2 flex flex-col gap-1.5">
            {([1, 2, 3, 4, 5] as const).map((c) => (
              <li key={c} className="flex items-center gap-3 text-sm text-foreground">
                <span aria-hidden="true" className="h-4 w-7 rounded" style={{ background: CLASS_FILL[c] }} />
                {KARNATAKA_CLASS_RANGES[c]}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-muted">
            Colour classes as in the project&apos;s QGIS map. Exact counts shown where the project
            SQL states them.
          </p>
        </div>

        <div className="rounded-2xl bg-surface p-5">
          <h3 className="font-mono text-xs uppercase tracking-wide text-accent">The pattern</h3>
          <p className="mt-1 text-foreground">
            Bangalore has <strong>14.5x</strong> the facilities of Mysore, the next-ranked
            district, and <strong>411x</strong> Haveri&apos;s 12.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-border px-3 py-1 text-sm text-foreground">
              Top 5 districts: 5,983 of 8,044
            </span>
            <span className="rounded-full border border-border px-3 py-1 text-sm text-foreground">
              Bottom: Haveri 12, Gadag 34, Chikkaballapura 35
            </span>
          </div>
        </div>
      </div>

      <p className="font-mono text-xs text-muted lg:col-span-2">
        Boundaries: DataMeet India Districts (Census 2011). Colour classes: project QGIS map.
        Exact counts: project SQL.
      </p>

      <table className="sr-only">
        <caption>
          Tourism facilities by district (exact count where stated, otherwise colour class range)
        </caption>
        <thead>
          <tr>
            <th scope="col">District</th>
            <th scope="col">Facilities</th>
            <th scope="col">Colour class range</th>
          </tr>
        </thead>
        <tbody>
          {[...KARNATAKA_DISTRICTS]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((d) => (
              <tr key={d.id}>
                <th scope="row">{d.name}</th>
                <td>{d.count != null ? fmt(d.count) : "exact count not stated"}</td>
                <td>{KARNATAKA_CLASS_RANGES[d.cls]}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
