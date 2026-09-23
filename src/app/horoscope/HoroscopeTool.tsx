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

export function HoroscopeTool() {
  const [selected, setSelected] = useState<ZodiacSign | null>(null);
  const [dob, setDob] = useState("");
  const [dobError, setDobError] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const { checkinHoroscope, recordAction } = useGamification();
  const { t } = useTranslation();

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
    setSelected(getZodiacByDob(dob).sign);
    setShowPicker(true);
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
          <div className="flex-1">
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
              ariaInvalid={!!dobError}
              className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-3 text-[var(--foreground)] focus:border-purple-400 focus:outline-none"
            />
          </div>
          <button
            onClick={handleDetect}
            className="btn-tap accent-ring w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-strong)] px-5 py-3 text-sm font-semibold transition hover:bg-[var(--surface-strong)] sm:w-auto"
          >
            {t("horoscope.tool.detect_btn")}
          </button>
        </div>
        {dobError && <p className="mb-4 text-xs text-amber-600">{dobError}</p>}

        {showPicker && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-semibold uppercase tracking-widest text-muted-soft">{t("horoscope.tool.or_pick")}</h2>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
              {ZODIAC_SIGNS.map((z) => (
                <button
                  key={z.sign}
                  onClick={() => setSelected(z.sign)}
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
          </>
        )}
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
