"use client";

import React, { createContext, useContext, useState, useLayoutEffect, ReactNode } from "react";
import enDict from "../locales/en.json";
import hiDict from "../locales/hi.json";
import deDict from "../locales/de.json";
import zhDict from "../locales/zh.json";
import guDict from "../locales/gu.json";
import { LANGUAGE_CHANGED_EVENT } from "./onboarding";

type Language = "en" | "hi" | "de" | "zh" | "gu";

interface I18nContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, replacements?: Record<string, string> & { defaultValue?: string }) => string;
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

// Bundled statically (not via dynamic import()) so every dictionary is already part of the JS
// the browser is downloading anyway to run the page — there is no separate, later network
// round-trip to fetch translations. Previously these were lazy-`import()`ed inside a useEffect,
// which on a slow connection meant the page rendered in English first and then visibly swapped
// every piece of text to the real language a moment (sometimes a very noticeable one) later.
const DICTS: Record<Language, Record<string, string>> = {
  en: enDict,
  hi: hiDict,
  de: deDict,
  zh: zhDict,
  gu: guDict,
};

const LANGUAGE_STORAGE_KEY = "language";

function isLanguage(value: string | null): value is Language {
  return !!value && value in DICTS;
}

function readSavedLanguage(): Language | null {
  try {
    const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return isLanguage(saved) ? saved : null;
  } catch {
    return null;
  }
}

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  // Always starts as "en" — on both the server and the client's very first render — so
  // hydration never has anything to mismatch on. A previous version read localStorage directly
  // in the initial state (via a lazy useState initializer) to avoid a visible flash when
  // switching languages, but that meant the client's first render could already differ from
  // the server-rendered HTML (e.g. Gujarati vs. English), which is exactly what triggers
  // React's "Hydration failed" error — a real regression, not a cosmetic one.
  const [language, setLanguageState] = useState<Language>("en");

  // useLayoutEffect (not useEffect) runs synchronously right after the DOM commits but before
  // the browser paints — so switching to the real saved language here still happens before the
  // user's eyes ever see the English version, with no visible flash, while the *initial*
  // render (the one hydration checks) stays consistently "en" on both sides. Same technique
  // next-themes uses for exactly this class of problem.
  useLayoutEffect(() => {
    const saved = readSavedLanguage();
    if (saved) {
      if (saved !== "en") setLanguageState(saved);
    } else {
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (tz === "Asia/Kolkata" || tz === "Asia/Calcutta") {
          setLanguageState("hi");
          window.localStorage.setItem(LANGUAGE_STORAGE_KEY, "hi");
        }
      } catch (e) {
        // best effort
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- read once, on mount only
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState((prev) => {
      // Only a genuine change (not re-selecting the already-active language) should count as
      // the user actively switching languages — OnboardingTour listens for this to decide
      // whether to run the guided tour again.
      if (prev !== lang && typeof window !== "undefined") {
        window.dispatchEvent(new Event(LANGUAGE_CHANGED_EVENT));
      }
      return lang;
    });
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch {
      // localStorage may be unavailable (private mode, quota) — the language still applies for
      // this session, it just won't be remembered on the next visit.
    }
  };

  const t = (key: string, replacements?: Record<string, string> & { defaultValue?: string }) => {
    let str = DICTS[language]?.[key] || DICTS.en?.[key];
    if (!str) {
      str = replacements?.defaultValue || key;
    }
    if (replacements) {
      Object.keys(replacements).forEach((k) => {
        if (k !== "defaultValue") {
          str = str.replace(new RegExp(`{${k}}`, "g"), replacements[k]);
        }
      });
    }
    return str;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }
  return context;
};
