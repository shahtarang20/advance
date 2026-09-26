"use client";

import { useTTS } from "@/hooks/useTTS";
import { useEffect, useState } from "react";
import { useTranslation } from "@/lib/I18nContext";

export function PlayAudioButton({ 
  textToRead, 
  tKeys,
  elementId,
  className = "" 
}: { 
  textToRead?: string; 
  tKeys?: string[];
  elementId?: string;
  className?: string; 
}) {
  const { play, stop, isPlaying } = useTTS();
  const { t, language } = useTranslation();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // If the browser doesn't support speech synthesis, or if the language is Gujarati (TTS is poor quality)
  if (typeof window === "undefined" || !window.speechSynthesis || t.name === "gu" || language === "gu") return null;

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isPlaying) {
      stop();
    } else {
      if (textToRead) {
        play(textToRead);
      } else if (elementId) {
        const el = document.getElementById(elementId);
        if (el) {
          // Read actual rendered DOM text, stripping out excessive empty lines
          let text = el.innerText.replace(/\n{2,}/g, '. ').trim();
          play(text);
        }
      } else if (tKeys) {
        const combined = tKeys.map(key => t(key, { defaultValue: "" })).filter(Boolean).join(". ");
        play(combined);
      }
    }
  };

  const label = isPlaying
    ? t("audio.stop", { defaultValue: "Stop Audio" })
    : t("audio.play", { defaultValue: "Play Audio" });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      handlePlay(e as unknown as React.MouseEvent);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handlePlay}
      onKeyDown={handleKeyDown}
      className={`btn-tap accent-ring relative inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 ${
        isPlaying
          ? "bg-purple-600 border-purple-600 text-white shadow-purple-500/50"
          : "surface-glass dark:backdrop-blur-xl"
      } ${className}`}
      title={label}
      aria-label={label}
    >
      {isPlaying ? (
        <span className="text-xl leading-none">⏹️</span>
      ) : (
        <span className="text-xl leading-none">🔊</span>
      )}
      
      {/* Pulse effect when playing */}
      {isPlaying && (
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-purple-500/40" />
      )}
    </div>
  );
}
