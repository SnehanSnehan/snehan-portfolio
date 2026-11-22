"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

// Source: Ironman Ireland 2022 results, project R analysis. Figures are computed
// from the raw data file and used exactly as supplied; nothing is estimated here.
type GroupId = "all" | "age" | "pro";
const GROUPS: Record<
  GroupId,
  { label: string; n: number; swim: number; bike: number; run: number; other: number; total: number }
> = {
  all: { label: "All finishers", n: 1045, swim: 1.32, bike: 6.9, run: 4.99, other: 0.3, total: 13.51 },
  age: { label: "Age-group athletes", n: 1032, swim: 1.33, bike: 6.92, run: 5.01, other: 0.3, total: 13.56 },
  pro: { label: "Professionals", n: 13, swim: 0.95, bike: 5.39, run: 3.37, other: 0.09, total: 9.8 },
};
const GROUP_ORDER: GroupId[] = ["all", "age", "pro"];

// [from (h), age-group count, pro count], 0.5 h bins, [from, to)
const BINS: [number, number, number][] = [
  [8.5, 0, 1], [9.0, 1, 2], [9.5, 8, 5], [10.0, 11, 4], [10.5, 42, 1], [11.0, 46, 0],
  [11.5, 87, 0], [12.0, 79, 0], [12.5, 121, 0], [13.0, 102, 0], [13.5, 112, 0],
  [14.0, 107, 0], [14.5, 101, 0], [15.0, 84, 0], [15.5, 63, 0], [16.0, 51, 0], [16.5, 17, 0],
];
const MALE = 921;
const FEMALE = 124;
const MEAN_TOTAL = 13.51;

const AXIS_MAX = 14; // fixed 0-14 h axis for the stacked bar
const BIN_MIN = 8.5;
const BIN_MAX = 17.0;
const BIN_STEP = 0.5;
const PLOT_H = 176; // px, histogram plot height
const MIN_PX = 3; // non-zero segments never draw thinner than this
const MAX_BIN = Math.max(...BINS.map((b) => b[1] + b[2]));

const SEGMENTS = [
  { id: "swim", name: "Swim", fill: "#a47634" }, // mid amber, from the site's amber ramp
  { id: "bike", name: "Bike", fill: "var(--accent)" },
  { id: "run", name: "Run", fill: "var(--foreground)" },
  { id: "other", name: "Transitions and other", fill: "var(--muted)" },
] as const;

const PRO_PATTERN =
  "repeating-linear-gradient(135deg, var(--foreground) 0 2px, var(--surface) 2px 4px)";

const fmt = (n: number) => n.toLocaleString("en-US");
function hmm(hours: number) {
  const m = Math.round(hours * 60);
  return `${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`;
}
const binLabel = (from: number) => `${from.toFixed(1)}-${(from + BIN_STEP).toFixed(1)} h`;
function binText(b: [number, number, number]) {
  const total = b[1] + b[2];
  const noun = total === 1 ? "athlete" : "athletes";
  let text = `${binLabel(b[0])}: ${total} ${noun}`;
  if (b[2] > 0) {
    const parts = [];
    if (b[1] > 0) parts.push(`${b[1]} age-group`);
    parts.push(`${b[2]} ${b[2] === 1 ? "pro" : "pros"}`);
    text += ` (${parts.join(", ")})`;
  }
  return text;
}

const TICKS_H = [0, 2, 4, 6, 8, 10, 12, 14];
const BIN_TICKS = [9, 10, 11, 12, 13, 14, 15, 16, 17];

export default function IronmanExplorer() {
  const reduce = useReducedMotion();
  const [group, setGroup] = useState<GroupId>("all");
  const [interacted, setInteracted] = useState(false);
  const [pinned, setPinned] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const barInView = useInView(barRef, { once: true, margin: "-40px" });
  const binRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const g = GROUPS[group];
  const parts = [g.swim, g.bike, g.run, g.other];
  const activeBin = hovered ?? pinned;
  const grown = reduce || barInView;

  const caption =
    "Mean time per segment. 'Transitions and other' is mean total minus mean swim, bike and run.";
  const histCaption = "About 60% of finishers (622 of 1,045) finished between 12 and 15 hours.";

  return (
    <div className="flex flex-col gap-10">
      {/* 1. Where the race time goes */}
      <div className="flex flex-col gap-4">
        <h3 className="font-mono text-xs uppercase tracking-wide text-muted">
          Where the race time goes
        </h3>

        <div role="group" aria-label="Choose a group of athletes" className="flex flex-wrap gap-2">
          {GROUP_ORDER.map((id) => {
            const on = group === id;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  setInteracted(true);
                  setGroup(id);
                }}
                className={`min-h-11 rounded-full border px-4 py-2 text-sm motion-safe:transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground ${
                  on
                    ? "border-accent bg-accent font-semibold text-background"
                    : "border-border bg-surface text-foreground hover:border-muted"
                }`}
              >
                {GROUPS[id].label}
              </button>
            );
          })}
        </div>

        <div className="rounded-lg border border-border bg-surface p-4">
          <p className="text-sm text-muted">
            {g.label}: {fmt(g.n)} {g.n === 1 ? "athlete" : "athletes"}, mean finish {g.total.toFixed(2)}&nbsp;h
          </p>

          <div
            ref={barRef}
            role="img"
            aria-label={`${g.label}, mean time per segment: swim ${hmm(g.swim)}, bike ${hmm(g.bike)}, run ${hmm(g.run)}, transitions and other ${hmm(g.other)}. Axis runs from 0 to 14 hours.`}
            className="mt-4"
          >
            <div className="flex h-10 w-full overflow-hidden rounded-sm bg-background">
              {SEGMENTS.map((s, i) => (
                <motion.div
                  key={s.id}
                  className="h-full shrink-0"
                  style={{
                    background: s.fill,
                    borderLeft: i === 0 ? undefined : "2px solid var(--surface)",
                  }}
                  initial={{ width: reduce ? `${(parts[i] / AXIS_MAX) * 100}%` : "0%" }}
                  animate={{ width: grown ? `${(parts[i] / AXIS_MAX) * 100}%` : "0%" }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : {
                          duration: interacted ? 0.5 : 0.7,
                          ease: "easeOut",
                          // like a race clock on first load: swim, then bike, then run
                          delay: interacted ? 0 : i * 0.6,
                        }
                  }
                />
              ))}
            </div>
            <div className="relative mt-1 h-6" aria-hidden="true">
              {TICKS_H.map((t) => (
                <span
                  key={t}
                  className="absolute top-0 flex flex-col font-mono text-xs text-muted"
                  style={{
                    left: `${(t / AXIS_MAX) * 100}%`,
                    transform: t === 0 ? "none" : t === AXIS_MAX ? "translateX(-100%)" : "translateX(-50%)",
                    alignItems: t === 0 ? "flex-start" : t === AXIS_MAX ? "flex-end" : "center",
                  }}
                >
                  <span className="block h-1 w-px bg-muted" />
                  {t}
                </span>
              ))}
            </div>
            <p className="mt-1 font-mono text-xs text-muted" aria-hidden="true">
              hours
            </p>
          </div>

          <dl className="mt-4 grid gap-y-2 text-sm">
            {SEGMENTS.map((s, i) => (
              <div key={s.id} className="grid grid-cols-[1rem_1fr_auto_3rem] items-center gap-x-3">
                <dt className="contents">
                  <span
                    aria-hidden="true"
                    className="h-3 w-4 rounded-sm"
                    style={{ background: s.fill }}
                  />
                  <span className="text-foreground">{s.name}</span>
                </dt>
                <dd className="contents">
                  <span className="font-mono text-foreground">{hmm(parts[i])}</span>
                  <span className="text-right font-mono text-muted">
                    {Math.round((parts[i] / g.total) * 100)}%
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <p className="text-sm text-muted">{caption}</p>
      </div>

      {/* 2. Finish times */}
      <div className="flex flex-col gap-4">
        <h3 className="font-mono text-xs uppercase tracking-wide text-muted">Finish times</h3>

        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-foreground">
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="h-3 w-4 rounded-sm bg-accent" />
            Age-group athletes
          </li>
          <li className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-3 w-4 rounded-sm"
              style={{ backgroundImage: PRO_PATTERN }}
            />
            Professionals
          </li>
        </ul>

        <p className="min-h-[1.5rem] text-sm text-foreground" aria-live="polite">
          {activeBin !== null ? (
            <span className="font-mono">{binText(BINS[activeBin])}</span>
          ) : (
            <span className="text-muted">Hover, tap or focus a bar to see its count.</span>
          )}
        </p>

        <div className="relative pt-6">
          {/* plot */}
          <div className="relative" style={{ height: PLOT_H }}>
            {[0, 50, 100].map((v) => (
              <div
                key={v}
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 border-t border-border"
                style={{ bottom: `${(v / MAX_BIN) * 100}%` }}
              >
                {v > 0 && (
                  <span className="absolute -top-4 left-0 font-mono text-xs text-muted">{v}</span>
                )}
              </div>
            ))}

            <div role="group" aria-label="Finish-time histogram, 0.5 hour bins" className="absolute inset-0 flex">
              {BINS.map((b, i) => {
                const isActive = activeBin === i;
                const ageH = b[1] > 0 ? Math.max((b[1] / MAX_BIN) * PLOT_H, MIN_PX) : 0;
                const proH = b[2] > 0 ? Math.max((b[2] / MAX_BIN) * PLOT_H, MIN_PX) : 0;
                return (
                  <button
                    key={b[0]}
                    ref={(el) => {
                      binRefs.current[i] = el;
                    }}
                    type="button"
                    aria-label={binText(b)}
                    aria-pressed={pinned === i}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(i)}
                    onBlur={() => setHovered(null)}
                    onClick={() => setPinned((p) => (p === i ? null : i))}
                    onKeyDown={(e) => {
                      const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
                      if (step) {
                        e.preventDefault();
                        binRefs.current[i + step]?.focus();
                      }
                    }}
                    className={`flex h-full min-w-0 flex-1 cursor-pointer flex-col justify-end px-px focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-foreground ${
                      isActive ? "bg-foreground/10" : ""
                    }`}
                  >
                    {proH > 0 && (
                      <span
                        aria-hidden="true"
                        className="block w-full"
                        style={{ height: proH, backgroundImage: PRO_PATTERN }}
                      />
                    )}
                    {ageH > 0 && (
                      <span aria-hidden="true" className="block w-full bg-accent" style={{ height: ageH }} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* average marker */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-6 bottom-0 border-l-2 border-dashed border-foreground"
              style={{ left: `${((MEAN_TOTAL - BIN_MIN) / (BIN_MAX - BIN_MIN)) * 100}%` }}
            >
              <span className="absolute left-1 top-0 whitespace-nowrap font-mono text-xs text-foreground">
                Average 13.5 h
              </span>
            </div>
          </div>

          {/* x axis */}
          <div className="relative h-6 border-t border-muted" aria-hidden="true">
            {BIN_TICKS.map((t) => (
              <span
                key={t}
                className="absolute top-0 font-mono text-xs text-muted"
                style={{
                  left: `${((t - BIN_MIN) / (BIN_MAX - BIN_MIN)) * 100}%`,
                  transform: t === BIN_MAX ? "translateX(-100%)" : "translateX(-50%)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <p className="font-mono text-xs text-muted" aria-hidden="true">
            finish time (hours); bar height = athletes per half-hour
          </p>
        </div>

        <p className="text-sm text-muted">{histCaption}</p>
      </div>

      {/* 3. Stat chips */}
      <div className="flex flex-wrap gap-2">
        {[
          "1,045 finishers",
          `88% men (${MALE} men, ${FEMALE} women)`,
          "Fastest 8.6 h",
          "Slowest 16.9 h",
        ].map((c) => (
          <span
            key={c}
            className="rounded-full border border-border px-3 py-1 text-sm text-foreground"
          >
            {c}
          </span>
        ))}
      </div>

      {/* 4. Pattern card */}
      <div className="rounded-lg border border-border bg-surface p-4">
        <h3 className="font-mono text-xs uppercase text-muted">The pattern</h3>
        <p className="mt-2 text-foreground">
          Professionals averaged 9.8 hours against 13.6 for age-group athletes, about 3.8 hours
          faster. The pro field here is only 13 athletes (12 women, 1 man), so treat the gap as
          indicative.
        </p>
        <p className="mt-3 text-sm text-muted">
          Data note: one swim split is recorded as 0:00:00 and kept; it changes the average swim by
          under a minute.
        </p>
      </div>

      {/* hidden accessible tables */}
      <div className="sr-only">
        <table>
          <caption>Mean time per segment, in hours and h:mm. {caption}</caption>
          <thead>
            <tr>
              <th scope="col">Group</th>
              <th scope="col">Athletes</th>
              <th scope="col">Swim</th>
              <th scope="col">Bike</th>
              <th scope="col">Run</th>
              <th scope="col">Transitions and other</th>
              <th scope="col">Mean total (h)</th>
            </tr>
          </thead>
          <tbody>
            {GROUP_ORDER.map((id) => {
              const r = GROUPS[id];
              return (
                <tr key={id}>
                  <th scope="row">{r.label}</th>
                  <td>{fmt(r.n)}</td>
                  <td>{r.swim.toFixed(2)} h ({hmm(r.swim)})</td>
                  <td>{r.bike.toFixed(2)} h ({hmm(r.bike)})</td>
                  <td>{r.run.toFixed(2)} h ({hmm(r.run)})</td>
                  <td>{r.other.toFixed(2)} h ({hmm(r.other)})</td>
                  <td>{r.total.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <table>
          <caption>Finish-time histogram, 0.5 hour bins, 1,045 finishers. {histCaption}</caption>
          <thead>
            <tr>
              <th scope="col">Finish time</th>
              <th scope="col">Age-group athletes</th>
              <th scope="col">Professionals</th>
              <th scope="col">All</th>
            </tr>
          </thead>
          <tbody>
            {BINS.map((b) => (
              <tr key={b[0]}>
                <th scope="row">{binLabel(b[0])}</th>
                <td>{b[1]}</td>
                <td>{b[2]}</td>
                <td>{b[1] + b[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
