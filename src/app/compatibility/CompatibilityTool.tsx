"use client";

import { useState, useEffect } from "react";
import { calculateCompatibility, CompatibilityResult } from "@/lib/compatibility";
import { validateDob, validateName } from "@/lib/validation";
import { GlassCard } from "@/components/ui/GlassCard";
import { DateOfBirthInput } from "@/components/ui/DateOfBirthInput";
import { CompatibilityCard } from "@/components/CompatibilityCard";
import { ShareButtons } from "@/components/ShareButtons";
import { Button } from "@/components/ui/Button";
import { useGamification } from "@/lib/gamification";
import { useTranslation } from "@/lib/I18nContext";
import { PageFeatureHint } from "@/components/PageFeatureHint";
import { markLoveMatchSeen } from "@/lib/loveMatchHighlight";
import { FieldTapHint } from "@/components/FieldTapHint";
import { useFieldHint } from "@/lib/fieldHints";
import { usePrivacyGuard } from "@/lib/PrivacyGuard";

export function CompatibilityTool() {
  const [nameA, setNameA] = useState("");
  const [dobA, setDobA] = useState("");
  const [nameB, setNameB] = useState("");
  const [dobB, setDobB] = useState("");
  const [touched, setTouched] = useState(false);
  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [samePerson, setSamePerson] = useState(false);
  const { recordAction } = useGamification();
  const { t } = useTranslation();
  const nameAHint = useFieldHint("compat-nameA");
  const dobAHint = useFieldHint("compat-dobA");
  const nameBHint = useFieldHint("compat-nameB");
  const dobBHint = useFieldHint("compat-dobB");
  const { wrapAction } = usePrivacyGuard();

  useEffect(() => {
    markLoveMatchSeen();
  }, []);

  const nameAError = validateName(nameA);
  const dobAError = validateDob(dobA);
  const nameBError = validateName(nameB);
  const dobBError = validateDob(dobB);
  const canSubmit = !nameAError && !dobAError && !nameBError && !dobBError;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!canSubmit) return;
    const r = calculateCompatibility(nameA.trim(), dobA, nameB.trim(), dobB);
    setResult(r);
    setSamePerson(nameA.trim().toLowerCase() === nameB.trim().toLowerCase() && dobA === dobB);
    recordAction("compatibility_check", { percentage: r.percentage });
  };

  const shareUrl = result
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/result/compatibility?nameA=${encodeURIComponent(nameA)}&dobA=${dobA}&nameB=${encodeURIComponent(nameB)}&dobB=${dobB}`
    : "";
  const ogQuery = result
    ? `type=compatibility&title=${encodeURIComponent(`${nameA} & ${nameB}`)}&subtitle=${result.percentage}%25%20Match&big=${result.percentage}%25&text=${encodeURIComponent(result.verdict)}`
    : "";

  return (
    <div className="mx-auto max-w-2xl">
      <GlassCard className="p-8">
        <form onSubmit={wrapAction(handleSubmit)} noValidate className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative">
              <label className="mb-1.5 block text-sm text-muted">{t("comp.tool.your_name")}</label>
              <input
                value={nameA}
                onChange={(e) => setNameA(e.target.value)}
                onFocus={nameAHint.dismiss}
                placeholder={t("comp.tool.your_name_ph")}
                aria-invalid={touched && !!nameAError}
                className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-3 text-[var(--foreground)] placeholder:text-muted-soft focus:border-purple-400 focus:outline-none"
              />
              {nameAHint.show && !nameA && <FieldTapHint className="right-3 top-11" />}
              {touched && nameAError && <p className="mt-1.5 text-xs text-amber-600">{nameAError}</p>}
            </div>
            <div className="relative">
              <label className="mb-1.5 block text-sm text-muted">{t("comp.tool.your_dob")}</label>
              <DateOfBirthInput
                value={dobA}
                onChange={setDobA}
                onFocus={dobAHint.dismiss}
                ariaInvalid={touched && !!dobAError}
                className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-3 text-[var(--foreground)] focus:border-purple-400 focus:outline-none"
              />
              {dobAHint.show && !dobA && <FieldTapHint className="right-3 top-11" />}
              {touched && dobAError && <p className="mt-1.5 text-xs text-amber-600">{dobAError}</p>}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative">
              <label className="mb-1.5 block text-sm text-muted">{t("comp.tool.their_name")}</label>
              <input
                value={nameB}
                onChange={(e) => setNameB(e.target.value)}
                onFocus={nameBHint.dismiss}
                placeholder={t("comp.tool.their_name_ph")}
                aria-invalid={touched && !!nameBError}
                className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-3 text-[var(--foreground)] placeholder:text-muted-soft focus:border-purple-400 focus:outline-none"
              />
              {nameBHint.show && !nameB && <FieldTapHint className="right-3 top-11" />}
              {touched && nameBError && <p className="mt-1.5 text-xs text-amber-600">{nameBError}</p>}
            </div>
            <div className="relative">
              <label className="mb-1.5 block text-sm text-muted">{t("comp.tool.their_dob")}</label>
              <DateOfBirthInput
                value={dobB}
                onChange={setDobB}
                onFocus={dobBHint.dismiss}
                ariaInvalid={touched && !!dobBError}
                className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-3 text-[var(--foreground)] focus:border-purple-400 focus:outline-none"
              />
              {dobBHint.show && !dobB && <FieldTapHint className="right-3 top-11" />}
              {touched && dobBError && <p className="mt-1.5 text-xs text-amber-600">{dobBError}</p>}
            </div>
          </div>
          <Button data-tour="page-cta" type="submit" className="w-full disabled:cursor-not-allowed disabled:opacity-50" disabled={touched && !canSubmit}>
            {t("comp.tool.check_btn")}
          </Button>
        </form>
      </GlassCard>
      <PageFeatureHint
        pageKey="compatibility"
        titleKey="page_hint.compatibility.title"
        titleDefault="Check your compatibility"
        bodyKey="page_hint.compatibility.body"
        bodyDefault="Enter both names and birth dates, then tap here to see your compatibility score."
        target='[data-tour="page-cta"]'
      />

      {result && (
        <div className="mt-10 space-y-6">
          {samePerson && (
            <p className="text-center text-xs text-muted-soft">
              {t("comp.tool.same_person")}
            </p>
          )}
          <CompatibilityCard result={result} />
          <ShareButtons
            shareUrl={shareUrl}
            ogQuery={ogQuery}
            caption={`${nameA} & ${nameB} scored a ${result.percentage}% cosmic match on Cosmic Numbers. See your own compatibility:`}
          />
        </div>
      )}
    </div>
  );
}
