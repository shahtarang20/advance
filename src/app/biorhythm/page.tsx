"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { validateDob } from "@/lib/validation";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { DateOfBirthInput } from "@/components/ui/DateOfBirthInput";
import { useTranslation } from "@/lib/I18nContext";
import { FeatureGate } from "@/components/FeatureGate";
import { PageFeatureHint } from "@/components/PageFeatureHint";

export default function BiorhythmPage() {
  const [dob, setDob] = useState("");
  const [touched, setTouched] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  const dobError = validateDob(dob);
  const canSubmit = !dobError;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!canSubmit) return;
    
    router.push(`/result/biorhythm?dob=${dob}`);
  };

  return (
    <div className="px-6 pb-24 pt-16">
      <FeatureGate feature="biorhythm">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t("biorhythm.page.title", { defaultValue: "Biorhythm Energy Chart" })}
          </h1>
          <p className="mt-4 text-muted">
            {t("biorhythm.page.desc", { defaultValue: "Discover your Physical, Emotional, and Intellectual cycles based on the exact days since your birth." })}
          </p>
        </div>

        <div className="mx-auto max-w-xl">
          <GlassCard className="p-8">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <label htmlFor="dob" className="mb-1.5 block text-sm text-muted">
                  {t("biorhythm.tool.dob", { defaultValue: "Date of Birth" })}
                </label>
                <DateOfBirthInput
                  id="dob"
                  value={dob}
                  onChange={setDob}
                  ariaInvalid={touched && !!dobError}
                  ariaDescribedBy={touched && dobError ? "dob-error" : undefined}
                  className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-3 text-[var(--foreground)] focus:border-[var(--accent-solid)] focus:outline-none"
                />
                {touched && dobError && (
                  <p id="dob-error" className="mt-1.5 text-xs text-amber-600">
                    {dobError}
                  </p>
                )}
              </div>
              <Button data-tour="page-cta" type="submit" className="w-full disabled:cursor-not-allowed disabled:opacity-50" disabled={touched && !canSubmit}>
                {t("biorhythm.tool.reveal", { defaultValue: "Calculate My Biorhythms" })}
              </Button>
            </form>
          </GlassCard>
          <PageFeatureHint
            pageKey="biorhythm"
            titleKey="page_hint.biorhythm.title"
            titleDefault="Calculate your biorhythms"
            bodyKey="page_hint.biorhythm.body"
            bodyDefault="Enter your birth date, then tap here to see your physical, emotional, and intellectual cycles."
            target='[data-tour="page-cta"]'
          />
        </div>
      </FeatureGate>
    </div>
  );
}
