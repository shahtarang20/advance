import { getLifePathNumber, getDestinyNumber, getSoulUrgeNumber } from "./numerology";
import { getZodiacByDob } from "./horoscope";

export interface CompatibilityResult {
  percentage: number;
  verdict: string; // The translation key
  englishVerdict: string; // The English fallback for metadata
  headline: string;
  nameA: string;
  nameB: string;
  lifePathA: number;
  lifePathB: number;
}

// A simple, defensible "compatibility grid" between life path numbers (1-9, plus
// master numbers collapsed to their base vibration for this purpose).
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
  const x = Math.min(baseVibration(a), baseVibration(b));
  const y = Math.max(baseVibration(a), baseVibration(b));
  return AFFINITY[`${x}-${y}`] ?? 70;
}

// Zodiac Elemental Harmony
// Fire (Aries, Leo, Sagittarius)
// Earth (Taurus, Virgo, Capricorn)
// Air (Gemini, Libra, Aquarius)
// Water (Cancer, Scorpio, Pisces)
// Same element = 100, Complementary (Fire/Air, Earth/Water) = 85, Others = 50 or 60.
function getElementalHarmony(elementA: string, elementB: string): number {
  if (elementA === elementB) return 100;
  
  const complementary: Record<string, string> = {
    "Fire": "Air", "Air": "Fire",
    "Earth": "Water", "Water": "Earth"
  };
  
  if (complementary[elementA] === elementB) return 85;
  return 60; // Neutral / Challenging
}

export function calculateCompatibility(nameA: string, dobA: string, nameB: string, dobB: string): CompatibilityResult {
  // 1. Life Path Match (40%)
  const lifePathA = getLifePathNumber(dobA);
  const lifePathB = getLifePathNumber(dobB);
  const lifePathScore = affinityLookup(lifePathA, lifePathB);
  
  // 2. Destiny Match (30%)
  const destinyA = getDestinyNumber(nameA);
  const destinyB = getDestinyNumber(nameB);
  const destinyScore = affinityLookup(destinyA, destinyB);
  
  // 3. Soul Urge Match (20%)
  const soulUrgeA = getSoulUrgeNumber(nameA);
  const soulUrgeB = getSoulUrgeNumber(nameB);
  const soulUrgeScore = affinityLookup(soulUrgeA, soulUrgeB);
  
  // 4. Zodiac Elemental Match (10%)
  const zodiacA = getZodiacByDob(dobA);
  const zodiacB = getZodiacByDob(dobB);
  const elementScore = getElementalHarmony(zodiacA.element, zodiacB.element);
  
  // Combined Advanced Synastry Mathematical Score
  const exactPercentage = (lifePathScore * 0.40) + (destinyScore * 0.30) + (soulUrgeScore * 0.20) + (elementScore * 0.10);
  const percentage = Math.round(exactPercentage);
  
  // Select verdict translation key based on score
  let verdictKey = "comp.verdict.challenging";
  let englishVerdict = "An unlikely pairing on paper — but numbers aren't the whole story.";
  
  if (percentage >= 85) {
    verdictKey = "comp.verdict.excellent";
    englishVerdict = "A rare, powerful match — your energies amplify each other beautifully.";
  } else if (percentage >= 70) {
    verdictKey = "comp.verdict.good";
    englishVerdict = "A strong, promising connection with real potential to grow.";
  } else if (percentage >= 50) {
    verdictKey = "comp.verdict.average";
    englishVerdict = "A workable match that needs communication to really thrive.";
  }

  return {
    percentage,
    verdict: verdictKey,
    englishVerdict,
    headline: `${nameA} & ${nameB}: ${percentage}% Cosmic Match`,
    nameA,
    nameB,
    lifePathA,
    lifePathB,
  };
}
