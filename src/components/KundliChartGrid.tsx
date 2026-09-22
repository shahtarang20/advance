import { RASHIS, RASHI_ENGLISH, GRAHA_HINDI, type GrahaPosition } from "@/lib/kundli";
import { Trans } from "@/components/Trans";

// South Indian style Kundli chart: a fixed 4x4 grid where each of the 12 outer cells always
// represents the same Rashi (sign) regardless of the ascendant — Mesha is always top-left-ish,
// etc. — and planets are placed into whichever cell matches their Rashi. This fixed-position
// layout is simpler and more robust to build correctly with plain CSS grid than the North Indian
// rotated-diamond style, while remaining an authentic, traditional Vedic chart format.

// Standard South Indian grid layout (4x4, center 2x2 empty):
// Mee Mes Vri Mit
// Kum  .   .  Kar
// Mak  .   .  Sim
// Dha Vrc Tul Kan
const GRID_RASHI_ORDER = [
  "Meena", "Mesha", "Vrishabha", "Mithuna",
  "Kumbha", null, null, "Karka",
  "Makara", null, null, "Simha",
  "Dhanu", "Vrishchika", "Tula", "Kanya",
] as const;

export function KundliChartGrid({
  planets,
  lagnaRashiIndex,
}: {
  planets: GrahaPosition[];
  lagnaRashiIndex: number;
}) {
  const byRashi = new Map<string, GrahaPosition[]>();
  for (const p of planets) {
    const list = byRashi.get(p.rashi) ?? [];
    list.push(p);
    byRashi.set(p.rashi, list);
  }
  const lagnaRashi = RASHIS[lagnaRashiIndex];

  return (
    <div className="mx-auto grid aspect-square max-w-md grid-cols-4 grid-rows-4 gap-1 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] p-1">
      {GRID_RASHI_ORDER.map((rashi, i) => {
        if (rashi === null) {
          if (i === 5) {
            return (
              <div key={i} className="col-span-2 row-span-2 flex items-center justify-center rounded-xl bg-[var(--surface-2,transparent)]">
                <span className="accent-gradient-text text-lg font-semibold tracking-tight">
                  <Trans tKey="kundli.chart.center_label" replacements={{ defaultValue: "Kundli" }} />
                </span>
              </div>
            );
          }
          return null;
        }
        const planetsHere = byRashi.get(rashi) ?? [];
        const isLagna = rashi === lagnaRashi;
        return (
          <div
            key={rashi}
            className={`flex flex-col items-center justify-center rounded-xl border p-1 text-center ${
              isLagna
                ? "border-[var(--accent-solid)] bg-[var(--accent-solid)]/10"
                : "border-[var(--surface-border)]"
            }`}
          >
            <span className="text-[10px] font-medium text-muted-soft">
              <Trans
                tKey={`zodiac.${RASHI_ENGLISH[rashi].toLowerCase()}`}
                replacements={{ defaultValue: RASHI_ENGLISH[rashi] }}
              />
              {isLagna && (
                <span className="ml-1 text-[var(--accent-solid)]">
                  <Trans tKey="kundli.chart.ascendant_abbr" replacements={{ defaultValue: "Asc" }} />
                </span>
              )}
            </span>
            <div className="mt-1 flex flex-wrap items-center justify-center gap-x-1 gap-y-0.5">
              {planetsHere.map((p) => (
                <span key={p.graha} className="text-xs font-semibold text-[var(--foreground)]">
                  <Trans
                    tKey={`kundli.graha.${p.graha.toLowerCase()}`}
                    replacements={{ defaultValue: GRAHA_HINDI[p.graha] }}
                  />
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
