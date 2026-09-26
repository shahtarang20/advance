import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";
import { calculateNumerologyProfile } from "@/lib/numerology";
import { NumerologyCard } from "@/components/NumerologyCard";
import { Button } from "@/components/ui/Button";
import { RecentActivityTracker } from "@/components/RecentActivityTracker";

type SP = { name?: string; dob?: string };

export async function generateMetadata({ searchParams }: { searchParams: Promise<SP> }): Promise<Metadata> {
  const { name, dob } = await searchParams;
  if (!name || !dob) {
    return { title: "Numerology Reading", alternates: { canonical: "/result/numerology" } };
  }
  const profile = calculateNumerologyProfile(name, dob);
  const title = `${name}'s Numerology Reading — Life Path ${profile.lifePath}`;
  const description = `${name}'s Life Path Number is ${profile.lifePath}, Destiny Number ${profile.destiny}. See the full free reading.`;
  const ogUrl = `${SITE_URL}/api/og?type=numerology&title=${encodeURIComponent(name)}&subtitle=${encodeURIComponent(`Life Path ${profile.lifePath}`)}&big=${profile.lifePath}&ext=.png`;
  return {
    title,
    description,
    alternates: { canonical: `/result/numerology?name=${encodeURIComponent(name)}&dob=${dob}` },
    openGraph: { title, description, images: [{ url: ogUrl, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: [ogUrl] },
  };
}

export default async function NumerologyResultPage({ searchParams }: { searchParams: Promise<SP> }) {
  const { name, dob } = await searchParams;

  if (!name || !dob) {
    return (
      <div className="px-6 py-24 text-center">
        <p className="text-muted">No reading found.</p>
        <Link href="/numerology" className="mt-4 inline-block text-purple-600 underline">
          Calculate your own numerology reading →
        </Link>
      </div>
    );
  }

  const profile = calculateNumerologyProfile(name, dob);

  return (
    <div className="mx-auto max-w-2xl px-6 pb-24 pt-16">
      <RecentActivityTracker
        id="numerology"
        href={`/result/numerology?name=${encodeURIComponent(name)}&dob=${dob}`}
        labelKey="nav.numerology"
        labelDefault="Numerology"
        icon="🔢"
      />
      <NumerologyCard name={name} profile={profile} />
      <div className="mt-10 text-center">
        <Button href="/numerology">Get Your Own Reading →</Button>
      </div>
    </div>
  );
}
