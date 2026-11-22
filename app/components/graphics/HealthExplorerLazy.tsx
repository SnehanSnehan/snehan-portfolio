"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// Same pattern as the Karnataka map and Ironman explorer: the code (and the
// 145-country dataset) only downloads once this block is within 400px of the
// viewport. Until then a placeholder holds the measured height, and its line
// doubles as the no-JS fallback.
const HealthExplorer = dynamic(() => import("./HealthExplorer"), {
  ssr: false,
  loading: () => <Placeholder />,
});

export const HEALTH_STATIC_LINE =
  "Spending share of GDP and life expectancy are positively but only weakly related (r = 0.29 across 145 countries in 2019).";

function Placeholder() {
  return (
    // Tab bar (6.94rem) + the measured panel height used by HealthExplorer.
    <div className="min-h-[73.3rem] min-[400px]:min-h-[68.56rem] min-[480px]:min-h-[67.06rem] min-[560px]:min-h-[68.06rem] sm:min-h-[63.31rem] min-[700px]:min-h-[60.44rem] md:min-h-[58.56rem]">
      <p className="text-sm text-muted">{HEALTH_STATIC_LINE}</p>
    </div>
  );
}

export default function HealthExplorerLazy() {
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

  return <div ref={ref}>{show ? <HealthExplorer /> : <Placeholder />}</div>;
}
