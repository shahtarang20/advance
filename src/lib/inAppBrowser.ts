export type InAppBrowserKind = "instagram" | "facebook" | null;

/** Detects Instagram's and Facebook's own in-app WebView browsers via their well-known user-agent
 * tokens ("Instagram" and "FBAN"/"FBAV" respectively) — both apps open shared links inside their
 * own embedded browser rather than the user's real Safari/Chrome, which has its own isolated
 * storage (so "seen once" flags never carry over) and generally can't fire the PWA install
 * prompt at all. This is why a user arriving from a shared link is worth nudging toward "Open in
 * Browser" — it's Instagram/Facebook's own menu option, not something we can trigger via JS. */
export function detectInAppBrowser(userAgent: string): InAppBrowserKind {
  if (/Instagram/i.test(userAgent)) return "instagram";
  if (/FBAN|FBAV/i.test(userAgent)) return "facebook";
  return null;
}
