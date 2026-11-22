import { ImageResponse } from "next/og";
import { loadOgFonts, OG_COLORS } from "./lib/ogFonts";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Bold amber "S" on the site's navy.
export default async function Icon() {
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
          fontSize: 28,
          lineHeight: 1,
        }}
      >
        S
      </div>
    ),
    { ...size, fonts }
  );
}
