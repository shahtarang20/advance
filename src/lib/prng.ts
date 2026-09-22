// Deterministic seeded PRNG utilities — pure client-side, no backend needed.
// Same seed always produces the same sequence, so "today's horoscope" is
// identical for every visitor without any server round-trip.

/** mulberry32 — small, fast, good-enough-for-fun PRNG. */
export function mulberry32(seed: number): () => number {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Simple string hash (djb2) turned into a 32-bit int seed. */
export function hashStringToSeed(input: string): number {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 33) ^ input.charCodeAt(i);
  }
  return hash >>> 0;
}

/** Builds a PRNG seeded from an arbitrary set of string parts (e.g. date + sign). */
export function seededRandom(...parts: string[]): () => number {
  return mulberry32(hashStringToSeed(parts.join("|")));
}

/** Picks a deterministic element from an array using an already-created PRNG. */
export function pick<T>(rng: () => number, arr: T[]): T {
  return arr[Math.floor(rng() * arr.length) % arr.length];
}

/** Returns today's date as YYYY-MM-DD in a stable, timezone-agnostic-enough way. */
export function todayKey(date: Date = new Date()): string {
  return date.toISOString().slice(0, 10);
}
