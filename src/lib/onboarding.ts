// First-run onboarding tour state — a single flag in localStorage so the guided tour shows
// exactly once per browser/device, never again after it's been completed or dismissed.
const STORAGE_KEY = "cosmic-onboarding-v1-seen";

export function hasSeenOnboarding(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    // localStorage unavailable (private mode, quota) — default to "seen" so we never risk
    // re-showing the tour on every navigation for a user who can't persist the flag anyway.
    return true;
  }
}

export function markOnboardingSeen(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // Best-effort only.
  }
}
