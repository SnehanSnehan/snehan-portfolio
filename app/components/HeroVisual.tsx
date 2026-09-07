"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import NetworkGraph from "./NetworkGraph";

// Three.js/R3F only start downloading once we've decided the visitor
// actually gets the 3D version — never on mobile, never with reduced motion.
const ParticleField3D = dynamic(() => import("./ParticleField3D"), {
  ssr: false,
  loading: () => <NetworkGraph />,
});

export default function HeroVisual() {
  const [mode, setMode] = useState<"2d" | "3d">("2d");

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;

    if (!reducedMotion && isDesktop) {
      setMode("3d");
    }
  }, []);

  if (mode === "3d") {
    return <ParticleField3D />;
  }

  // Default/fallback: the lightweight 2D canvas — used for the initial
  // render, mobile viewports, and prefers-reduced-motion.
  return <NetworkGraph />;
}
