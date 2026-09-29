import { ImageResponse } from "next/og";
import { site } from "@/data/site";

// The preview image shown when the link is shared on WhatsApp, LinkedIn, etc.
export const alt = `${site.name} | ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 80,
          background: "radial-gradient(60% 60% at 75% 25%, rgba(245,165,36,0.35), #0a0a0a 70%)",
          color: "#ededed",
        }}
      >
        <div style={{ fontSize: 170, fontWeight: 900, letterSpacing: -6, textTransform: "uppercase", lineHeight: 1 }}>
          {site.shortName}
        </div>
        <div style={{ fontSize: 40, color: "#f5a524", marginTop: 20 }}>{site.role}</div>
      </div>
    ),
    size,
  );
}
