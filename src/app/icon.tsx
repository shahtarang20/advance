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
        {/* Drawn as SVG rather than the "✦" text glyph: ImageResponse's bundled font doesn't
            include that character, so rendering it as text triggers a network fetch to
            auto-resolve a matching Google Font at request time — an unnecessary external
            dependency for a favicon, and one that can (and does) fail with a 400. */}
        <svg width="36" height="36" viewBox="0 0 100 100" fill="none">
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
