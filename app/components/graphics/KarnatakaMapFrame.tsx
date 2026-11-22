import type { ReactNode } from "react";

// Shared by the loading placeholder and the real map so both have identical
// geometry (no layout shift when the lazy map arrives). No map data is imported
// here on purpose: this file ships in the first render.
// 790 = KARNATAKA_VIEWBOX.width (600) + GUTTER (190); 944 = KARNATAKA_VIEWBOX.height.
export const MAP_GUTTER = 190;
export const MAP_VB_W = 790;
export const MAP_VB_H = 944;

export const STATIC_LINE =
  "Bangalore has 4,937 of the 8,044 facilities in the dataset; Haveri has 12.";

export default function KarnatakaMapFrame({ children }: { children?: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-2xl bg-surface p-3 sm:p-5">
        <p className="mb-2 text-sm text-muted">Tourism facilities per district. Tap a district.</p>
        <div
          className="relative mx-auto w-full max-w-xl"
          style={{ aspectRatio: `${MAP_VB_W} / ${MAP_VB_H}` }}
        >
          {children}
        </div>
      </div>
      <p className="text-sm text-muted">{STATIC_LINE}</p>
    </div>
  );
}
