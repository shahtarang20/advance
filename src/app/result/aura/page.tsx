import type { Metadata } from "next";
import Link from "next/link";
import { validateDob } from "@/lib/validation";
import {
  getAuraForLifePath,
  ChakraColor,
  auraNameKey,
  auraChakraKey,
  auraDescriptionKey,
  auraStrengthKey,
  auraBalanceTipKey,
} from "@/lib/aura";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { ShareButtons } from "@/components/ShareButtons";
import { SITE_URL } from "@/lib/site";
import { Trans } from "@/components/Trans";
import { RecentActivityTracker } from "@/components/RecentActivityTracker";

type SP = { dob?: string };

function computeAura(dob: string): ChakraColor | null {
  if (!dob || validateDob(dob)) return null;

  const parts = dob.split("-"); // YYYY-MM-DD
  const digits = parts.join("").split("").map(Number);

  const sumDigits = (n: number): number => {
    if (n <= 9) return n;
    if (n === 11 || n === 22 || n === 33) return n; // Keep master numbers temporarily
    return sumDigits(String(n).split("").map(Number).reduce((a, b) => a + b, 0));
  };

  const lp = sumDigits(digits.reduce((a, b) => a + b, 0));
  return getAuraForLifePath(lp);
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<SP> }): Promise<Metadata> {
  const { dob } = await searchParams;
  const aura = dob ? computeAura(dob) : null;
  if (!aura) {
    return { title: "Aura Reading", alternates: { canonical: "/result/aura" } };
  }
  const title = `${aura.name} — Your Aura Reading`;
  const description = `Your aura is aligned with the ${aura.chakra}. ${aura.description}`;
  const ogUrl = `${SITE_URL}/api/og?type=aura&title=${encodeURIComponent(aura.name)}&subtitle=${encodeURIComponent(aura.chakra)}&color=${encodeURIComponent(aura.colorHex)}&ext=.png`;
  return {
    title,
    description,
    alternates: { canonical: `/result/aura?dob=${dob}` },
    openGraph: { title, description, images: [{ url: ogUrl, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: [ogUrl] },
  };
}

export default async function AuraResultPage({ searchParams }: { searchParams: Promise<SP> }) {
  const { dob } = await searchParams;
  const aura = dob ? computeAura(dob) : null;

  if (!dob || !aura) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Link href="/aura" className="text-purple-600 underline">
          <Trans tKey="aura.result.invalid_dob" replacements={{ defaultValue: "Please enter a valid Date of Birth." }} />
        </Link>
      </div>
    );
  }

  const shareUrl = `${SITE_URL}/result/aura?dob=${dob}`;
  const ogQuery = `type=aura&title=${encodeURIComponent(aura.name)}&subtitle=${encodeURIComponent(aura.chakra)}&color=${encodeURIComponent(aura.colorHex)}`;

  return (
    <div className="relative min-h-screen overflow-hidden px-6 pb-32 pt-16">
      <RecentActivityTracker id="aura" href={`/result/aura?dob=${dob}`} labelKey="nav.aura" labelDefault="Aura" icon="🔮" />
      {/* Animated Glowing Aura Background */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-30 animate-pulse pointer-events-none"
        style={{ backgroundColor: aura.colorHex, animationDuration: "4s" }}
      />
      <div
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[100px] opacity-20 animate-pulse pointer-events-none"
        style={{ backgroundColor: aura.colorHex, animationDuration: "6s", animationDelay: "1s" }}
      />

      <div className="relative z-10 mx-auto max-w-3xl">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-sm font-semibold tracking-widest text-muted-soft uppercase mb-2">
              <Trans tKey="aura.result.primary_aura" replacements={{ defaultValue: "Your Primary Aura" }} />
            </p>
            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl mb-4" style={{ color: aura.colorHex }}>
              <Trans tKey={auraNameKey(aura)} replacements={{ defaultValue: aura.name }} />
            </h1>
            <p className="text-xl text-muted font-medium">
              <Trans tKey="aura.result.aligned_with" replacements={{ defaultValue: "Aligned with the" }} />{" "}
              <span className="text-[var(--foreground)]">
                <Trans tKey={auraChakraKey(aura)} replacements={{ defaultValue: aura.chakra }} />
              </span>
            </p>
          </div>
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={0.1}>
            <GlassCard className="p-8">
              <h2 className="text-xl font-bold tracking-tight mb-3">
                <Trans tKey="aura.result.energy_profile" replacements={{ defaultValue: "Your Energy Profile" }} />
              </h2>
              <p className="text-base leading-relaxed text-muted">
                <Trans tKey={auraDescriptionKey(aura)} replacements={{ defaultValue: aura.description }} />
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.2}>
            <GlassCard className="p-8">
              <h2 className="text-xl font-bold tracking-tight mb-3 text-emerald-500">
                <Trans tKey="aura.result.greatest_strengths" replacements={{ defaultValue: "Your Greatest Strengths" }} />
              </h2>
              <p className="text-base leading-relaxed text-muted">
                <Trans tKey={auraStrengthKey(aura)} replacements={{ defaultValue: aura.strength }} />
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.3}>
            <GlassCard className="p-8">
              <h2 className="text-xl font-bold tracking-tight mb-3 text-amber-500">
                <Trans tKey="aura.result.balance_title" replacements={{ defaultValue: "How to Balance Your Chakra" }} />
              </h2>
              <p className="text-base leading-relaxed text-muted">
                <Trans tKey={auraBalanceTipKey(aura)} replacements={{ defaultValue: aura.balanceTip }} />
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="pt-4">
              <ShareButtons
                shareUrl={shareUrl}
                ogQuery={ogQuery}
                caption={`My aura is ${aura.name}, aligned with the ${aura.chakra} — from Cosmic Numbers. Find yours:`}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
