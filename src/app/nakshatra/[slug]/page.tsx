import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { getNakshatraBySlug, NAKSHATRAS } from "@/lib/nakshatra";
import { NakshatraSelect } from "./NakshatraSelect";
import { Trans } from "@/components/Trans";

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
        <p className="text-xs uppercase tracking-widest text-muted-soft"><Trans tKey="nak.detail.subtitle" replacements={{ order: info.order.toString() }} /></p>
        <h1 className="mt-1 text-4xl font-bold tracking-tight sm:text-5xl"><Trans tKey={`nak.${info.slug}.name`} replacements={{ defaultValue: info.name }} /></h1>
        <p className="mt-4 text-muted"><Trans tKey={`nak.${info.slug}.desc`} replacements={{ defaultValue: info.description }} /></p>
      </div>

      <div className="mx-auto mt-12 max-w-2xl space-y-6">
        <GlassCard className="p-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm font-semibold text-purple-600"><Trans tKey={`nak.${info.slug}.deity`} replacements={{ defaultValue: info.deity }} /></p>
              <p className="text-xs text-muted-soft"><Trans tKey="nak.detail.ruling_deity" /></p>
            </div>
            <div>
              <p className="text-sm font-semibold text-sky-600"><Trans tKey={`planet.${info.rulingPlanet.toLowerCase()}`} replacements={{ defaultValue: info.rulingPlanet }} /></p>
              <p className="text-xs text-muted-soft"><Trans tKey="nak.detail.ruling_planet" /></p>
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-600"><Trans tKey={`nak.${info.slug}.symbol`} replacements={{ defaultValue: info.symbol }} /></p>
              <p className="text-xs text-muted-soft"><Trans tKey="nak.detail.symbol" /></p>
            </div>
          </div>
        </GlassCard>

        <NakshatraSelect info={info} />

        <p className="text-center text-[11px] text-muted-soft">
          <Trans tKey="nak.detail.disclaimer" />
        </p>

        <p className="text-center">
          <Link href="/nakshatra" className="text-sm text-purple-600 underline">
            <Trans tKey="nak.detail.browse_all" />
          </Link>
        </p>
      </div>
    </div>
  );
}
