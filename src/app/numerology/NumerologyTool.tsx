"use client";

import { useState } from "react";
import { calculateNumerologyProfile, NumerologyProfile } from "@/lib/numerology";
import { validateDob, validateName } from "@/lib/validation";
import { GlassCard } from "@/components/ui/GlassCard";
import { DateOfBirthInput } from "@/components/ui/DateOfBirthInput";
import { NumerologyCard } from "@/components/NumerologyCard";
import { ShareButtons } from "@/components/ShareButtons";
import { Button } from "@/components/ui/Button";
import { useGamification } from "@/lib/gamification";
import { useTranslation } from "@/lib/I18nContext";

export function NumerologyTool() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [touched, setTouched] = useState(false);
  const [submitted, setSubmitted] = useState<{ name: string; profile: NumerologyProfile } | null>(null);
  const { recordAction } = useGamification();
  const { t } = useTranslation();

  const nameError = validateName(name);
  const dobError = validateDob(dob);
  const canSubmit = !nameError && !dobError;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!canSubmit) return;
    const profile = calculateNumerologyProfile(name, dob);
    setSubmitted({ name: name.trim(), profile });
    recordAction("numerology_calc");
    recordAction("chaldean_view");
    recordAction("personal_year_view");
    recordAction("pinnacles_view");
    if (profile.karmicDebts.length > 0) recordAction("karmic_debt_view");
  };

  const shareUrl = submitted
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/result/numerology?name=${encodeURIComponent(submitted.name)}&dob=${dob}`
    : "";
  const ogQuery = submitted
    ? `type=numerology&title=${encodeURIComponent(submitted.name)}&subtitle=Life%20Path%20${submitted.profile.lifePath}&big=${submitted.profile.lifePath}&text=${encodeURIComponent("Discover your own numerology reading free")}`
    : "";

  return (
    <div className="mx-auto max-w-2xl">
      <GlassCard className="p-8">
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm text-muted">
              {t("numerology.tool.name")}
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("numerology.tool.name_placeholder")}
              aria-invalid={touched && !!nameError}
              aria-describedby={touched && nameError ? "name-error" : undefined}
              className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-3 text-[var(--foreground)] placeholder:text-muted-soft focus:border-purple-400 focus:outline-none"
            />
            {touched && nameError && (
              <p id="name-error" className="mt-1.5 text-xs text-amber-600">
                {nameError}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="dob" className="mb-1.5 block text-sm text-muted">
              {t("numerology.tool.dob")}
            </label>
            <DateOfBirthInput
              id="dob"
              value={dob}
              onChange={setDob}
              ariaInvalid={touched && !!dobError}
              ariaDescribedBy={touched && dobError ? "dob-error" : undefined}
              className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-3 text-[var(--foreground)] focus:border-purple-400 focus:outline-none"
            />
            {touched && dobError && (
              <p id="dob-error" className="mt-1.5 text-xs text-amber-600">
                {dobError}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full disabled:cursor-not-allowed disabled:opacity-50" disabled={touched && !canSubmit}>
            {t("numerology.tool.reveal_btn")}
          </Button>
        </form>
      </GlassCard>

      {submitted && (
        <div className="mt-10 space-y-6">
          <NumerologyCard name={submitted.name} profile={submitted.profile} />
          <ShareButtons shareUrl={shareUrl} ogQuery={ogQuery} caption={`My Life Path Number is ${submitted.profile.lifePath}, from Cosmic Numbers. See yours:`} />
        </div>
      )}
    </div>
  );
}
