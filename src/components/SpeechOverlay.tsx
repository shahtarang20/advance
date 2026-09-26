"use client";

import React, { useEffect, useRef } from "react";
import { useSpeechStore, speechStore } from "@/lib/speechStore";
import { useTTS } from "@/hooks/useTTS";

export function SpeechOverlay() {
  const { isPlaying, words, activeWordIndex } = useSpeechStore();
  const { stop } = useTTS();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the active word into view
  useEffect(() => {
    if (isPlaying && scrollRef.current && activeWordIndex >= 0) {
      const activeEl = scrollRef.current.querySelector(`[data-index="${activeWordIndex}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [activeWordIndex, isPlaying]);

  if (!isPlaying || words.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] animate-slide-up pb-safe">
      <div className="bg-[var(--surface)]/95 backdrop-blur-xl border-t border-[var(--surface-border)] shadow-2xl p-4 sm:p-6">
        <div className="max-w-4xl mx-auto flex items-start gap-4">
          <button 
            onClick={stop}
            className="mt-1 shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--background)] border border-[var(--surface-border)] text-xl hover:scale-105 active:scale-95 transition-transform"
            title="Stop Reading"
          >
            ⏹️
          </button>
          
          <div 
            ref={scrollRef}
            className="flex-1 max-h-32 overflow-y-auto pr-4 text-lg sm:text-xl font-medium leading-relaxed"
          >
            <div className="flex flex-wrap gap-x-1.5 gap-y-2 pb-4">
              {words.map((word, i) => {
                const isActive = activeWordIndex === i;
                const isPast = i < activeWordIndex;
                
                return (
                  <span
                    key={i}
                    data-index={i}
                    className={`transition-all duration-200 ${
                      isActive 
                        ? "text-[var(--accent-solid)] border-b-2 border-[var(--accent-solid)] scale-110 -translate-y-0.5" 
                        : isPast
                        ? "text-muted-soft"
                        : "text-[var(--foreground)]"
                    }`}
                  >
                    {word}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
