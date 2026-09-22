"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "hi" | "de" | "zh" | "gu";

interface I18nContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, replacements?: Record<string, string> & { defaultValue?: string }) => string;
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

const dictionaries: Record<Language, Record<string, string>> = {
  en: {},
  hi: {},
  de: {},
  zh: {},
  gu: {},
};

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en");
  const [dicts, setDicts] = useState(dictionaries);

  useEffect(() => {
    // Load from local storage
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang && ["en", "hi", "de", "zh", "gu"].includes(savedLang)) {
      setLanguageState(savedLang);
    }
    
    // Load dictionaries dynamically
    Promise.all([
      import("../locales/en.json").then((m) => m.default),
      import("../locales/hi.json").then((m) => m.default),
      import("../locales/de.json").then((m) => m.default),
      import("../locales/zh.json").then((m) => m.default),
      import("../locales/gu.json").then((m) => m.default),
    ]).then(([en, hi, de, zh, gu]) => {
      setDicts({ en, hi, de, zh, gu });
    }).catch(console.error);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string, replacements?: Record<string, string> & { defaultValue?: string }) => {
    let str = dicts[language]?.[key] || dicts["en"]?.[key];
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
