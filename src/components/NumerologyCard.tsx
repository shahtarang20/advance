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
    <div className="space-y-10">
      <GlassCard className="overflow-hidden p-8 text-center sm:p-10">
        <p className="text-sm font-medium text-muted-soft">Numerology reading for</p>
        <h2 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">{name}</h2>
        <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {HEADLINE_ORDER.map((cat) => (
            <div key={cat}>
              <p className="accent-gradient-text text-5xl font-bold tracking-tight sm:text-6xl">
                {values[cat]}
              </p>
              <p className="mt-2 text-sm text-muted">{CATEGORY_LABELS[cat]}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      {profile.karmicDebts.length > 0 && (
        <GlassCard className="border-amber-400/20 p-6 sm:p-8">
          <h3 className="text-lg font-semibold tracking-tight text-amber-700">
            Karmic Debt {profile.karmicDebts.length > 1 ? "Numbers" : "Number"}: {profile.karmicDebts.join(", ")}
          </h3>
          <div className="mt-3 space-y-3">
            {profile.karmicDebts.map((debt) => (
              <p key={debt} className="text-base leading-relaxed text-muted">
                {KARMIC_DEBT_DESCRIPTIONS[debt]}
              </p>
            ))}
          </div>
        </GlassCard>
      )}

      <div>
        <h3 className="mb-5 text-2xl font-semibold tracking-tight">Core Numbers</h3>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {CORE_GRID_ORDER.map((cat) => (
            <NumberFlipCard key={cat} category={cat} value={values[cat]} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-5 text-2xl font-semibold tracking-tight">Extended Reading</h3>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {EXTENDED_GRID_ORDER.map((cat) => (
            <NumberFlipCard key={cat} category={cat} value={values[cat]} />
          ))}
        </div>
      </div>

      {profile.karmicLessons.length > 0 && (
        <GlassCard className="border-indigo-400/20 p-6 sm:p-8">
          <h3 className="text-lg font-semibold tracking-tight text-indigo-700">
            Karmic Lesson {profile.karmicLessons.length > 1 ? "Numbers" : "Number"}: {profile.karmicLessons.join(", ")}
          </h3>
          <div className="mt-3 space-y-3">
            {profile.karmicLessons.map((lesson) => (
              <p key={lesson} className="text-base leading-relaxed text-muted">
                {KARMIC_LESSON_DESCRIPTIONS[lesson]}
              </p>
            ))}
          </div>
        </GlassCard>
      )}

      <GlassCard className="p-6 sm:p-8">
        <h3 className="text-2xl font-semibold tracking-tight">Pinnacles &amp; Challenges</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-soft">
          The classic four-stage life-cycle system, built from your birth month, day, and year.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
          {profile.pinnacleCycle.pinnacles.map((p, i) => (
            <div key={i} className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] p-5">
              <p className="text-xs font-medium text-muted-soft">
                {getPinnacleStageLabel(i)}
              </p>
              <p className="text-xs text-muted-soft">{p.ageRange}</p>
              <p className="mt-2 text-3xl font-bold tracking-tight">{p.number}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">{getPinnacleDescription(i, p.number)}</p>
              <div className="mt-3 border-t border-[var(--surface-border)] pt-3">
                <p className="text-xs font-medium text-rose-600">
                  Challenge {profile.pinnacleCycle.challenges[i]}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-muted">
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
        <GlassCard className="flex h-full w-full flex-col items-center justify-center p-5 text-center">
          <p className="accent-gradient-text text-5xl font-bold tracking-tight sm:text-6xl">{value}</p>
          <p className="mt-3 text-sm font-medium text-muted">
            {CATEGORY_LABELS[category]}
          </p>
          <p className="mt-3 text-xs text-muted-soft">Tap to reveal meaning ✦</p>
        </GlassCard>
      }
      back={
        <GlassCard className="flex h-full w-full flex-col overflow-hidden p-5">
          <h3 className="shrink-0 text-base font-semibold tracking-tight">
            {CATEGORY_LABELS[category]}
          </h3>
          <p className="mt-1 shrink-0 text-xs italic text-muted-soft">{CATEGORY_TAGLINES[category]}</p>
          <p className="scroll-thin mt-3 min-h-0 flex-1 overflow-y-auto pr-1 text-[13px] leading-relaxed text-muted">
            {getDescription(category, value)}
          </p>
        </GlassCard>
      }
    />
  );
}
