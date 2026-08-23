import { ImageResponse } from "next/og";

export const alt = "Surendhar Venkatesh — Digital Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Hardcoded to match the real tokens in site.css — this renders in an isolated
// context that can't read CSS custom properties, so the values are transcribed,
// not invented.
const ivory = "#F7F1E4";
const charcoal = "#241F19";
const mutedForeground = "#5A5344";
const accent = "#2E5CFF";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 96px",
          background: ivory,
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: accent,
              display: "flex",
            }}
          />
          <span
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: accent,
            }}
          >
            Independent Digital Studio
          </span>
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: charcoal,
            maxWidth: 980,
            display: "flex",
          }}
        >
          Surendhar Venkatesh
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 500,
            lineHeight: 1.4,
            color: mutedForeground,
            marginTop: 28,
            maxWidth: 900,
            display: "flex",
          }}
        >
          Websites, social media, and digital products built to make small
          businesses easier to trust and easier to buy from.
        </div>
      </div>
    ),
    { ...size }
  );
}
