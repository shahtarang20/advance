"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { validateDob } from "@/lib/validation";
import { calculateBiorhythms, BiorhythmData } from "@/lib/biorhythm";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { useTranslation } from "@/lib/I18nContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from "recharts";

function BiorhythmResultContent() {
  const searchParams = useSearchParams();
  const dob = searchParams.get("dob") || "";
  const [data, setData] = useState<BiorhythmData | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (validateDob(dob)) return;
    setData(calculateBiorhythms(dob));
  }, [dob]);

  if (!dob || validateDob(dob)) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Link href="/biorhythm" className="text-purple-600 underline">
          {t("biorhythm.result.invalid_dob", { defaultValue: "Please enter a valid Date of Birth." })}
        </Link>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="mx-auto max-w-5xl px-6 pb-32 pt-16">
      <Reveal>
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-widest text-muted-soft uppercase mb-2">
            {t("biorhythm.result.subtitle", { defaultValue: "Your Energy Cycles" })}
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-4">
            {t("biorhythm.result.title", { defaultValue: "Biorhythm Chart" })}
          </h1>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <GlassCard className="p-4 sm:p-8 mb-8">
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.days} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" tick={{ fontSize: 12 }} />
                <YAxis domain={[-100, 100]} stroke="rgba(255,255,255,0.5)" tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15,23,42,0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ fontSize: 14, fontWeight: 'bold' }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <ReferenceLine y={0} stroke="rgba(255,255,255,0.3)" strokeDasharray="3 3" />
                <ReferenceLine x={data.days[7].date} stroke="rgba(255,255,255,0.5)" label={{ position: 'top', value: 'Today', fill: 'white', fontSize: 12 }} />
                
                <Line type="monotone" dataKey="physical" name={t("biorhythm.result.physical", { defaultValue: "Physical" })} stroke="#ef4444" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="emotional" name={t("biorhythm.result.emotional", { defaultValue: "Emotional" })} stroke="#3b82f6" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="intellectual" name={t("biorhythm.result.intellectual", { defaultValue: "Intellectual" })} stroke="#22c55e" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </Reveal>

      <div className="grid sm:grid-cols-3 gap-6">
        <Reveal delay={0.2}>
          <GlassCard className="p-6 text-center border-t-4 border-t-red-500">
            <h3 className="text-lg font-bold mb-2">{t("biorhythm.result.physical", { defaultValue: "Physical" })}</h3>
            <p className="text-3xl font-black mb-2 text-red-500">{data.todayPhysical}%</p>
            <p className="text-sm text-muted">{t("biorhythm.result.physical_desc", { defaultValue: "Energy, strength, and endurance." })}</p>
          </GlassCard>
        </Reveal>
        <Reveal delay={0.3}>
          <GlassCard className="p-6 text-center border-t-4 border-t-blue-500">
            <h3 className="text-lg font-bold mb-2">{t("biorhythm.result.emotional", { defaultValue: "Emotional" })}</h3>
            <p className="text-3xl font-black mb-2 text-blue-500">{data.todayEmotional}%</p>
            <p className="text-sm text-muted">{t("biorhythm.result.emotional_desc", { defaultValue: "Mood, creativity, and sensitivity." })}</p>
          </GlassCard>
        </Reveal>
        <Reveal delay={0.4}>
          <GlassCard className="p-6 text-center border-t-4 border-t-green-500">
            <h3 className="text-lg font-bold mb-2">{t("biorhythm.result.intellectual", { defaultValue: "Intellectual" })}</h3>
            <p className="text-3xl font-black mb-2 text-green-500">{data.todayIntellectual}%</p>
            <p className="text-sm text-muted">{t("biorhythm.result.intellectual_desc", { defaultValue: "Logic, memory, and communication." })}</p>
          </GlassCard>
        </Reveal>
      </div>
    </div>
  );
}

export default function BiorhythmResultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted">Loading...</div>}>
      <BiorhythmResultContent />
    </Suspense>
  );
}
