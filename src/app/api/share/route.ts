import { NextRequest, NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  
  // Extract parameters passed from the ShareButtons
  const title = searchParams.get("title") || "Cosmic Numbers";
  const desc = searchParams.get("desc") || "Discover your cosmic path for free.";
  const type = searchParams.get("type") || "home";
  
  // The actual destination the user should end up at
  const dest = searchParams.get("dest") || "/";
  const destinationUrl = `${SITE_URL}${dest.startsWith("/") ? dest : `/${dest}`}`;
  
  // Reconstruct the exact OG Image URL
  const ogParams = new URLSearchParams();
  searchParams.forEach((val, key) => {
    if (!["title", "desc", "dest"].includes(key)) {
      ogParams.append(key, val);
    }
  });
  const ogImageUrl = `${SITE_URL}/api/og?${ogParams.toString()}`;

  // Return a completely raw, hardcoded HTML string.
  // This completely bypasses React, Next.js streaming, and Service Workers.
  // WhatsApp's dumb regex parser will read this perfectly.
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <meta property="og:title" content="${title}">
        <meta property="og:description" content="${desc}">
        <meta property="og:image" content="${ogImageUrl}">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta property="og:type" content="website">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:image" content="${ogImageUrl}">
        
        <!-- Instantly redirect real users to the actual destination -->
        <meta http-equiv="refresh" content="0; url=${destinationUrl}">
        <script>window.location.href = "${destinationUrl}";</script>
      </head>
      <body>
        Redirecting to Cosmic Numbers...
      </body>
    </html>
  `;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      // Tell Vercel/CDNs NOT to cache this so it's always fresh for WhatsApp
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
