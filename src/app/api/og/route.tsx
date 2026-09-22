import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const GLYPHS: Record<string, string> = {
  aries: "♈", taurus: "♉", gemini: "♊", cancer: "♋", leo: "♌", virgo: "♍",
  libra: "♎", scorpio: "♏", sagittarius: "♐", capricorn: "♑", aquarius: "♒", pisces: "♓",
};

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") ?? "numerology";
  const title = truncate(searchParams.get("title") ?? "Cosmic Reading", 60);
  const subtitle = truncate(searchParams.get("subtitle") ?? "", 90);
  const big = searchParams.get("big") ?? (type === "horoscope" ? GLYPHS[searchParams.get("sign") ?? ""] ?? "✦" : "✦");
  const text = truncate(searchParams.get("text") ?? "", 140);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 45%, #7c2d92 75%, #1e1b4b 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 56,
            left: 80,
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 24,
            color: "#e9d5ff",
            letterSpacing: 2,
          }}
        >
          <span style={{ display: "flex" }}>✦</span>
          <span style={{ display: "flex", fontWeight: 700 }}>Cosmic Numbers</span>
        </div>
        <div
          style={{
            position: "absolute",
            top: 60,
            right: 80,
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 16,
            color: "rgba(233,213,255,0.75)",
            border: "1px solid rgba(233,213,255,0.35)",
            borderRadius: 999,
            padding: "6px 14px",
          }}
        >
          <span style={{ display: "flex" }}>✓</span>
          <span style={{ display: "flex" }}>cosmic-numbers.vercel.app</span>
        </div>

        <div
          style={{
            fontSize: 200,
            lineHeight: 1,
            background: "linear-gradient(135deg, #fde68a, #fbbf24, #f59e0b)",
            backgroundClip: "text",
            color: "transparent",
            display: "flex",
            marginBottom: 10,
          }}
        >
          {big}
        </div>

        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "white",
            textAlign: "center",
            display: "flex",
            marginBottom: 16,
          }}
        >
          {title}
        </div>

        {subtitle && (
          <div style={{ fontSize: 30, color: "#d8b4fe", textAlign: "center", display: "flex", marginBottom: 20 }}>
            {subtitle}
          </div>
        )}

        {text && (
          <div
            style={{
              fontSize: 26,
              color: "#f1f5f9",
              textAlign: "center",
              display: "flex",
              maxWidth: 900,
              opacity: 0.9,
            }}
          >
            {text}
          </div>
        )}

        <div
          style={{
            position: "absolute",
            bottom: 50,
            fontSize: 20,
            color: "#c4b5fd",
            letterSpacing: 1,
            display: "flex",
          }}
        >
          Free numerology &amp; horoscope readings · cosmic-numbers.vercel.app
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
