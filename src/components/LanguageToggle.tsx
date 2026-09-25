"use client";

import { useTranslation } from "@/lib/I18nContext";
import { useState, useRef, useEffect } from "react";
import { LANGUAGE_CHANGED_EVENT } from "@/lib/onboarding";

export function LanguageToggle() {
  const { language, setLanguage } = useTranslation();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिंदी" },
    { code: "gu", label: "ગુજરાતી" },
    { code: "de", label: "Deutsch" },
    { code: "zh", label: "中文" },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (open) {
          setOpen(false);
          window.dispatchEvent(new Event(LANGUAGE_CHANGED_EVENT));
        }
      }
    }
    
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => {
          if (open) {
            window.dispatchEvent(new Event(LANGUAGE_CHANGED_EVENT));
          }
          setOpen(!open);
        }}
        className="btn-tap accent-ring surface-glass flex h-11 w-11 items-center justify-center rounded-full border text-sm font-medium"
        aria-label="Toggle language"
      >
        {language.toUpperCase()}
      </button>

      {open && (
        <div className="absolute right-0 top-12 mt-2 w-32 rounded-xl border bg-[var(--surface)] p-2 shadow-xl z-50">
          <div className="flex flex-col gap-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code as "en" | "hi" | "de" | "zh" | "gu");
                  setOpen(false);
                }}
                className={`text-left rounded-lg px-3 py-2 text-sm transition-colors hover:bg-[var(--background)] ${
                  language === lang.code ? "font-bold text-[var(--accent-solid)]" : "text-muted hover:text-[var(--foreground)]"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
