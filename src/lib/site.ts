// Resolves to the real deployed domain automatically on Vercel, so OG/canonical URLs
// always match wherever this actually ends up hosted (production domain, preview URL, etc.).
// Falls back to localhost for local dev. If you buy a custom domain later, set
// NEXT_PUBLIC_SITE_URL in Vercel's env vars to override this with your custom domain.
function resolveSiteUrl(): string {
  // If we are running in the browser (client-side), we can simply read the actual URL!
  if (typeof window !== "undefined") return window.location.origin;
  
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  
  // Hardcode the known production domain so we don't accidentally bake protected
  // preview URLs (process.env.VERCEL_URL) into our public OpenGraph tags.
  if (process.env.NODE_ENV === "production") return "https://cosmicnumbers-five.vercel.app";

  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();
