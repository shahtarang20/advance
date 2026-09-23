// Remembers the user's own birth details (name, date of birth, and — for Kundli — birth time
// and place) across the Numerology, Horoscope, and Kundli tools, the same way the language
// preference is remembered: a single localStorage entry, read once on mount to prefill forms so
// a returning visitor doesn't have to retype everything each time. Nothing is ever sent to a
// server; this is purely a same-device convenience.

const STORAGE_KEY = "cosmic-birth-profile";

export interface BirthProfilePlace {
  mode: "city" | "custom";
  /** Only present for mode "city" — used to redisplay "City, State" in the search field. */
  cityName?: string;
  cityState?: string;
  cityCountry?: string;
  lat: number;
  lng: number;
  /** IANA timezone — only present for mode "city". */
  tz?: string;
  /** Fixed UTC offset in minutes — only present for mode "custom". */
  utcOffsetMinutes?: number;
}

export interface BirthProfile {
  name?: string;
  dob?: string;
  time?: string;
  place?: BirthProfilePlace;
}

export function loadBirthProfile(): BirthProfile {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

/** Merges the given fields into the stored profile — callers only pass the fields their form
 * actually collects, so e.g. Numerology (name + dob) never clobbers a previously-saved Kundli
 * birth time/place, and vice versa. */
export function saveBirthProfile(fields: Partial<BirthProfile>): void {
  if (typeof window === "undefined") return;
  try {
    const next = { ...loadBirthProfile(), ...fields };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // localStorage may be unavailable (private mode, quota) — the form still works this
    // session, it just won't be remembered next time.
  }
}
