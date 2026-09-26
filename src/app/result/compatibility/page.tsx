import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";
import { calculateCompatibility } from "@/lib/compatibility";
import { CompatibilityCard } from "@/components/CompatibilityCard";
import { Button } from "@/components/ui/Button";
import { RecentActivityTracker } from "@/components/RecentActivityTracker";

type SP = { nameA?: string; dobA?: string; nameB?: string; dobB?: string };

export async function generateMetadata({ searchParams }: { searchParams: Promise<SP> }): Promise<Metadata> {
  const { nameA, dobA, nameB, dobB } = await searchParams;
  if (!nameA || !dobA || !nameB || !dobB) {
    return { title: "Love Match Result" };
  }
  const result = calculateCompatibility(nameA, dobA, nameB, dobB);
  const title = `${nameA} & ${nameB}: ${result.percentage}% Cosmic Match`;
  const description = result.englishVerdict;
  const ogUrl = `/api/og?type=compatibility&title=${encodeURIComponent(`${nameA} & ${nameB}`)}&subtitle=${result.percentage}%25%20Match&big=${result.percentage}%25&ext=.png`;
  return {
    title,
    description,
    alternates: {
      canonical: `/result/compatibility?nameA=${encodeURIComponent(nameA)}&dobA=${dobA}&nameB=${encodeURIComponent(nameB)}&dobB=${dobB}`,
    },
    openGraph: { title, description, images: [{ url: ogUrl, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: [ogUrl] },
  };
}

export default async function CompatibilityResultPage({ searchParams }: { searchParams: Promise<SP> }) {
  const { nameA, dobA, nameB, dobB } = await searchParams;

  if (!nameA || !dobA || !nameB || !dobB) {
    return (
      <div className="px-6 py-24 text-center">
        <p className="text-muted">No love match result found.</p>
        <Link href="/compatibility" className="mt-4 inline-block text-purple-600 underline">
          Check your love match →
        </Link>
      </div>
    );
  }

  const result = calculateCompatibility(nameA, dobA, nameB, dobB);

  return (
    <div className="mx-auto max-w-2xl px-6 pb-24 pt-16">
      <RecentActivityTracker
        id="compatibility"
        href={`/result/compatibility?nameA=${encodeURIComponent(nameA)}&dobA=${dobA}&nameB=${encodeURIComponent(nameB)}&dobB=${dobB}`}
        labelKey="nav.compatibility"
        labelDefault="Love Match"
        icon="💫"
      />
      <CompatibilityCard result={result} />
      <div className="mt-10 text-center">
        <Button href="/compatibility">Check Your Own Love Match →</Button>
      </div>
    </div>
  );
}
