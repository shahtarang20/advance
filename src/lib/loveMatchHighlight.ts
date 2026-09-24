import { useState, useEffect } from "react";
import { loadBirthProfile, BIRTH_PROFILE_SAVED_EVENT } from "./birthProfile";

const STORAGE_KEY = "cosmic-seen-love-match";

export function getAge(dob?: string): number | null {
  if (!dob) return null;
  const birthDate = new Date(dob);
  if (isNaN(birthDate.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export function useLoveMatchHighlight() {
  const [shouldHighlight, setShouldHighlight] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const checkHighlight = () => {
      try {
        if (window.localStorage.getItem(STORAGE_KEY) === "1") {
          setShouldHighlight(false);
          return;
        }
        
        const profile = loadBirthProfile();
        const age = getAge(profile.dob);
        if (age !== null && age < 27) {
          setShouldHighlight(true);
        } else {
          setShouldHighlight(false);
        }
      } catch {
        // Ignore localStorage errors
      }
    };

    checkHighlight();

    const onSeen = () => setShouldHighlight(false);
    window.addEventListener("love-match-seen", onSeen);
    // NavBar and the homepage only ever mount once per session (NavBar lives in the root
    // layout, which client-side navigation never remounts) — without this, a user who saves
    // their birth date in Numerology/Kundli/Horoscope *after* those first mounted wouldn't see
    // the highlight turn on until a full page reload, even though they now qualify for it.
    window.addEventListener(BIRTH_PROFILE_SAVED_EVENT, checkHighlight);
    return () => {
      window.removeEventListener("love-match-seen", onSeen);
      window.removeEventListener(BIRTH_PROFILE_SAVED_EVENT, checkHighlight);
    };
  }, []);

  return shouldHighlight;
}

export function markLoveMatchSeen() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, "1");
    // Dispatch a custom event to force the hook to update across the app
    window.dispatchEvent(new Event("love-match-seen"));
  } catch {}
}
