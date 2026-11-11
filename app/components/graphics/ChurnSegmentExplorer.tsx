"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Source: project README. Per-segment figures only; no overall total is shown.
const SEGMENTS = [
  { id: "potential", name: "Potential Loyalists", label: "Potential", customers: 38408, churn: 80.1, spend: 130, cx: 105, cy: 105 },
  { id: "loyal", name: "Loyal Customers", label: "Loyal", customers: 31473, churn: 56.7, spend: 215, cx: 300, cy: 120 },
  { id: "at-risk", name: "At Risk", label: "At Risk", customers: 12298, churn: 97.4, spend: 69, cx: 110, cy: 275 },
  { id: "champions", name: "Champions", label: "Champions", customers: 8011, churn: 27.5, spend: 334, cx: 230, cy: 300, lx: 230, ly: 372, anchor: "middle", sx: 230, sy: 352 },
  { id: "lost", name: "Lost", label: "Lost", customers: 3168, churn: 100, spend: 48, cx: 345, cy: 290, lx: 345, ly: 232, anchor: "middle", sx: 345, sy: 238 },
] as const;

const MAX_R = 90;
const MAX_CUSTOMERS = 38408;
const INSIDE_MIN_R = 45; // labels go inside only when the bubble is big enough to hold them
const radius = (n: number) => MAX_R * Math.sqrt(n / MAX_CUSTOMERS);
const MIN_HIT = 28;

const fmt = (n: number) => n.toLocaleString("en-US");

export default function ChurnSegmentExplorer() {
  const reduce = useReducedMotion();
  const [pinned, setPinned] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const activeId = hovered ?? pinned;
  const active = SEGMENTS.find((s) => s.id === activeId) ?? null;

  function toggle(id: string) {
    setPinned((p) => (p === id ? null : id));
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted">
        Bubble area is proportional to each segment&apos;s customer count.
        Hover, tap, or focus a bubble to see its churn rate and average spend.
      </p>

      <svg
        viewBox="0 0 420 380"
        role="group"
        aria-label="Customer segments as bubbles sized by customer count"
        className="mx-auto h-auto w-full max-w-md"
      >
        {SEGMENTS.map((s, i) => {
          const r = radius(s.customers);
          const isActive = activeId === s.id;
          const label = `${s.name}: ${fmt(s.customers)} customers, ${s.churn}% churn, R$${s.spend} average spend`;
          return (
            <g
              key={s.id}
              role="button"
              tabIndex={0}
              aria-label={label}
              aria-pressed={pinned === s.id}
              className="cursor-pointer outline-none"
              onMouseEnter={() => setHovered(s.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(s.id)}
              onBlur={() => setHovered(null)}
              onClick={() => toggle(s.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle(s.id);
                }
              }}
            >
              {/* enlarged invisible hit area so small bubbles are easy to tap */}
              <circle cx={s.cx} cy={s.cy} r={Math.max(r, MIN_HIT)} fill="transparent" />
              <motion.circle
                cx={s.cx}
                cy={s.cy}
                r={r}
                fill="var(--accent)"
                fillOpacity={isActive ? 0.4 : 0.18}
                stroke="var(--accent)"
                strokeWidth={isActive ? 3 : 1.5}
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
                initial={reduce ? false : { scale: 0, opacity: 0 }}
                whileInView={reduce ? undefined : { scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              />
              {isActive && (
                <circle
                  cx={s.cx}
                  cy={s.cy}
                  r={r + 6}
                  fill="none"
                  stroke="var(--foreground)"
                  strokeWidth={1.5}
                  strokeDasharray="3 4"
                />
              )}
              {r >= INSIDE_MIN_R ? (
                <text
                  x={s.cx}
                  y={s.cy + 5}
                  textAnchor="middle"
                  fontSize={16}
                  fill="var(--foreground)"
                  className="pointer-events-none font-display"
                >
                  {s.label}
                </text>
              ) : (
                "lx" in s && (
                  <>
                    <line
                      x1={s.sx}
                      y1={s.sy}
                      x2={s.cx + (r * (s.sx - s.cx)) / Math.hypot(s.sx - s.cx, s.sy - s.cy)}
                      y2={s.cy + (r * (s.sy - s.cy)) / Math.hypot(s.sx - s.cx, s.sy - s.cy)}
                      stroke="var(--muted)"
                      strokeWidth={1}
                    />
                    <text
                      x={s.lx}
                      y={s.ly}
                      textAnchor={s.anchor}
                      fontSize={16}
                      fill={isActive ? "var(--accent)" : "var(--foreground)"}
                      className="font-display"
                    >
                      {s.label}
                    </text>
                  </>
                )
              )}
            </g>
          );
        })}
      </svg>

      {/* Buttons duplicate the bubbles as large tap targets and carry the labels for the small bubbles */}
      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Select a segment">
        {SEGMENTS.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={pinned === s.id}
            onClick={() => toggle(s.id)}
            onMouseEnter={() => setHovered(s.id)}
            onMouseLeave={() => setHovered(null)}
            className={`min-h-11 rounded-full border px-3 py-1 font-mono text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${
              activeId === s.id
                ? "border-accent text-accent"
                : "border-border text-muted hover:border-accent/60"
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div
        aria-live="polite"
        className="min-h-24 rounded-lg border border-border bg-surface p-4"
      >
        {active ? (
          <dl className="grid grid-cols-3 gap-3 text-sm">
            <div className="col-span-3 font-display text-base font-semibold text-foreground">
              {active.name}
            </div>
            <div>
              <dt className="font-mono text-xs uppercase text-muted">Customers</dt>
              <dd className="text-foreground">{fmt(active.customers)}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase text-muted">Churn rate</dt>
              <dd className="text-foreground">{active.churn}%</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase text-muted">Avg spend</dt>
              <dd className="text-foreground">R${active.spend}</dd>
            </div>
          </dl>
        ) : (
          <p className="text-sm text-muted">Select a segment to see its details.</p>
        )}
      </div>

      <p className="text-sm text-muted">
        Churn = no purchase in the last 180 days. Segments are RFM score bands,
        so low-recency segments show very high churn.
      </p>

      <table className="sr-only">
        <caption>Customer segments: customer count, churn rate and average spend</caption>
        <thead>
          <tr>
            <th scope="col">Segment</th>
            <th scope="col">Customers</th>
            <th scope="col">Churn rate</th>
            <th scope="col">Average spend</th>
          </tr>
        </thead>
        <tbody>
          {SEGMENTS.map((s) => (
            <tr key={s.id}>
              <th scope="row">{s.name}</th>
              <td>{fmt(s.customers)}</td>
              <td>{s.churn}%</td>
              <td>R${s.spend}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
