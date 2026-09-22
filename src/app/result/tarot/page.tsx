import type { Metadata } from "next";
import Link from "next/link";
import { pullSeededCards } from "@/lib/tarot";
import { Trans } from "@/components/Trans";
import { Button } from "@/components/ui/Button";
import { ShareButtons } from "@/components/ShareButtons";
import { SITE_URL } from "@/lib/site";
import { TarotSpreadView, TarotSpreadType } from "@/app/tarot/TarotSpreadView";

type SP = { seed?: string; type?: string };

function isSpreadType(type?: string): type is TarotSpreadType {
  return type === "daily" || type === "past_present_future";
}

function getSpread(seed: string, type: TarotSpreadType) {
  return pullSeededCards(seed, type === "daily" ? 1 : 3);
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<SP> }): Promise<Metadata> {
  const { seed, type } = await searchParams;
  if (!seed || !isSpreadType(type)) {
    return { title: "Tarot Reading", alternates: { canonical: "/result/tarot" } };
  }
  const spread = getSpread(seed, type);
  const first = spread[0];
  const cardNames = spread.map((s) => s.card.name).join(", ");
  const title = type === "daily" ? `Today's Tarot Card: ${first.card.name}` : `My Tarot Reading: ${cardNames}`;
  const description =
    type === "daily"
      ? `${first.card.name}${first.isReversed ? " (Reversed)" : ""} — ${first.isReversed ? first.card.reversedMeaning : first.card.uprightMeaning}`
      : `Past, Present, Future: ${cardNames}. See the full free reading.`;
  const ogUrl = `/api/og?type=tarot&title=${encodeURIComponent(first.card.name)}&subtitle=${encodeURIComponent(type === "daily" ? "Card of the Day" : cardNames)}&big=${encodeURIComponent(first.card.imageFallback)}`;
  return {
    title,
    description,
    alternates: { canonical: `/result/tarot?seed=${seed}&type=${type}` },
    openGraph: { title, description, images: [{ url: ogUrl, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: [ogUrl] },
  };
}

export default async function TarotResultPage({ searchParams }: { searchParams: Promise<SP> }) {
  const { seed, type } = await searchParams;

  if (!seed || !isSpreadType(type)) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Link href="/tarot" className="text-purple-600 underline">
          Draw your Tarot cards →
        </Link>
      </div>
    );
  }

  const spread = getSpread(seed, type);
  const first = spread[0];
  const cardNames = spread.map((s) => s.card.name).join(", ");
  const shareUrl = `${SITE_URL}/result/tarot?seed=${seed}&type=${type}`;
  const ogQuery = `type=tarot&title=${encodeURIComponent(first.card.name)}&subtitle=${encodeURIComponent(type === "daily" ? "Card of the Day" : cardNames)}&big=${encodeURIComponent(first.card.imageFallback)}`;
  const caption =
    type === "daily"
      ? `My Tarot Card of the Day is ${first.card.name}${first.isReversed ? " (Reversed)" : ""} — from Cosmic Numbers. Draw yours:`
      : `My Past, Present, Future Tarot reading: ${cardNames} — from Cosmic Numbers. Draw yours:`;

  return (
    <div className="px-6 pb-24 pt-16">
      <div className="mx-auto max-w-2xl text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          <Trans tKey="tarot.title" replacements={{ defaultValue: "Daily Tarot Reading" }} />
        </h1>
        <p className="mt-4 text-muted">
          <Trans tKey="tarot.desc" replacements={{ defaultValue: "Your Tarot draw, revealed." }} />
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-5xl flex flex-col items-center gap-10">
        <TarotSpreadView spread={spread} spreadType={type} />

        <ShareButtons shareUrl={shareUrl} ogQuery={ogQuery} caption={caption} />

        <Button href="/tarot" variant="secondary">
          Draw Again →
        </Button>
      </div>
    </div>
  );
}
