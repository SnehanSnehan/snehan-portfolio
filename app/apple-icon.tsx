import { ImageResponse } from "next/og";
import { loadOgFonts, OG_COLORS } from "./lib/ogFonts";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Same mark as app/icon.tsx, as a full-bleed square: navy to every edge, no rounded
// corners and no transparency (iOS applies its own corner mask to touch icons).
export default async function AppleIcon() {
  const fonts = await loadOgFonts();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: OG_COLORS.background,
          color: OG_COLORS.accent,
          fontFamily: "Space Grotesk",
          fontWeight: 700,
          fontSize: 130,
          lineHeight: 1,
        }}
      >
        S
      </div>
    ),
    { ...size, fonts }
  );
}
