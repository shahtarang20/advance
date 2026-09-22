"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { analyzeDream, DreamSymbol } from "@/lib/dreams";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { useTranslation } from "@/lib/I18nContext";

function DreamsResultContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [symbols, setSymbols] = useState<DreamSymbol[]>([]);
  const { t } = useTranslation();
  
  useEffect(() => {
    if (query) {
      setSymbols(analyzeDream(query));
    }
  }, [query]);

  if (!query) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Link href="/dreams" className="text-purple-600 underline">
          {t("dreams.result.invalid", { defaultValue: "Please enter a dream to analyze." })}
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 pb-32 pt-16 mx-auto max-w-4xl">
      <Reveal>
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest text-muted-soft uppercase mb-2">
            {t("dreams.result.subtitle", { defaultValue: "Universe's Message" })}
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            {t("dreams.result.title", { defaultValue: "Dream Interpretation" })}
          </h1>
          <GlassCard className="p-6 text-left border-l-4 border-[var(--accent-solid)] max-w-2xl mx-auto italic text-muted">
            "{query}"
          </GlassCard>
        </div>
      </Reveal>

      {symbols.length === 0 ? (
        <Reveal delay={0.1}>
          <div className="text-center text-muted">
            <p className="text-lg">{t("dreams.result.none_detected", { defaultValue: "No major universal symbols detected in this dream." })}</p>
            <p className="mt-2">{t("dreams.result.none_desc", { defaultValue: "Sometimes dreams are simply our brain processing the day's events." })}</p>
          </div>
        </Reveal>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {symbols.map((sym, i) => (
            <Reveal key={sym.keyword} delay={i * 0.1}>
              <GlassCard className="p-8 h-full">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold tracking-tight capitalize">{sym.keyword}</h3>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[var(--accent-solid)]/10 text-[var(--accent-solid)]">
                    {sym.category}
                  </span>
                </div>
                <p className="text-base text-muted leading-relaxed">
                  {sym.meaning}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      )}
      
      <div className="mt-16 text-center">
         <Link href="/dreams" className="inline-block px-8 py-3 rounded-full border border-[var(--surface-border)] text-sm font-medium hover:bg-[var(--surface-border)] transition-colors">
           {t("dreams.result.analyze_another", { defaultValue: "Analyze Another Dream" })}
         </Link>
      </div>
    </div>
  );
}

export default function DreamsResultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted">Decoding...</div>}>
      <DreamsResultContent />
    </Suspense>
  );
}
