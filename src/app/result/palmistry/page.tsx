import type { Metadata } from "next";
import Link from "next/link";
import {
  getPalmReading,
  Hand,
  HAND_SHAPES,
  handShapeNameKey,
  handShapeTraitsKey,
  heartLineTitleKey,
  heartLineMeaningKey,
  headLineTitleKey,
  headLineMeaningKey,
  lifeLineTitleKey,
  lifeLineMeaningKey,
  fateLineTitleKey,
  fateLineMeaningKey,
  sunLineTitleKey,
  sunLineMeaningKey,
  marriageLineTitleKey,
  marriageLineMeaningKey,
  careerTitleKey,
  careerMeaningKey,
  growthTitleKey,
  growthMeaningKey,
  moneyTitleKey,
  moneyMeaningKey,
  marriageSummaryTitleKey,
  marriageSummaryMeaningKey,
  mountNameKey,
  mountProminentKey,
  mountFlatKey,
} from "@/lib/palmistry";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ShareButtons } from "@/components/ShareButtons";
import { SITE_URL } from "@/lib/site";
import { Trans } from "@/components/Trans";
import { PalmPhotoPreview } from "./PalmPhotoPreview";
import { RecentActivityTracker } from "@/components/RecentActivityTracker";

type SP = { seed?: string; hand?: string };

function isHand(hand?: string): hand is Hand {
  return hand === "left" || hand === "right";
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<SP> }): Promise<Metadata> {
  const { seed, hand } = await searchParams;
  if (!seed || !isHand(hand)) {
    return { title: "Palm Reading", alternates: { canonical: "/result/palmistry" } };
  }
  const reading = getPalmReading(seed, hand);
  const title = `Your Palm Reading — ${reading.heartLine.title} Heart Line`;
  const description = `${reading.heartLine.meaning}`;
  const ogUrl = `/api/og?type=palmistry&title=${encodeURIComponent("Palm Reading")}&subtitle=${encodeURIComponent(reading.heartLine.title)}`;
  return {
    title,
    description,
    alternates: { canonical: `/result/palmistry?seed=${seed}&hand=${hand}` },
    openGraph: { title, description, images: [{ url: ogUrl, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: [ogUrl] },
  };
}

export default async function PalmistryResultPage({ searchParams }: { searchParams: Promise<SP> }) {
  const { seed, hand } = await searchParams;

  if (!seed || !isHand(hand)) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Link href="/palmistry" className="text-purple-600 underline">
          <Trans tKey="palmistry.result.invalid_link" replacements={{ defaultValue: "Please start a new palm reading." }} />
        </Link>
      </div>
    );
  }

  const reading = getPalmReading(seed, hand);
  const shareUrl = `${SITE_URL}/result/palmistry?seed=${seed}&hand=${hand}`;
  const ogQuery = `type=palmistry&title=${encodeURIComponent("Palm Reading")}&subtitle=${encodeURIComponent(reading.heartLine.title)}`;

  const lines = [
    {
      key: "heartLine",
      titleKey: "palmistry.result.heart_line_title",
      titleDefault: "Heart Line",
      variantTitleKey: heartLineTitleKey(reading.heartLine.key),
      variantTitleDefault: reading.heartLine.title,
      meaningKey: heartLineMeaningKey(reading.heartLine.key),
      meaningDefault: reading.heartLine.meaning,
    },
    {
      key: "headLine",
      titleKey: "palmistry.result.head_line_title",
      titleDefault: "Head Line",
      variantTitleKey: headLineTitleKey(reading.headLine.key),
      variantTitleDefault: reading.headLine.title,
      meaningKey: headLineMeaningKey(reading.headLine.key),
      meaningDefault: reading.headLine.meaning,
    },
    {
      key: "lifeLine",
      titleKey: "palmistry.result.life_line_title",
      titleDefault: "Life Line",
      variantTitleKey: lifeLineTitleKey(reading.lifeLine.key),
      variantTitleDefault: reading.lifeLine.title,
      meaningKey: lifeLineMeaningKey(reading.lifeLine.key),
      meaningDefault: reading.lifeLine.meaning,
    },
    {
      key: "fateLine",
      titleKey: "palmistry.result.fate_line_title",
      titleDefault: "Fate Line",
      variantTitleKey: fateLineTitleKey(reading.fateLine.key),
      variantTitleDefault: reading.fateLine.title,
      meaningKey: fateLineMeaningKey(reading.fateLine.key),
      meaningDefault: reading.fateLine.meaning,
    },
    {
      key: "sunLine",
      titleKey: "palmistry.result.sun_line_title",
      titleDefault: "Sun Line",
      variantTitleKey: sunLineTitleKey(reading.sunLine.key),
      variantTitleDefault: reading.sunLine.title,
      meaningKey: sunLineMeaningKey(reading.sunLine.key),
      meaningDefault: reading.sunLine.meaning,
    },
    {
      key: "marriageLine",
      titleKey: "palmistry.result.marriage_line_title",
      titleDefault: "Relationship Lines",
      variantTitleKey: marriageLineTitleKey(reading.marriageLine.key),
      variantTitleDefault: reading.marriageLine.title,
      meaningKey: marriageLineMeaningKey(reading.marriageLine.key),
      meaningDefault: reading.marriageLine.meaning,
    },
  ];

  const quickSections = [
    {
      key: "career",
      titleKey: "palmistry.result.quick.career_title",
      titleDefault: "Career",
      icon: "💼",
      variantTitleKey: careerTitleKey(reading.career.key),
      variantTitleDefault: reading.career.title,
      meaningKey: careerMeaningKey(reading.career.key),
      meaningDefault: reading.career.meaning,
    },
    {
      key: "growth",
      titleKey: "palmistry.result.quick.growth_title",
      titleDefault: "Growth",
      icon: "🌱",
      variantTitleKey: growthTitleKey(reading.growth.key),
      variantTitleDefault: reading.growth.title,
      meaningKey: growthMeaningKey(reading.growth.key),
      meaningDefault: reading.growth.meaning,
    },
    {
      key: "money",
      titleKey: "palmistry.result.quick.money_title",
      titleDefault: "Money",
      icon: "💰",
      variantTitleKey: moneyTitleKey(reading.money.key),
      variantTitleDefault: reading.money.title,
      meaningKey: moneyMeaningKey(reading.money.key),
      meaningDefault: reading.money.meaning,
    },
    {
      key: "marriageSummary",
      titleKey: "palmistry.result.quick.marriage_title",
      titleDefault: "Marriage & Relationships",
      icon: "💞",
      variantTitleKey: marriageSummaryTitleKey(reading.marriageSummary.key),
      variantTitleDefault: reading.marriageSummary.title,
      meaningKey: marriageSummaryMeaningKey(reading.marriageSummary.key),
      meaningDefault: reading.marriageSummary.meaning,
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-6 pb-32 pt-16">
      <RecentActivityTracker
        id="palmistry"
        href={`/result/palmistry?seed=${seed}&hand=${hand}`}
        labelKey="nav.palmistry"
        labelDefault="Palm Reading"
        icon="🤚"
      />
      <PalmPhotoPreview />

      <Reveal>
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-muted-soft">
            <Trans
              tKey={hand === "right" ? "palmistry.result.hand_label_right" : "palmistry.result.hand_label_left"}
              replacements={{ defaultValue: hand === "right" ? "Your Right Hand" : "Your Left Hand" }}
            />
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            <Trans tKey={handShapeNameKey(reading.handShape)} replacements={{ defaultValue: HAND_SHAPES[reading.handShape].name }} />
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            <Trans
              tKey={handShapeTraitsKey(reading.handShape)}
              replacements={{ defaultValue: HAND_SHAPES[reading.handShape].traits }}
            />
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mb-10">
          <h2 className="mb-1 text-center text-xs font-semibold uppercase tracking-widest text-muted-soft">
            <Trans tKey="palmistry.result.quick.section_title" replacements={{ defaultValue: "Your Reading at a Glance" }} />
          </h2>
          <p className="mx-auto mb-5 max-w-md text-center text-xs text-muted-soft">
            <Trans
              tKey="palmistry.result.quick.section_note"
              replacements={{ defaultValue: "A quick read on each area — the full line-by-line reading follows below." }}
            />
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {quickSections.map((section) => (
              <GlassCard key={section.key} className="p-5">
                <h3 className="flex items-center gap-2 text-sm font-semibold">
                  <span className="text-lg">{section.icon}</span>
                  <Trans tKey={section.titleKey} replacements={{ defaultValue: section.titleDefault }} />
                </h3>
                <p className="mt-2 text-sm font-medium text-[var(--accent-solid)]">
                  <Trans tKey={section.variantTitleKey} replacements={{ defaultValue: section.variantTitleDefault }} />
                </p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                  <Trans tKey={section.meaningKey} replacements={{ defaultValue: section.meaningDefault }} />
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="space-y-6">
        {lines.map((line, i) => (
          <Reveal key={line.key} delay={0.05 * i}>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-lg font-semibold">
                <Trans tKey={line.titleKey} replacements={{ defaultValue: line.titleDefault }} /> —{" "}
                <span className="text-[var(--accent-solid)]">
                  <Trans tKey={line.variantTitleKey} replacements={{ defaultValue: line.variantTitleDefault }} />
                </span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                <Trans tKey={line.meaningKey} replacements={{ defaultValue: line.meaningDefault }} />
              </p>
            </GlassCard>
          </Reveal>
        ))}

        <Reveal delay={0.3}>
          <GlassCard className="p-6 sm:p-8">
            <h2 className="text-lg font-semibold">
              <Trans tKey="palmistry.result.mount_title" replacements={{ defaultValue: "A Notable Mount" }} /> —{" "}
              <span className="text-[var(--accent-solid)]">
                <Trans tKey={mountNameKey(reading.notableMount.key)} replacements={{ defaultValue: reading.notableMount.name }} />
              </span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              <Trans
                tKey={reading.notableMount.isProminent ? mountProminentKey(reading.notableMount.key) : mountFlatKey(reading.notableMount.key)}
                replacements={{
                  defaultValue: reading.notableMount.isProminent ? reading.notableMount.prominent : reading.notableMount.flat,
                }}
              />
            </p>
          </GlassCard>
        </Reveal>

        <Reveal delay={0.35}>
          <p className="mx-auto max-w-xl text-center text-xs text-muted-soft">
            <Trans
              tKey="palmistry.result.disclaimer"
              replacements={{
                defaultValue:
                  "Drawn from Western chiromancy, Indian Hast Rekha Shastra, and Chinese palmistry traditions — folklore, not scientific fact. Nothing about your photo or reading is stored on our servers.",
              }}
            />
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="space-y-6 pt-4 text-center">
            <ShareButtons
              shareUrl={shareUrl}
              ogQuery={ogQuery}
              caption={`My palm reading: ${reading.heartLine.title} Heart Line, ${reading.headLine.title} Head Line — from Cosmic Numbers. Get yours:`}
            />
            <Button href="/palmistry" variant="secondary">
              <Trans tKey="palmistry.result.read_again" replacements={{ defaultValue: "Read Again →" }} />
            </Button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
