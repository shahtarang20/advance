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

// The very first time a returning user switches languages, the guided tour runs once more —
// useful because they may have originally seen it in a language they don't read well. This is
// tracked separately from the main "seen" flag above and only ever fires once, regardless of
// how many more times the language is changed afterward.
const LANGUAGE_TOUR_STORAGE_KEY = "cosmic-onboarding-lang-tour-seen";

export function hasSeenLanguageChangeTour(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.localStorage.getItem(LANGUAGE_TOUR_STORAGE_KEY) === "1";
  } catch {
    return true;
  }
}

export function markLanguageChangeTourSeen(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LANGUAGE_TOUR_STORAGE_KEY, "1");
  } catch {
    // Best-effort only.
  }
}

/** Fired on window whenever the user actively switches the site language (not on the initial
 * load restoring a previously-saved language) — OnboardingTour listens for this to decide
 * whether to run the tour again. */
export const LANGUAGE_CHANGED_EVENT = "cosmic:language-changed";
