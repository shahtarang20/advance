import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { SITE_URL } from "@/lib/site";

export const runtime = "edge";

// A strict allowlist pattern (3, 4, 6, or 8 hex digits) — the only thing this value is ever used
// for is one stop in a CSS gradient, but it comes straight from a public, unauthenticated query
// param with no other validation. Rejecting anything that isn't a genuine hex color, rather than
// interpolating whatever string was passed straight into a CSS value, closes off that as an
// injection vector into the generated image's styling.
const HEX_COLOR_PATTERN = /^#[0-9a-fA-F]{3}$|^#[0-9a-fA-F]{4}$|^#[0-9a-fA-F]{6}$|^#[0-9a-fA-F]{8}$/;

const GLYPHS: Record<string, string> = {
  aries: "♈", taurus: "♉", gemini: "♊", cancer: "♋", leo: "♌", virgo: "♍",
  libra: "♎", scorpio: "♏", sagittarius: "♐", capricorn: "♑", aquarius: "♒", pisces: "♓",
};

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  // Trusting our own known site URL rather than the request's `Host` header for what gets
  // rendered into the image — the Host header can be spoofed by a client that talks straight to
  // the origin instead of going through normal domain routing, which would otherwise let an
  // attacker get arbitrary attacker-chosen text baked into a "cosmicnumbers.app"-branded image.
  const host = new URL(SITE_URL).host;
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
  // Capped at 4 chars — this is meant to hold a single emoji/glyph/short number (e.g. a life path
  // number or zodiac symbol), not arbitrary text; the previous version passed the raw `big` query
  // param straight through with no length limit at all, letting anyone request a giant image
  // filled with as much text as they wanted, unbounded compute on a public, unauthenticated
  // edge-function endpoint.
  const big = truncate(
    searchParams.get("big") ?? (type === "horoscope" ? GLYPHS[searchParams.get("sign") ?? ""] ?? "✨" : TYPE_GLYPHS[type] ?? "✨"),
    4
  );
  const text = truncate(searchParams.get("text") ?? "", 140);
  const requestedColor = searchParams.get("color");
  const accentColor = requestedColor && HEX_COLOR_PATTERN.test(requestedColor) ? requestedColor : null;
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
    {
      width: 1200,
      height: 630,
      // Cache identical requests at the CDN for a day, serving stale for a week while
      // revalidating — this is a public, unauthenticated endpoint with no server-side rate
      // limiting, so caching by URL is what actually keeps a burst of repeated/identical
      // requests (whether organic traffic hitting the same share link or someone deliberately
      // hammering it) from re-running the image-generation work and cost every single time.
      headers: { "Cache-Control": "public, immutable, max-age=86400, stale-while-revalidate=604800" },
    }
  );
}
