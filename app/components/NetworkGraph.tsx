"use client";

import { useEffect, useRef } from "react";

const NODE_COUNT = 36;
const MAX_LINK_DISTANCE = 140;
const NODE_COLOR = "#e8a33d";
const LINE_COLOR = "rgba(232, 163, 61, 0.15)";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export default function NetworkGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    let animationFrame: number;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createNodes() {
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
      }));
    }

    function drawFrame() {
      ctx!.clearRect(0, 0, width, height);

      // draw connecting lines between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_LINK_DISTANCE) {
            ctx!.strokeStyle = LINE_COLOR;
            ctx!.lineWidth = 1;
            ctx!.globalAlpha = 1 - dist / MAX_LINK_DISTANCE;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      ctx!.globalAlpha = 1;
      ctx!.fillStyle = NODE_COLOR;
      for (const node of nodes) {
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function step() {
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      }
      drawFrame();
      animationFrame = requestAnimationFrame(step);
    }

    resize();
    createNodes();

    if (prefersReducedMotion) {
      // static frame only, no motion loop
      drawFrame();
    } else {
      animationFrame = requestAnimationFrame(step);
    }

    function handleResize() {
      resize();
      createNodes();
      drawFrame();
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="h-full w-full"
    />
  );
}
