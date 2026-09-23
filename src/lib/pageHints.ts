// First-visit-per-page feature hints — distinct from the one-time site-wide OnboardingTour
// (src/lib/onboarding.ts). Each tool page gets its own flag, keyed by page, so a user who has
// already seen the global tour still gets a short "here's how this page works" callout the
// first time they land on each specific tool, without repeating on later visits.
const STORAGE_PREFIX = "cosmic-page-hint-seen-";

export function hasSeenPageHint(pageKey: string): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.localStorage.getItem(STORAGE_PREFIX + pageKey) === "1";
  } catch {
    // localStorage unavailable (private mode, quota) — default to "seen" so we never risk
    // showing the hint on every navigation for a user who can't persist the flag anyway.
    return true;
  }
}

export function markPageHintSeen(pageKey: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_PREFIX + pageKey, "1");
  } catch {
    // Best-effort only.
  }
}
