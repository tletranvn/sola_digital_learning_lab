import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Sola - Digital Learning Lab";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#faf9f5",
        color: "#1b1c1a",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        padding: "72px",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div style={{ color: "#003fb1", fontSize: 28, letterSpacing: "0.12em" }}>
          SOLA / DIGITAL LEARNING LAB
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>
          Where difficult ideas become experiences.
        </div>
      </div>
    </div>,
    size,
  );
}
