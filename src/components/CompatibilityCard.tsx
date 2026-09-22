import { GlassCard } from "@/components/ui/GlassCard";
import { FlipCard } from "@/components/ui/FlipCard";
import { CompatibilityResult } from "@/lib/compatibility";

export function CompatibilityCard({ result }: { result: CompatibilityResult }) {
  return (
    <div className="space-y-6">
      <FlipCard
        ariaLabel={`${result.nameA} and ${result.nameB} compatibility: ${result.percentage}% match`}
        className="mx-auto max-w-sm"
        heightClassName="h-80"
        front={
          <GlassCard className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
            <p className="text-xs uppercase tracking-widest text-muted-soft">Cosmic Compatibility</p>
            <h2 className="mt-2 text-xl font-semibold">
              {result.nameA} <span className="text-muted-soft">&amp;</span> {result.nameB}
            </h2>
            <p className="accent-gradient-text mt-4 text-7xl font-bold">{result.percentage}%</p>
            <p className="mt-4 text-[11px] text-muted-soft">Tap to reveal the verdict ✦</p>
          </GlassCard>
        }
        back={
          <GlassCard className="flex h-full w-full flex-col items-center justify-center overflow-y-auto p-6 text-center">
            <p className="text-xs uppercase tracking-widest text-muted-soft">
              {result.nameA} &amp; {result.nameB} · {result.percentage}% Match
            </p>
            <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-muted">{result.verdict}</p>
          </GlassCard>
        }
      />

      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-soft">Core Numbers</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <GlassCard className="p-6 text-center">
            <p className="text-xs text-muted-soft">{result.nameA}&apos;s Life Path</p>
            <p className="accent-gradient-text mt-1 text-4xl font-bold">{result.lifePathA}</p>
          </GlassCard>
          <GlassCard className="p-6 text-center">
            <p className="text-xs text-muted-soft">{result.nameB}&apos;s Life Path</p>
            <p className="accent-gradient-text mt-1 text-4xl font-bold">{result.lifePathB}</p>
          </GlassCard>
        </div>
      </div>

      <GlassCard className="p-6">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-purple-300">Why This Score?</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Your Life Path Numbers are compared against a traditional numerology affinity grid, then given a small
          amount of deterministic variance so no two names land on an identical score. This is a fun, shareable
          read on your numbers, not a scientific measurement of your relationship.
        </p>
      </GlassCard>
    </div>
  );
}
