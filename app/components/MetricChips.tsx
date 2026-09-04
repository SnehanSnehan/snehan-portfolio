"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import CountingChip from "./CountingChip";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

export default function MetricChips({ metrics }: { metrics: string[] }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className="flex flex-wrap gap-2">
        {metrics.map((metric) => (
          <span
            key={metric}
            className="rounded-md bg-background px-3 py-1.5 font-mono text-xs text-accent"
          >
            {metric}
          </span>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="flex flex-wrap gap-2"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={container}
    >
      {metrics.map((metric) => (
        <CountingChip key={metric} metric={metric} />
      ))}
    </motion.div>
  );
}
