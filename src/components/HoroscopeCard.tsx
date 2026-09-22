import { GlassCard } from "@/components/ui/GlassCard";
import { FlipCard } from "@/components/ui/FlipCard";
import { DailyHoroscope, ZODIAC_SIGNS, ZodiacInfo } from "@/lib/horoscope";

function signName(sign: string) {
  return ZODIAC_SIGNS.find((z) => z.sign === sign)?.name ?? sign;
}

export function HoroscopeCard({ info, horoscope }: { info: ZodiacInfo; horoscope: DailyHoroscope }) {
  return (
    <div className="space-y-6">
      <FlipCard
        ariaLabel={`${info.name} horoscope card`}
        className="mx-auto max-w-sm"
        heightClassName="h-[420px]"
        front={
          <GlassCard className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
            <p className="text-xs uppercase tracking-widest text-muted-soft">{horoscope.dateKey}</p>
            <div className="mt-4 text-9xl leading-none drop-shadow-[0_4px_24px_rgba(124,58,237,0.45)]">
              {info.glyph}
            </div>
            <h2 className="mt-6 text-3xl font-bold">{info.name}</h2>
            <p className="mt-1 text-sm text-muted">
              {info.symbol} · {info.dateRange}
            </p>
            <p className="mt-6 text-[11px] text-muted-soft">Tap to reveal today&apos;s details ✦</p>
          </GlassCard>
        }
        back={
          <GlassCard className="flex h-full w-full flex-col overflow-y-auto p-6">
            <p className="text-xs uppercase tracking-widest text-muted-soft">{info.name} · {horoscope.dateKey}</p>
            <div className="mx-auto mt-3 flex w-full max-w-xs justify-around text-center">
              <div>
                <p className="text-lg font-semibold text-amber-300">{horoscope.mood}</p>
                <p className="text-xs text-muted-soft">Mood</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-purple-300">{horoscope.luckyNumber}</p>
                <p className="text-xs text-muted-soft">Lucky Number</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-indigo-300">{horoscope.luckyColor}</p>
                <p className="text-xs text-muted-soft">Lucky Color</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-xl border border-white/10 bg-white/5 p-2">
                <p className="font-semibold text-rose-300">{info.element}</p>
                <p className="text-muted-soft">Element</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-2">
                <p className="font-semibold text-emerald-300">{info.modality}</p>
                <p className="text-muted-soft">Modality</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-2">
                <p className="font-semibold text-sky-300">{info.rulingPlanet}</p>
                <p className="text-muted-soft">Ruler</p>
              </div>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted">{horoscope.summary}</p>
          </GlassCard>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <GlassCard className="p-6">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-rose-300">Love</h3>
          <p className="text-sm leading-relaxed text-muted">{horoscope.love}</p>
        </GlassCard>
        <GlassCard className="p-6">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-300">Career</h3>
          <p className="text-sm leading-relaxed text-muted">{horoscope.career}</p>
        </GlassCard>
        <GlassCard className="p-6">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-sky-300">Health</h3>
          <p className="text-sm leading-relaxed text-muted">{horoscope.health}</p>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-purple-300">About {info.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{info.about}</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-emerald-300">Most Compatible</p>
            <p className="mt-1 text-sm text-muted">{info.mostCompatible.map(signName).join(", ")}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-rose-300">Least Compatible</p>
            <p className="mt-1 text-sm text-muted">{info.leastCompatible.map(signName).join(", ")}</p>
          </div>
        </div>
        <p className="mt-4 text-[11px] text-muted-soft">
          This reference reflects traditional astrological associations (element, modality, ruling planet, and
          classic compatibility groupings). The daily horoscope above is generated for entertainment and is not a
          factual prediction.
        </p>
      </GlassCard>
    </div>
  );
}
