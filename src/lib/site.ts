// Resolves to the real deployed domain automatically on Vercel, so OG/canonical URLs
// always match wherever this actually ends up hosted (production domain, preview URL, etc.).
// Falls back to localhost for local dev. If you buy a custom domain later, set
// NEXT_PUBLIC_SITE_URL in Vercel's env vars to override this with your custom domain.
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();
