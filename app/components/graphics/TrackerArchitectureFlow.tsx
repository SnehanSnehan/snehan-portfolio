"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Source: project README. Facts only; no metrics.

type NodeId = "browser" | "nginx" | "express" | "mvc" | "atlas" | "remoteok" | "restcountries";
type TargetId = "browser" | "nginx" | "helmet" | "morgan" | "cors" | "jwt" | "controller" | "model" | "atlas";

const NODES: Record<
  NodeId,
  { title: string; sub: string; does: string; pattern?: string }
> = {
  browser: {
    title: "Browser",
    sub: "React (Vite)",
    does: "The front end: React (Vite) with React Router, Recharts and Axios.",
    pattern: "Observer: React Context holds the auth state.",
  },
  nginx: {
    title: "nginx",
    sub: "Docker container",
    does: "A Docker container that serves the built React app.",
  },
  express: {
    title: "Express API",
    sub: "Middleware chain",
    does: "Every request passes through a middleware chain: helmet, morgan, cors, JWT auth, then an admin guard on admin routes only.",
    pattern: "Middleware Chain.",
  },
  mvc: {
    title: "Controllers + models",
    sub: "MVC, Repository",
    does: "Controllers handle the request and work with Mongoose models.",
    pattern: "MVC and Repository.",
  },
  atlas: {
    title: "MongoDB Atlas",
    sub: "Free tier",
    does: "The database, hosted on MongoDB Atlas (free tier).",
    pattern: "Singleton: one connection is reused across requests.",
  },
  remoteok: {
    title: "RemoteOK API",
    sub: "External",
    does: "External API that supplies live remote job listings to the Express API.",
  },
  restcountries: {
    title: "RestCountries API",
    sub: "External",
    does: "External API behind the location dropdown, reached through the Express API.",
  },
};

const MIDDLEWARE: { id: TargetId; label: string }[] = [
  { id: "helmet", label: "helmet" },
  { id: "morgan", label: "morgan" },
  { id: "cors", label: "cors" },
  { id: "jwt", label: "JWT auth" },
];

const STEPS: { node: NodeId; target: TargetId; caption: string }[] = [
  { node: "browser", target: "browser", caption: "The React app sends POST /api/jobs/:id/notes." },
  { node: "nginx", target: "nginx", caption: "The request passes the nginx container." },
  { node: "express", target: "helmet", caption: "Express middleware: helmet comes first." },
  { node: "express", target: "morgan", caption: "Then morgan." },
  { node: "express", target: "cors", caption: "Then cors." },
  { node: "express", target: "jwt", caption: "Then JWT auth. The admin guard applies to admin routes only, so it is not on this path." },
  { node: "mvc", target: "controller", caption: "A controller handles the add-note request." },
  { node: "mvc", target: "model", caption: "The Mongoose model saves the note." },
  { node: "atlas", target: "atlas", caption: "MongoDB Atlas stores it, over the single reused connection." },
  { node: "atlas", target: "atlas", caption: "Return trip: Atlas replies." },
  { node: "mvc", target: "model", caption: "The reply comes back through the model." },
  { node: "mvc", target: "controller", caption: "The controller sends the response." },
  { node: "nginx", target: "nginx", caption: "The response passes back through nginx." },
  { node: "browser", target: "browser", caption: "The browser receives the response." },
];

const STEP_MS = 1200;

function Packet({ reduce }: { reduce: boolean }) {
  return (
    <motion.span
      layoutId="request-packet"
      aria-hidden="true"
      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 26 }}
      className="absolute -right-1 -top-1 z-10 h-3 w-3 rounded-full bg-accent shadow-[0_0_10px_2px_rgba(232,163,61,0.6)]"
    />
  );
}

export default function TrackerArchitectureFlow() {
  const reduce = !!useReducedMotion();
  const [pinned, setPinned] = useState<NodeId | null>(null);
  const [hovered, setHovered] = useState<NodeId | null>(null);
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);

  const activeId = hovered ?? pinned;
  const active = activeId ? NODES[activeId] : null;
  const current = step >= 0 ? STEPS[step] : null;
  const last = STEPS.length - 1;

  useEffect(() => {
    if (!playing) return;
    if (step >= last) {
      setPlaying(false);
      return;
    }
    const t = setTimeout(() => setStep((s) => s + 1), STEP_MS);
    return () => clearTimeout(t);
  }, [playing, step, last]);

  function onFollow() {
    if (reduce) {
      setStep((s) => (s >= last ? 0 : s + 1));
      return;
    }
    if (playing) return;
    setStep(0);
    setPlaying(true);
  }

  const buttonLabel = reduce
    ? step < 0
      ? "Follow a request"
      : step >= last
        ? "Start over"
        : "Next step"
    : playing
      ? "Following..."
      : step >= last
        ? "Replay"
        : "Follow a request";

  function nodeButton(id: NodeId, extra = "") {
    const n = NODES[id];
    const lit = current?.node === id;
    const sel = activeId === id;
    return (
      <button
        type="button"
        aria-pressed={pinned === id}
        onClick={() => setPinned((p) => (p === id ? null : id))}
        onMouseEnter={() => setHovered(id)}
        onMouseLeave={() => setHovered(null)}
        onFocus={() => setHovered(id)}
        onBlur={() => setHovered(null)}
        className={`relative flex min-h-11 w-full flex-col items-start rounded-lg border p-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${
          lit || sel ? "border-accent bg-accent/15" : "border-border bg-surface hover:border-accent/60"
        } ${extra}`}
      >
        <span className="font-display text-sm font-semibold text-foreground">{n.title}</span>
        <span className="font-mono text-xs text-muted">{n.sub}</span>
        {current?.target === id && <Packet reduce={reduce} />}
      </button>
    );
  }

  function chip(id: TargetId, label: string) {
    const lit = current?.target === id;
    return (
      <span
        className={`relative inline-block rounded-md border px-2 py-1 font-mono text-xs ${
          lit ? "border-accent bg-accent/20 text-foreground" : "border-border text-muted"
        }`}
      >
        {label}
        {lit && <Packet reduce={reduce} />}
      </span>
    );
  }

  const arrow = (
    <div aria-hidden="true" className="flex items-center justify-center font-mono text-sm text-muted">
      <span className="md:hidden">↓</span>
      <span className="hidden md:inline">→</span>
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted">
        Hover, tap, or focus a node to see what it does and which design pattern it
        shows. Use the button to follow one request through the system.
      </p>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1.5fr)_auto_minmax(0,1.3fr)_auto_minmax(0,1.1fr)] md:items-start">
        {nodeButton("browser")}
        {arrow}
        {nodeButton("nginx")}
        {arrow}

        <div className="flex flex-col gap-2">
          <div
            className={`rounded-lg border p-3 transition-colors ${
              current?.node === "express" || activeId === "express"
                ? "border-accent bg-accent/15"
                : "border-border bg-surface"
            }`}
          >
            <button
              type="button"
              aria-pressed={pinned === "express"}
              onClick={() => setPinned((p) => (p === "express" ? null : "express"))}
              onMouseEnter={() => setHovered("express")}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered("express")}
              onBlur={() => setHovered(null)}
              className="flex min-h-11 w-full flex-col items-start rounded text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              <span className="font-display text-sm font-semibold text-foreground">
                {NODES.express.title}
              </span>
              <span className="font-mono text-xs text-muted">{NODES.express.sub}</span>
            </button>
            <ol aria-label="Middleware chain" className="mt-2 flex flex-col items-start gap-1">
              {MIDDLEWARE.map((m) => (
                <li key={m.id}>{chip(m.id, m.label)}</li>
              ))}
              <li className="font-mono text-xs text-muted">admin guard (admin routes only)</li>
            </ol>
          </div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
            {nodeButton("remoteok")}
            {nodeButton("restcountries")}
          </div>
        </div>

        {arrow}

        <div
          className={`rounded-lg border p-3 transition-colors ${
            current?.node === "mvc" || activeId === "mvc"
              ? "border-accent bg-accent/15"
              : "border-border bg-surface"
          }`}
        >
          <button
            type="button"
            aria-pressed={pinned === "mvc"}
            onClick={() => setPinned((p) => (p === "mvc" ? null : "mvc"))}
            onMouseEnter={() => setHovered("mvc")}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered("mvc")}
            onBlur={() => setHovered(null)}
            className="flex min-h-11 w-full flex-col items-start rounded text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            <span className="font-display text-sm font-semibold text-foreground">
              {NODES.mvc.title}
            </span>
            <span className="font-mono text-xs text-muted">{NODES.mvc.sub}</span>
          </button>
          <div className="mt-2 flex flex-wrap gap-1">
            {chip("controller", "Controllers")}
            {chip("model", "Mongoose models")}
          </div>
        </div>

        {arrow}
        {nodeButton("atlas")}
      </div>

      <div className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-foreground">
            Request: add a note to an application{" "}
            <span className="font-mono text-xs text-muted">POST /api/jobs/:id/notes</span>
          </p>
          <button
            type="button"
            onClick={onFollow}
            aria-disabled={playing}
            className="min-h-11 rounded-md bg-accent px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent aria-disabled:opacity-60"
          >
            {buttonLabel}
          </button>
        </div>
        <p aria-live="polite" className="min-h-10 text-sm text-muted">
          {current ? `Step ${step + 1} of ${STEPS.length}: ${current.caption}` : "Press the button to start."}
        </p>
      </div>

      <div aria-live="polite" className="min-h-24 rounded-lg border border-border bg-surface p-4">
        {active ? (
          <dl className="grid gap-2 text-sm">
            <div className="font-display text-base font-semibold text-foreground">{active.title}</div>
            <div>
              <dt className="font-mono text-xs uppercase text-muted">What it does</dt>
              <dd className="text-foreground">{active.does}</dd>
            </div>
            {active.pattern && (
              <div>
                <dt className="font-mono text-xs uppercase text-muted">Design pattern</dt>
                <dd className="text-foreground">{active.pattern}</dd>
              </div>
            )}
          </dl>
        ) : (
          <p className="text-sm text-muted">Select a node to see its details.</p>
        )}
      </div>

      <p className="text-sm text-muted">
        Runs in Docker Compose; GitLab CI pipeline. Backend Lead and Team Lead of 3.
      </p>

      <div className="sr-only">
        <h3>Architecture, in request order</h3>
        <ul>
          {(Object.keys(NODES) as NodeId[]).map((id) => (
            <li key={id}>
              {NODES[id].title}: {NODES[id].does}
              {NODES[id].pattern ? ` Pattern: ${NODES[id].pattern}` : ""}
            </li>
          ))}
        </ul>
        <h3>Request: add a note to an application (POST /api/jobs/:id/notes)</h3>
        <ol>
          {STEPS.map((s, i) => (
            <li key={i}>{s.caption}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
