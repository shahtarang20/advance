import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const runtime = "edge";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #d4a017 100%)",
        }}
      >
        <span style={{ fontSize: 96, color: "#fff", fontWeight: 700, lineHeight: 1 }}>✦</span>
      </div>
    ),
    { ...size }
  );
}
