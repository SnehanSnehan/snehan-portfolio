"use client";

import { motion, animate, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const chipVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

function parseMetric(text: string) {
  const match = text.match(/[\d,]+\.?\d*/);
  if (!match) return null;

  const numberStr = match[0];
  const prefix = text.slice(0, match.index);
  const suffix = text.slice((match.index ?? 0) + numberStr.length);

  // Skip animating year/date ranges like "1999–2022" — counting up to a year
  // reads as nonsense, not a quantity.
  if (/^\s*[-–—]\s*\d/.test(suffix)) return null;

  const target = parseFloat(numberStr.replace(/,/g, ""));
  if (Number.isNaN(target)) return null;

  const decimals = numberStr.includes(".")
    ? numberStr.split(".")[1].length
    : 0;
  const useGrouping = numberStr.includes(",");

  return { prefix, suffix, target, decimals, useGrouping };
}

export default function CountingChip({ metric }: { metric: string }) {
  const shouldReduceMotion = useReducedMotion();
  const parsed = parseMetric(metric);
  // Text shown while counting up; null until the chip first scrolls into view.
  const [animated, setAnimated] = useState<string | null>(null);
  // No number to count, or reduced motion: show the final text directly
  // (derived, rather than set from inside the effect).
  const display =
    !parsed || shouldReduceMotion
      ? metric
      : (animated ?? parsed.prefix + "0" + parsed.suffix);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!parsed || shouldReduceMotion) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const controls = animate(0, parsed.target, {
            duration: 1.2,
            ease: "easeOut",
            onUpdate: (value) => {
              const formatted = value.toLocaleString(undefined, {
                minimumFractionDigits: parsed.decimals,
                maximumFractionDigits: parsed.decimals,
                useGrouping: parsed.useGrouping,
              });
              setAnimated(parsed.prefix + formatted + parsed.suffix);
            },
          });
          return () => controls.stop();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metric, shouldReduceMotion]);

  return (
    <motion.span
      ref={ref}
      variants={chipVariants}
      className="rounded-md bg-background px-3 py-1.5 font-mono text-xs text-accent"
    >
      {display}
    </motion.span>
  );
}
