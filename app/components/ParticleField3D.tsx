"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const COUNT = 500;
const SPREAD = 6;

// Small seeded PRNG (mulberry32): the particle field is identical on every
// render and every visit, and no Math.random call happens during render.
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null!);

  // base positions + a per-particle phase, so each drifts on its own cycle
  // rather than the whole field moving as one rigid block
  const { positions, basePositions, phases } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const basePositions = new Float32Array(COUNT * 3);
    const phases = new Float32Array(COUNT);
    const rand = mulberry32(20240601);
    for (let i = 0; i < COUNT; i++) {
      const x = (rand() - 0.5) * SPREAD * 2;
      const y = (rand() - 0.5) * SPREAD * 2;
      const z = (rand() - 0.5) * SPREAD;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      basePositions[i * 3] = x;
      basePositions[i * 3 + 1] = y;
      basePositions[i * 3 + 2] = z;
      phases[i] = rand() * Math.PI * 2;
    }
    return { positions, basePositions, phases };
  }, []);

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) return;
    const t = state.clock.getElapsedTime();

    // gentle whole-field parallax toward the cursor
    points.rotation.y = state.pointer.x * 0.2;
    points.rotation.x = state.pointer.y * 0.15;

    const posAttr = points.geometry.attributes.position;
    const arr = posAttr.array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      const idx = i * 3;
      arr[idx] = basePositions[idx] + Math.sin(t * 0.3 + phases[i]) * 0.3;
      arr[idx + 1] =
        basePositions[idx + 1] + Math.cos(t * 0.25 + phases[i]) * 0.3;
      arr[idx + 2] =
        basePositions[idx + 2] + Math.sin(t * 0.2 + phases[i] * 1.3) * 0.3;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#e8a33d"
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleField3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <Particles />
    </Canvas>
  );
}
