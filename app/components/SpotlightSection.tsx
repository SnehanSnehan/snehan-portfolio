"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

export default function SpotlightSection({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    function handleMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      el!.style.setProperty("--spotlight-x", `${e.clientX - rect.left}px`);
      el!.style.setProperty("--spotlight-y", `${e.clientY - rect.top}px`);
      el!.style.setProperty("--spotlight-opacity", "1");
    }

    function handleLeave() {
      el!.style.setProperty("--spotlight-opacity", "0");
    }

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-[var(--spotlight-opacity,0)] transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(250px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(232, 163, 61, 0.12), transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}
