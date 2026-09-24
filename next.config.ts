import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removes the "X-Powered-By: Next.js" response header — it doesn't protect anything on its
  // own, but there's no reason to hand an attacker free confirmation of the framework/version
  // for free reconnaissance either.
  poweredByHeader: false,
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
            //
            // object-src 'none': blocks <object>/<embed>/<applet> outright — this app never
            // uses them, and they're a classic legacy plugin-based XSS/clickjacking vector.
            // base-uri 'self': stops an injected <base> tag from silently rewriting where every
            // relative URL/asset on the page resolves to.
            // form-action 'self': every form in this app submits to itself (client-side only,
            // nothing posts cross-origin) — restricting this closes off a class of attack where
            // injected markup redirects form submissions to an attacker's server.
            // frame-ancestors 'none': the modern CSP equivalent of X-Frame-Options, kept
            // alongside it as defense-in-depth for browsers that only honor one or the other.
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: blob: https:; font-src 'self' data: https:; connect-src 'self' data: blob: https:; frame-src 'self' https:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;",
          },
          {
            key: "Permissions-Policy",
            value: "microphone=(), geolocation=(), payment=(), usb=(), midi=(), accelerometer=(), gyroscope=(), magnetometer=()",
          },
          {
            // Isolates this site's browsing context from cross-origin windows it opens or that
            // open it — closes off a class of cross-origin attack (including Spectre-style side
            // channels) that relies on shared browsing-context access between origins.
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            // Stops other origins from embedding this site's own responses (images, scripts,
            // etc.) into their own pages without an explicit CORS grant — this app never needs
            // to be embedded that way, so there's no legitimate case this blocks.
            key: "Cross-Origin-Resource-Policy",
            value: "same-origin",
          },
        ],
      },
    ];
  },
};
export default nextConfig;
