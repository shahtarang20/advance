"use client";

import { useState } from "react";
import { calculateCompatibility, CompatibilityResult } from "@/lib/compatibility";
import { validateDob, validateName } from "@/lib/validation";
import { GlassCard } from "@/components/ui/GlassCard";
import { CompatibilityCard } from "@/components/CompatibilityCard";
import { ShareButtons } from "@/components/ShareButtons";
import { Button } from "@/components/ui/Button";
import { useGamification } from "@/lib/gamification";

export function CompatibilityTool() {
  const [nameA, setNameA] = useState("");
  const [dobA, setDobA] = useState("");
  const [nameB, setNameB] = useState("");
  const [dobB, setDobB] = useState("");
  const [touched, setTouched] = useState(false);
  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [samePerson, setSamePerson] = useState(false);
  const { recordAction } = useGamification();

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
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm text-muted">Your Name</label>
              <input
                value={nameA}
                onChange={(e) => setNameA(e.target.value)}
                placeholder="e.g. Tarang"
                aria-invalid={touched && !!nameAError}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-[var(--foreground)] placeholder:text-muted-soft focus:border-purple-400 focus:outline-none"
              />
              {touched && nameAError && <p className="mt-1.5 text-xs text-amber-300">{nameAError}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-muted">Your DOB</label>
              <input
                type="date"
                value={dobA}
                onChange={(e) => setDobA(e.target.value)}
                aria-invalid={touched && !!dobAError}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-[var(--foreground)] focus:border-purple-400 focus:outline-none [color-scheme:dark]"
              />
              {touched && dobAError && <p className="mt-1.5 text-xs text-amber-300">{dobAError}</p>}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm text-muted">Their Name</label>
              <input
                value={nameB}
                onChange={(e) => setNameB(e.target.value)}
                placeholder="e.g. Aanya"
                aria-invalid={touched && !!nameBError}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-[var(--foreground)] placeholder:text-muted-soft focus:border-purple-400 focus:outline-none"
              />
              {touched && nameBError && <p className="mt-1.5 text-xs text-amber-300">{nameBError}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-muted">Their DOB</label>
              <input
                type="date"
                value={dobB}
                onChange={(e) => setDobB(e.target.value)}
                aria-invalid={touched && !!dobBError}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-[var(--foreground)] focus:border-purple-400 focus:outline-none [color-scheme:dark]"
              />
              {touched && dobBError && <p className="mt-1.5 text-xs text-amber-300">{dobBError}</p>}
            </div>
          </div>
          <Button type="submit" className="w-full disabled:cursor-not-allowed disabled:opacity-50" disabled={touched && !canSubmit}>
            Check Compatibility
          </Button>
        </form>
      </GlassCard>

      {result && (
        <div className="mt-10 space-y-6">
          {samePerson && (
            <p className="text-center text-xs text-muted-soft">
              Looks like you entered the same name and date of birth twice — here&apos;s what the numbers say about
              that anyway.
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
