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
        {/* Drawn as SVG rather than the "✦" text glyph — see icon.tsx for why. */}
        <svg width="96" height="96" viewBox="0 0 100 100" fill="none">
          <path
            d="M50 5 C54 40 60 46 95 50 C60 54 54 60 50 95 C46 60 40 54 5 50 C40 46 46 40 50 5 Z"
            fill="#fff"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
