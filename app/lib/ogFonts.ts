import { readFile } from "node:fs/promises";
import { join } from "node:path";

// The site's own typefaces (all SIL Open Font Licence, files + licences in
// assets/fonts), so the preview image and icons match the site. Read at build
// time: the image routes are static.
const dir = join(process.cwd(), "assets", "fonts");

const toArrayBuffer = (b: Buffer) =>
  b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength) as ArrayBuffer;

export async function loadOgFonts() {
  const [display, body, mono] = await Promise.all([
    readFile(join(dir, "SpaceGrotesk-Bold.woff")),
    readFile(join(dir, "Inter-Regular.woff")),
    readFile(join(dir, "JetBrainsMono-Medium.woff")),
  ]);
  return [
    { name: "Space Grotesk", data: toArrayBuffer(display), weight: 700 as const, style: "normal" as const },
    { name: "Inter", data: toArrayBuffer(body), weight: 400 as const, style: "normal" as const },
    { name: "JetBrains Mono", data: toArrayBuffer(mono), weight: 500 as const, style: "normal" as const },
  ];
}

// Site colour tokens (app/globals.css) for use inside ImageResponse, where CSS variables don't exist.
export const OG_COLORS = {
  background: "#0F1420",
  foreground: "#F2F0EA",
  accent: "#E8A33D",
} as const;
