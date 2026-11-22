"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// Same pattern as the Karnataka map: the explorer code only downloads once this
// block is within 400px of the viewport. Until then a placeholder holds its
// measured height (so nothing below moves), and its line doubles as the no-JS
// fallback.
const IronmanExplorer = dynamic(() => import("./IronmanExplorer"), {
  ssr: false,
  loading: () => <Placeholder />,
});

export const IRONMAN_STATIC_LINE =
  "On average, finishers spent about 1h19 swimming, 6h54 cycling and 4h59 running.";

function Placeholder() {
  return (
    // Measured heights of the loaded explorer: 1394px @375, 1374px @414,
    // 1224px @480, 1180px @600, 1122px @695-768+ (text wraps differently as it narrows).
    <div className="min-h-[87.125rem] min-[400px]:min-h-[85.875rem] min-[480px]:min-h-[76.5rem] min-[560px]:min-h-[73.75rem] sm:min-h-[70.125rem]">
      <p className="text-sm text-muted">{IRONMAN_STATIC_LINE}</p>
    </div>
  );
}

export default function IronmanExplorerLazy() {
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

  return <div ref={ref}>{show ? <IronmanExplorer /> : <Placeholder />}</div>;
}
