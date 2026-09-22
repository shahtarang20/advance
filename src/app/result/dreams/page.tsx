import type { Metadata } from "next";
import Link from "next/link";
import { analyzeDream } from "@/lib/dreams";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { Trans } from "@/components/Trans";
import { ShareButtons } from "@/components/ShareButtons";
import { SITE_URL } from "@/lib/site";

type SP = { q?: string };

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<SP> }): Promise<Metadata> {
  const { q } = await searchParams;
  if (!q) {
    return { title: "Dream Interpretation", alternates: { canonical: "/result/dreams" } };
  }
  const symbols = analyzeDream(q);
  const symbolNames = symbols.map((s) => s.keyword).slice(0, 3).join(", ");
  const title = `Dream Interpretation: "${truncate(q, 50)}"`;
  const description = symbols.length
    ? `Symbols detected: ${symbolNames}. ${symbols[0].meaning}`
    : `A free dream symbolism reading for "${truncate(q, 80)}".`;
  const ogUrl = `/api/og?type=dreams&title=${encodeURIComponent(symbols[0]?.keyword ?? "Dream Reading")}&subtitle=${encodeURIComponent(symbolNames || "Universal Symbols")}&text=${encodeURIComponent(truncate(q, 100))}`;
  return {
    title,
    description,
    alternates: { canonical: `/result/dreams?q=${encodeURIComponent(q)}` },
    openGraph: { title, description, images: [{ url: ogUrl, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: [ogUrl] },
  };
}

export default async function DreamsResultPage({ searchParams }: { searchParams: Promise<SP> }) {
  const { q } = await searchParams;

  if (!q) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Link href="/dreams" className="text-purple-600 underline">
          <Trans tKey="dreams.result.invalid" replacements={{ defaultValue: "Please enter a dream to analyze." }} />
        </Link>
      </div>
    );
  }

  const symbols = analyzeDream(q);
  const symbolNames = symbols.map((s) => s.keyword).slice(0, 3).join(", ");
  const shareUrl = `${SITE_URL}/result/dreams?q=${encodeURIComponent(q)}`;
  const ogQuery = `type=dreams&title=${encodeURIComponent(symbols[0]?.keyword ?? "Dream Reading")}&subtitle=${encodeURIComponent(symbolNames || "Universal Symbols")}&text=${encodeURIComponent(truncate(q, 100))}`;

  return (
    <div className="px-6 pb-32 pt-16 mx-auto max-w-4xl">
      <Reveal>
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest text-muted-soft uppercase mb-2">
            <Trans tKey="dreams.result.subtitle" replacements={{ defaultValue: "Universe's Message" }} />
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            <Trans tKey="dreams.result.title" replacements={{ defaultValue: "Dream Interpretation" }} />
          </h1>
          <GlassCard className="p-6 text-left border-l-4 border-[var(--accent-solid)] max-w-2xl mx-auto italic text-muted">
            &quot;{q}&quot;
          </GlassCard>
        </div>
      </Reveal>

      {symbols.length === 0 ? (
        <Reveal delay={0.1}>
          <div className="text-center text-muted">
            <p className="text-lg">
              <Trans tKey="dreams.result.none_detected" replacements={{ defaultValue: "No major universal symbols detected in this dream." }} />
            </p>
            <p className="mt-2">
              <Trans tKey="dreams.result.none_desc" replacements={{ defaultValue: "Sometimes dreams are simply our brain processing the day's events." }} />
            </p>
          </div>
        </Reveal>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {symbols.map((sym, i) => (
            <Reveal key={sym.keyword} delay={i * 0.1}>
              <GlassCard className="p-8 h-full">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold tracking-tight capitalize">{sym.keyword}</h3>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[var(--accent-solid)]/10 text-[var(--accent-solid)]">
                    {sym.category}
                  </span>
                </div>
                <p className="text-base text-muted leading-relaxed">{sym.meaning}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      )}

      <Reveal delay={0.2}>
        <div className="mt-16 flex flex-col items-center gap-6">
          <ShareButtons
            shareUrl={shareUrl}
            ogQuery={ogQuery}
            caption={
              symbols.length
                ? `My dream about "${truncate(q, 60)}" revealed: ${symbolNames} — from Cosmic Numbers. Decode yours:`
                : `I decoded my dream "${truncate(q, 60)}" on Cosmic Numbers. Decode yours:`
            }
          />
          <Link href="/dreams" className="inline-block px-8 py-3 rounded-full border border-[var(--surface-border)] text-sm font-medium hover:bg-[var(--surface-border)] transition-colors">
            <Trans tKey="dreams.result.analyze_another" replacements={{ defaultValue: "Analyze Another Dream" }} />
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
