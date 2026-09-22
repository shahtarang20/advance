// Pure client-side Pythagorean numerology calculations.
// No external API calls, no persistence beyond what callers choose to store.

export type NumerologyNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 11 | 22 | 33;

const MASTER_NUMBERS = [11, 22, 33];

const LETTER_VALUES: Record<string, number> = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
  j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
  s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8,
};

const VOWELS = new Set(["a", "e", "i", "o", "u"]);

// Chaldean numerology uses a different, sound-based letter-to-number mapping
// (no letter is assigned to 9, which is considered sacred/complete in this system).
const CHALDEAN_LETTER_VALUES: Record<string, number> = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 8, g: 3, h: 5, i: 1,
  j: 1, k: 2, l: 3, m: 4, n: 5, o: 7, p: 8, q: 1, r: 2,
  s: 3, t: 4, u: 6, v: 6, w: 6, x: 5, y: 1, z: 7,
};

const KARMIC_DEBT_NUMBERS = [13, 14, 16, 19];

/** Reduces a number to 1-9, preserving master numbers 11, 22, 33. */
export function reduceNumber(n: number): number {
  let value = n;
  while (value > 9 && !MASTER_NUMBERS.includes(value)) {
    value = String(value)
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
  }
  return value;
}

/**
 * Reduces a number to 1-9 (or a master number), while recording any karmic debt
 * numbers (13, 14, 16, 19) encountered among the intermediate, unreduced sums.
 */
export function reduceWithKarmicDebt(n: number): { value: number; karmicDebts: number[] } {
  const karmicDebts: number[] = [];
  let value = n;
  if (KARMIC_DEBT_NUMBERS.includes(value)) karmicDebts.push(value);
  while (value > 9 && !MASTER_NUMBERS.includes(value)) {
    value = String(value)
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
    if (KARMIC_DEBT_NUMBERS.includes(value)) karmicDebts.push(value);
  }
  return { value, karmicDebts };
}

function sumLetters(
  name: string,
  filter: (letter: string, isVowel: boolean) => boolean,
  values: Record<string, number> = LETTER_VALUES
): number {
  const letters = name.toLowerCase().replace(/[^a-z]/g, "");
  let total = 0;
  for (const letter of letters) {
    const isVowel = VOWELS.has(letter);
    if (filter(letter, isVowel)) {
      total += values[letter] ?? 0;
    }
  }
  return total;
}

/** Life Path Number — derived from the full date of birth. The core "who you are" number. */
export function getLifePathNumber(dob: string): number {
  // dob format: YYYY-MM-DD
  const digits = dob.replace(/[^0-9]/g, "");
  const year = digits.slice(0, 4);
  const month = digits.slice(4, 6);
  const day = digits.slice(6, 8);

  const reduceDigits = (s: string) =>
    reduceNumber(s.split("").reduce((sum, d) => sum + Number(d), 0));

  const y = reduceDigits(year);
  const m = reduceDigits(month);
  const d = reduceDigits(day);

  return reduceNumber(y + m + d);
}

/** Destiny / Expression Number — derived from all letters of the full name. Your life's purpose. */
export function getDestinyNumber(fullName: string): number {
  return reduceNumber(sumLetters(fullName, () => true));
}

/** Soul Urge (Heart's Desire) Number — derived from vowels only. Your inner motivation. */
export function getSoulUrgeNumber(fullName: string): number {
  return reduceNumber(sumLetters(fullName, (_l, isVowel) => isVowel));
}

/** Personality Number — derived from consonants only. How the world perceives you. */
export function getPersonalityNumber(fullName: string): number {
  return reduceNumber(sumLetters(fullName, (_l, isVowel) => !isVowel));
}

/** Chaldean Destiny Number — full name summed using the ancient Chaldean (sound-based) system. */
export function getChaldeanDestinyNumber(fullName: string): number {
  return reduceNumber(sumLetters(fullName, () => true, CHALDEAN_LETTER_VALUES));
}

/** Birthday Number — just the day of the month you were born on, reduced. Your natural talent. */
export function getBirthdayNumber(dob: string): number {
  const digits = dob.replace(/[^0-9]/g, "");
  const day = digits.slice(6, 8);
  return reduceNumber(Number(day));
}

/** Maturity Number — Life Path + Destiny, reduced. The person you grow into after age ~35-40. */
export function getMaturityNumber(dob: string, fullName: string): number {
  return reduceNumber(getLifePathNumber(dob) + getDestinyNumber(fullName));
}

/** Personal Year Number — birth month + day combined with the target year, reduced. Changes every year. */
export function getPersonalYearNumber(dob: string, year: number = new Date().getFullYear()): number {
  const digits = dob.replace(/[^0-9]/g, "");
  const month = Number(digits.slice(4, 6));
  const day = Number(digits.slice(6, 8));
  const yearSum = String(year)
    .split("")
    .reduce((sum, d) => sum + Number(d), 0);
  return reduceNumber(month + day + yearSum);
}

/** Karmic Debt Numbers found in a person's Life Path and Destiny calculations. */
export function getKarmicDebtNumbers(fullName: string, dob: string): number[] {
  const digits = dob.replace(/[^0-9]/g, "");
  const year = digits.slice(0, 4);
  const month = digits.slice(4, 6);
  const day = digits.slice(6, 8);
  const debts = new Set<number>();

  const reduceDigits = (s: string) => {
    const raw = s.split("").reduce((sum, d) => sum + Number(d), 0);
    const { karmicDebts } = reduceWithKarmicDebt(raw);
    karmicDebts.forEach((k) => debts.add(k));
  };
  reduceDigits(year);
  reduceDigits(month);
  reduceDigits(day);

  const y = reduceNumber(year.split("").reduce((s, d) => s + Number(d), 0));
  const m = reduceNumber(month.split("").reduce((s, d) => s + Number(d), 0));
  const d = reduceNumber(day.split("").reduce((s, d) => s + Number(d), 0));
  reduceWithKarmicDebt(y + m + d).karmicDebts.forEach((k) => debts.add(k));

  const nameSum = sumLetters(fullName, () => true);
  reduceWithKarmicDebt(nameSum).karmicDebts.forEach((k) => debts.add(k));

  return Array.from(debts).sort();
}

export const KARMIC_DEBT_DESCRIPTIONS: Record<number, string> = {
  13: "The Karmic Debt of 13 points to a past pattern of avoiding hard work or cutting corners. This lifetime asks you to build things through discipline and honest effort — the payoff for consistent labor is unusually large for you, but shortcuts backfire harder than they would for anyone else.",
  14: "The Karmic Debt of 14 is tied to freedom and self-control, often around excess of some kind. You're here to learn balance and moderation after a past pattern of overindulgence — when you find your own healthy limits, you gain a remarkable adaptability that few others have.",
  16: "The Karmic Debt of 16 involves the ego and relationships — a lesson in humility, usually arriving through the sudden collapse of something you built your identity around. It can feel like a fall from grace, but it clears the way for a more honest, more solid sense of self.",
  19: "The Karmic Debt of 19 is about learning to stand on your own after leaning too heavily on others in the past. Independence, self-reliance, and quiet confidence are the lessons here — help may be slow to arrive, teaching you just how capable you already are.",
};

/** Personal Month Number — Personal Year reduced with the target month, reduced again. */
export function getPersonalMonthNumber(
  dob: string,
  year: number = new Date().getFullYear(),
  month: number = new Date().getMonth() + 1
): number {
  const personalYear = getPersonalYearNumber(dob, year);
  return reduceNumber(personalYear + month);
}

/** Personal Day Number — Personal Month combined with the target day, reduced. Changes daily. */
export function getPersonalDayNumber(
  dob: string,
  date: Date = new Date()
): number {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const personalMonth = getPersonalMonthNumber(dob, year, month);
  return reduceNumber(personalMonth + day);
}

/** Hidden Passion Number — the letter-value that occurs most often in the full name. */
export function getHiddenPassionNumber(fullName: string): number {
  const letters = fullName.toLowerCase().replace(/[^a-z]/g, "");
  const counts: Record<number, number> = {};
  for (const letter of letters) {
    const value = LETTER_VALUES[letter];
    if (value === undefined) continue;
    counts[value] = (counts[value] ?? 0) + 1;
  }
  let bestValue = 1;
  let bestCount = -1;
  for (let v = 1; v <= 9; v++) {
    const c = counts[v] ?? 0;
    if (c > bestCount) {
      bestCount = c;
      bestValue = v;
    }
  }
  return bestValue;
}

/** Balance Number — reduced sum of the initials of each part of the name; how you handle adversity. */
export function getBalanceNumber(fullName: string): number {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  let total = 0;
  for (const part of parts) {
    const initial = part[0]?.toLowerCase() ?? "";
    total += LETTER_VALUES[initial] ?? 0;
  }
  return reduceNumber(total || 0);
}

/** Rational Thought Number — reduced sum of consonant values only (distinct from Soul Urge, which uses vowels). */
export function getRationalThoughtNumber(fullName: string): number {
  return reduceNumber(sumLetters(fullName, (_l, isVowel) => !isVowel));
}

/** Karmic Lesson Numbers — digits 1-9 that never appear in the full name's letter-value chart. */
export function getKarmicLessonNumbers(fullName: string): number[] {
  const letters = fullName.toLowerCase().replace(/[^a-z]/g, "");
  const present = new Set<number>();
  for (const letter of letters) {
    const value = LETTER_VALUES[letter];
    if (value !== undefined) present.add(value);
  }
  const missing: number[] = [];
  for (let v = 1; v <= 9; v++) {
    if (!present.has(v)) missing.push(v);
  }
  return missing;
}

export interface Pinnacle {
  number: number;
  ageRange: string;
}

export interface PinnacleCycle {
  pinnacles: [Pinnacle, Pinnacle, Pinnacle, Pinnacle];
  challenges: [number, number, number, number];
}

/** Pinnacles & Challenges — the standard 4-stage life-cycle system derived from birth month/day/year. */
export function getPinnaclesAndChallenges(dob: string): PinnacleCycle {
  const digits = dob.replace(/[^0-9]/g, "");
  const year = Number(digits.slice(0, 4));
  const month = Number(digits.slice(4, 6));
  const day = Number(digits.slice(6, 8));

  const reduceDigits = (n: number) =>
    reduceNumber(String(n).split("").reduce((sum, d) => sum + Number(d), 0));

  const m = reduceDigits(month);
  const d = reduceDigits(day);
  const y = reduceDigits(year);

  const p1 = reduceNumber(m + d);
  const p2 = reduceNumber(d + y);
  const p3 = reduceNumber(p1 + p2);
  const p4 = reduceNumber(m + y);

  const c1 = reduceNumber(Math.abs(m - d));
  const c2 = reduceNumber(Math.abs(d - y));
  const c3 = reduceNumber(Math.abs(c1 - c2));
  const c4 = reduceNumber(Math.abs(m - y));

  // First pinnacle spans birth to (36 - Life Path), a widely used traditional rule of thumb.
  const lifePath = getLifePathNumber(dob);
  const firstEnd = 36 - (lifePath > 9 && lifePath !== 11 && lifePath !== 22 && lifePath !== 33 ? reduceNumber(lifePath) : lifePath);
  const end1 = Math.max(firstEnd, 26);

  return {
    pinnacles: [
      { number: p1, ageRange: `Birth – ${end1}` },
      { number: p2, ageRange: `${end1 + 1} – ${end1 + 9}` },
      { number: p3, ageRange: `${end1 + 10} – ${end1 + 18}` },
      { number: p4, ageRange: `${end1 + 19}+` },
    ],
    challenges: [c1, c2, c3, c4],
  };
}

export interface NumerologyProfile {
  lifePath: number;
  destiny: number;
  soulUrge: number;
  personality: number;
  chaldeanDestiny: number;
  birthday: number;
  maturity: number;
  personalYear: number;
  personalMonth: number;
  personalDay: number;
  hiddenPassion: number;
  balance: number;
  rationalThought: number;
  karmicDebts: number[];
  karmicLessons: number[];
  pinnacleCycle: PinnacleCycle;
}

export function calculateNumerologyProfile(fullName: string, dob: string): NumerologyProfile {
  return {
    lifePath: getLifePathNumber(dob),
    destiny: getDestinyNumber(fullName),
    soulUrge: getSoulUrgeNumber(fullName),
    personality: getPersonalityNumber(fullName),
    chaldeanDestiny: getChaldeanDestinyNumber(fullName),
    birthday: getBirthdayNumber(dob),
    maturity: getMaturityNumber(dob, fullName),
    personalYear: getPersonalYearNumber(dob),
    personalMonth: getPersonalMonthNumber(dob),
    personalDay: getPersonalDayNumber(dob),
    hiddenPassion: getHiddenPassionNumber(fullName),
    balance: getBalanceNumber(fullName),
    rationalThought: getRationalThoughtNumber(fullName),
    karmicDebts: getKarmicDebtNumbers(fullName, dob),
    karmicLessons: getKarmicLessonNumbers(fullName),
    pinnacleCycle: getPinnaclesAndChallenges(dob),
  };
}

export type NumerologyCategory =
  | "lifePath"
  | "destiny"
  | "soulUrge"
  | "personality"
  | "chaldeanDestiny"
  | "birthday"
  | "maturity"
  | "personalYear"
  | "personalMonth"
  | "personalDay"
  | "hiddenPassion"
  | "balance"
  | "rationalThought";

export const CATEGORY_LABELS: Record<NumerologyCategory, string> = {
  lifePath: "Life Path Number",
  destiny: "Destiny Number",
  soulUrge: "Soul Urge Number",
  personality: "Personality Number",
  chaldeanDestiny: "Chaldean Destiny Number",
  birthday: "Birthday Number",
  maturity: "Maturity Number",
  personalYear: "Personal Year Number",
  personalMonth: "Personal Month Number",
  personalDay: "Personal Day Number",
  hiddenPassion: "Hidden Passion Number",
  balance: "Balance Number",
  rationalThought: "Rational Thought Number",
};

export const CATEGORY_TAGLINES: Record<NumerologyCategory, string> = {
  lifePath: "Who you fundamentally are",
  destiny: "What you're here to achieve",
  soulUrge: "What your heart truly craves",
  personality: "How the world sees you",
  chaldeanDestiny: "The ancient Chaldean read on your purpose",
  birthday: "Your natural, built-in talent",
  maturity: "Who you become in your second act",
  personalYear: `Your theme for ${new Date().getFullYear()}`,
  personalMonth: "Your theme for this month",
  personalDay: "Your theme for today",
  hiddenPassion: "Your most natural, underused talent",
  balance: "How you steady yourself in hard times",
  rationalThought: "How your mind actually works",
};

// Content bank — genuine, specific copy for each number across all four categories.
// Kept concise (2-3 sentences) but written with real personality, not filler.
export const NUMBER_DESCRIPTIONS: Record<
  "lifePath" | "destiny" | "soulUrge" | "personality",
  Record<number, string>
> = {
  lifePath: {
    1: "You're a natural-born leader with a pioneering spirit — independent, ambitious, and allergic to being told what to do. Life keeps handing you situations that demand initiative, and you rise to them by carving your own path rather than following someone else's map. Your growth lies in balancing your drive with patience for those who move slower than you.",
    2: "You are the diplomat of the numbers, wired for partnership, harmony, and emotional intuition. You sense what others need before they say it, which makes you a natural mediator and a deeply loyal partner or friend. The lesson life keeps teaching you is to value your own voice as much as you value keeping the peace.",
    3: "Creativity, charm, and self-expression are your calling cards. You light up rooms with words, art, or humor, and you're happiest when you're making, performing, or sharing something. Your challenge is turning that scattered inspiration into finished work instead of a dozen brilliant half-starts.",
    4: "You're the builder — practical, disciplined, and deeply trustworthy. While others chase shortcuts, you're laying foundations that actually last, and people quietly rely on you more than they let on. Learning to rest without guilt is your biggest growth edge.",
    5: "Freedom is oxygen to you. You crave change, travel, new people, and new experiences, and you adapt to chaos faster than almost anyone. The flip side is restlessness — your path is learning to commit deeply to something without feeling trapped by it.",
    6: "You're the nurturer, wired for responsibility, family, and service to others. People bring you their problems because you actually fix them, and home is sacred territory for you. Your growth lies in giving yourself the same care you so freely give everyone else.",
    7: "You're the seeker — analytical, private, and drawn to the deeper questions beneath the surface of things. You'd rather understand the truth than be comfortable, and solitude recharges you more than any party could. Your path is learning to let people in without feeling exposed.",
    8: "Power, ambition, and material mastery define your path. You understand money, authority, and systems intuitively, and you were built to build empires, not just careers. The lesson is remembering that abundance means nothing without integrity and people to share it with.",
    9: "You're the humanitarian, here to give more than you take. Compassion, big-picture vision, and a pull toward causes larger than yourself define you, and endings don't scare you — you know they make room for what's next. Your challenge is not losing yourself while saving everyone else.",
    11: "A master number — you're a highly intuitive visionary, wired like a spiritual antenna picking up what others miss. You carry more sensitivity and insight than most people know what to do with, and your task is channeling it into something real instead of being overwhelmed by it. When you trust your gut, you inspire people just by being yourself.",
    22: "The master builder — you combine the practical grit of a 4 with the vision of an 11, giving you the rare ability to turn big dreams into tangible, lasting reality. Few people can think this big and execute this well at the same time. Your challenge is not underestimating just how much you're capable of building.",
    33: "The master teacher — a rare path defined by selfless love, healing, and guidance for others, blending creativity with deep compassion. You're here to uplift people on a large scale, often through teaching, art, or care work. Your lesson is protecting your own energy while you pour so much into everyone else's.",
  },
  destiny: {
    1: "Your destiny is to lead. You're meant to innovate, start things others are too afraid to attempt, and become known for standing on your own two feet. Fulfillment comes from independence and originality, not from fitting into someone else's system.",
    2: "You're destined to bring people together — as a partner, peacemaker, or behind-the-scenes force who makes collaboration actually work. Your gift is cooperation, and your purpose unfolds through relationships rather than solo glory.",
    3: "Self-expression is your life's work. Whether through writing, speaking, performing, or art, you're destined to communicate ideas and emotions in ways that move people. Hiding your voice is the one thing that will make you unhappy.",
    4: "You're destined to build something solid — a business, a system, a legacy — through patient, methodical effort. Recognition may come slowly, but what you create is meant to outlast trends and last for the long haul.",
    5: "Your purpose is tied to freedom, change, and experience. You're destined to explore, adapt, and bring fresh perspective wherever you go, often inspiring others to break out of their own ruts along the way.",
    6: "You're destined for care-taking on a meaningful scale — family, community, healing professions, or creative work that comforts people. Responsibility isn't a burden for you; it's the very thing that makes your life feel purposeful.",
    7: "Your destiny involves depth — research, spirituality, analysis, or mastery of a craft that most people never bother to fully understand. You're here to go further into truth than most are willing to go.",
    8: "You're destined for achievement in the material world — business, leadership, finance, or any arena where ambition meets execution. Your purpose is to build real, tangible success and to use it wisely.",
    9: "Your destiny is service on a broad scale. You're meant to give back — through art, activism, teaching, or compassion — leaving the world measurably better than you found it.",
    11: "Your destiny is to illuminate — to inspire others through insight, intuition, and vision that goes beyond the practical. You're meant to be a spiritual or creative torchbearer, even if it takes years to trust that role.",
    22: "You're destined to build at scale — turning idealistic visions into structures, organizations, or works that genuinely change how people live. This is one of the most powerful destiny numbers, carrying real responsibility.",
    33: "Your destiny is to heal and uplift through compassionate leadership and teaching, often sacrificing personal recognition for the sake of others' growth. You're here to give the kind of guidance that changes lives.",
  },
  soulUrge: {
    1: "Deep down, you crave independence and the freedom to be first — first to try, first to lead, first to matter on your own terms. Being controlled or overlooked frustrates you more than almost anything else.",
    2: "What your heart truly wants is closeness — real partnership, harmony, and the quiet comfort of being deeply understood by someone. Conflict genuinely drains you, and peace genuinely fills you back up.",
    3: "Your soul craves joy, play, and expression. You want to be seen and appreciated for your creativity and charm, and a life without room for fun feels unbearably flat to you.",
    4: "Deep down you crave stability, order, and a sense of solid ground beneath your feet. Chaos unsettles you; a well-built routine and clear plan genuinely make you feel safe.",
    5: "Your heart craves freedom and variety above almost everything else. Routine can feel like a slow suffocation, and you're happiest when your days still hold room for surprise.",
    6: "What you want most, underneath everything, is to love and be loved deeply — through family, home, and the people you care for. Feeling needed is deeply satisfying to your soul.",
    7: "Your inner world craves truth, quiet, and understanding that goes beneath the surface. Small talk bores you; you want conversations and experiences with actual depth.",
    8: "Deep down you crave recognition and control over your own destiny — you want to matter, achieve, and be respected for what you've built with your own hands.",
    9: "Your soul craves meaning on a large scale — to matter to more than just yourself, and to know your life added something real to the world around you.",
    11: "Your heart craves spiritual connection and a sense of higher purpose. Surface-level living leaves you feeling hollow — you want your life to mean something beyond the ordinary.",
    22: "Deep down you crave the chance to build something enormous and lasting, something that proves your vision was worth the effort it took to realize it.",
    33: "Your soul craves the chance to love and heal on a grand scale, pouring compassion into the world in a way that leaves people genuinely transformed.",
  },
  personality: {
    1: "Others see you as confident, capable, and a little intimidating — someone who clearly knows where they're going. People often assume you have it more together than you feel inside.",
    2: "You come across as warm, gentle, and easy to talk to. People feel instinctively safe opening up to you, sensing you'll actually listen without judgment.",
    3: "You're perceived as fun, expressive, and magnetic — the person who makes any room feel a little lighter just by being in it.",
    4: "People see you as dependable and grounded, the one they call when they need something done right. You radiate quiet, steady competence.",
    5: "You come across as adventurous, spontaneous, and a bit unpredictable — someone who makes life feel more exciting just by association.",
    6: "Others perceive you as caring and responsible, the natural go-to for advice or comfort. You give off a warm, nurturing, trustworthy presence.",
    7: "People see you as thoughtful, private, and a little mysterious — someone with hidden depths they'd like to understand better.",
    8: "You're perceived as powerful and successful, someone who commands respect and clearly knows the value of hard work and ambition.",
    9: "Others see you as compassionate and wise beyond your years, someone with a broad, generous perspective on the world.",
    11: "People sense something quietly intense and intuitive about you — an old-soul energy that makes them take your insights seriously.",
    22: "You come across as remarkably capable and visionary, someone others trust with big responsibility because you clearly can handle it.",
    33: "People perceive you as deeply caring and wise, a natural guide or mentor figure they turn to in difficult moments.",
  },
};

// Chaldean Destiny content — distinct in tone from the Pythagorean Destiny Number since it
// reflects the vibration of the name's sound rather than its letters' position in the alphabet.
export const CHALDEAN_DESTINY_DESCRIPTIONS: Record<number, string> = {
  1: "In the Chaldean system, your name carries the vibration of leadership and originality. The sound of your name pushes you toward independence and being first — a subtly different flavor of ambition than the Western system shows, more instinctive than strategic.",
  2: "Your name's Chaldean vibration is tuned to partnership, sensitivity, and diplomacy. This ancient system reads your identity as fundamentally cooperative — most at ease when working in tandem with someone else's rhythm.",
  3: "The Chaldean reading of your name carries a vibration of expression and sociability. You're built to communicate, and the ancient seers would have marked you as a natural speaker, writer, or performer.",
  4: "Your name vibrates with structure and discipline in the Chaldean system — an ancient marker of someone built to create order out of disorder, brick by brick, with patience the modern system undervalues.",
  5: "In Chaldean numerology your name's sound resonates with change, movement, and the senses. This is traditionally read as a restless, magnetic vibration that resists being pinned down.",
  6: "Your name carries a Chaldean vibration of responsibility and devotion — an ancient marker of someone who anchors a household, a team, or a community through sheer reliability.",
  7: "The Chaldean sound of your name resonates with introspection and hidden knowledge. This system has long associated this vibration with mystics, researchers, and those who see past the surface of things.",
  8: "Your name's Chaldean vibration carries the weight of material power and karmic reckoning — traditionally the number of big wins and big lessons, rarely anything in between.",
  9: "In the Chaldean system, 9 doesn't appear as a letter value at all — it's treated as sacred and complete, so a name reducing here is read as carrying a vibration of universal compassion and completion, someone whose purpose touches many lives.",
  11: "A Chaldean master vibration — your name resonates with heightened intuition and spiritual insight, marking you in this ancient system as someone whose instincts run unusually deep.",
  22: "A Chaldean master vibration of the builder — the ancient seers would read this as the rare capacity to manifest large, tangible visions into the physical world.",
  33: "A Chaldean master vibration of compassionate teaching — traditionally read as someone whose name itself carries a healing, guiding resonance for others.",
};

export const BIRTHDAY_NUMBER_DESCRIPTIONS: Record<number, string> = {
  1: "Born on a day that carries independence and initiative, you have a natural gift for leading and starting things — a talent you likely leaned on before you even had words for it.",
  2: "Born under a number of harmony and cooperation, you have an innate gift for working well with others and reading a room — the natural diplomat wherever you land.",
  3: "Your birthday carries a gift for self-expression — words, humor, or art come more naturally to you than to most, a talent that likely showed up early in life.",
  4: "Born on a day of structure and reliability, you have a built-in talent for organizing, planning, and getting things actually done — the person others hand the details to.",
  5: "Your birthday number carries a natural gift for adaptability and communication — you pick up new environments and new people faster than most.",
  6: "Born under a number of care and responsibility, you have a natural talent for nurturing others and creating a sense of home wherever you are.",
  7: "Your birthday carries a gift for analysis and insight — a natural researcher's mind that isn't satisfied with surface-level answers.",
  8: "Born on a day of ambition and organization, you have a natural head for business, money, and getting resources where they need to go.",
  9: "Your birthday number carries a natural gift for compassion and big-picture thinking — you were likely the one your friends confided in, even as a kid.",
  11: "A master birthday number — you carry a naturally heightened intuition and sensitivity, an old-soul quality that was probably visible in you even young.",
  22: "A master birthday number of the builder — you have a rare natural capacity to think practically and big at the same time.",
  33: "A master birthday number of compassion — you carry a natural, almost instinctive gift for looking after others.",
};

export const MATURITY_NUMBER_DESCRIPTIONS: Record<number, string> = {
  1: "As you mature, independence and leadership move from ambition to identity — by midlife you become genuinely comfortable charting your own course without needing anyone's approval.",
  2: "Your maturity number points toward a second act defined by partnership and balance — the older you get, the more your gift for bringing people together becomes the center of your life's work.",
  3: "In your later years, self-expression stops being something you chase and becomes something you simply are — creative fulfillment becomes central to your happiness as you mature.",
  4: "As you age, the structures you build — career, family, systems — become the clearest expression of who you are. Maturity brings a deep satisfaction in what you've methodically built.",
  5: "Your maturity number suggests that freedom remains central even later in life — you become someone who has finally learned how to build stability without sacrificing your need for change.",
  6: "As you mature, responsibility and caretaking become less of a duty and more of a calling — family, mentorship, and community take center stage in a deeply fulfilling way.",
  7: "In your later years you move toward wisdom and depth — maturity brings a hard-won peace with solitude and a sharper, calmer clarity about what actually matters.",
  8: "Your maturity number points toward achievement finally landing with real meaning — by midlife, success stops being about proving yourself and starts being about using your power wisely.",
  9: "As you mature, your life increasingly orients around giving back — service, generosity, and legacy become the measure you use for a life well lived.",
  11: "A master maturity number — later life brings a heightened spiritual clarity, where your intuition finally feels less overwhelming and more like a trustworthy guide.",
  22: "A master maturity number of the builder — your later years carry real capacity to complete large, lasting projects that reflect a lifetime of vision.",
  33: "A master maturity number of the teacher — your later years are marked by a natural pull toward guiding, healing, and uplifting the people around you.",
};

// Personal Year content — this number changes annually, so copy is framed around the year ahead
// rather than a fixed trait, giving people a reason to check back each year.
export const PERSONAL_YEAR_DESCRIPTIONS: Record<number, string> = {
  1: "This is a Personal Year 1 for you — a fresh-start year. New beginnings, new projects, and bold first moves are favored; whatever you plant now sets the tone for the next nine-year cycle.",
  2: "This is a Personal Year 2 for you — a year of patience, partnership, and behind-the-scenes groundwork. Big flashy wins are less likely than steady relationship-building and cooperation.",
  3: "This is a Personal Year 3 for you — a year for creativity, self-expression, and social expansion. Say yes to visibility; this is a good year to create, perform, or simply be seen.",
  4: "This is a Personal Year 4 for you — a year of hard work, structure, and discipline. It won't be the flashiest year, but the foundations you lay now will support you for years to come.",
  5: "This is a Personal Year 5 for you — a year of change, movement, and unexpected opportunity. Routines may get disrupted; leaning into the change usually pays off more than resisting it.",
  6: "This is a Personal Year 6 for you — a year centered on home, family, and responsibility. Relationships and domestic matters take priority, and caretaking is likely to be rewarding.",
  7: "This is a Personal Year 7 for you — a year for reflection, study, and inner work. It's a quieter year by design; use it to recharge and go deeper rather than push outward.",
  8: "This is a Personal Year 8 for you — a year of ambition, achievement, and material reward. Career and financial matters take center stage, and hard work is likely to pay off visibly.",
  9: "This is a Personal Year 9 for you — a year of endings and release. Things that have run their course tend to fall away now, clearing space for the new nine-year cycle about to begin.",
  11: "This is a Personal Year 11 for you — a heightened, intuitive year. Pay close attention to instincts and coincidences; this year tends to bring insight faster than logic can explain it.",
  22: "This is a Personal Year 22 for you — a rare, high-capacity year for building something big and lasting. Ambitious, long-term projects are unusually well-supported right now.",
  33: "This is a Personal Year 33 for you — a year oriented around service and compassionate leadership. Teaching, healing, or guiding others is especially resonant this year.",
};

// Personal Month content — mirrors the Personal Year framing but zoomed into the current month.
export const PERSONAL_MONTH_DESCRIPTIONS: Record<number, string> = {
  1: "This is a Personal Month 1 — a mini fresh-start window inside your bigger Personal Year. Good month to launch something, pitch an idea, or simply go first.",
  2: "This is a Personal Month 2 — slow down and focus on cooperation. Patience and listening serve you better this month than pushing your own agenda.",
  3: "This is a Personal Month 3 — a lighter, more social month. Creative projects and self-expression get easier traction now.",
  4: "This is a Personal Month 4 — a grind month. Discipline and unglamorous follow-through pay off more than inspiration this month.",
  5: "This is a Personal Month 5 — expect movement and change. Plans may shift; flexibility serves you better than rigid scheduling now.",
  6: "This is a Personal Month 6 — home, family, and responsibility take priority. Good month for repairing relationships and tending your inner circle.",
  7: "This is a Personal Month 7 — a natural pause for reflection. Study, rest, and inner work matter more than pushing outward right now.",
  8: "This is a Personal Month 8 — ambition and money matters move to the front. A strong month for negotiations, career moves, and visible results.",
  9: "This is a Personal Month 9 — a closing-out month. Good time to finish loose ends and release what no longer fits before the next cycle begins.",
  11: "This is a Personal Month 11 — heightened intuition. Pay attention to hunches and coincidences; insight arrives faster than logic this month.",
  22: "This is a Personal Month 22 — a rare, high-capacity window for advancing big, long-term plans with real structure behind them.",
  33: "This is a Personal Month 33 — a month oriented around teaching, healing, or caring for others in a way that feels unusually resonant.",
};

// Personal Day content — the most granular, most shareable layer of the personal cycle.
export const PERSONAL_DAY_DESCRIPTIONS: Record<number, string> = {
  1: "Today is a Personal Day 1 — good day to start something, send the first message, or make the first move.",
  2: "Today is a Personal Day 2 — a day for patience and partnership. Cooperation goes further than solo effort today.",
  3: "Today is a Personal Day 3 — a light, expressive day. Good for creative work, conversation, and connecting with people.",
  4: "Today is a Personal Day 4 — a practical, task-focused day. Get the unglamorous work done; it pays off soon.",
  5: "Today is a Personal Day 5 — expect the unexpected. Stay flexible; today rewards adaptability over rigid plans.",
  6: "Today is a Personal Day 6 — focus on home and relationships. A good day for care-taking and small acts of responsibility.",
  7: "Today is a Personal Day 7 — a quieter, more reflective day. Good for research, rest, or simply being alone with your thoughts.",
  8: "Today is a Personal Day 8 — a strong day for money, career, and decisive action. Push forward on what matters.",
  9: "Today is a Personal Day 9 — a day for closure. Let go of something that's run its course to make room for what's next.",
  11: "Today is a Personal Day 11 — intuition runs unusually high. Trust the instinct you can't quite explain.",
  22: "Today is a Personal Day 22 — a good day for practical progress on something big you're building.",
  33: "Today is a Personal Day 33 — a day naturally suited to helping, teaching, or comforting someone who needs it.",
};

export const HIDDEN_PASSION_DESCRIPTIONS: Record<number, string> = {
  1: "Your Hidden Passion is 1 — leadership and independence show up more in your name than anywhere else, suggesting an underused talent for initiative you may not give yourself credit for.",
  2: "Your Hidden Passion is 2 — cooperation and sensitivity dominate your name's letters, pointing to a natural gift for diplomacy that you may be underusing.",
  3: "Your Hidden Passion is 3 — self-expression is the most repeated vibration in your name, hinting at a creative or communicative talent worth taking more seriously.",
  4: "Your Hidden Passion is 4 — discipline and structure recur most in your name, suggesting you're naturally more organized and reliable than you tend to showcase.",
  5: "Your Hidden Passion is 5 — freedom and adaptability dominate your name's letters, pointing to an underused talent for change, travel, or versatile work.",
  6: "Your Hidden Passion is 6 — responsibility and care show up most often in your name, suggesting a nurturing gift you may be leaving underused.",
  7: "Your Hidden Passion is 7 — analysis and depth are the most repeated vibration in your name, pointing to an underused talent for research or deep thinking.",
  8: "Your Hidden Passion is 8 — ambition and material mastery dominate your name's letters, suggesting real business or leadership potential you might be downplaying.",
  9: "Your Hidden Passion is 9 — compassion and big-picture vision show up most in your name, pointing to an underused gift for service or humanitarian work.",
};

export const BALANCE_NUMBER_DESCRIPTIONS: Record<number, string> = {
  1: "Your Balance Number is 1 — when life gets hard, you steady yourself by taking charge and acting independently rather than waiting for help.",
  2: "Your Balance Number is 2 — in adversity, you find your footing through connection, calm conversation, and leaning on people you trust.",
  3: "Your Balance Number is 3 — you steady yourself during hard times through expression, whether that's talking it out, creating, or finding humor in the mess.",
  4: "Your Balance Number is 4 — under pressure, you regain balance through structure, routine, and simply putting one foot in front of the other.",
  5: "Your Balance Number is 5 — when things get difficult, you cope best by changing your environment or routine rather than sitting still with the stress.",
  6: "Your Balance Number is 6 — you find equilibrium during hardship by caring for others or your home, which paradoxically steadies you too.",
  7: "Your Balance Number is 7 — in adversity, you retreat inward to think things through alone before you're ready to talk about them.",
  8: "Your Balance Number is 8 — under pressure, you regain control by taking decisive, practical action toward a concrete goal.",
  9: "Your Balance Number is 9 — you steady yourself in hard times by zooming out to the bigger picture and finding meaning in what you're going through.",
};

export const RATIONAL_THOUGHT_DESCRIPTIONS: Record<number, string> = {
  1: "Your Rational Thought Number is 1 — your thinking style is direct and decisive; you trust your own conclusions and act on them quickly.",
  2: "Your Rational Thought Number is 2 — you think in a considerate, weighing-both-sides way, often factoring in how a decision affects others before yourself.",
  3: "Your Rational Thought Number is 3 — your mind works associatively and creatively, often arriving at conclusions through imagination as much as logic.",
  4: "Your Rational Thought Number is 4 — you think in careful, methodical steps, preferring evidence and structure over hunches.",
  5: "Your Rational Thought Number is 5 — your mind is quick and exploratory, often considering many possibilities before settling on one.",
  6: "Your Rational Thought Number is 6 — you think in terms of responsibility and consequence, weighing how decisions affect the people you care about.",
  7: "Your Rational Thought Number is 7 — your mind is naturally analytical and skeptical, rarely satisfied until it has really understood the 'why'.",
  8: "Your Rational Thought Number is 8 — you think in practical, results-oriented terms, usually already calculating the payoff of a decision.",
  9: "Your Rational Thought Number is 9 — your mind naturally reasons from a broad, humanitarian perspective, considering the wider impact of a choice.",
};

export const KARMIC_LESSON_DESCRIPTIONS: Record<number, string> = {
  1: "Missing 1s point to a karmic lesson in self-reliance and confidence — life will keep nudging you to trust your own judgment instead of waiting for permission.",
  2: "Missing 2s point to a karmic lesson in cooperation and sensitivity — you're here to learn patience, tact, and how to truly work alongside other people.",
  3: "Missing 3s point to a karmic lesson in self-expression — you may need to consciously practice speaking up, creating, or simply being seen.",
  4: "Missing 4s point to a karmic lesson in discipline and follow-through — structure and patient effort don't come naturally and have to be built on purpose.",
  5: "Missing 5s point to a karmic lesson in adaptability — change may feel unusually hard for you, and learning to embrace it is part of this life's work.",
  6: "Missing 6s point to a karmic lesson in responsibility — commitments, family duties, and follow-through may need conscious, repeated practice.",
  7: "Missing 7s point to a karmic lesson in trust and introspection — you may need to consciously build a practice of solitude, faith, or deeper reflection.",
  8: "Missing 8s point to a karmic lesson in handling power and money — you may need to learn, through direct experience, how to manage ambition and material affairs wisely.",
  9: "Missing 9s point to a karmic lesson in compassion and letting go — generosity and releasing attachments may need to be practiced rather than come naturally.",
};

// Pinnacle content — each pinnacle stage carries the same core number meaning but framed to its
// life stage: formative (1st), early-adult (2nd), midlife (3rd), and later-life (4th).
const PINNACLE_STAGE_LABELS = ["First Pinnacle", "Second Pinnacle", "Third Pinnacle", "Fourth Pinnacle"] as const;
const PINNACLE_STAGE_FRAMING = [
  "In your formative years, this pinnacle shaped",
  "In early adulthood, this pinnacle emphasizes",
  "Through your middle years, this pinnacle centers on",
  "In your later years, this pinnacle brings forward",
];

const PINNACLE_CORE_THEMES: Record<number, string> = {
  1: "independence, leadership, and learning to stand on your own",
  2: "partnership, patience, and cooperation with others",
  3: "creativity, self-expression, and social connection",
  4: "discipline, structure, and building something durable",
  5: "change, freedom, and adaptability",
  6: "responsibility, family, and care for others",
  7: "introspection, study, and inner development",
  8: "ambition, achievement, and material reward",
  9: "compassion, completion, and service to others",
  11: "heightened intuition and spiritual insight",
  22: "large-scale building and turning vision into reality",
  33: "compassionate teaching and healing for others",
};

export function getPinnacleDescription(stageIndex: number, num: number): string {
  const theme = PINNACLE_CORE_THEMES[num] ?? PINNACLE_CORE_THEMES[reduceNumber(num)];
  return `${PINNACLE_STAGE_FRAMING[stageIndex]} ${theme}.`;
}

export function getPinnacleStageLabel(stageIndex: number): string {
  return PINNACLE_STAGE_LABELS[stageIndex];
}

const CHALLENGE_DESCRIPTIONS: Record<number, string> = {
  0: "A Challenge of 0 is rare and is traditionally read as an open, do-over challenge — you'll face a bit of every number's lesson, with the freedom to choose your own response each time.",
  1: "This challenge asks you to overcome self-doubt and learn to assert yourself without becoming domineering or overly dependent on others.",
  2: "This challenge asks you to overcome oversensitivity and learn to hold your own opinions without being crushed by criticism or conflict.",
  3: "This challenge asks you to overcome scattered energy or self-criticism, learning to focus your talents instead of spreading them too thin.",
  4: "This challenge asks you to overcome resistance to hard work and structure, learning discipline without becoming rigid or overly controlling.",
  5: "This challenge asks you to overcome impulsiveness and restlessness, learning to use freedom responsibly instead of running from commitment.",
  6: "This challenge asks you to overcome perfectionism or excessive self-sacrifice, learning to accept imperfection in yourself and others.",
  7: "This challenge asks you to overcome isolation and overthinking, learning to trust and open up instead of retreating into suspicion.",
  8: "This challenge asks you to overcome an unhealthy relationship with power or money, learning to use ambition with integrity rather than excess.",
  9: "This challenge asks you to overcome difficulty letting go, learning compassion and generosity instead of clinging to what should be released.",
};

export function getChallengeDescription(num: number): string {
  return CHALLENGE_DESCRIPTIONS[num] ?? CHALLENGE_DESCRIPTIONS[reduceNumber(num)];
}

const CATEGORY_DESCRIPTION_MAP: Record<NumerologyCategory, Record<number, string>> = {
  ...NUMBER_DESCRIPTIONS,
  chaldeanDestiny: CHALDEAN_DESTINY_DESCRIPTIONS,
  birthday: BIRTHDAY_NUMBER_DESCRIPTIONS,
  maturity: MATURITY_NUMBER_DESCRIPTIONS,
  personalYear: PERSONAL_YEAR_DESCRIPTIONS,
  personalMonth: PERSONAL_MONTH_DESCRIPTIONS,
  personalDay: PERSONAL_DAY_DESCRIPTIONS,
  hiddenPassion: HIDDEN_PASSION_DESCRIPTIONS,
  balance: BALANCE_NUMBER_DESCRIPTIONS,
  rationalThought: RATIONAL_THOUGHT_DESCRIPTIONS,
};

export function getDescription(category: NumerologyCategory, num: number): string {
  const bank = CATEGORY_DESCRIPTION_MAP[category];
  return bank[num] ?? bank[reduceNumber(num)];
}

// Angel Numbers — a standalone reference feature, framed explicitly as folklore/spiritual
// tradition rather than fact, consistent with the honest framing used for daily horoscopes.
export interface AngelNumberEntry {
  number: string;
  title: string;
  meaning: string;
}

export const ANGEL_NUMBERS: AngelNumberEntry[] = [
  { number: "000", title: "Infinite Potential", meaning: "In angel-number folklore, 000 is read as a sign of pure potential and new beginnings — a spiritual blank slate, often said to appear when you're between chapters of life." },
  { number: "111", title: "New Beginnings", meaning: "111 is one of the most widely reported 'seeing repeating numbers' experiences, traditionally interpreted as a sign that your thoughts are manifesting quickly right now — a nudge to focus on what you actually want." },
  { number: "222", title: "Balance & Faith", meaning: "222 is traditionally read as a message of balance, patience, and trust — folklore holds that it appears when something you've been working toward is quietly falling into place behind the scenes." },
  { number: "333", title: "Growth & Encouragement", meaning: "333 is popularly associated with encouragement and creative growth, often said to signal support from your environment (some traditions describe this as 'guides' or 'the universe') during a growth phase." },
  { number: "444", title: "Protection & Stability", meaning: "444 is one of the most commonly cited 'protection' numbers in angel-number folklore — traditionally read as reassurance that you're supported and on solid ground, even if things feel uncertain." },
  { number: "555", title: "Change is Coming", meaning: "555 is traditionally interpreted as a sign of significant change on the horizon — folklore frames it as encouragement to stay flexible rather than resist what's shifting." },
  { number: "666", title: "Realign & Refocus", meaning: "Despite its ominous pop-culture reputation, in angel-number folklore 666 is usually read gently — as a nudge to rebalance an area of life (often related to material focus) rather than as a warning of harm." },
  { number: "777", title: "Alignment & Luck", meaning: "777 is widely regarded in numerology folklore as a fortunate, high-vibration number, traditionally associated with being in alignment with your path and reaping the rewards of past effort." },
  { number: "888", title: "Abundance", meaning: "888 is traditionally read as a sign of abundance and financial flow, its infinity-like shape lending itself to folklore about cycles of giving and receiving coming into balance." },
  { number: "999", title: "Completion", meaning: "999 is commonly interpreted as a closing-out number — folklore holds that it marks the end of a significant chapter, clearing space for something new to begin." },
  { number: "1111", title: "Awakening", meaning: "1111 is perhaps the most talked-about number in this tradition, often described as a moment of spiritual 'awakening' or alignment — many people report noticing it specifically during periods of major personal change." },
];

export function getAngelNumberEntry(number: string): AngelNumberEntry | undefined {
  return ANGEL_NUMBERS.find((a) => a.number === number);
}
