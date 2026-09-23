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
  const { searchParams, host } = new URL(req.url);
  const type = searchParams.get("type") ?? "numerology";
  const title = truncate(searchParams.get("title") ?? "Cosmic Reading", 60);
  const subtitle = truncate(searchParams.get("subtitle") ?? "", 90);
  const TYPE_GLYPHS: Record<string, string> = {
    aura: "🔮",
    biorhythm: "📈",
    dreams: "🌙",
    tarot: "🃏",
    kundli: "🕉️",
    palmistry: "🤚",
  };
  const big =
    searchParams.get("big") ??
    (type === "horoscope" ? GLYPHS[searchParams.get("sign") ?? ""] ?? "✨" : TYPE_GLYPHS[type] ?? "✨");
  const text = truncate(searchParams.get("text") ?? "", 140);
  const accentColor = searchParams.get("color");
  const gradient = accentColor
    ? `linear-gradient(135deg, ${accentColor}, #7e22ce, #3730a3)`
    : "linear-gradient(135deg, #3730a3, #7e22ce, #b45309)";

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
          background: "linear-gradient(135deg, #ffffff 0%, #fafafa 55%, #f5f3fb 100%)",
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
            color: "#3730a3",
            letterSpacing: 2,
          }}
        >
          <span
            style={{
              display: "flex",
              width: 16,
              height: 16,
              borderRadius: 4,
              background: "linear-gradient(135deg, #3730a3, #7e22ce)",
            }}
          />
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
            color: "#55555f",
            border: "1px solid rgba(17,17,17,0.12)",
            borderRadius: 999,
            padding: "6px 14px",
          }}
        >
          <span
            style={{
              display: "flex",
              width: 8,
              height: 8,
              borderRadius: 999,
              background: "#16a34a",
            }}
          />
          <span style={{ display: "flex" }}>{host}</span>
        </div>

        <div
          style={{
            fontSize: 200,
            lineHeight: 1,
            background: gradient,
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
            color: "#111111",
            textAlign: "center",
            display: "flex",
            marginBottom: 16,
          }}
        >
          {title}
        </div>

        {subtitle && (
          <div style={{ fontSize: 30, color: "#7e22ce", textAlign: "center", display: "flex", marginBottom: 20 }}>
            {subtitle}
          </div>
        )}

        {text && (
          <div
            style={{
              fontSize: 26,
              color: "#55555f",
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
            color: "#7a7a85",
            letterSpacing: 1,
            display: "flex",
          }}
        >
          Free numerology &amp; horoscope readings · {host}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
