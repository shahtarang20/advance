"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/lib/I18nContext";

export default function DreamsPage() {
  const [dream, setDream] = useState("");
  const router = useRouter();
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dream.trim()) return;
    
    // We pass the dream text in the query string
    router.push(`/result/dreams?q=${encodeURIComponent(dream.trim())}`);
  };

  return (
    <div className="px-6 pb-24 pt-16">
      <div className="mx-auto max-w-2xl text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {t("dreams.page.title", { defaultValue: "Dream Symbolism Analyzer" })}
        </h1>
        <p className="mt-4 text-muted">
          {t("dreams.page.desc", { defaultValue: "Type out your dream in as much detail as possible. The universe speaks in symbols—let's decipher what it's trying to tell you." })}
        </p>
      </div>

      <div className="mx-auto max-w-2xl">
        <GlassCard className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="dream" className="mb-1.5 block text-sm text-muted">
                {t("dreams.tool.label", { defaultValue: "Your Dream" })}
              </label>
              <textarea
                id="dream"
                rows={6}
                value={dream}
                onChange={(e) => setDream(e.target.value)}
                placeholder={t("dreams.tool.placeholder", { defaultValue: "I was flying over a vast ocean, but then..." })}
                className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-3 text-[var(--foreground)] placeholder:text-muted-soft focus:border-[var(--accent-solid)] focus:outline-none resize-none"
              />
            </div>
            <Button type="submit" className="w-full disabled:cursor-not-allowed disabled:opacity-50" disabled={dream.trim().length < 5}>
              {t("dreams.tool.reveal", { defaultValue: "Analyze My Dream" })}
            </Button>
          </form>
        </GlassCard>
      </div>
    </div>
  );
}
