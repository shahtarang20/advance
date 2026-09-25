"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CITY_GROUPS, type CityInfo } from "@/data/cities";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { DateOfBirthInput } from "@/components/ui/DateOfBirthInput";
import { useTranslation } from "@/lib/I18nContext";
import { loadBirthProfile, saveBirthProfile } from "@/lib/birthProfile";
import { PageFeatureHint } from "@/components/PageFeatureHint";
import { FieldTapHint } from "@/components/FieldTapHint";
import { useFieldHint } from "@/lib/fieldHints";
import { usePrivacyGuard } from "@/lib/PrivacyGuard";

export function KundliTool() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [time, setTime] = useState("");
  const nameHint = useFieldHint("kundli-name");
  const dobHint = useFieldHint("kundli-dob");
  const timeHint = useFieldHint("kundli-time");
  const placeHint = useFieldHint("kundli-place");
  const [citySearch, setCitySearch] = useState("");
  const [selectedCity, setSelectedCity] = useState<CityInfo | null>(null);
  const [showCustom, setShowCustom] = useState(false);
  const [customLat, setCustomLat] = useState("");
  const [customLng, setCustomLng] = useState("");
  const [customOffset, setCustomOffset] = useState("5.5");
  const [touched, setTouched] = useState(false);
  const { t } = useTranslation();
  const { wrapAction } = usePrivacyGuard();

  // Prefill from a previously-saved birth profile (from this tool or Numerology/Horoscope), if
  // any — done after mount, not as the initial state, so the server-rendered and first-client-
  // rendered markup still match.
  useEffect(() => {
    const saved = loadBirthProfile();
    if (saved.name) setName(saved.name);
    if (saved.dob) setDob(saved.dob);
    if (saved.time) setTime(saved.time);
    if (saved.place) {
      if (saved.place.mode === "city") {
        setSelectedCity({
          name: saved.place.cityName ?? "",
          state: saved.place.cityState ?? "",
          country: saved.place.cityCountry ?? "",
          lat: saved.place.lat,
          lng: saved.place.lng,
          tz: saved.place.tz ?? "",
        });
      } else {
        setShowCustom(true);
        setCustomLat(String(saved.place.lat));
        setCustomLng(String(saved.place.lng));
        if (saved.place.utcOffsetMinutes !== undefined) {
          setCustomOffset(String(saved.place.utcOffsetMinutes / 60));
        }
      }
    }
  }, []);

  const groupedFilteredCities = useMemo(() => {
    if (!citySearch.trim()) return [];
    const q = citySearch.trim().toLowerCase();
    return CITY_GROUPS.map((g) => ({
      country: g.country,
      cities: g.cities
        .filter((c) => c.name.toLowerCase().includes(q) || c.state.toLowerCase().includes(q))
        .slice(0, 8),
    })).filter((g) => g.cities.length > 0);
  }, [citySearch]);

  const place = showCustom
    ? customLat && customLng && customOffset
      ? { lat: Number(customLat), lng: Number(customLng), utcOffsetMinutes: Math.round(Number(customOffset) * 60) }
      : null
    : selectedCity
      ? { lat: selectedCity.lat, lng: selectedCity.lng, tz: selectedCity.tz }
      : null;

  const canSubmit = !!name.trim() && !!dob && !!time && !!place;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!canSubmit || !place) return;
    const locationParams: Record<string, string> = showCustom
      ? { utcOffset: String((place as { utcOffsetMinutes: number }).utcOffsetMinutes) }
      : { tz: (place as { tz: string }).tz };
    const params = new URLSearchParams({
      name: name.trim(),
      dob,
      time,
      lat: String(place.lat),
      lng: String(place.lng),
      ...locationParams,
    });
    saveBirthProfile({
      name: name.trim(),
      dob,
      time,
      place: showCustom
        ? { mode: "custom", lat: place.lat, lng: place.lng, utcOffsetMinutes: (place as { utcOffsetMinutes: number }).utcOffsetMinutes }
        : {
            mode: "city",
            lat: place.lat,
            lng: place.lng,
            tz: (place as { tz: string }).tz,
            cityName: selectedCity?.name,
            cityState: selectedCity?.state,
            cityCountry: selectedCity?.country,
          },
    });
    router.push(`/result/kundli?${params.toString()}`);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <GlassCard className="p-8">
        <form onSubmit={wrapAction(handleSubmit)} noValidate className="space-y-5">
          <div className="relative">
            <label htmlFor="k-name" className="mb-1.5 block text-sm text-muted">
              {t("kundli.tool.name_label", { defaultValue: "Full name (optional, for personalization)" })}
            </label>
            <input
              id="k-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={nameHint.dismiss}
              placeholder={t("kundli.tool.name_placeholder", { defaultValue: "Your name" })}
              className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-3 text-[var(--foreground)] placeholder:text-muted-soft focus:border-purple-400 focus:outline-none"
            />
            {nameHint.show && !name && <FieldTapHint className="right-3 top-11" />}
          </div>
          <div className="relative">
            <label htmlFor="k-dob" className="mb-1.5 block text-sm text-muted">
              {t("kundli.tool.dob_label", { defaultValue: "Date of birth" })}
            </label>
            <DateOfBirthInput
              id="k-dob"
              value={dob}
              onChange={setDob}
              onFocus={dobHint.dismiss}
              className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-3 text-[var(--foreground)] focus:border-purple-400 focus:outline-none"
            />
            {dobHint.show && !dob && <FieldTapHint className="right-3 top-11" />}
          </div>
          <div className="relative">
            <label htmlFor="k-time" className="mb-1.5 block text-sm text-muted">
              {t("kundli.tool.time_label", { defaultValue: "Exact time of birth" })}
            </label>
            <input
              id="k-time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              onFocus={timeHint.dismiss}
              className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-3 text-[var(--foreground)] focus:border-purple-400 focus:outline-none [color-scheme:light]"
            />
            {timeHint.show && !time && <FieldTapHint className="right-3 top-11" />}
            <p className="mt-1.5 text-xs text-muted-soft">
              {t("kundli.tool.time_warning", {
                defaultValue:
                  "Your Lagna (ascendant) shifts roughly one degree every four minutes — please use your exact birth time, not an approximation.",
              })}
            </p>
          </div>

          <div>
            <label htmlFor="k-place" className="mb-1.5 block text-sm text-muted">
              {t("kundli.tool.place_label", { defaultValue: "Birth place" })}
            </label>
            {!showCustom ? (
              <div className="relative">
                <input
                  id="k-place"
                  type="text"
                  value={selectedCity ? `${selectedCity.name}, ${selectedCity.state}` : citySearch}
                  onChange={(e) => {
                    setSelectedCity(null);
                    setCitySearch(e.target.value);
                  }}
                  onFocus={placeHint.dismiss}
                  placeholder={t("kundli.tool.city_placeholder", { defaultValue: "Search a city (e.g. Jaipur, New York, Paris)" })}
                  autoComplete="off"
                  className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-3 text-[var(--foreground)] placeholder:text-muted-soft focus:border-purple-400 focus:outline-none"
                />
                {placeHint.show && !citySearch && !selectedCity && <FieldTapHint className="right-3 top-3" />}
                {groupedFilteredCities.length > 0 && !selectedCity && (
                  <ul className="surface-glass mt-1.5 max-h-56 overflow-y-auto rounded-xl border">
                    {groupedFilteredCities.map((g) => (
                      <li key={g.country}>
                        <p className="sticky top-0 bg-[var(--surface)] px-4 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted-soft">
                          {g.country}
                        </p>
                        <ul>
                          {g.cities.map((c) => (
                            <li key={`${c.name}-${c.state}-${c.country}`}>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedCity(c);
                                  setCitySearch("");
                                }}
                                className="block w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--surface)]"
                              >
                                {c.name}, {c.state}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                )}
                <button
                  type="button"
                  onClick={() => setShowCustom(true)}
                  className="mt-2 text-xs text-purple-600 underline"
                >
                  {t("kundli.tool.manual_coords_link", { defaultValue: "My city isn’t listed — enter coordinates manually" })}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="number"
                    step="any"
                    value={customLat}
                    onChange={(e) => setCustomLat(e.target.value)}
                    placeholder={t("kundli.tool.lat_placeholder", { defaultValue: "Latitude" })}
                    className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] px-3 py-3 text-sm text-[var(--foreground)] placeholder:text-muted-soft focus:border-purple-400 focus:outline-none"
                  />
                  <input
                    type="number"
                    step="any"
                    value={customLng}
                    onChange={(e) => setCustomLng(e.target.value)}
                    placeholder={t("kundli.tool.lng_placeholder", { defaultValue: "Longitude" })}
                    className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] px-3 py-3 text-sm text-[var(--foreground)] placeholder:text-muted-soft focus:border-purple-400 focus:outline-none"
                  />
                  <input
                    type="number"
                    step="any"
                    value={customOffset}
                    onChange={(e) => setCustomOffset(e.target.value)}
                    placeholder={t("kundli.tool.utc_offset_placeholder", { defaultValue: "UTC offset (hrs)" })}
                    className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] px-3 py-3 text-sm text-[var(--foreground)] placeholder:text-muted-soft focus:border-purple-400 focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowCustom(false);
                    setCustomLat("");
                    setCustomLng("");
                  }}
                  className="text-xs text-purple-600 underline"
                >
                  {t("kundli.tool.search_cities_instead", { defaultValue: "Search cities instead" })}
                </button>
              </div>
            )}
            {touched && !place && (
              <p className="mt-1.5 text-xs text-amber-600">
                {t("kundli.tool.place_error", { defaultValue: "Please select or enter a birth place." })}
              </p>
            )}
          </div>

          <Button data-tour="page-cta" type="submit" className="w-full disabled:cursor-not-allowed disabled:opacity-50" disabled={touched && !canSubmit}>
            {t("kundli.tool.submit", { defaultValue: "Generate My Kundli →" })}
          </Button>
        </form>
      </GlassCard>
      <PageFeatureHint
        pageKey="kundli"
        titleKey="page_hint.kundli.title"
        titleDefault="Generate your Kundli"
        bodyKey="page_hint.kundli.body"
        bodyDefault="Fill in your birth details, then tap here for your full Kundli chart."
        target='[data-tour="page-cta"]'
      />
    </div>
  );
}
