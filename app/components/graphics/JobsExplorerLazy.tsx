"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// Same pattern as the other explorers: code downloads once this block is within
// 400px of the viewport; until then a placeholder holds the measured height, and
// its line doubles as the no-JS fallback.
const JobsExplorer = dynamic(() => import("./JobsExplorer"), {
  ssr: false,
  loading: () => <Placeholder />,
});

export const JOBS_STATIC_LINE =
  "SQL appears in 46% of the 12,217 postings analysed (67% of data analyst postings).";

function Placeholder() {
  return (
    // Same measured heights as JobsExplorer's root, so nothing moves when it loads.
    <div className="min-h-[85.625rem] min-[400px]:min-h-[75.375rem] min-[480px]:min-h-[66.75rem] min-[760px]:min-h-[59.625rem]">
      <p className="text-sm text-muted">{JOBS_STATIC_LINE}</p>
    </div>
  );
}

export default function JobsExplorerLazy() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      const t = setTimeout(() => setShow(true), 0);
      return () => clearTimeout(t);
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={ref}>{show ? <JobsExplorer /> : <Placeholder />}</div>;
}
