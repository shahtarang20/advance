import { getLifePathNumber } from "./numerology";
import { seededRandom } from "./prng";

export interface CompatibilityResult {
  percentage: number;
  verdict: string;
  headline: string;
  nameA: string;
  nameB: string;
  lifePathA: number;
  lifePathB: number;
}

// A simple, defensible "compatibility grid" between life path numbers (1-9, plus
// master numbers collapsed to their base vibration for this purpose). Not meant
// to be scientific — it's a fun, shareable numerology game.
const AFFINITY: Record<string, number> = {
  "1-1": 78, "1-2": 65, "1-3": 88, "1-4": 60, "1-5": 90, "1-6": 55, "1-7": 70, "1-8": 82, "1-9": 75,
  "2-2": 85, "2-3": 72, "2-4": 80, "2-5": 58, "2-6": 92, "2-7": 68, "2-8": 74, "2-9": 88,
  "3-3": 80, "3-4": 55, "3-5": 85, "3-6": 78, "3-7": 60, "3-8": 65, "3-9": 90,
  "4-4": 82, "4-5": 50, "4-6": 88, "4-7": 72, "4-8": 90, "4-9": 62,
  "5-5": 75, "5-6": 58, "5-7": 68, "5-8": 70, "5-9": 84,
  "6-6": 88, "6-7": 62, "6-8": 78, "6-9": 86,
  "7-7": 80, "7-8": 65, "7-9": 74,
  "8-8": 85, "8-9": 70,
  "9-9": 90,
};

function baseVibration(n: number): number {
  if (n === 11) return 2;
  if (n === 22) return 4;
  if (n === 33) return 6;
  return n;
}

function affinityLookup(a: number, b: number): number {
  const x = Math.min(a, b);
  const y = Math.max(a, b);
  return AFFINITY[`${x}-${y}`] ?? 70;
}

const VERDICTS: { min: number; texts: string[] }[] = [
  {
    min: 85,
    texts: [
      "A rare, powerful match — your numbers amplify each other beautifully.",
      "This is the kind of connection that feels almost written in the stars.",
      "Your energies fit together like they were designed as a pair.",
    ],
  },
  {
    min: 70,
    texts: [
      "A strong, promising connection with real potential to grow.",
      "There's a solid foundation here — the effort you both put in will show.",
      "Your differences complement each other more than they clash.",
    ],
  },
  {
    min: 55,
    texts: [
      "A workable match that needs communication to really thrive.",
      "There's chemistry here, but it takes conscious effort to keep balanced.",
      "You'll need patience with each other's differences, but it can pay off.",
    ],
  },
  {
    min: 0,
    texts: [
      "An unlikely pairing on paper — but numbers aren't the whole story.",
      "This connection will take real work, but growth often comes from friction.",
      "Opposites here create tension, but tension can turn into real passion.",
    ],
  },
];

export function calculateCompatibility(nameA: string, dobA: string, nameB: string, dobB: string): CompatibilityResult {
  const lifePathA = getLifePathNumber(dobA);
  const lifePathB = getLifePathNumber(dobB);
  const base = affinityLookup(baseVibration(lifePathA), baseVibration(lifePathB));

  // Deterministic small variance so the same pair always gets the same result,
  // but it doesn't look too "clean" / robotic.
  const rng = seededRandom(nameA.toLowerCase(), dobA, nameB.toLowerCase(), dobB);
  const variance = Math.floor(rng() * 9) - 4;
  const percentage = Math.max(35, Math.min(99, base + variance));

  const bucket = VERDICTS.find((v) => percentage >= v.min) ?? VERDICTS[VERDICTS.length - 1];
  const verdict = bucket.texts[Math.floor(rng() * bucket.texts.length)];

  return {
    percentage,
    verdict,
    headline: `${nameA} & ${nameB}: ${percentage}% Cosmic Match`,
    nameA,
    nameB,
    lifePathA,
    lifePathB,
  };
}
