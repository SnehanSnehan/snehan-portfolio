"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import KarnatakaMapFrame from "./KarnatakaMapFrame";

// The map code and its ~58KB of path data only download once this block is
// within 400px of the viewport. Until then the frame below holds the map's
// exact space, and its static line doubles as the no-JS fallback.
const KarnatakaDistrictMap = dynamic(() => import("./KarnatakaDistrictMap"), {
  ssr: false,
  loading: () => <Placeholder />,
});

// Min-heights below are the measured heights of the real side panels at each
// breakpoint (panel text wraps differently as the column narrows), so the
// content under this block does not move when the map loads.
function Placeholder() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.15fr_1fr]">
      <KarnatakaMapFrame />
      <div
        aria-hidden="true"
        className="min-h-[47rem] min-[480px]:min-h-[41.5rem] md:min-h-[38rem] lg:min-h-[47rem]"
      />
      <div aria-hidden="true" className="min-h-[3.5rem] lg:col-span-2" />
    </div>
  );
}

export default function KarnatakaMapLazy() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setShow(true);
      return;
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

  return <div ref={ref}>{show ? <KarnatakaDistrictMap /> : <Placeholder />}</div>;
}
