import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            // connect-src must include data: and blob: — Palmistry's hand-detection flow
            // (src/lib/handDetector.ts) reads the user's photo via `fetch(dataUrl)` to convert
            // it into a Blob before running MediaPipe on it entirely client-side; without data:
            // here the browser blocks that fetch outright and every photo check fails with
            // "Couldn't check that photo", silently breaking the whole feature. blob: covers the
            // same kind of same-page, non-network URL the WASM pipeline can produce internally.
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: blob: https:; font-src 'self' data: https:; connect-src 'self' data: blob: https:; frame-src 'self' https:; upgrade-insecure-requests;"
          },
          {
            key: "Permissions-Policy",
            value: "microphone=(), geolocation=()",
          }
        ],
      },
    ];
  },
};
export default nextConfig;
