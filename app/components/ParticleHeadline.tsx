"use client";

import { useEffect, useRef } from "react";

const MAX_PARTICLES = 900;
const DURATION = 1.1;
const SAMPLE_STEP = 4;

function easeOutCubic(p: number) {
  return 1 - Math.pow(1 - p, 3);
}

export default function ParticleHeadline({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const textRef = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const textEl = textRef.current;
    const canvas = canvasRef.current;
    if (!textEl || !canvas) return;

    let cancelled = false;
    let raf: number;

    async function run() {
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }
      if (cancelled || !textEl || !canvas) return;

      const rect = textEl.getBoundingClientRect();
      const width = Math.ceil(rect.width);
      const height = Math.ceil(rect.height);
      if (width === 0 || height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Sample the text's glyph shape on an offscreen canvas, manually
      // word-wrapping to the real element's own rendered width so the
      // sampled shape lines up with wherever the browser actually wrapped it.
      const cs = getComputedStyle(textEl);
      const fontSize = parseFloat(cs.fontSize);
      const lineHeight = parseFloat(cs.lineHeight) || fontSize * 1.2;

      const sample = document.createElement("canvas");
      sample.width = width;
      sample.height = height;
      const sctx = sample.getContext("2d");
      if (!sctx) return;
      sctx.font = `${cs.fontWeight} ${fontSize}px ${cs.fontFamily}`;
      sctx.fillStyle = "#fff";
      sctx.textBaseline = "top";

      const words = text.split(" ");
      const lines: string[] = [];
      let current = "";
      for (const word of words) {
        const test = current ? `${current} ${word}` : word;
        if (sctx.measureText(test).width > width && current) {
          lines.push(current);
          current = word;
        } else {
          current = test;
        }
      }
      if (current) lines.push(current);

      lines.forEach((line, i) => {
        sctx.fillText(line, 0, i * lineHeight);
      });

      const imageData = sctx.getImageData(0, 0, width, height).data;
      const targets: { x: number; y: number }[] = [];
      for (let y = 0; y < height; y += SAMPLE_STEP) {
        for (let x = 0; x < width; x += SAMPLE_STEP) {
          const alpha = imageData[(y * width + x) * 4 + 3];
          if (alpha > 128) targets.push({ x, y });
        }
      }

      const sampled =
        targets.length > MAX_PARTICLES
          ? targets.filter(
              (_, i) => i % Math.ceil(targets.length / MAX_PARTICLES) === 0
            )
          : targets;

      const particles = sampled.map((t) => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 60 + Math.random() * 120;
        return {
          x: t.x + Math.cos(angle) * distance,
          y: t.y + Math.sin(angle) * distance,
          tx: t.x,
          ty: t.y,
          delay: Math.random() * 0.2,
        };
      });

      const start = performance.now();

      function draw(now: number) {
        if (cancelled || !canvas) return;
        const elapsed = (now - start) / 1000;
        ctx!.clearRect(0, 0, width, height);
        ctx!.fillStyle = "#e8a33d";
        let allDone = true;
        for (const p of particles) {
          const localT = Math.max(
            0,
            Math.min(1, (elapsed - p.delay) / DURATION)
          );
          if (localT < 1) allDone = false;
          const eased = easeOutCubic(localT);
          const x = p.x + (p.tx - p.x) * eased;
          const y = p.y + (p.ty - p.y) * eased;
          ctx!.globalAlpha = 0.5 + eased * 0.5;
          ctx!.beginPath();
          ctx!.arc(x, y, 1.3, 0, Math.PI * 2);
          ctx!.fill();
        }
        ctx!.globalAlpha = 1;

        if (!allDone) {
          raf = requestAnimationFrame(draw);
        } else {
          canvas.style.transition = "opacity 0.6s ease";
          canvas.style.opacity = "0";
        }
      }
      raf = requestAnimationFrame(draw);
    }

    run();

    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
    };
  }, [text]);

  return (
    <div style={{ position: "relative" }}>
      <h1 ref={textRef} className={className}>
        {text}
      </h1>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
