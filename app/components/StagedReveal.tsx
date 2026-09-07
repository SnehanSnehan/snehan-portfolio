"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "left" | "right";

const OFFSET = 44;
const TILT = 14;

function buildVariants(direction: Direction, delay: number): Variants {
  const x = direction === "left" ? -OFFSET : direction === "right" ? OFFSET : 0;
  const rotateY =
    direction === "left" ? -TILT : direction === "right" ? TILT : 0;

  return {
    hidden: {
      opacity: 0,
      x,
      y: direction === "up" ? OFFSET : 12,
      rotateY,
      rotateX: direction === "up" ? -TILT : 0,
      scale: 0.92,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
    },
  };
}

export default function StagedReveal({
  children,
  delay = 0,
  direction = "up",
  className,
}: {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      style={{ perspective: 1000 }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={buildVariants(direction, delay)}
    >
      {children}
    </motion.div>
  );
}
