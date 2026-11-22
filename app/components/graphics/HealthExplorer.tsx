"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  HEALTH_COUNTRIES,
  HEALTH_REGIONS,
  HEALTH_TREND,
  HEALTH_TREND_YEARS,
  HEALTH_U5_MEDIANS,
  type HealthCountry,
} from "../../lib/healthData";

// Source: World Bank indicators (Kaggle), 2019; project R analysis. Every number
// below comes from app/lib/healthData.ts. The only derived values are the
// straight-line fit and r, computed from those same 145 countries.

const TABS = [
  { id: "spend", label: "Spending vs life expectancy" },
  { id: "trend", label: "Progress since 2000" },
  { id: "u5", label: "Child mortality" },
] as const;
type TabId = (typeof TABS)[number]["id"];

const ACCENT = "var(--accent)";
const MUTED = "var(--muted)";
const fmt1 = (n: number) => n.toFixed(1);

// ---------- straight-line fit (computed once from the data) ----------
const FIT = (() => {
  const n = HEALTH_COUNTRIES.length;
  const mx = HEALTH_COUNTRIES.reduce((s, c) => s + c.spend, 0) / n;
  const my = HEALTH_COUNTRIES.reduce((s, c) => s + c.life, 0) / n;
  let sxy = 0, sxx = 0, syy = 0;
  for (const c of HEALTH_COUNTRIES) {
    sxy += (c.spend - mx) * (c.life - my);
    sxx += (c.spend - mx) ** 2;
    syy += (c.life - my) ** 2;
  }
  return { r: sxy / Math.sqrt(sxx * syy), slope: sxy / sxx, intercept: my - (sxy / sxx) * mx };
})();

const BY_NAME = [...HEALTH_COUNTRIES].sort((a, b) => a.name.localeCompare(b.name));
const BY_SPEND = [...HEALTH_COUNTRIES].sort((a, b) => a.spend - b.spend || a.name.localeCompare(b.name));
const ANNOTATED: Record<string, { dx: number; dy: number; anchor: "start" | "end"; leader?: boolean }> = {
  TUV: { dx: -9, dy: -9, anchor: "end" },
  USA: { dx: -9, dy: -9, anchor: "end" },
  QAT: { dx: -4, dy: -26, anchor: "start", leader: true },
};

const X_MIN = 1.5, X_MAX = 23.5, Y_MIN = 50, Y_MAX = 86;
const DOT_R = 6;
const HIT = 18; // px: pointer picks the nearest dot within this distance

// Measures an element's width so SVG geometry can be drawn in real pixels
// (keeps dot radius a true 6px at every screen size).
function useWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(320);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.max(240, Math.floor(e.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, w] as const;
}

function Chip({
  on,
  onClick,
  children,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`min-h-11 rounded-full border px-3.5 py-2 text-sm motion-safe:transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground ${
        on
          ? "border-accent bg-accent font-semibold text-background"
          : "border-border bg-surface text-foreground hover:border-muted"
      }`}
    >
      {children}
    </button>
  );
}

// ======================= TAB 1: spending vs life expectancy =======================
function SpendTab() {
  const reduce = useReducedMotion();
  const [box, W] = useWidth();
  const [region, setRegion] = useState<string>("All");
  const [pinned, setPinned] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const dotRefs = useRef<Record<string, SVGCircleElement | null>>({});

  const H = W < 480 ? 330 : 390;
  const pad = { l: 40, r: 14, t: 26, b: 44 };
  const pw = W - pad.l - pad.r;
  const ph = H - pad.t - pad.b;
  const xs = (v: number) => pad.l + ((v - X_MIN) / (X_MAX - X_MIN)) * pw;
  const ys = (v: number) => pad.t + ((Y_MAX - v) / (Y_MAX - Y_MIN)) * ph;

  const inRegion = (c: HealthCountry) => region === "All" || c.region === region;
  const visible = useMemo(() => BY_SPEND.filter(inRegion), [region]); // eslint-disable-line react-hooks/exhaustive-deps
  const activeCode = hovered ?? pinned;
  const active = HEALTH_COUNTRIES.find((c) => c.code === activeCode) ?? null;
  const tabStop = visible.find((c) => c.code === activeCode)?.code ?? visible[0]?.code;

  const dim = region !== "All";
  const ordered = [...HEALTH_COUNTRIES].sort((a, b) => Number(inRegion(a)) - Number(inRegion(b)));

  function pick(e: React.PointerEvent | React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left, py = e.clientY - rect.top;
    let best: string | null = null, bd = HIT;
    for (const c of visible) {
      const d = Math.hypot(xs(c.spend) - px, ys(c.life) - py);
      if (d < bd) { bd = d; best = c.code; }
    }
    return best;
  }

  function onDotKey(e: React.KeyboardEvent, code: string) {
    const i = visible.findIndex((c) => c.code === code);
    let j = i;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") j = Math.min(i + 1, visible.length - 1);
    else if (e.key === "ArrowLeft" || e.key === "ArrowDown") j = Math.max(i - 1, 0);
    else if (e.key === "Home") j = 0;
    else if (e.key === "End") j = visible.length - 1;
    else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setPinned((p) => (p === code ? null : code));
      return;
    } else return;
    e.preventDefault();
    dotRefs.current[visible[j].code]?.focus();
  }

  const fitA = { x: 2.17, y: FIT.intercept + FIT.slope * 2.17 };
  const fitB = { x: 22.41, y: FIT.intercept + FIT.slope * 22.41 };
  const fitLabel = `Straight-line fit (r = ${FIT.r.toFixed(2)})`;

  return (
    <div className="flex flex-col gap-4">
      <div role="group" aria-label="Filter by region" className="flex flex-wrap gap-2">
        {["All", ...HEALTH_REGIONS].map((r) => (
          <Chip key={r} on={region === r} onClick={() => setRegion(r)}>
            {r}
          </Chip>
        ))}
      </div>

      <div ref={box} className="rounded-lg border border-border bg-surface p-2 sm:p-3">
        <svg
          width={W - 0}
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          role="group"
          aria-label="Scatter plot of 145 countries: health spending as a share of GDP against life expectancy in 2019. Use the country list below the chart, or arrow keys on a dot, to move between countries."
          className="block max-w-full touch-pan-y select-none"
          onPointerMove={(e) => setHovered(pick(e))}
          onPointerLeave={() => setHovered(null)}
          onClick={(e) => {
            const c = pick(e);
            if (c) setPinned((p) => (p === c ? null : c));
          }}
        >
          {/* grid + axes */}
          {[60, 70, 80].map((v) => (
            <line key={v} x1={pad.l} x2={W - pad.r} y1={ys(v)} y2={ys(v)} stroke="var(--border)" />
          ))}
          <line x1={pad.l} x2={W - pad.r} y1={ys(Y_MIN)} y2={ys(Y_MIN)} stroke={MUTED} />
          {[50, 60, 70, 80].map((v) => (
            <text key={v} x={pad.l - 6} y={ys(v) + 4} textAnchor="end" fontSize={12} fill={MUTED} className="font-mono">
              {v}
            </text>
          ))}
          {[5, 10, 15, 20].map((v) => (
            <text key={v} x={xs(v)} y={ys(Y_MIN) + 16} textAnchor="middle" fontSize={12} fill={MUTED} className="font-mono">
              {v}
            </text>
          ))}
          <text x={pad.l} y={14} fontSize={12} fill={MUTED}>
            Life expectancy (years)
          </text>
          <text x={pad.l + pw / 2} y={H - 6} textAnchor="middle" fontSize={12} fill={MUTED}>
            Health spending (% of GDP)
          </text>

          {/* straight-line fit */}
          <line
            x1={xs(fitA.x)}
            y1={ys(fitA.y)}
            x2={xs(fitB.x)}
            y2={ys(fitB.y)}
            stroke="var(--foreground)"
            strokeOpacity={0.7}
            strokeWidth={1.5}
            strokeDasharray="5 5"
          />
          <text
            x={W - pad.r}
            y={ys(85.2)}
            textAnchor="end"
            fontSize={12}
            fill="var(--foreground)"
            stroke="var(--surface)"
            strokeWidth={3}
            paintOrder="stroke"
          >
            {fitLabel}
          </text>

          {/* dots */}
          <g role="group" aria-label="Countries, ordered by health spending">
            {ordered.map((c) => {
              const on = inRegion(c);
              const isActive = c.code === activeCode;
              return (
                <circle
                  key={c.code}
                  ref={(el) => {
                    dotRefs.current[c.code] = el;
                  }}
                  cx={xs(c.spend)}
                  cy={ys(c.life)}
                  r={DOT_R}
                  fill={on ? ACCENT : MUTED}
                  fillOpacity={isActive ? 1 : on ? (dim ? 0.9 : 0.6) : 0.7}
                  role="button"
                  tabIndex={on && c.code === tabStop ? 0 : -1}
                  aria-label={`${c.name}: ${c.spend}% of GDP, life expectancy ${c.life} years`}
                  aria-pressed={pinned === c.code}
                  onFocus={() => setHovered(c.code)}
                  onBlur={() => setHovered(null)}
                  onKeyDown={(e) => onDotKey(e, c.code)}
                  className={`outline-none ${reduce ? "" : "transition-[fill-opacity] duration-200"}`}
                  style={{ pointerEvents: "none" }}
                />
              );
            })}
          </g>

          {/* annotations */}
          {HEALTH_COUNTRIES.filter((c) => c.code in ANNOTATED).map((c) => {
            const a = ANNOTATED[c.code];
            const cx = xs(c.spend), cy = ys(c.life);
            return (
              <g key={c.code} pointerEvents="none">
                {a.leader && (
                  <line x1={cx} y1={cy} x2={cx + a.dx} y2={cy + a.dy + 4} stroke="var(--foreground)" strokeWidth={1} />
                )}
                <circle cx={cx} cy={cy} r={DOT_R + 2} fill="none" stroke="var(--foreground)" strokeWidth={1.5} />
                <text
                  x={cx + a.dx}
                  y={cy + a.dy}
                  textAnchor={a.anchor}
                  fontSize={12}
                  fill="var(--foreground)"
                  stroke="var(--surface)"
                  strokeWidth={3}
                  paintOrder="stroke"
                >
                  {c.name}
                </text>
              </g>
            );
          })}

          {/* active ring, drawn last so nothing covers it */}
          {active && (
            <g pointerEvents="none" fill="none">
              <circle cx={xs(active.spend)} cy={ys(active.life)} r={DOT_R + 5} stroke="var(--surface)" strokeWidth={4} />
              <circle cx={xs(active.spend)} cy={ys(active.life)} r={DOT_R + 5} stroke="var(--foreground)" strokeWidth={2} />
            </g>
          )}
        </svg>
      </div>

      <p className="text-sm text-muted">
        Each dot is one country in 2019. The dashed line is a straight-line fit across all 145.
      </p>

      <div className="grid gap-4 sm:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col gap-2">
          <label htmlFor="health-find" className="font-mono text-xs uppercase tracking-wide text-muted">
            Find a country
          </label>
          <select
            id="health-find"
            value={pinned ?? ""}
            onChange={(e) => setPinned(e.target.value || null)}
            className="min-h-11 rounded-lg border border-border bg-surface px-3 text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            <option value="">Choose a country</option>
            {BY_NAME.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div aria-live="polite" className="min-h-[9.5rem] rounded-lg border border-border bg-surface p-4">
          {active ? (
            <>
              <p className="font-display text-lg font-semibold text-foreground">{active.name}</p>
              <p className="text-sm text-muted">{active.region}</p>
              <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div>
                  <dt className="text-muted">Health spending</dt>
                  <dd className="font-mono text-foreground">{active.spend}% of GDP</dd>
                </div>
                <div>
                  <dt className="text-muted">Life expectancy</dt>
                  <dd className="font-mono text-foreground">{active.life} years</dd>
                </div>
                {active.u5 !== null && (
                  <div>
                    <dt className="text-muted">Under-5 mortality</dt>
                    <dd className="font-mono text-foreground">{active.u5} per 1,000</dd>
                  </div>
                )}
                {active.mm !== null && (
                  <div>
                    <dt className="text-muted">Maternal mortality</dt>
                    <dd className="font-mono text-foreground">{active.mm} per 100,000</dd>
                  </div>
                )}
              </dl>
            </>
          ) : (
            <p className="text-sm text-muted">
              Hover, tap or focus a dot, or pick a country from the list, to see its figures.
            </p>
          )}
        </div>
      </div>

      <div className="rounded-lg border border-border bg-surface p-4">
        <h3 className="font-mono text-xs uppercase text-muted">Takeaway</h3>
        <p className="mt-2 text-foreground">
          Spending share of GDP explains little on its own: r = 0.29 across 145 countries. Among the
          34 countries spending 5-7% of GDP, life expectancy ranges from 60 (Burkina Faso) to 83
          (Ireland). The data has % of GDP, not dollars per person.
        </p>
      </div>
    </div>
  );
}

// ======================= TAB 2: progress since 2000 =======================
const SHORT: Record<string, string> = { "North America": "N. America", "South America": "S. America" };

function TrendTab() {
  const reduce = useReducedMotion();
  const [box, W] = useWidth();
  const [sel, setSel] = useState<string>("Africa");

  const H = W < 480 ? 300 : 340;
  const pad = { l: 34, r: W < 480 ? 74 : 96, t: 14, b: 30 };
  const pw = W - pad.l - pad.r;
  const ph = H - pad.t - pad.b;
  const y0 = HEALTH_TREND_YEARS[0], y1 = HEALTH_TREND_YEARS[HEALTH_TREND_YEARS.length - 1];
  const xs = (yr: number) => pad.l + ((yr - y0) / (y1 - y0)) * pw;
  const ys = (v: number) => pad.t + ((85 - v) / (85 - 50)) * ph;

  const regions = [...HEALTH_REGIONS];
  const series = HEALTH_TREND[sel];
  const delta = series[series.length - 1] - series[0];

  // end labels, nudged apart so they never overlap
  const labels = regions
    .map((r) => ({ r, y: ys(HEALTH_TREND[r][HEALTH_TREND_YEARS.length - 1]) }))
    .sort((a, b) => a.y - b.y);
  const GAP = 14;
  for (let i = 1; i < labels.length; i++) if (labels[i].y - labels[i - 1].y < GAP) labels[i].y = labels[i - 1].y + GAP;

  return (
    <div className="flex flex-col gap-4">
      <div role="group" aria-label="Highlight a region" className="flex flex-wrap gap-2">
        {regions.map((r) => (
          <Chip key={r} on={sel === r} onClick={() => setSel(r)}>
            {r}
          </Chip>
        ))}
      </div>

      <div ref={box} className="rounded-lg border border-border bg-surface p-2 sm:p-3">
        <p aria-live="polite" className="px-1 pb-2 font-mono text-sm text-foreground">
          {sel}: {fmt1(series[0])} to {fmt1(series[series.length - 1])} years ({delta >= 0 ? "+" : ""}
          {fmt1(delta)})
        </p>
        <svg
          width={W}
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={`Average life expectancy by region, 2000 to 2019. ${sel} is highlighted: ${fmt1(series[0])} to ${fmt1(series[series.length - 1])} years.`}
          className="block max-w-full"
        >
          {[60, 70, 80].map((v) => (
            <line key={v} x1={pad.l} x2={pad.l + pw} y1={ys(v)} y2={ys(v)} stroke="var(--border)" />
          ))}
          <line x1={pad.l} x2={pad.l + pw} y1={ys(50)} y2={ys(50)} stroke={MUTED} />
          {[50, 60, 70, 80].map((v) => (
            <text key={v} x={pad.l - 6} y={ys(v) + 4} textAnchor="end" fontSize={12} fill={MUTED} className="font-mono">
              {v}
            </text>
          ))}
          {HEALTH_TREND_YEARS.map((yr) => (
            <text key={yr} x={xs(yr)} y={H - 8} textAnchor={yr === y1 ? "end" : yr === y0 ? "start" : "middle"} fontSize={12} fill={MUTED} className="font-mono">
              {yr}
            </text>
          ))}

          {[...regions].sort((a, b) => Number(a === sel) - Number(b === sel)).map((r) => {
            const on = r === sel;
            const pts = HEALTH_TREND[r].map((v, i) => `${xs(HEALTH_TREND_YEARS[i])},${ys(v)}`).join(" ");
            return (
              <g key={r}>
                <polyline
                  points={pts}
                  fill="none"
                  stroke={on ? ACCENT : MUTED}
                  strokeOpacity={on ? 1 : 0.7}
                  strokeWidth={on ? 3.5 : 1.75}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  className={reduce ? "" : "transition-[stroke-opacity,stroke-width] duration-200"}
                />
                {on &&
                  HEALTH_TREND[r].map((v, i) => (
                    <circle key={i} cx={xs(HEALTH_TREND_YEARS[i])} cy={ys(v)} r={4.5} fill={ACCENT} stroke="var(--surface)" strokeWidth={1.5} />
                  ))}
              </g>
            );
          })}

          {labels.map((l) => (
            <text
              key={l.r}
              x={xs(y1) + 10}
              y={l.y + 4}
              fontSize={12}
              fill={l.r === sel ? ACCENT : MUTED}
              fontWeight={l.r === sel ? 700 : 400}
            >
              {W < 480 ? SHORT[l.r] ?? l.r : l.r}
            </text>
          ))}
        </svg>
        <p className="px-1 pt-2 text-sm text-muted">Region averages are unweighted country means.</p>
      </div>
    </div>
  );
}

// ======================= TAB 3: child mortality =======================
function U5Tab() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "-40px" });
  const rows = [...HEALTH_U5_MEDIANS].sort((a, b) => b.median - a.median);
  const MAX = 60; // fixed axis so bars are comparable at a glance

  return (
    <div className="flex flex-col gap-4">
      <div ref={ref} className="rounded-lg border border-border bg-surface p-4">
        <p className="text-sm text-muted">
          Median under-5 deaths per 1,000 live births, by region (2019).
        </p>
        <ul className="mt-4 flex flex-col gap-4">
          {rows.map((r, i) => (
            <li key={r.region}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 text-sm">
                <span className="text-foreground">{r.region}</span>
                <span className="font-mono text-foreground">
                  {r.median}
                  <span className="text-muted"> · n = {r.n} {r.n === 1 ? "country" : "countries"}</span>
                </span>
              </div>
              <div className="mt-1 h-3 w-full rounded-sm bg-background">
                <motion.div
                  className="h-3 rounded-sm"
                  style={{ background: ACCENT }}
                  initial={{ width: reduce ? `${(r.median / MAX) * 100}%` : "0%" }}
                  animate={{ width: reduce || seen ? `${(r.median / MAX) * 100}%` : "0%" }}
                  transition={reduce ? { duration: 0 } : { duration: 0.6, ease: "easeOut", delay: i * 0.08 }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg border border-border bg-surface p-4">
        <h3 className="font-mono text-xs uppercase text-muted">Takeaway</h3>
        <p className="mt-2 text-foreground">
          Africa&apos;s median (55.6) is about 9x North America&apos;s (6.5) and 15x Europe&apos;s (3.8).
          North America here is only 3 countries (USA, Canada, Mexico).
        </p>
      </div>
    </div>
  );
}

// ======================= shell =======================
export default function HealthExplorer() {
  const [tab, setTab] = useState<TabId>("spend");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  function onTabKey(e: React.KeyboardEvent, i: number) {
    let j = i;
    if (e.key === "ArrowRight") j = (i + 1) % TABS.length;
    else if (e.key === "ArrowLeft") j = (i - 1 + TABS.length) % TABS.length;
    else if (e.key === "Home") j = 0;
    else if (e.key === "End") j = TABS.length - 1;
    else return;
    e.preventDefault();
    setTab(TABS[j].id);
    tabRefs.current[TABS[j].id]?.focus();
  }

  return (
    <div className="flex flex-col gap-5">
      <div role="tablist" aria-label="Global health views" className="flex flex-wrap gap-x-5 gap-y-1 border-b border-border">
        {TABS.map((t, i) => {
          const on = tab === t.id;
          return (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[t.id] = el;
              }}
              type="button"
              role="tab"
              id={`health-tab-${t.id}`}
              aria-selected={on}
              aria-controls={`health-panel-${t.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setTab(t.id)}
              onKeyDown={(e) => onTabKey(e, i)}
              className={`-mb-px min-h-11 border-b-2 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground ${
                on
                  ? "border-accent font-semibold text-foreground"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`health-panel-${tab}`}
        aria-labelledby={`health-tab-${tab}`}
        // Measured height of the tallest tab (scatter) so switching tabs never moves
        // the page: 1062px @375, 986 @414, 962 @480, 978 @600, 902 @640, 826 @768+.
        className="min-h-[66.375rem] min-[400px]:min-h-[61.625rem] min-[480px]:min-h-[60.125rem] min-[560px]:min-h-[61.125rem] sm:min-h-[56.375rem] min-[700px]:min-h-[53.5rem] md:min-h-[51.625rem]"
      >
        {tab === "spend" && <SpendTab />}
        {tab === "trend" && <TrendTab />}
        {tab === "u5" && <U5Tab />}
      </div>

      {/* hidden accessible tables: every number in all three views */}
      <div className="sr-only">
        <table>
          <caption>Health spending, life expectancy and mortality by country, 2019 (145 countries)</caption>
          <thead>
            <tr>
              <th scope="col">Country</th>
              <th scope="col">Region</th>
              <th scope="col">Health spending (% of GDP)</th>
              <th scope="col">Life expectancy (years)</th>
              <th scope="col">Under-5 mortality (per 1,000)</th>
              <th scope="col">Maternal mortality (per 100,000)</th>
            </tr>
          </thead>
          <tbody>
            {BY_NAME.map((c) => (
              <tr key={c.code}>
                <th scope="row">{c.name}</th>
                <td>{c.region}</td>
                <td>{c.spend}</td>
                <td>{c.life}</td>
                <td>{c.u5 ?? "not available"}</td>
                <td>{c.mm ?? "not available"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table>
          <caption>Average life expectancy by region (unweighted country means)</caption>
          <thead>
            <tr>
              <th scope="col">Region</th>
              {HEALTH_TREND_YEARS.map((y) => (
                <th key={y} scope="col">{y}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HEALTH_REGIONS.map((r) => (
              <tr key={r}>
                <th scope="row">{r}</th>
                {HEALTH_TREND[r].map((v, i) => (
                  <td key={i}>{fmt1(v)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <table>
          <caption>Median under-5 mortality per 1,000 by region, 2019</caption>
          <thead>
            <tr>
              <th scope="col">Region</th>
              <th scope="col">Median</th>
              <th scope="col">Countries</th>
            </tr>
          </thead>
          <tbody>
            {[...HEALTH_U5_MEDIANS].sort((a, b) => b.median - a.median).map((r) => (
              <tr key={r.region}>
                <th scope="row">{r.region}</th>
                <td>{r.median}</td>
                <td>{r.n}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
