// Tracks the last few results the user has actually generated (Kundli, Numerology, Horoscope,
// Tarot, etc.) so the homepage can offer a "Continue where you left off" shortcut instead of
// making a returning visitor re-navigate and refill a form. Same pattern as birthProfile.ts and
// the language preference: one localStorage entry, purely a same-device convenience.

const STORAGE_KEY = "cosmic-recent-activity";
const MAX_ITEMS = 5;

export interface RecentActivityItem {
  /** Feature key (e.g. "kundli", "tarot") — used to de-duplicate so re-visiting a feature moves
   * it to the front instead of listing it twice. */
  id: string;
  /** The exact result URL to resume this reading (includes its query params). */
  href: string;
  labelKey: string;
  labelDefault: string;
  icon: string;
  timestamp: number;
}

export function getRecentActivity(): RecentActivityItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function recordRecentActivity(item: Omit<RecentActivityItem, "timestamp">): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getRecentActivity().filter((i) => i.id !== item.id);
    const next = [{ ...item, timestamp: Date.now() }, ...existing].slice(0, MAX_ITEMS);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // localStorage may be unavailable (private mode, quota) — not tracking a recent visit isn't
    // worth failing anything over.
  }
}
