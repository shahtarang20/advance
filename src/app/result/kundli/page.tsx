import type { Metadata } from "next";
import Link from "next/link";
import { calculateKundli, RASHI_ENGLISH, formatDegree, type Graha } from "@/lib/kundli";
import {
  MOON_RASHI_MEANING,
  LAGNA_MEANING,
  SUN_RASHI_MEANING,
  moonRashiMeaningKey,
  lagnaMeaningKey,
  sunRashiMeaningKey,
} from "@/lib/kundliInterpretations";
import { getNakshatraBySlug } from "@/lib/nakshatra";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { KundliChartGrid } from "@/components/KundliChartGrid";
import { KundliResultTracker } from "./KundliResultTracker";
import { RecentActivityTracker } from "@/components/RecentActivityTracker";
import { GrahaInRashiLine } from "./GrahaInRashiLine";
import { ShareButtons } from "@/components/ShareButtons";
import { Trans } from "@/components/Trans";

type SP = { name?: string; dob?: string; time?: string; lat?: string; lng?: string; tz?: string; utcOffset?: string };

function parseInput(sp: SP) {
  if (!sp.name || !sp.dob || !sp.time || !sp.lat || !sp.lng || (!sp.tz && !sp.utcOffset)) return null;
  const lat = Number(sp.lat);
  const lng = Number(sp.lng);
  if (Number.isNaN(lat) || Number.isNaN(lng)) return null;
  if (sp.tz) {
    return { name: sp.name, dob: sp.dob, time: sp.time, lat, lng, tz: sp.tz };
  }
  const utcOffsetMinutes = Number(sp.utcOffset);
  if (Number.isNaN(utcOffsetMinutes)) return null;
  return { name: sp.name, dob: sp.dob, time: sp.time, lat, lng, utcOffsetMinutes };
}

function toShareParams(input: NonNullable<ReturnType<typeof parseInput>>) {
  return {
    name: input.name,
    dob: input.dob,
    time: input.time,
    lat: String(input.lat),
    lng: String(input.lng),
    ...("tz" in input && input.tz ? { tz: input.tz } : { utcOffset: String((input as { utcOffsetMinutes?: number }).utcOffsetMinutes ?? 0) }),
  };
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<SP> }): Promise<Metadata> {
  const sp = await searchParams;
  const input = parseInput(sp);
  if (!input) {
    return { title: "Kundli — Vedic Birth Chart", alternates: { canonical: "/result/kundli" } };
  }
  const chart = calculateKundli(input);
  const moonRashi = RASHI_ENGLISH[chart.moon.rashi];
  const title = `${input.name}'s Kundli — Moon in ${moonRashi}, ${chart.moonNakshatra.name} Nakshatra`;
  const description = `${input.name}'s Vedic birth chart: Lagna ${RASHI_ENGLISH[chart.lagnaRashi]}, Moon Rashi ${moonRashi}, Janam Nakshatra ${chart.moonNakshatra.name}. See the full free Kundli.`;
  const ogUrl = `/api/og?type=kundli&title=${encodeURIComponent(input.name)}&subtitle=${encodeURIComponent(
    `Moon in ${moonRashi} · ${chart.moonNakshatra.name} Nakshatra`
  )}`;
  const qs = new URLSearchParams(toShareParams(input)).toString();
  return {
    title,
    description,
    alternates: { canonical: `/result/kundli?${qs}` },
    openGraph: { title, description, images: [{ url: ogUrl, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: [ogUrl] },
  };
}

const GRAHA_ORDER: Graha[] = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"];

export default async function KundliResultPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const input = parseInput(sp);

  if (!input) {
    return (
      <div className="px-6 py-24 text-center">
        <p className="text-muted">
          <Trans tKey="kundli.result.no_kundli" replacements={{ defaultValue: "No Kundli found." }} />
        </p>
        <Link href="/kundli" className="mt-4 inline-block text-purple-600 underline">
          <Trans tKey="kundli.result.generate_own_link" replacements={{ defaultValue: "Generate your own Kundli →" }} />
        </Link>
      </div>
    );
  }

  const chart = calculateKundli(input);
  const moonNakshatra = getNakshatraBySlug(chart.moonNakshatra.slug) ?? chart.moonNakshatra;
  const moonRashiEn = RASHI_ENGLISH[chart.moon.rashi];
  const lagnaRashiEn = RASHI_ENGLISH[chart.lagnaRashi];
  const sunPlanet = chart.planets.find((p) => p.graha === "Sun")!;

  const shareUrl = `/result/kundli?${new URLSearchParams(toShareParams(input)).toString()}`;
  const ogQuery = `type=kundli&title=${encodeURIComponent(input.name)}&subtitle=${encodeURIComponent(
    `Moon in ${moonRashiEn} · ${moonNakshatra.name} Nakshatra`
  )}`;

  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-16">
      <KundliResultTracker />
      <RecentActivityTracker id="kundli" href={shareUrl} labelKey="nav.kundli" labelDefault="Kundli" icon="🕉️" />
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          <Trans tKey="kundli.result.heading" replacements={{ name: input.name, defaultValue: "{name}’s Janam Kundli" }} />
        </h1>
        <p className="mt-3 text-muted">
          <Trans tKey="kundli.result.lagna_label" replacements={{ defaultValue: "Lagna:" }} /> <strong>{lagnaRashiEn}</strong> ·{" "}
          <Trans tKey="kundli.result.moon_rashi_label" replacements={{ defaultValue: "Moon Rashi:" }} /> <strong>{moonRashiEn}</strong> ·{" "}
          <Trans tKey="kundli.result.nakshatra_label" replacements={{ defaultValue: "Nakshatra:" }} />{" "}
          <strong>{moonNakshatra.name}</strong> (
          <Trans tKey="kundli.result.pada_label" replacements={{ defaultValue: "Pada" }} /> {chart.moonNakshatraPada})
        </p>
      </div>

      <GlassCard className="mt-10 p-6 sm:p-8">
        <KundliChartGrid planets={chart.planets} lagnaRashiIndex={chart.lagnaRashiIndex} />
      </GlassCard>

      <GlassCard className="mt-8 overflow-x-auto p-6 sm:p-8">
        <h2 className="text-lg font-semibold">
          <Trans tKey="kundli.result.graha_positions_title" replacements={{ defaultValue: "Graha Positions" }} />
        </h2>
        <table className="mt-4 w-full text-left text-sm">
          <thead>
            <tr className="text-muted-soft">
              <th className="py-2 pr-3 font-medium">
                <Trans tKey="kundli.chart.graha" replacements={{ defaultValue: "Graha" }} />
              </th>
              <th className="py-2 pr-3 font-medium">
                <Trans tKey="kundli.chart.rashi" replacements={{ defaultValue: "Rashi" }} />
              </th>
              <th className="py-2 pr-3 font-medium">
                <Trans tKey="kundli.chart.degree" replacements={{ defaultValue: "Degree" }} />
              </th>
              <th className="py-2 font-medium">
                <Trans tKey="kundli.chart.house" replacements={{ defaultValue: "House" }} />
              </th>
            </tr>
          </thead>
          <tbody>
            {GRAHA_ORDER.map((g) => {
              const p = chart.planets.find((pl) => pl.graha === g)!;
              return (
                <tr key={g} className="border-t border-[var(--surface-border)]">
                  <td className="py-2 pr-3 font-medium">
                    <Trans tKey={`kundli.graha.${g.toLowerCase()}`} replacements={{ defaultValue: g }} />
                  </td>
                  <td className="py-2 pr-3">
                    <Trans
                      tKey={`zodiac.${RASHI_ENGLISH[p.rashi].toLowerCase()}`}
                      replacements={{ defaultValue: RASHI_ENGLISH[p.rashi] }}
                    />
                  </td>
                  <td className="py-2 pr-3 text-muted">{formatDegree(p.degreeInRashi)}</td>
                  <td className="py-2 text-muted">{p.house}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </GlassCard>

      <GlassCard className="mt-8 p-6 sm:p-8">
        <h2 className="text-lg font-semibold">
          <Trans tKey="kundli.result.moon_rashi_nakshatra_title" replacements={{ defaultValue: "Your Moon Rashi & Nakshatra" }} />
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          <Trans
            tKey={moonRashiMeaningKey(chart.moon.rashi)}
            replacements={{ defaultValue: MOON_RASHI_MEANING[chart.moon.rashi] }}
          />
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          <Trans
            tKey="kundli.result.nakshatra_intro"
            replacements={{
              name: moonNakshatra.name,
              ruler: moonNakshatra.rulingPlanet,
              deity: moonNakshatra.deity,
              symbol: moonNakshatra.symbol,
              defaultValue: `Your Janam Nakshatra is {name}, ruled by {ruler}, with the deity {deity} and symbol {symbol}.`,
            }}
          />{" "}
          <Trans
            tKey={`nakshatra.desc.${moonNakshatra.slug}`}
            replacements={{ defaultValue: moonNakshatra.description }}
          />
        </p>
        <Link href={`/nakshatra/${moonNakshatra.slug}`} className="mt-3 inline-block text-sm text-purple-600 underline">
          <Trans
            tKey="kundli.result.read_more_nakshatra_link"
            replacements={{ name: moonNakshatra.name, defaultValue: "Read more about {name} Nakshatra →" }}
          />
        </Link>
      </GlassCard>

      <GlassCard className="mt-8 p-6 sm:p-8">
        <h2 className="text-lg font-semibold">
          <Trans tKey="kundli.result.lagna_title" replacements={{ defaultValue: "Your Lagna (Ascendant)" }} />
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          <Trans tKey={lagnaMeaningKey(chart.lagnaRashi)} replacements={{ defaultValue: LAGNA_MEANING[chart.lagnaRashi] }} />
        </p>
      </GlassCard>

      <GlassCard className="mt-8 p-6 sm:p-8">
        <h2 className="text-lg font-semibold">
          <Trans tKey="kundli.result.sun_rashi_title" replacements={{ defaultValue: "Your Sun Rashi" }} />
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          <Trans tKey={sunRashiMeaningKey(sunPlanet.rashi)} replacements={{ defaultValue: SUN_RASHI_MEANING[sunPlanet.rashi] }} />
        </p>
      </GlassCard>

      <GlassCard className="mt-8 p-6 sm:p-8">
        <h2 className="text-lg font-semibold">
          <Trans tKey="kundli.result.other_grahas_title" replacements={{ defaultValue: "Other Grahas" }} />
        </h2>
        <div className="mt-4 space-y-3">
          {GRAHA_ORDER.filter((g) => g !== "Sun" && g !== "Moon").map((g) => {
            const p = chart.planets.find((pl) => pl.graha === g)!;
            return (
              <GrahaInRashiLine
                key={g}
                graha={g}
                grahaEnglish={g}
                rashi={p.rashi}
                rashiEnglish={RASHI_ENGLISH[p.rashi]}
                house={p.house}
              />
            );
          })}
        </div>
      </GlassCard>

      <div className="mt-10 space-y-6 text-center">
        <ShareButtons
          shareUrl={shareUrl}
          ogQuery={ogQuery}
          caption={`My Kundli: Moon in ${moonRashiEn}, ${moonNakshatra.name} Nakshatra — see yours free on Cosmic Numbers:`}
        />
        <Button href="/kundli">
          <Trans tKey="kundli.result.generate_own_btn" replacements={{ defaultValue: "Generate Your Own Kundli →" }} />
        </Button>
      </div>

      <p className="mx-auto mt-10 max-w-xl text-center text-xs text-muted-soft">
        <Trans
          tKey="kundli.result.privacy_note"
          replacements={{
            defaultValue:
              "Calculated on-demand from real planetary positions using the Lahiri ayanamsa and whole-sign houses. Nothing about your birth details is stored on our servers — this chart is computed fresh each time from the link’s parameters.",
          }}
        />
      </p>
    </div>
  );
}
