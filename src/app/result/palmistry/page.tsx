import type { Metadata } from "next";
import Link from "next/link";
import { PlayAudioButton } from "@/components/PlayAudioButton";
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
  timelineEventKey,
  specificTitleKey,
  specificMeaningKey,
  minorLineTitleKey,
  minorLineMeaningKey,
  chirognomyTitleKey,
  chirognomyMeaningKey,
  mysticMarkTitleKey,
  mysticMarkMeaningKey,
  biometricTitleKey,
  biometricMeaningKey,
} from "@/lib/palmistry";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ShareButtons } from "@/components/ShareButtons";
import { SITE_URL } from "@/lib/site";
import { Trans } from "@/components/Trans";
import { DbPalmistryTrans } from "@/components/DbPalmistryTrans";
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

  const specificPredictionsList = [
    {
      key: "marriage",
      category: "marriage",
      titleDefault: "Marriage & Partnership",
      icon: "💍",
      variantTitleKey: specificTitleKey("marriage", reading.specificPredictions.marriage.key),
      variantTitleDefault: reading.specificPredictions.marriage.title,
      meaningKey: specificMeaningKey("marriage", reading.specificPredictions.marriage.key),
      meaningDefault: reading.specificPredictions.marriage.meaning,
    },
    {
      key: "children",
      category: "children",
      titleDefault: "Children & Family",
      icon: "👶",
      variantTitleKey: specificTitleKey("children", reading.specificPredictions.children.key),
      variantTitleDefault: reading.specificPredictions.children.title,
      meaningKey: specificMeaningKey("children", reading.specificPredictions.children.key),
      meaningDefault: reading.specificPredictions.children.meaning,
    },
    {
      key: "house",
      category: "house",
      titleDefault: "House & Property",
      icon: "🏡",
      variantTitleKey: specificTitleKey("house", reading.specificPredictions.house.key),
      variantTitleDefault: reading.specificPredictions.house.title,
      meaningKey: specificMeaningKey("house", reading.specificPredictions.house.key),
      meaningDefault: reading.specificPredictions.house.meaning,
    },
  ];

  const minorLinesList = [
    {
      key: "health",
      titleKey: "palmistry.result.health_line_title",
      titleDefault: "Line of Health",
      variantTitleKey: minorLineTitleKey("health", reading.minorLines.health.key),
      variantTitleDefault: reading.minorLines.health.title,
      meaningKey: minorLineMeaningKey("health", reading.minorLines.health.key),
      meaningDefault: reading.minorLines.health.meaning,
    },
    {
      key: "intuition",
      titleKey: "palmistry.result.intuition_line_title",
      titleDefault: "Line of Intuition",
      variantTitleKey: minorLineTitleKey("intuition", reading.minorLines.intuition.key),
      variantTitleDefault: reading.minorLines.intuition.title,
      meaningKey: minorLineMeaningKey("intuition", reading.minorLines.intuition.key),
      meaningDefault: reading.minorLines.intuition.meaning,
    },
    {
      key: "travel",
      titleKey: "palmistry.result.travel_line_title",
      titleDefault: "Travel Lines",
      variantTitleKey: minorLineTitleKey("travel", reading.minorLines.travel.key),
      variantTitleDefault: reading.minorLines.travel.title,
      meaningKey: minorLineMeaningKey("travel", reading.minorLines.travel.key),
      meaningDefault: reading.minorLines.travel.meaning,
    },
    {
      key: "girdle",
      titleKey: "palmistry.result.girdle_line_title",
      titleDefault: "Girdle of Venus",
      variantTitleKey: minorLineTitleKey("girdle", reading.minorLines.girdle.key),
      variantTitleDefault: reading.minorLines.girdle.title,
      meaningKey: minorLineMeaningKey("girdle", reading.minorLines.girdle.key),
      meaningDefault: reading.minorLines.girdle.meaning,
    },
  ];

  const chirognomyList = [
    {
      key: "fingerShape",
      titleKey: "palmistry.result.fingers_title",
      titleDefault: "Finger Shape",
      variantTitleKey: chirognomyTitleKey("shape", reading.chirognomy.fingerShape.key),
      variantTitleDefault: reading.chirognomy.fingerShape.title,
      meaningKey: chirognomyMeaningKey("shape", reading.chirognomy.fingerShape.key),
      meaningDefault: reading.chirognomy.fingerShape.meaning,
    },
    {
      key: "thumb",
      titleKey: "palmistry.result.thumb_title",
      titleDefault: "The Thumb",
      variantTitleKey: chirognomyTitleKey("thumb", reading.chirognomy.thumb.key),
      variantTitleDefault: reading.chirognomy.thumb.title,
      meaningKey: chirognomyMeaningKey("thumb", reading.chirognomy.thumb.key),
      meaningDefault: reading.chirognomy.thumb.meaning,
    },
  ];

  const biometricsList = [
    {
      key: "phi",
      category: "phi",
      titleKey: "palmistry.result.biometrics.phi_title",
      titleDefault: "Golden Ratio Alignment",
      value: `${reading.biometrics.phi.value}%`,
      variantTitleKey: biometricTitleKey("phi", reading.biometrics.phi.key),
      variantTitleDefault: reading.biometrics.phi.title,
      meaningKey: biometricMeaningKey("phi", reading.biometrics.phi.key),
      meaningDefault: reading.biometrics.phi.meaning,
    },
    {
      key: "digitRatio",
      category: "digit_ratio",
      titleKey: "palmistry.result.biometrics.digit_ratio_title",
      titleDefault: "2D:4D Digit Ratio",
      value: reading.biometrics.digitRatio.value.toString(),
      variantTitleKey: biometricTitleKey("digit_ratio", reading.biometrics.digitRatio.key),
      variantTitleDefault: reading.biometrics.digitRatio.title,
      meaningKey: biometricMeaningKey("digit_ratio", reading.biometrics.digitRatio.key),
      meaningDefault: reading.biometrics.digitRatio.meaning,
    },
    {
      key: "thumbAngle",
      category: "thumb_angle",
      titleKey: "palmistry.result.biometrics.thumb_angle_title",
      titleDefault: "Thumb Resting Angle",
      value: `${reading.biometrics.thumbAngle.value}°`,
      variantTitleKey: biometricTitleKey("thumb_angle", reading.biometrics.thumbAngle.key),
      variantTitleDefault: reading.biometrics.thumbAngle.title,
      meaningKey: biometricMeaningKey("thumb_angle", reading.biometrics.thumbAngle.key),
      meaningDefault: reading.biometrics.thumbAngle.meaning,
    },
    {
      key: "triangleAngle",
      category: "triangle_angle",
      titleKey: "palmistry.result.biometrics.triangle_angle_title",
      titleDefault: "Wealth Triangle Angle",
      value: `${reading.biometrics.triangleAngle.value}°`,
      variantTitleKey: biometricTitleKey("triangle_angle", reading.biometrics.triangleAngle.key),
      variantTitleDefault: reading.biometrics.triangleAngle.title,
      meaningKey: biometricMeaningKey("triangle_angle", reading.biometrics.triangleAngle.key),
      meaningDefault: reading.biometrics.triangleAngle.meaning,
    },
  ];

  const quickStats = [
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

  const allAudioKeys = [
    handShapeNameKey(reading.handShape),
    handShapeTraitsKey(reading.handShape),
    ...lines.flatMap(l => [l.variantTitleKey, l.meaningKey]),
    ...minorLinesList.flatMap(l => [l.variantTitleKey, l.meaningKey]),
    ...specificPredictionsList.flatMap(l => [l.variantTitleKey, l.meaningKey]),
    ...chirognomyList.flatMap(l => [l.variantTitleKey, l.meaningKey])
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
          <div className="flex justify-center mb-6">
            <PlayAudioButton tKeys={allAudioKeys} className="h-14 w-14" />
          </div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-muted-soft">
            <Trans
              tKey={hand === "right" ? "palmistry.result.hand_label_right" : "palmistry.result.hand_label_left"}
              replacements={{ defaultValue: hand === "right" ? "Your Right Hand" : "Your Left Hand" }}
            />
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            <DbPalmistryTrans category="handShape" subCategory={reading.handShape} fallbackTitle={HAND_SHAPES[reading.handShape].name} fallbackMeaning="" isTitle={true} />
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            <DbPalmistryTrans category="handShape" subCategory={reading.handShape} fallbackTitle="" fallbackMeaning={HAND_SHAPES[reading.handShape].traits} isTitle={false} />
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <GlassCard className="mb-10 p-6 sm:p-8">
          <h2 className="mb-6 text-lg font-semibold">
            <Trans tKey="palmistry.result.timeline_title" replacements={{ defaultValue: "Life Growth & Milestones Timeline" }} />
          </h2>
          <div className="relative space-y-8 before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[var(--surface-border)] before:to-transparent">
            {reading.timeline.map((event, i) => (
              <div key={i} className="relative flex items-center min-h-[3rem] md:justify-center md:odd:flex-row-reverse group is-active">
                
                {/* Card Content */}
                <div className="w-full pl-16 md:pl-0 md:w-[calc(50%-1.5rem)]">
                  <div className="p-4 rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] shadow-sm transition hover:border-[var(--accent-solid)]">
                    <p className="text-sm leading-relaxed text-muted">
                      <Trans tKey={timelineEventKey(event.key)} replacements={{ defaultValue: event.defaultText }} />
                    </p>
                  </div>
                </div>

                {/* Circle Icon */}
                <div className="absolute left-0 md:static flex items-center justify-center w-12 h-12 rounded-full border-4 border-[var(--background)] bg-[var(--accent-solid)] shadow shrink-0 z-10 text-white font-bold text-[10px] sm:text-xs text-center leading-tight">
                  <Trans tKey="palmistry.result.timeline_age" replacements={{ age: event.age.toString(), defaultValue: "Age {age}" }} />
                </div>

                {/* Desktop Empty Space */}
                <div className="hidden md:block md:w-[calc(50%-1.5rem)]"></div>
                
              </div>
            ))}
          </div>
        </GlassCard>
      </Reveal>

      <Reveal delay={0.3}>
          <div className="mb-10">
            <h2 className="mb-1 text-center text-xs font-semibold uppercase tracking-widest text-muted-soft">
              <Trans tKey="palmistry.result.specific_predictions_title" replacements={{ defaultValue: "Deep Predictions" }} />
            </h2>
            <p className="mx-auto mb-5 max-w-md text-center text-xs text-muted-soft">
              <Trans
                tKey="palmistry.result.specific_predictions_note"
                replacements={{ defaultValue: "Highly specific outcomes derived from traditional line combinations." }}
              />
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {specificPredictionsList.map((section) => (
                <GlassCard key={section.key} className="p-5">
                  <h3 className="flex items-center gap-2 text-sm font-semibold">
                    <span className="text-lg">{section.icon}</span>
                    <Trans tKey={`palmistry.result.specific.${section.category}`} replacements={{ defaultValue: section.titleDefault }} />
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

        <Reveal delay={0.32}>
          <div className="mb-10">
            <h2 className="mb-1 text-center text-xs font-semibold uppercase tracking-widest text-muted-soft">
              <Trans tKey="palmistry.result.biometrics_title" replacements={{ defaultValue: "Biometric Proportions & Sacred Geometry" }} />
            </h2>
            <p className="mx-auto mb-5 max-w-md text-center text-xs text-muted-soft">
              <Trans
                tKey="palmistry.result.biometrics_note"
                replacements={{ defaultValue: "Simulated mathematical analysis of hand geometry." }}
              />
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {biometricsList.map((bio) => (
                <GlassCard key={bio.key} className="p-5 flex flex-col justify-between border-[rgba(var(--accent-solid-rgb),0.02)] bg-[rgba(var(--accent-solid-rgb),0.02)]">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xs uppercase tracking-widest font-semibold text-muted-soft">
                        <Trans tKey={bio.titleKey} replacements={{ defaultValue: bio.titleDefault }} />
                      </h3>
                      <span className="font-mono text-lg font-bold text-[var(--accent-solid)]">
                        {bio.value}
                      </span>
                    </div>
                    <p className="text-sm font-medium mb-1">
                      <Trans tKey={bio.variantTitleKey} replacements={{ defaultValue: bio.variantTitleDefault }} />
                    </p>
                    <p className="text-[13px] leading-relaxed text-muted">
                      <Trans tKey={bio.meaningKey} replacements={{ defaultValue: bio.meaningDefault }} />
                    </p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mb-10">
            <h2 className="mb-4 text-center text-lg font-semibold">
              <Trans tKey="palmistry.result.chirognomy_title" replacements={{ defaultValue: "Chirognomy (Fingers & Thumb)" }} />
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {chirognomyList.map((item) => (
                <GlassCard key={item.key} className="p-6">
                  <h3 className="text-md font-semibold">
                    <Trans tKey={item.titleKey} replacements={{ defaultValue: item.titleDefault }} /> —{" "}
                    <span className="text-[var(--accent-solid)]">
                      <Trans tKey={item.variantTitleKey} replacements={{ defaultValue: item.variantTitleDefault }} />
                    </span>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    <Trans tKey={item.meaningKey} replacements={{ defaultValue: item.meaningDefault }} />
                  </p>
                </GlassCard>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mb-10">
            <h2 className="mb-4 text-center text-lg font-semibold">
              <Trans tKey="palmistry.result.minor_lines_title" replacements={{ defaultValue: "The Minor Lines" }} />
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {minorLinesList.map((line) => (
                <GlassCard key={line.key} className="p-6">
                  <h3 className="text-md font-semibold">
                    <Trans tKey={line.titleKey} replacements={{ defaultValue: line.titleDefault }} /> —{" "}
                    <span className="text-[var(--accent-solid)]">
                      <DbPalmistryTrans category="minorLines" subCategory={reading.minorLines[line.key as 'health' | 'intuition' | 'travel' | 'girdle'].key} fallbackTitle={line.variantTitleDefault} fallbackMeaning={line.meaningDefault} isTitle={true} />
                    </span>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    <DbPalmistryTrans category="minorLines" subCategory={reading.minorLines[line.key as 'health' | 'intuition' | 'travel' | 'girdle'].key} fallbackTitle={line.variantTitleDefault} fallbackMeaning={line.meaningDefault} isTitle={false} />
                  </p>
                </GlassCard>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.45}>
          <div className="mb-10">
            <h2 className="mb-4 text-center text-lg font-semibold">
              <Trans tKey="palmistry.result.all_mounts_title" replacements={{ defaultValue: "The Seven Planetary Mounts" }} />
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Object.values(reading.allMounts).map((mount) => (
                <GlassCard key={mount.key} className={`p-5 ${mount.isProminent ? 'border-[var(--accent-solid)] shadow-sm' : ''}`}>
                  <h3 className="text-sm font-semibold flex justify-between items-center">
                    <Trans tKey={mountNameKey(mount.key)} replacements={{ defaultValue: mount.name }} />
                    {mount.isProminent && <span className="text-[10px] uppercase tracking-wider text-[var(--accent-solid)] font-bold px-2 py-0.5 rounded-full bg-[rgba(var(--accent-solid-rgb),0.1)]">Prominent</span>}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    <Trans
                      tKey={mount.isProminent ? mountProminentKey(mount.key) : mountFlatKey(mount.key)}
                      replacements={{ defaultValue: mount.isProminent ? mount.prominent : mount.flat }}
                    />
                  </p>
                </GlassCard>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="mb-10">
            <h2 className="mb-4 text-center text-lg font-semibold">
              <Trans tKey="palmistry.result.mystic_marks_title" replacements={{ defaultValue: "Mystic Marks & Symbols" }} />
            </h2>
            <div className="space-y-4 max-w-2xl mx-auto">
              {reading.mysticMarks.map((mark) => (
                <GlassCard key={mark.key} className="p-6">
                  <h3 className="text-md font-semibold text-[var(--accent-solid)]">
                    <Trans tKey={mysticMarkTitleKey(mark.key)} replacements={{ defaultValue: mark.title }} />
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    <Trans tKey={mysticMarkMeaningKey(mark.key)} replacements={{ defaultValue: mark.meaning }} />
                  </p>
                </GlassCard>
              ))}
            </div>
          </div>
        </Reveal>

<Reveal delay={0.1}>
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
            {quickStats.map((section) => (
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
        {lines.map((line, i) => {
          let lineDataKey = "";
          if (line.key === "heartLine") lineDataKey = reading.heartLine.key;
          else if (line.key === "headLine") lineDataKey = reading.headLine.key;
          else if (line.key === "lifeLine") lineDataKey = reading.lifeLine.key;
          else if (line.key === "fateLine") lineDataKey = reading.fateLine.key;
          else if (line.key === "sunLine") lineDataKey = reading.sunLine.key;
          else if (line.key === "marriageLine") lineDataKey = reading.marriageLine.key;
          
          return (
          <Reveal key={line.key} delay={0.05 * i}>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-lg font-semibold">
                <Trans tKey={line.titleKey} replacements={{ defaultValue: line.titleDefault }} /> —{" "}
                <span className="text-[var(--accent-solid)]">
                  <DbPalmistryTrans category={line.key} subCategory={lineDataKey} fallbackTitle={line.variantTitleDefault} fallbackMeaning={line.meaningDefault} isTitle={true} />
                </span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                <DbPalmistryTrans category={line.key} subCategory={lineDataKey} fallbackTitle={line.variantTitleDefault} fallbackMeaning={line.meaningDefault} isTitle={false} />
              </p>
            </GlassCard>
          </Reveal>
        )})}

        


        <Reveal delay={0.4}>
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

        <Reveal delay={0.45}>
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
