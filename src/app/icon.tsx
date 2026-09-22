import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";
export const runtime = "edge";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 14,
          background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #d4a017 100%)",
        }}
      >
        <span style={{ fontSize: 36, color: "#fff", fontWeight: 700, lineHeight: 1 }}>✦</span>
      </div>
    ),
    { ...size }
  );
}
