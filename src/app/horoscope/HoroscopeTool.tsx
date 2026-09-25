"use client";

import { useEffect, useState } from "react";
import { getDailyHoroscope, getZodiacByDob, getZodiacInfo, ZODIAC_SIGNS, ZodiacSign } from "@/lib/horoscope";
import { validateDob } from "@/lib/validation";
import { GlassCard } from "@/components/ui/GlassCard";
import { DateOfBirthInput } from "@/components/ui/DateOfBirthInput";
import { HoroscopeCard } from "@/components/HoroscopeCard";
import { ShareButtons } from "@/components/ShareButtons";
import { useGamification } from "@/lib/gamification";
import { useTranslation } from "@/lib/I18nContext";
import { loadBirthProfile, saveBirthProfile } from "@/lib/birthProfile";
import { PageFeatureHint } from "@/components/PageFeatureHint";
import { FieldTapHint } from "@/components/FieldTapHint";
import { useFieldHint } from "@/lib/fieldHints";
import { usePrivacyGuard } from "@/lib/PrivacyGuard";

export function HoroscopeTool() {
  const [selected, setSelected] = useState<ZodiacSign | null>(null);
  const [dob, setDob] = useState("");
  const [dobError, setDobError] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const { checkinHoroscope, recordAction } = useGamification();
  const { t } = useTranslation();
  const dobHint = useFieldHint("horoscope-dob");
  const { wrapAction } = usePrivacyGuard();

  const [detectedSign, setDetectedSign] = useState<ZodiacSign | null>(null);

  // Prefill from a previously-saved birth profile, if the user has one from Kundli/Numerology.
  useEffect(() => {
    const saved = loadBirthProfile();
    if (saved.dob) setDob(saved.dob);
  }, []);

  useEffect(() => {
    if (selected) {
      checkinHoroscope(selected);
      recordAction("zodiac_profile_view");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const handleDetect = () => {
    const error = validateDob(dob);
    setDobError(error);
    if (error) return;
    const sign = getZodiacByDob(dob).sign;
    setDetectedSign(sign);
    saveBirthProfile({ dob });
  };

  const info = selected ? getZodiacInfo(selected) : null;
  const horoscope = selected ? getDailyHoroscope(selected) : null;

  const shareUrl = selected ? `${typeof window !== "undefined" ? window.location.origin : ""}/result/horoscope?sign=${selected}` : "";
  const ogQuery = selected && horoscope
    ? `type=horoscope&sign=${selected}&title=${encodeURIComponent(info!.name)}&subtitle=${encodeURIComponent(horoscope.mood + " day ahead")}&text=${encodeURIComponent(horoscope.love)}`
    : "";

  return (
    <div className="mx-auto max-w-3xl">
      <GlassCard className="p-8">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-soft">{t("horoscope.tool.find_sign")}</h2>
        <div className="mb-2 flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="relative flex-1">
            <label htmlFor="horoscope-dob" className="mb-1.5 block text-sm text-muted">
              {t("horoscope.tool.dont_know")}
            </label>
            <DateOfBirthInput
              id="horoscope-dob"
              value={dob}
              onChange={(v) => {
                setDob(v);
                if (dobError) setDobError(null);
              }}
              onFocus={dobHint.dismiss}
              ariaInvalid={!!dobError}
              className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-3 text-[var(--foreground)] focus:border-purple-400 focus:outline-none"
            />
            {dobHint.show && !dob && <FieldTapHint className="right-3 top-11" />}
          </div>
          <button
            data-tour="page-cta"
            onClick={handleDetect}
            className="btn-tap accent-ring w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-strong)] px-5 py-3 text-sm font-semibold transition hover:bg-[var(--surface-strong)] sm:w-auto"
          >
            {t("horoscope.tool.detect_btn")}
          </button>
        </div>
        <PageFeatureHint
          pageKey="horoscope"
          titleKey="page_hint.horoscope.title"
          titleDefault="Find your sign"
          bodyKey="page_hint.horoscope.body"
          bodyDefault="Enter your birth date and tap here — or pick your zodiac sign directly below."
          target='[data-tour="page-cta"]'
        />
        {dobError && <p className="mb-4 text-xs text-amber-600">{dobError}</p>}

        <h2 className="mb-3 mt-6 text-xs font-semibold uppercase tracking-widest text-muted-soft">
          {detectedSign 
            ? t("horoscope.tool.detected_choose", { sign: t(`zodiac.${detectedSign}`), defaultValue: `Detected: ${t(`zodiac.${detectedSign}`)} — Choose your Rasi below to read your Horoscope` })
            : t("horoscope.tool.choose_manual", { defaultValue: "Choose your Rasi (Zodiac Sign) manually" })}
        </h2>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {ZODIAC_SIGNS.map((z) => (
            <button
              key={z.sign}
              onClick={wrapAction(() => setSelected(z.sign))}
              className={`btn-tap accent-ring flex flex-col items-center gap-1 rounded-2xl border p-3 text-sm transition ${
                selected === z.sign
                  ? "border-purple-400 bg-purple-500/20"
                  : "border-[var(--surface-border)] bg-[var(--surface)] hover:bg-[var(--surface-strong)]"
              }`}
            >
              <span className="text-2xl">{z.glyph}</span>
              {t(`zodiac.${z.sign}`)}
            </button>
          ))}
        </div>
      </GlassCard>

      {info && horoscope && (
        <div className="mt-10 space-y-6">
          <HoroscopeCard info={info} horoscope={horoscope} />
          <ShareButtons
            shareUrl={shareUrl}
            ogQuery={ogQuery}
            caption={`${info.name} horoscope for today: ${horoscope.mood} mood, lucky number ${horoscope.luckyNumber}. See yours on Cosmic Numbers:`}
          />
        </div>
      )}
    </div>
  );
}
