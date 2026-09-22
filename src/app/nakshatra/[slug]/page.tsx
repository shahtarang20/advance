import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { getNakshatraBySlug, NAKSHATRAS } from "@/lib/nakshatra";
import { NakshatraSelect } from "./NakshatraSelect";

export function generateStaticParams() {
  return NAKSHATRAS.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const info = getNakshatraBySlug(slug);
  if (!info) return {};
  const title = `${info.name} Nakshatra — Deity, Ruling Planet & Meaning`;
  const description = `${info.name} (Nakshatra #${info.order}): ruled by ${info.rulingPlanet}, symbolized by the ${info.symbol.toLowerCase()}. ${info.description}`;
  return {
    title,
    description,
    alternates: { canonical: `/nakshatra/${info.slug}` },
    openGraph: {
      title,
      description,
      images: [{ url: `/api/og?type=nakshatra&title=${encodeURIComponent(info.name)}&subtitle=${encodeURIComponent(`Ruled by ${info.rulingPlanet}`)}&big=${encodeURIComponent("✦")}` }],
    },
  };
}

export default async function NakshatraDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const info = getNakshatraBySlug(slug);
  if (!info) notFound();

  return (
    <div className="px-6 pb-24 pt-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs uppercase tracking-widest text-muted-soft">Nakshatra #{info.order}</p>
        <h1 className="mt-1 text-4xl font-bold tracking-tight sm:text-5xl">{info.name}</h1>
        <p className="mt-4 text-muted">{info.description}</p>
      </div>

      <div className="mx-auto mt-12 max-w-2xl space-y-6">
        <GlassCard className="p-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm font-semibold text-purple-600">{info.deity}</p>
              <p className="text-xs text-muted-soft">Ruling Deity</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-sky-600">{info.rulingPlanet}</p>
              <p className="text-xs text-muted-soft">Ruling Planet</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-600">{info.symbol}</p>
              <p className="text-xs text-muted-soft">Symbol</p>
            </div>
          </div>
        </GlassCard>

        <NakshatraSelect info={info} />

        <p className="text-center text-[11px] text-muted-soft">
          This is a traditional, educational reference — not a calculation from your date of birth. Your actual
          birth Nakshatra depends on the Moon&apos;s exact sidereal position at your birth time.
        </p>

        <p className="text-center">
          <Link href="/nakshatra" className="text-sm text-purple-600 underline">
            ← Browse all 27 Nakshatras
          </Link>
        </p>
      </div>
    </div>
  );
}
