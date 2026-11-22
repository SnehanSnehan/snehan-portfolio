import { ImageResponse } from "next/og";
import { loadOgFonts, OG_COLORS } from "./lib/ogFonts";

export const alt = "Snehan — Data Scientist & Analytics Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Every word below is taken from the site: the name and role line are the hero
// heading, the last line is the hero's positioning sentence.
export default async function OpengraphImage() {
  const fonts = await loadOgFonts();
  const MARGIN = 72; // safe margin on every side (>= 60px)

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: MARGIN,
          background: OG_COLORS.background,
          color: OG_COLORS.foreground,
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "JetBrains Mono",
            fontWeight: 500,
            fontSize: 56,
            color: OG_COLORS.accent,
          }}
        >
          Snehan
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 24,
            fontFamily: "Space Grotesk",
            fontWeight: 700,
            fontSize: 96,
            lineHeight: 1.04,
            letterSpacing: -2,
          }}
        >
          <div style={{ display: "flex" }}>Data Scientist &amp;</div>
          <div style={{ display: "flex" }}>Analytics Engineer</div>
        </div>

        <div
          style={{
            display: "flex",
            width: 120,
            height: 8,
            marginTop: 44,
            background: OG_COLORS.accent,
          }}
        />

        <div
          style={{
            display: "flex",
            marginTop: 36,
            maxWidth: 940,
            fontFamily: "Inter",
            fontWeight: 400,
            fontSize: 38,
            lineHeight: 1.35,
          }}
        >
          I turn messy, real-world data into models and dashboards people can actually act on.
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
