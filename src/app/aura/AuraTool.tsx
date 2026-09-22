"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { validateDob } from "@/lib/validation";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { DateOfBirthInput } from "@/components/ui/DateOfBirthInput";
import { useTranslation } from "@/lib/I18nContext";

export function AuraTool() {
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
    
    // Redirect to result page
    router.push(`/result/aura?dob=${dob}`);
  };

  return (
    <div className="mx-auto max-w-xl">
      <GlassCard className="p-8">
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div>
            <label htmlFor="dob" className="mb-1.5 block text-sm text-muted">
              {t("aura.tool.dob", { defaultValue: "Date of Birth" })}
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
          <Button type="submit" className="w-full disabled:cursor-not-allowed disabled:opacity-50" disabled={touched && !canSubmit}>
            {t("aura.tool.reveal", { defaultValue: "Reveal My Aura Color" })}
          </Button>
        </form>
      </GlassCard>
    </div>
  );
}
