import type { Metadata } from "next";
import Link from "next/link";
import { validateDob } from "@/lib/validation";
import { calculateBiorhythms } from "@/lib/biorhythm";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { Trans } from "@/components/Trans";
import { ShareButtons } from "@/components/ShareButtons";
import { SITE_URL } from "@/lib/site";
import { BiorhythmChart } from "@/app/biorhythm/BiorhythmChart";
import { RecentActivityTracker } from "@/components/RecentActivityTracker";

type SP = { dob?: string };

export async function generateMetadata({ searchParams }: { searchParams: Promise<SP> }): Promise<Metadata> {
  const { dob } = await searchParams;
  const data = dob && !validateDob(dob) ? calculateBiorhythms(dob) : null;
  if (!data) {
    return { title: "Biorhythm Chart", alternates: { canonical: "/result/biorhythm" } };
  }
  const title = `Today's Biorhythm: ${data.todayPhysical}% Physical, ${data.todayEmotional}% Emotional`;
  const description = `Physical ${data.todayPhysical}%, Emotional ${data.todayEmotional}%, Intellectual ${data.todayIntellectual}%. See your own free biorhythm chart.`;
  const ogUrl = `${SITE_URL}/api/og?type=biorhythm&title=${encodeURIComponent("Today's Biorhythm")}&subtitle=${encodeURIComponent(&ext=.png`Physical ${data.todayPhysical}% · Emotional ${data.todayEmotional}% · Intellectual ${data.todayIntellectual}%`)}&big=${encodeURIComponent(`${data.todayPhysical}%`)}`;
  return {
    title,
    description,
    alternates: { canonical: `/result/biorhythm?dob=${dob}` },
    openGraph: { title, description, images: [{ url: ogUrl, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: [ogUrl] },
  };
}

export default async function BiorhythmResultPage({ searchParams }: { searchParams: Promise<SP> }) {
  const { dob } = await searchParams;
  const data = dob && !validateDob(dob) ? calculateBiorhythms(dob) : null;

  if (!dob || !data) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Link href="/biorhythm" className="text-purple-600 underline">
          <Trans tKey="biorhythm.result.invalid_dob" replacements={{ defaultValue: "Please enter a valid Date of Birth." }} />
        </Link>
      </div>
    );
  }

  const shareUrl = `${SITE_URL}/result/biorhythm?dob=${dob}`;
  const ogQuery = `type=biorhythm&title=${encodeURIComponent("Today's Biorhythm")}&subtitle=${encodeURIComponent(`Physical ${data.todayPhysical}% · Emotional ${data.todayEmotional}% · Intellectual ${data.todayIntellectual}%`)}&big=${encodeURIComponent(`${data.todayPhysical}%`)}`;

  return (
    <div className="mx-auto max-w-5xl px-6 pb-32 pt-16">
      <RecentActivityTracker
        id="biorhythm"
        href={`/result/biorhythm?dob=${dob}`}
        labelKey="nav.biorhythm"
        labelDefault="Biorhythm"
        icon="📈"
      />
      <Reveal>
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-widest text-muted-soft uppercase mb-2">
            <Trans tKey="biorhythm.result.subtitle" replacements={{ defaultValue: "Your Energy Cycles" }} />
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-4">
            <Trans tKey="biorhythm.result.title" replacements={{ defaultValue: "Biorhythm Chart" }} />
          </h1>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <GlassCard className="p-4 sm:p-8 mb-8">
          <BiorhythmChart data={data} />
        </GlassCard>
      </Reveal>

      <div className="grid sm:grid-cols-3 gap-6">
        <Reveal delay={0.2}>
          <GlassCard className="p-6 text-center border-t-4 border-t-red-500">
            <h3 className="text-lg font-bold mb-2">
              <Trans tKey="biorhythm.result.physical" replacements={{ defaultValue: "Physical" }} />
            </h3>
            <p className="text-3xl font-black mb-2 text-red-500">{data.todayPhysical}%</p>
            <p className="text-sm text-muted">
              <Trans tKey="biorhythm.result.physical_desc" replacements={{ defaultValue: "Energy, strength, and endurance." }} />
            </p>
          </GlassCard>
        </Reveal>
        <Reveal delay={0.3}>
          <GlassCard className="p-6 text-center border-t-4 border-t-blue-500">
            <h3 className="text-lg font-bold mb-2">
              <Trans tKey="biorhythm.result.emotional" replacements={{ defaultValue: "Emotional" }} />
            </h3>
            <p className="text-3xl font-black mb-2 text-blue-500">{data.todayEmotional}%</p>
            <p className="text-sm text-muted">
              <Trans tKey="biorhythm.result.emotional_desc" replacements={{ defaultValue: "Mood, creativity, and sensitivity." }} />
            </p>
          </GlassCard>
        </Reveal>
        <Reveal delay={0.4}>
          <GlassCard className="p-6 text-center border-t-4 border-t-green-500">
            <h3 className="text-lg font-bold mb-2">
              <Trans tKey="biorhythm.result.intellectual" replacements={{ defaultValue: "Intellectual" }} />
            </h3>
            <p className="text-3xl font-black mb-2 text-green-500">{data.todayIntellectual}%</p>
            <p className="text-sm text-muted">
              <Trans tKey="biorhythm.result.intellectual_desc" replacements={{ defaultValue: "Logic, memory, and communication." }} />
            </p>
          </GlassCard>
        </Reveal>
      </div>

      <Reveal delay={0.5}>
        <div className="mt-10 flex justify-center">
          <ShareButtons
            shareUrl={shareUrl}
            ogQuery={ogQuery}
            caption={`My biorhythm today: ${data.todayPhysical}% Physical, ${data.todayEmotional}% Emotional, ${data.todayIntellectual}% Intellectual — from Cosmic Numbers. See yours:`}
          />
        </div>
      </Reveal>
    </div>
  );
}
