"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.3 },
  },
};

const tag: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export default function TechStackTags({ items }: { items: string[] }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted"
          >
            {item}
          </span>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="flex flex-wrap gap-2"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      {items.map((item) => (
        <motion.span
          key={item}
          variants={tag}
          className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted"
        >
          {item}
        </motion.span>
      ))}
    </motion.div>
  );
}
