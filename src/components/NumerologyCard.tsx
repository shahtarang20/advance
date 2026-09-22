import { GlassCard } from "@/components/ui/GlassCard";
import { FlipCard } from "@/components/ui/FlipCard";
import {
  CATEGORY_LABELS,
  CATEGORY_TAGLINES,
  KARMIC_DEBT_DESCRIPTIONS,
  KARMIC_LESSON_DESCRIPTIONS,
  NumerologyCategory,
  NumerologyProfile,
  getChallengeDescription,
  getDescription,
  getPinnacleDescription,
  getPinnacleStageLabel,
} from "@/lib/numerology";

const HEADLINE_ORDER: NumerologyCategory[] = ["lifePath", "destiny", "soulUrge", "personality"];
const CORE_GRID_ORDER: NumerologyCategory[] = [
  "lifePath",
  "destiny",
  "soulUrge",
  "personality",
  "chaldeanDestiny",
  "birthday",
  "maturity",
  "personalYear",
];
const EXTENDED_GRID_ORDER: NumerologyCategory[] = [
  "personalMonth",
  "personalDay",
  "hiddenPassion",
  "balance",
  "rationalThought",
];

export function NumerologyCard({ name, profile }: { name: string; profile: NumerologyProfile }) {
  const values: Record<NumerologyCategory, number> = {
    lifePath: profile.lifePath,
    destiny: profile.destiny,
    soulUrge: profile.soulUrge,
    personality: profile.personality,
    chaldeanDestiny: profile.chaldeanDestiny,
    birthday: profile.birthday,
    maturity: profile.maturity,
    personalYear: profile.personalYear,
    personalMonth: profile.personalMonth,
    personalDay: profile.personalDay,
    hiddenPassion: profile.hiddenPassion,
    balance: profile.balance,
    rationalThought: profile.rationalThought,
  };

  return (
    <div className="space-y-6">
      <GlassCard className="overflow-hidden p-8 text-center">
        <p className="text-xs uppercase tracking-widest text-muted-soft">Numerology Reading For</p>
        <h2 className="mt-1 text-3xl font-bold">{name}</h2>
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {HEADLINE_ORDER.map((cat) => (
            <div key={cat}>
              <p className="accent-gradient-text text-5xl font-bold">
                {values[cat]}
              </p>
              <p className="mt-1 text-xs text-muted">{CATEGORY_LABELS[cat]}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      {profile.karmicDebts.length > 0 && (
        <GlassCard className="border-amber-400/30 p-6">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-amber-600">
            Karmic Debt {profile.karmicDebts.length > 1 ? "Numbers" : "Number"}: {profile.karmicDebts.join(", ")}
          </h3>
          <div className="mt-3 space-y-3">
            {profile.karmicDebts.map((debt) => (
              <p key={debt} className="text-sm leading-relaxed text-muted">
                {KARMIC_DEBT_DESCRIPTIONS[debt]}
              </p>
            ))}
          </div>
        </GlassCard>
      )}

      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-soft">Core Numbers</h3>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {CORE_GRID_ORDER.map((cat) => (
            <NumberFlipCard key={cat} category={cat} value={values[cat]} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-soft">Extended Reading</h3>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {EXTENDED_GRID_ORDER.map((cat) => (
            <NumberFlipCard key={cat} category={cat} value={values[cat]} />
          ))}
        </div>
      </div>

      {profile.karmicLessons.length > 0 && (
        <GlassCard className="border-indigo-400/30 p-6">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
            Karmic Lesson {profile.karmicLessons.length > 1 ? "Numbers" : "Number"}: {profile.karmicLessons.join(", ")}
          </h3>
          <div className="mt-3 space-y-3">
            {profile.karmicLessons.map((lesson) => (
              <p key={lesson} className="text-sm leading-relaxed text-muted">
                {KARMIC_LESSON_DESCRIPTIONS[lesson]}
              </p>
            ))}
          </div>
        </GlassCard>
      )}

      <GlassCard className="p-6">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-amber-600">Pinnacles &amp; Challenges</h3>
        <p className="mt-1 text-[11px] italic text-muted-soft">
          The classic four-stage life-cycle system, built from your birth month, day, and year.
        </p>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-4">
          {profile.pinnacleCycle.pinnacles.map((p, i) => (
            <div key={i} className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] p-4">
              <p className="text-[10px] font-medium uppercase tracking-widest text-muted-soft">
                {getPinnacleStageLabel(i)}
              </p>
              <p className="text-xs text-muted-soft">{p.ageRange}</p>
              <p className="accent-gradient-text mt-2 text-3xl font-bold">{p.number}</p>
              <p className="mt-2 text-[11px] leading-relaxed text-muted">{getPinnacleDescription(i, p.number)}</p>
              <div className="mt-3 border-t border-[var(--surface-border)] pt-3">
                <p className="text-[10px] font-medium uppercase tracking-widest text-rose-600">
                  Challenge {profile.pinnacleCycle.challenges[i]}
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-muted">
                  {getChallengeDescription(profile.pinnacleCycle.challenges[i])}
                </p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

function NumberFlipCard({ category, value }: { category: NumerologyCategory; value: number }) {
  return (
    <FlipCard
      ariaLabel={`${CATEGORY_LABELS[category]}: ${value}`}
      heightClassName="h-72"
      front={
        <GlassCard className="flex h-full w-full flex-col items-center justify-center p-4 text-center">
          <p className="accent-gradient-text text-5xl font-bold sm:text-6xl">{value}</p>
          <p className="mt-2 text-xs font-medium uppercase tracking-widest text-muted-soft">
            {CATEGORY_LABELS[category]}
          </p>
          <p className="mt-3 text-[11px] text-muted-soft">Tap to reveal meaning ✦</p>
        </GlassCard>
      }
      back={
        <GlassCard className="flex h-full w-full flex-col overflow-hidden p-4">
          <h3 className="shrink-0 text-xs font-semibold uppercase tracking-widest text-purple-600">
            {CATEGORY_LABELS[category]}
          </h3>
          <p className="mt-1 shrink-0 text-[11px] italic text-muted-soft">{CATEGORY_TAGLINES[category]}</p>
          <p className="scroll-thin mt-2 min-h-0 flex-1 overflow-y-auto pr-1 text-xs leading-relaxed text-muted">
            {getDescription(category, value)}
          </p>
        </GlassCard>
      }
    />
  );
}
