"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { BADGE_CATALOG, useGamification } from "@/lib/gamification";

function StatTile({ label, value }: { label: string; value: string | number }) {
  return (
    <GlassCard className="p-6 text-center">
      <p className="accent-gradient-text text-3xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-muted-soft">{label}</p>
    </GlassCard>
  );
}

export default function ProfilePage() {
  const { hydrated, xp, streak, bestStreak, badges, totalReadings, bestXpDayTotal, levelTitle } = useGamification();

  if (!hydrated) {
    return <div className="px-6 py-24 text-center text-muted">Loading your stats…</div>;
  }

  const earnedIds = new Set(badges.map((b) => b.id));
  const allBadgeIds = Object.keys(BADGE_CATALOG);

  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-16">
      <div className="text-center">
        <p className="text-xs uppercase tracking-widest text-muted-soft">Your Profile</p>
        <h1 className="mt-2 text-3xl font-bold">{levelTitle}</h1>
        <p className="mt-2 text-sm text-muted">
          These stats live only in this browser — there&apos;s no account or server, so this is a personal
          record, not a public leaderboard.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatTile label="Cosmic XP" value={xp} />
        <StatTile label="Current Streak" value={streak} />
        <StatTile label="Longest Streak" value={bestStreak} />
        <StatTile label="Best XP Day" value={bestXpDayTotal} />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <StatTile label="Total Readings" value={totalReadings} />
        <StatTile label="Badges Collected" value={`${badges.length} / ${allBadgeIds.length}`} />
      </div>

      <GlassCard className="mt-10 p-6">
        <h2 className="mb-4 text-lg font-semibold">Badge Collection</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {allBadgeIds.map((id) => {
            const meta = BADGE_CATALOG[id];
            const earned = earnedIds.has(id);
            return (
              <div
                key={id}
                className={`rounded-2xl border p-4 text-center transition ${
                  earned ? "border-[var(--surface-border)]" : "border-dashed border-[var(--surface-border)] opacity-40"
                }`}
              >
                <p className="text-2xl">{earned ? "🏅" : "🔒"}</p>
                <p className="mt-2 text-sm font-medium">{meta.name}</p>
                <p className="mt-1 text-xs text-muted-soft">{meta.description}</p>
              </div>
            );
          })}
        </div>
      </GlassCard>

      <div className="mt-10 text-center">
        <Button href="/">Back to Home</Button>
      </div>
    </div>
  );
}
