"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export default function ActionReveal({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <section className="rounded-lg border border-border bg-surface p-6 sm:p-8">
        {children}
      </section>
    );
  }

  return (
    <motion.section
      className="rounded-lg border border-border bg-surface p-6 sm:p-8"
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, scale: 0.95, rotateX: -6, y: 16 }}
      whileInView={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}
