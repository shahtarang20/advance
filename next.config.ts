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
            //
            // script-src previously allowed any `https:` origin at all — meaning that if an
            // attacker ever did find an injection point, they could load a script from literally
            // anywhere and serve fraudulent ads/malware from it. This replaces that wildcard with
            // an explicit allowlist of only the origins this app genuinely loads scripts from:
            // Google AdSense's actual serving domains (its ad-serving infrastructure legitimately
            // spans several Google-owned hostnames, not just the one that loads the initial
            // adsbygoogle.js) and nothing else. Any other origin — including one an attacker
            // controls — is now rejected by the browser itself, even if an injection point were
            // ever found. connect-src is tightened the same way for the same reason, covering
            // MediaPipe's own CDN/model fetches (src/lib/handDetector.ts) instead of a blanket
            // https: allowance.
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://*.googlesyndication.com https://*.googleadservices.com https://*.google.com https://*.doubleclick.net https://*.googletagservices.com https://*.gstatic.com https://*.adtrafficquality.google https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://*.gstatic.com https://*.googleapis.com; img-src 'self' data: blob: https:; font-src 'self' data: https://*.gstatic.com; connect-src 'self' data: blob: https://*.googlesyndication.com https://*.google.com https://*.doubleclick.net https://*.googleadservices.com https://*.adtrafficquality.google https://cdn.jsdelivr.net https://storage.googleapis.com; frame-src 'self' https://*.googlesyndication.com https://*.google.com https://*.doubleclick.net https://*.adtrafficquality.google; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;",
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
      {
        // Matches page routes only — excludes /_next/* (build assets, meant to be long-cached),
        // /api/* (has its own caching set per-route, e.g. the OG image endpoint), and any path
        // with a file extension (manifest.json, icons, sw.js, etc., which should keep normal
        // caching). This is deliberately the opposite of typical performance advice: normally
        // you'd want pages cacheable too. Here, an explicit product requirement is that the app
        // must always require a live connection and never present stale content — Chrome (and
        // other browsers) can otherwise retain a cached HTML snapshot of a page and silently
        // serve it back when the device loses connectivity, showing its own "Viewing an offline
        // copy of this page" banner. That's the browser working around exactly the offline
        // requirement OfflineScreen exists to enforce. no-store tells every cache (the browser's
        // own disk cache, any CDN) to keep nothing at all, so there's no stale snapshot left for
        // the browser to fall back to in the first place.
        source: "/((?!_next|api|.*\\..*).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, must-revalidate",
          },
        ],
      },
    ];
  },
};
export default nextConfig;
