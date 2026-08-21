"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const chip: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
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
        <motion.span
          key={metric}
          variants={chip}
          className="rounded-md bg-background px-3 py-1.5 font-mono text-xs text-accent"
        >
          {metric}
        </motion.span>
      ))}
    </motion.div>
  );
}
