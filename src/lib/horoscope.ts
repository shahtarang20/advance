import { pick, seededRandom, todayKey } from "./prng";

export type ZodiacSign =
  | "aries"
  | "taurus"
  | "gemini"
  | "cancer"
  | "leo"
  | "virgo"
  | "libra"
  | "scorpio"
  | "sagittarius"
  | "capricorn"
  | "aquarius"
  | "pisces";

export interface ZodiacInfo {
  sign: ZodiacSign;
  name: string;
  symbol: string;
  glyph: string;
  dateRange: string;
  element: "Fire" | "Earth" | "Air" | "Water";
  modality: "Cardinal" | "Fixed" | "Mutable";
  rulingPlanet: string;
  startMonth: number; // 1-12
  startDay: number;
  endMonth: number;
  endDay: number;
  blurb: string;
  about: string;
  mostCompatible: ZodiacSign[];
  leastCompatible: ZodiacSign[];
}

export const ZODIAC_SIGNS: ZodiacInfo[] = [
  { sign: "aries", name: "Aries", symbol: "The Ram", glyph: "♈", dateRange: "Mar 21 – Apr 19", element: "Fire", modality: "Cardinal", rulingPlanet: "Mars", startMonth: 3, startDay: 21, endMonth: 4, endDay: 19, blurb: "Bold, competitive, and first out of the gate — Aries leads with instinct and raw energy.", about: "As the first sign of the zodiac, Aries carries pure initiating energy — ruled by Mars, the planet of drive and courage, Cardinal Fire signs are natural starters who act on instinct before they overthink. Traditional astrology reads Aries as the zodiac's fearless pioneer: direct, competitive, and most alive when there's a challenge in front of it.", mostCompatible: ["leo", "sagittarius", "gemini", "aquarius"], leastCompatible: ["cancer", "capricorn"] },
  { sign: "taurus", name: "Taurus", symbol: "The Bull", glyph: "♉", dateRange: "Apr 20 – May 20", element: "Earth", modality: "Fixed", rulingPlanet: "Venus", startMonth: 4, startDay: 20, endMonth: 5, endDay: 20, blurb: "Steady, sensual, and stubborn in the best way — Taurus builds comfort and beauty that lasts.", about: "Ruled by Venus and fixed in the Earth element, Taurus is traditionally read as the zodiac's anchor — patient, sensual, and deeply resistant to being rushed. Where Aries starts things, Fixed signs like Taurus sustain them, prizing comfort, loyalty, and tangible beauty over novelty.", mostCompatible: ["virgo", "capricorn", "cancer", "pisces"], leastCompatible: ["leo", "aquarius"] },
  { sign: "gemini", name: "Gemini", symbol: "The Twins", glyph: "♊", dateRange: "May 21 – Jun 20", element: "Air", modality: "Mutable", rulingPlanet: "Mercury", startMonth: 5, startDay: 21, endMonth: 6, endDay: 20, blurb: "Curious, quick-witted, and endlessly social — Gemini thrives on ideas and conversation.", about: "Ruled by Mercury, the planet of communication, Gemini is a Mutable Air sign — traditionally the zodiac's most adaptable communicator, quick to pick up new ideas and just as quick to move on from them. Mutable signs close out each season, and Gemini does it through curiosity, wit, and a restless, ever-shifting mind.", mostCompatible: ["libra", "aquarius", "aries", "leo"], leastCompatible: ["virgo", "pisces"] },
  { sign: "cancer", name: "Cancer", symbol: "The Crab", glyph: "♋", dateRange: "Jun 21 – Jul 22", element: "Water", modality: "Cardinal", rulingPlanet: "Moon", startMonth: 6, startDay: 21, endMonth: 7, endDay: 22, blurb: "Deeply emotional and fiercely protective — Cancer feels everything and remembers everyone.", about: "Ruled by the Moon, Cancer is a Cardinal Water sign — traditionally seen as the zodiac's emotional initiator, feeling its way into new situations rather than thinking its way in. Cancer is read as deeply protective of home and loved ones, with a memory for emotional detail that rarely fades.", mostCompatible: ["scorpio", "pisces", "taurus", "virgo"], leastCompatible: ["aries", "libra"] },
  { sign: "leo", name: "Leo", symbol: "The Lion", glyph: "♌", dateRange: "Jul 23 – Aug 22", element: "Fire", modality: "Fixed", rulingPlanet: "Sun", startMonth: 7, startDay: 23, endMonth: 8, endDay: 22, blurb: "Warm, dramatic, and magnetic — Leo was born to be seen and to make others feel special too.", about: "Ruled by the Sun itself, Leo is a Fixed Fire sign — traditionally the zodiac's most magnetic and consistent presence, radiating warmth once it commits to something. Fixed Fire holds its light steady rather than flickering, which is why Leo is read as a natural, generous leader who thrives being seen.", mostCompatible: ["aries", "sagittarius", "gemini", "libra"], leastCompatible: ["taurus", "scorpio"] },
  { sign: "virgo", name: "Virgo", symbol: "The Maiden", glyph: "♍", dateRange: "Aug 23 – Sep 22", element: "Earth", modality: "Mutable", rulingPlanet: "Mercury", startMonth: 8, startDay: 23, endMonth: 9, endDay: 22, blurb: "Precise, thoughtful, and quietly perfectionist — Virgo notices what everyone else misses.", about: "Ruled by Mercury and Mutable in Earth, Virgo is traditionally read as the zodiac's most meticulous analyst — adaptable like other Mutable signs, but grounded in practical detail rather than abstract ideas. Virgo is associated with service, precision, and an eye for what's flawed and fixable.", mostCompatible: ["taurus", "capricorn", "cancer", "scorpio"], leastCompatible: ["gemini", "sagittarius"] },
  { sign: "libra", name: "Libra", symbol: "The Scales", glyph: "♎", dateRange: "Sep 23 – Oct 22", element: "Air", modality: "Cardinal", rulingPlanet: "Venus", startMonth: 9, startDay: 23, endMonth: 10, endDay: 22, blurb: "Charming and fair-minded — Libra seeks balance, beauty, and connection in everything.", about: "Ruled by Venus, Libra is a Cardinal Air sign — traditionally read as the zodiac's initiator of relationships and harmony, actively seeking balance rather than passively enjoying it. Libra is associated with fairness, diplomacy, and an aesthetic sensibility that seeks beauty in nearly everything.", mostCompatible: ["gemini", "aquarius", "leo", "sagittarius"], leastCompatible: ["cancer", "capricorn"] },
  { sign: "scorpio", name: "Scorpio", symbol: "The Scorpion", glyph: "♏", dateRange: "Oct 23 – Nov 21", element: "Water", modality: "Fixed", rulingPlanet: "Pluto", startMonth: 10, startDay: 23, endMonth: 11, endDay: 21, blurb: "Intense, magnetic, and impossible to fool — Scorpio sees straight through the surface.", about: "Traditionally ruled by Mars and, in modern astrology, co-ruled by Pluto, Scorpio is a Fixed Water sign — read as the zodiac's most intense and unwavering emotional force. Fixed Water holds feeling at great depth and doesn't let go easily, which is why Scorpio is associated with loyalty, transformation, and an unmatched ability to see through pretense.", mostCompatible: ["cancer", "pisces", "virgo", "capricorn"], leastCompatible: ["leo", "aquarius"] },
  { sign: "sagittarius", name: "Sagittarius", symbol: "The Archer", glyph: "♐", dateRange: "Nov 22 – Dec 21", element: "Fire", modality: "Mutable", rulingPlanet: "Jupiter", startMonth: 11, startDay: 22, endMonth: 12, endDay: 21, blurb: "Adventurous and blunt in the most refreshing way — Sagittarius is always chasing the next horizon.", about: "Ruled by Jupiter, the planet of expansion, Sagittarius is a Mutable Fire sign — traditionally the zodiac's philosopher-adventurer, restless in the same way other Mutable signs are but driven by a hunger for meaning and horizon rather than mere variety. Sagittarius is associated with optimism, bluntness, and an almost compulsive need for freedom.", mostCompatible: ["aries", "leo", "libra", "aquarius"], leastCompatible: ["virgo", "pisces"] },
  { sign: "capricorn", name: "Capricorn", symbol: "The Sea-Goat", glyph: "♑", dateRange: "Dec 22 – Jan 19", element: "Earth", modality: "Cardinal", rulingPlanet: "Saturn", startMonth: 12, startDay: 22, endMonth: 1, endDay: 19, blurb: "Disciplined and ambitious — Capricorn plays the long game and almost always wins it.", about: "Ruled by Saturn, the planet of discipline and structure, Capricorn is a Cardinal Earth sign — traditionally read as the zodiac's most ambitious initiator, launching long-term plans with the patience to see them through. Capricorn is associated with authority, self-control, and a quiet, methodical drive toward mastery.", mostCompatible: ["taurus", "virgo", "scorpio", "pisces"], leastCompatible: ["aries", "libra"] },
  { sign: "aquarius", name: "Aquarius", symbol: "The Water Bearer", glyph: "♒", dateRange: "Jan 20 – Feb 18", element: "Air", modality: "Fixed", rulingPlanet: "Uranus", startMonth: 1, startDay: 20, endMonth: 2, endDay: 18, blurb: "Independent and visionary — Aquarius would rather be right than be liked.", about: "Traditionally ruled by Saturn and, in modern astrology, co-ruled by Uranus, Aquarius is a Fixed Air sign — read as the zodiac's most stubbornly original thinker, holding onto its own ideas with the same tenacity other Fixed signs hold onto people or possessions. Aquarius is associated with independence, innovation, and a instinct for the collective over the personal.", mostCompatible: ["gemini", "libra", "aries", "sagittarius"], leastCompatible: ["taurus", "scorpio"] },
  { sign: "pisces", name: "Pisces", symbol: "The Fish", glyph: "♓", dateRange: "Feb 19 – Mar 20", element: "Water", modality: "Mutable", rulingPlanet: "Neptune", startMonth: 2, startDay: 19, endMonth: 3, endDay: 20, blurb: "Dreamy, empathetic, and artistic — Pisces feels the world in colors most people can't see.", about: "Traditionally ruled by Jupiter and, in modern astrology, co-ruled by Neptune, Pisces is a Mutable Water sign — read as the zodiac's most porous and empathetic sign, absorbing the moods of everyone and everything around it. As the final sign of the zodiac, Pisces is associated with imagination, compassion, and a dreamy, artistic sensitivity to the unseen.", mostCompatible: ["cancer", "scorpio", "taurus", "capricorn"], leastCompatible: ["gemini", "sagittarius"] },
];

export function getZodiacByDob(dob: string): ZodiacInfo {
  const [, monthStr, dayStr] = dob.split("-");
  const month = Number(monthStr);
  const day = Number(dayStr);
  for (const z of ZODIAC_SIGNS) {
    if (z.startMonth === z.endMonth) {
      if (month === z.startMonth && day >= z.startDay && day <= z.endDay) return z;
    } else if (z.startMonth > z.endMonth) {
      // wraps around year end (Capricorn)
      if ((month === z.startMonth && day >= z.startDay) || (month === z.endMonth && day <= z.endDay)) return z;
    } else if (
      (month === z.startMonth && day >= z.startDay) ||
      (month === z.endMonth && day <= z.endDay)
    ) {
      return z;
    }
  }
  return ZODIAC_SIGNS[0];
}

export function getZodiacInfo(sign: ZodiacSign): ZodiacInfo {
  return ZODIAC_SIGNS.find((z) => z.sign === sign) ?? ZODIAC_SIGNS[0];
}

const MOODS = ["Radiant", "Reflective", "Bold", "Grounded", "Playful", "Focused", "Tender", "Electric", "Serene", "Fiery"];
const COLORS = ["Gold", "Indigo", "Emerald", "Crimson", "Silver", "Turquoise", "Amber", "Violet", "Rose", "Sapphire"];

// Per-sign content banks: love / career / health fragments that combine to feel
// varied across many days while staying true to each sign's personality.
const LOVE: Record<ZodiacSign, string[]> = {
  aries: ["A bold move in love pays off if you make the first one today.", "Someone finds your directness refreshing, not intimidating.", "An old spark could reignite if you're honest about what you want."],
  taurus: ["Slow, steady affection means more today than any grand gesture.", "A comfortable silence with someone says more than words could.", "Your loyalty is being noticed by someone who matters."],
  gemini: ["A conversation today could shift a relationship in an unexpected direction.", "Your wit is your best flirting tool right now — use it.", "Someone wants more depth from you than small talk today."],
  cancer: ["Your intuition about someone's feelings is right — trust it.", "A gesture of care today deepens a bond more than you expect.", "Old emotional walls soften a little around the right person."],
  leo: ["Your warmth draws someone in without you even trying.", "A little generosity in love goes a long way today.", "Someone is more impressed by your loyalty than your charm."],
  virgo: ["Small, thoughtful acts of service speak louder than compliments today.", "Being honest about your needs feels risky but pays off.", "Someone appreciates your quiet attentiveness more than you realize."],
  libra: ["Balance in give-and-take brings harmony to a relationship today.", "A fair, honest conversation clears the air with someone close.", "Your charm opens a door — walking through it takes courage."],
  scorpio: ["A deep, honest conversation today could change everything.", "Your intensity is exactly what someone has been craving.", "Trust builds fastest when you let your guard down first."],
  sagittarius: ["An adventurous plan with someone brings you closer today.", "Your honesty, even if blunt, is exactly what's needed.", "Freedom and closeness aren't opposites — today proves it."],
  capricorn: ["Consistency, not romance, is what wins someone over today.", "A serious conversation about the future feels overdue but right.", "Your quiet reliability is more attractive than you think."],
  aquarius: ["An unconventional gesture says more than a traditional one today.", "Someone is drawn to your independence, not despite it.", "A friendship could be quietly shifting into something more."],
  pisces: ["Your empathy makes someone feel truly seen today.", "A romantic daydream might be worth acting on.", "Emotional honesty brings you closer to someone special."],
};

const CAREER: Record<ZodiacSign, string[]> = {
  aries: ["A bold pitch or decision today puts you ahead of the pack.", "Your leadership is needed more than your patience right now.", "A competitive edge serves you well in a work situation today."],
  taurus: ["Steady, unglamorous effort pays off more than a shortcut today.", "A financial decision benefits from patience, not urgency.", "Your reliability earns you quiet trust from someone influential."],
  gemini: ["A new idea or conversation opens an unexpected opportunity.", "Your communication skills solve a problem others are stuck on.", "Multitasking works in your favor today — juggle with confidence."],
  cancer: ["Your instincts about a work situation are more accurate than data.", "Protecting your energy at work pays off more than overextending.", "A mentor or colleague appreciates your quiet dependability."],
  leo: ["Recognition comes your way if you let your work speak boldly.", "A leadership moment today suits you better than staying quiet.", "Your confidence inspires a team that's been low on morale."],
  virgo: ["Attention to detail saves a project from a costly mistake today.", "Organizing chaos is your superpower right now — lean into it.", "A practical solution you offer earns real respect today."],
  libra: ["Diplomacy resolves a tense work situation better than force.", "Collaboration brings better results than working solo today.", "Fair judgment on your part earns you real credibility."],
  scorpio: ["Your focus and strategy outmaneuver a competitor today.", "A hidden opportunity reveals itself if you dig a little deeper.", "Your instincts about who to trust at work are sharp today."],
  sagittarius: ["A bold career risk looks smart in hindsight today.", "Your big-picture thinking impresses someone who matters.", "An opportunity to learn something new is worth chasing."],
  capricorn: ["Discipline and ambition align today — push toward that goal.", "A long-term plan finally shows visible, satisfying progress.", "Your work ethic earns recognition from someone senior."],
  aquarius: ["An unconventional idea gets surprising traction today.", "Your independent thinking solves a problem the usual way couldn't.", "Innovation, not tradition, is your winning card today."],
  pisces: ["Your creative instincts solve a practical problem elegantly.", "Trusting your gut on a decision pays off more than logic today.", "Compassionate leadership earns you quiet loyalty from others."],
};

const HEALTH: Record<ZodiacSign, string[]> = {
  aries: ["Channel extra energy into movement instead of frustration today.", "Your body wants intensity — a workout clears your head fast.", "Slow down before impulsiveness turns into exhaustion."],
  taurus: ["Comfort food is tempting, but a walk serves you better today.", "Your body responds well to routine right now — keep it simple.", "A little indulgence is fine as long as it's mindful."],
  gemini: ["Restlessness settles with a short walk or change of scenery.", "Your mind is racing — a few minutes of quiet helps more than caffeine.", "Sleep quality matters more than usual today, prioritize it."],
  cancer: ["Emotional stress shows up physically today — be gentle with yourself.", "Comfort and rest do more for you today than pushing through.", "A nourishing meal at home resets your mood better than takeout."],
  leo: ["Your energy is high today — use it, don't bottle it up.", "A little pampering isn't indulgent, it's necessary maintenance.", "Pride can make you ignore fatigue — rest before you crash."],
  virgo: ["Your body is sending small signals worth paying attention to.", "A structured routine calms the anxious energy you're feeling.", "Don't let perfectionism about health become its own stressor."],
  libra: ["Balance is the keyword today — in meals, sleep, and screen time.", "A little time in nature restores equilibrium fast.", "Indecision about health choices resolves with a simple routine."],
  scorpio: ["Intensity needs an outlet today — exercise beats bottling it up.", "Deep rest matters more than pushing through fatigue right now.", "Emotional detox (journaling, therapy, talking it out) helps today."],
  sagittarius: ["An outdoor adventure recharges you faster than sitting still.", "Overindulgence is tempting — moderation serves you better today.", "Your restlessness eases with a change of physical environment."],
  capricorn: ["Rest is productive too — don't treat it as wasted time today.", "Your body needs recovery after pushing hard lately.", "A small stretch or walk break improves your focus significantly."],
  aquarius: ["An unusual wellness experiment appeals to you — worth trying.", "Your mind needs a break from screens more than your body needs a gym.", "Social connection today does more for your wellbeing than solitude."],
  pisces: ["Your sensitivity is heightened — protect your energy today.", "Water, literally and figuratively, is calming for you right now.", "A creative outlet does more for your mood than forcing rest."],
};

export interface DailyHoroscope {
  sign: ZodiacSign;
  dateKey: string;
  mood: string;
  luckyNumber: number;
  luckyColor: string;
  love: string;
  career: string;
  health: string;
  loveIndex: number;
  careerIndex: number;
  healthIndex: number;
  summary: string;
}

/** Same as prng's `pick`, but also returns the chosen index so callers can build a stable
 * translation key (`horoscope.love.<sign>.<index>`) alongside the English fallback text. */
function pickIndexed<T>(rng: () => number, arr: T[]): { value: T; index: number } {
  const index = Math.floor(rng() * arr.length) % arr.length;
  return { value: arr[index], index };
}

export function getDailyHoroscope(sign: ZodiacSign, date: Date = new Date()): DailyHoroscope {
  const dateKey = todayKey(date);
  const rng = seededRandom(dateKey, sign);
  const mood = pick(rng, MOODS);
  const luckyColor = pick(rng, COLORS);
  const luckyNumber = Math.floor(rng() * 9) + 1;
  const loveP = pickIndexed(rng, LOVE[sign]);
  const careerP = pickIndexed(rng, CAREER[sign]);
  const healthP = pickIndexed(rng, HEALTH[sign]);
  const info = getZodiacInfo(sign);

  return {
    sign,
    dateKey,
    mood,
    luckyNumber,
    luckyColor,
    love: loveP.value,
    career: careerP.value,
    health: healthP.value,
    loveIndex: loveP.index,
    careerIndex: careerP.index,
    healthIndex: healthP.index,
    summary: `${info.name} is feeling ${mood.toLowerCase()} today. ${loveP.value}`,
  };
}

// --- Translation key helpers ------------------------------------------------
// Same pattern used across the app (kundliInterpretations.ts, aura.ts, palmistry.ts): keys into
// src/locales/*.json, with the English content above passed as `defaultValue` so a locale that
// hasn't translated a given key yet still renders correctly.

export const moodKey = (mood: string) => `horoscope.mood.${mood.toLowerCase()}`;
export const luckyColorKey = (color: string) => `horoscope.color.${color.toLowerCase()}`;
export const elementKey = (element: string) => `horoscope.element.${element.toLowerCase()}`;
export const modalityKey = (modality: string) => `horoscope.modality.${modality.toLowerCase()}`;
export const rulingPlanetKey = (planet: string) => `horoscope.planet.${planet.toLowerCase()}`;
export const symbolKey = (sign: ZodiacSign) => `horoscope.symbol.${sign}`;
export const blurbKey = (sign: ZodiacSign) => `horoscope.blurb.${sign}`;
export const aboutKey = (sign: ZodiacSign) => `horoscope.about.${sign}`;
export const loveKey = (sign: ZodiacSign, index: number) => `horoscope.love.${sign}.${index}`;
export const careerKey = (sign: ZodiacSign, index: number) => `horoscope.career.${sign}.${index}`;
export const healthKey = (sign: ZodiacSign, index: number) => `horoscope.health.${sign}.${index}`;

/** Builds the fully-translated summary sentence, since the English default concatenates the
 * (already-translatable) sign name, mood, and love text together. */
export const summaryTemplateKey = () => "horoscope.summary_template";
