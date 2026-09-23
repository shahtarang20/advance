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
  aries: ['A new romantic cycle begins today. Set your intentions for what you really want, Aries.', 'Take small, steady steps toward someone who caught your eye. The energy is building.', 'A little friction in a relationship can actually clear the air right now. Be honest.', "You are so close to a breakthrough with someone. Don't pull away just yet.", 'Emotions are at an absolute peak today! A major romantic revelation is coming.', "Share the love you've been feeling. It is a great day to show someone you care deeply.", 'Let go of an old grudge or a past heartbreak. It is time to make room for better things.', 'Rest your heart today. Spend some quiet time alone to recharge your emotional batteries.'],
  taurus: ['A new romantic cycle begins today. Set your intentions for what you really want, Taurus.', 'Take small, steady steps toward someone who caught your eye. The energy is building.', 'A little friction in a relationship can actually clear the air right now. Be honest.', "You are so close to a breakthrough with someone. Don't pull away just yet.", 'Emotions are at an absolute peak today! A major romantic revelation is coming.', "Share the love you've been feeling. It is a great day to show someone you care deeply.", 'Let go of an old grudge or a past heartbreak. It is time to make room for better things.', 'Rest your heart today. Spend some quiet time alone to recharge your emotional batteries.'],
  gemini: ['A new romantic cycle begins today. Set your intentions for what you really want, Gemini.', 'Take small, steady steps toward someone who caught your eye. The energy is building.', 'A little friction in a relationship can actually clear the air right now. Be honest.', "You are so close to a breakthrough with someone. Don't pull away just yet.", 'Emotions are at an absolute peak today! A major romantic revelation is coming.', "Share the love you've been feeling. It is a great day to show someone you care deeply.", 'Let go of an old grudge or a past heartbreak. It is time to make room for better things.', 'Rest your heart today. Spend some quiet time alone to recharge your emotional batteries.'],
  cancer: ['A new romantic cycle begins today. Set your intentions for what you really want, Cancer.', 'Take small, steady steps toward someone who caught your eye. The energy is building.', 'A little friction in a relationship can actually clear the air right now. Be honest.', "You are so close to a breakthrough with someone. Don't pull away just yet.", 'Emotions are at an absolute peak today! A major romantic revelation is coming.', "Share the love you've been feeling. It is a great day to show someone you care deeply.", 'Let go of an old grudge or a past heartbreak. It is time to make room for better things.', 'Rest your heart today. Spend some quiet time alone to recharge your emotional batteries.'],
  leo: ['A new romantic cycle begins today. Set your intentions for what you really want, Leo.', 'Take small, steady steps toward someone who caught your eye. The energy is building.', 'A little friction in a relationship can actually clear the air right now. Be honest.', "You are so close to a breakthrough with someone. Don't pull away just yet.", 'Emotions are at an absolute peak today! A major romantic revelation is coming.', "Share the love you've been feeling. It is a great day to show someone you care deeply.", 'Let go of an old grudge or a past heartbreak. It is time to make room for better things.', 'Rest your heart today. Spend some quiet time alone to recharge your emotional batteries.'],
  virgo: ['A new romantic cycle begins today. Set your intentions for what you really want, Virgo.', 'Take small, steady steps toward someone who caught your eye. The energy is building.', 'A little friction in a relationship can actually clear the air right now. Be honest.', "You are so close to a breakthrough with someone. Don't pull away just yet.", 'Emotions are at an absolute peak today! A major romantic revelation is coming.', "Share the love you've been feeling. It is a great day to show someone you care deeply.", 'Let go of an old grudge or a past heartbreak. It is time to make room for better things.', 'Rest your heart today. Spend some quiet time alone to recharge your emotional batteries.'],
  libra: ['A new romantic cycle begins today. Set your intentions for what you really want, Libra.', 'Take small, steady steps toward someone who caught your eye. The energy is building.', 'A little friction in a relationship can actually clear the air right now. Be honest.', "You are so close to a breakthrough with someone. Don't pull away just yet.", 'Emotions are at an absolute peak today! A major romantic revelation is coming.', "Share the love you've been feeling. It is a great day to show someone you care deeply.", 'Let go of an old grudge or a past heartbreak. It is time to make room for better things.', 'Rest your heart today. Spend some quiet time alone to recharge your emotional batteries.'],
  scorpio: ['A new romantic cycle begins today. Set your intentions for what you really want, Scorpio.', 'Take small, steady steps toward someone who caught your eye. The energy is building.', 'A little friction in a relationship can actually clear the air right now. Be honest.', "You are so close to a breakthrough with someone. Don't pull away just yet.", 'Emotions are at an absolute peak today! A major romantic revelation is coming.', "Share the love you've been feeling. It is a great day to show someone you care deeply.", 'Let go of an old grudge or a past heartbreak. It is time to make room for better things.', 'Rest your heart today. Spend some quiet time alone to recharge your emotional batteries.'],
  sagittarius: ['A new romantic cycle begins today. Set your intentions for what you really want, Sagittarius.', 'Take small, steady steps toward someone who caught your eye. The energy is building.', 'A little friction in a relationship can actually clear the air right now. Be honest.', "You are so close to a breakthrough with someone. Don't pull away just yet.", 'Emotions are at an absolute peak today! A major romantic revelation is coming.', "Share the love you've been feeling. It is a great day to show someone you care deeply.", 'Let go of an old grudge or a past heartbreak. It is time to make room for better things.', 'Rest your heart today. Spend some quiet time alone to recharge your emotional batteries.'],
  capricorn: ['A new romantic cycle begins today. Set your intentions for what you really want, Capricorn.', 'Take small, steady steps toward someone who caught your eye. The energy is building.', 'A little friction in a relationship can actually clear the air right now. Be honest.', "You are so close to a breakthrough with someone. Don't pull away just yet.", 'Emotions are at an absolute peak today! A major romantic revelation is coming.', "Share the love you've been feeling. It is a great day to show someone you care deeply.", 'Let go of an old grudge or a past heartbreak. It is time to make room for better things.', 'Rest your heart today. Spend some quiet time alone to recharge your emotional batteries.'],
  aquarius: ['A new romantic cycle begins today. Set your intentions for what you really want, Aquarius.', 'Take small, steady steps toward someone who caught your eye. The energy is building.', 'A little friction in a relationship can actually clear the air right now. Be honest.', "You are so close to a breakthrough with someone. Don't pull away just yet.", 'Emotions are at an absolute peak today! A major romantic revelation is coming.', "Share the love you've been feeling. It is a great day to show someone you care deeply.", 'Let go of an old grudge or a past heartbreak. It is time to make room for better things.', 'Rest your heart today. Spend some quiet time alone to recharge your emotional batteries.'],
  pisces: ['A new romantic cycle begins today. Set your intentions for what you really want, Pisces.', 'Take small, steady steps toward someone who caught your eye. The energy is building.', 'A little friction in a relationship can actually clear the air right now. Be honest.', "You are so close to a breakthrough with someone. Don't pull away just yet.", 'Emotions are at an absolute peak today! A major romantic revelation is coming.', "Share the love you've been feeling. It is a great day to show someone you care deeply.", 'Let go of an old grudge or a past heartbreak. It is time to make room for better things.', 'Rest your heart today. Spend some quiet time alone to recharge your emotional batteries.'],
};


const CAREER: Record<ZodiacSign, string[]> = {
  aries: ['A fantastic day to start a brand new project or take charge at work, Aries.', "Teamwork is your best asset today. Listen to a colleague's advice.", 'Your communication skills are on fire today! Pitch that creative idea.', 'Focus on the boring details today. Building a solid foundation will pay off later.', "Expect a sudden change of plans at work. Adapt quickly and you'll come out ahead.", 'Take responsibility for a mistake and turn it into a major win for your team.', 'Analyze your long-term career goals today. A little quiet planning goes a long way.', 'Money and ambition are highlighted today. Go after that raise or close that big deal!', 'Wrap up any unfinished tasks today. A major cycle at work is coming to a successful close.'],
  taurus: ['A fantastic day to start a brand new project or take charge at work, Taurus.', "Teamwork is your best asset today. Listen to a colleague's advice.", 'Your communication skills are on fire today! Pitch that creative idea.', 'Focus on the boring details today. Building a solid foundation will pay off later.', "Expect a sudden change of plans at work. Adapt quickly and you'll come out ahead.", 'Take responsibility for a mistake and turn it into a major win for your team.', 'Analyze your long-term career goals today. A little quiet planning goes a long way.', 'Money and ambition are highlighted today. Go after that raise or close that big deal!', 'Wrap up any unfinished tasks today. A major cycle at work is coming to a successful close.'],
  gemini: ['A fantastic day to start a brand new project or take charge at work, Gemini.', "Teamwork is your best asset today. Listen to a colleague's advice.", 'Your communication skills are on fire today! Pitch that creative idea.', 'Focus on the boring details today. Building a solid foundation will pay off later.', "Expect a sudden change of plans at work. Adapt quickly and you'll come out ahead.", 'Take responsibility for a mistake and turn it into a major win for your team.', 'Analyze your long-term career goals today. A little quiet planning goes a long way.', 'Money and ambition are highlighted today. Go after that raise or close that big deal!', 'Wrap up any unfinished tasks today. A major cycle at work is coming to a successful close.'],
  cancer: ['A fantastic day to start a brand new project or take charge at work, Cancer.', "Teamwork is your best asset today. Listen to a colleague's advice.", 'Your communication skills are on fire today! Pitch that creative idea.', 'Focus on the boring details today. Building a solid foundation will pay off later.', "Expect a sudden change of plans at work. Adapt quickly and you'll come out ahead.", 'Take responsibility for a mistake and turn it into a major win for your team.', 'Analyze your long-term career goals today. A little quiet planning goes a long way.', 'Money and ambition are highlighted today. Go after that raise or close that big deal!', 'Wrap up any unfinished tasks today. A major cycle at work is coming to a successful close.'],
  leo: ['A fantastic day to start a brand new project or take charge at work, Leo.', "Teamwork is your best asset today. Listen to a colleague's advice.", 'Your communication skills are on fire today! Pitch that creative idea.', 'Focus on the boring details today. Building a solid foundation will pay off later.', "Expect a sudden change of plans at work. Adapt quickly and you'll come out ahead.", 'Take responsibility for a mistake and turn it into a major win for your team.', 'Analyze your long-term career goals today. A little quiet planning goes a long way.', 'Money and ambition are highlighted today. Go after that raise or close that big deal!', 'Wrap up any unfinished tasks today. A major cycle at work is coming to a successful close.'],
  virgo: ['A fantastic day to start a brand new project or take charge at work, Virgo.', "Teamwork is your best asset today. Listen to a colleague's advice.", 'Your communication skills are on fire today! Pitch that creative idea.', 'Focus on the boring details today. Building a solid foundation will pay off later.', "Expect a sudden change of plans at work. Adapt quickly and you'll come out ahead.", 'Take responsibility for a mistake and turn it into a major win for your team.', 'Analyze your long-term career goals today. A little quiet planning goes a long way.', 'Money and ambition are highlighted today. Go after that raise or close that big deal!', 'Wrap up any unfinished tasks today. A major cycle at work is coming to a successful close.'],
  libra: ['A fantastic day to start a brand new project or take charge at work, Libra.', "Teamwork is your best asset today. Listen to a colleague's advice.", 'Your communication skills are on fire today! Pitch that creative idea.', 'Focus on the boring details today. Building a solid foundation will pay off later.', "Expect a sudden change of plans at work. Adapt quickly and you'll come out ahead.", 'Take responsibility for a mistake and turn it into a major win for your team.', 'Analyze your long-term career goals today. A little quiet planning goes a long way.', 'Money and ambition are highlighted today. Go after that raise or close that big deal!', 'Wrap up any unfinished tasks today. A major cycle at work is coming to a successful close.'],
  scorpio: ['A fantastic day to start a brand new project or take charge at work, Scorpio.', "Teamwork is your best asset today. Listen to a colleague's advice.", 'Your communication skills are on fire today! Pitch that creative idea.', 'Focus on the boring details today. Building a solid foundation will pay off later.', "Expect a sudden change of plans at work. Adapt quickly and you'll come out ahead.", 'Take responsibility for a mistake and turn it into a major win for your team.', 'Analyze your long-term career goals today. A little quiet planning goes a long way.', 'Money and ambition are highlighted today. Go after that raise or close that big deal!', 'Wrap up any unfinished tasks today. A major cycle at work is coming to a successful close.'],
  sagittarius: ['A fantastic day to start a brand new project or take charge at work, Sagittarius.', "Teamwork is your best asset today. Listen to a colleague's advice.", 'Your communication skills are on fire today! Pitch that creative idea.', 'Focus on the boring details today. Building a solid foundation will pay off later.', "Expect a sudden change of plans at work. Adapt quickly and you'll come out ahead.", 'Take responsibility for a mistake and turn it into a major win for your team.', 'Analyze your long-term career goals today. A little quiet planning goes a long way.', 'Money and ambition are highlighted today. Go after that raise or close that big deal!', 'Wrap up any unfinished tasks today. A major cycle at work is coming to a successful close.'],
  capricorn: ['A fantastic day to start a brand new project or take charge at work, Capricorn.', "Teamwork is your best asset today. Listen to a colleague's advice.", 'Your communication skills are on fire today! Pitch that creative idea.', 'Focus on the boring details today. Building a solid foundation will pay off later.', "Expect a sudden change of plans at work. Adapt quickly and you'll come out ahead.", 'Take responsibility for a mistake and turn it into a major win for your team.', 'Analyze your long-term career goals today. A little quiet planning goes a long way.', 'Money and ambition are highlighted today. Go after that raise or close that big deal!', 'Wrap up any unfinished tasks today. A major cycle at work is coming to a successful close.'],
  aquarius: ['A fantastic day to start a brand new project or take charge at work, Aquarius.', "Teamwork is your best asset today. Listen to a colleague's advice.", 'Your communication skills are on fire today! Pitch that creative idea.', 'Focus on the boring details today. Building a solid foundation will pay off later.', "Expect a sudden change of plans at work. Adapt quickly and you'll come out ahead.", 'Take responsibility for a mistake and turn it into a major win for your team.', 'Analyze your long-term career goals today. A little quiet planning goes a long way.', 'Money and ambition are highlighted today. Go after that raise or close that big deal!', 'Wrap up any unfinished tasks today. A major cycle at work is coming to a successful close.'],
  pisces: ['A fantastic day to start a brand new project or take charge at work, Pisces.', "Teamwork is your best asset today. Listen to a colleague's advice.", 'Your communication skills are on fire today! Pitch that creative idea.', 'Focus on the boring details today. Building a solid foundation will pay off later.', "Expect a sudden change of plans at work. Adapt quickly and you'll come out ahead.", 'Take responsibility for a mistake and turn it into a major win for your team.', 'Analyze your long-term career goals today. A little quiet planning goes a long way.', 'Money and ambition are highlighted today. Go after that raise or close that big deal!', 'Wrap up any unfinished tasks today. A major cycle at work is coming to a successful close.'],
};


const HEALTH: Record<ZodiacSign, string[]> = {
  aries: ['Your vitality is high today! Get outside and soak up some sun, Aries.', 'Drink plenty of water and focus on your digestion today. Eat light and fresh.', 'You have excess physical energy today. Hit the gym or go for a vigorous run!', 'Give your mind a break today. Step away from screens and do some deep breathing.', 'Go for a long walk in nature. Fresh air will do wonders for your overall wellbeing.', 'Treat yourself today. A long bath or a little skincare luxury will restore your spirit.', 'Focus on your posture and joints today. A good stretching session is exactly what you need.'],
  taurus: ['Your vitality is high today! Get outside and soak up some sun, Taurus.', 'Drink plenty of water and focus on your digestion today. Eat light and fresh.', 'You have excess physical energy today. Hit the gym or go for a vigorous run!', 'Give your mind a break today. Step away from screens and do some deep breathing.', 'Go for a long walk in nature. Fresh air will do wonders for your overall wellbeing.', 'Treat yourself today. A long bath or a little skincare luxury will restore your spirit.', 'Focus on your posture and joints today. A good stretching session is exactly what you need.'],
  gemini: ['Your vitality is high today! Get outside and soak up some sun, Gemini.', 'Drink plenty of water and focus on your digestion today. Eat light and fresh.', 'You have excess physical energy today. Hit the gym or go for a vigorous run!', 'Give your mind a break today. Step away from screens and do some deep breathing.', 'Go for a long walk in nature. Fresh air will do wonders for your overall wellbeing.', 'Treat yourself today. A long bath or a little skincare luxury will restore your spirit.', 'Focus on your posture and joints today. A good stretching session is exactly what you need.'],
  cancer: ['Your vitality is high today! Get outside and soak up some sun, Cancer.', 'Drink plenty of water and focus on your digestion today. Eat light and fresh.', 'You have excess physical energy today. Hit the gym or go for a vigorous run!', 'Give your mind a break today. Step away from screens and do some deep breathing.', 'Go for a long walk in nature. Fresh air will do wonders for your overall wellbeing.', 'Treat yourself today. A long bath or a little skincare luxury will restore your spirit.', 'Focus on your posture and joints today. A good stretching session is exactly what you need.'],
  leo: ['Your vitality is high today! Get outside and soak up some sun, Leo.', 'Drink plenty of water and focus on your digestion today. Eat light and fresh.', 'You have excess physical energy today. Hit the gym or go for a vigorous run!', 'Give your mind a break today. Step away from screens and do some deep breathing.', 'Go for a long walk in nature. Fresh air will do wonders for your overall wellbeing.', 'Treat yourself today. A long bath or a little skincare luxury will restore your spirit.', 'Focus on your posture and joints today. A good stretching session is exactly what you need.'],
  virgo: ['Your vitality is high today! Get outside and soak up some sun, Virgo.', 'Drink plenty of water and focus on your digestion today. Eat light and fresh.', 'You have excess physical energy today. Hit the gym or go for a vigorous run!', 'Give your mind a break today. Step away from screens and do some deep breathing.', 'Go for a long walk in nature. Fresh air will do wonders for your overall wellbeing.', 'Treat yourself today. A long bath or a little skincare luxury will restore your spirit.', 'Focus on your posture and joints today. A good stretching session is exactly what you need.'],
  libra: ['Your vitality is high today! Get outside and soak up some sun, Libra.', 'Drink plenty of water and focus on your digestion today. Eat light and fresh.', 'You have excess physical energy today. Hit the gym or go for a vigorous run!', 'Give your mind a break today. Step away from screens and do some deep breathing.', 'Go for a long walk in nature. Fresh air will do wonders for your overall wellbeing.', 'Treat yourself today. A long bath or a little skincare luxury will restore your spirit.', 'Focus on your posture and joints today. A good stretching session is exactly what you need.'],
  scorpio: ['Your vitality is high today! Get outside and soak up some sun, Scorpio.', 'Drink plenty of water and focus on your digestion today. Eat light and fresh.', 'You have excess physical energy today. Hit the gym or go for a vigorous run!', 'Give your mind a break today. Step away from screens and do some deep breathing.', 'Go for a long walk in nature. Fresh air will do wonders for your overall wellbeing.', 'Treat yourself today. A long bath or a little skincare luxury will restore your spirit.', 'Focus on your posture and joints today. A good stretching session is exactly what you need.'],
  sagittarius: ['Your vitality is high today! Get outside and soak up some sun, Sagittarius.', 'Drink plenty of water and focus on your digestion today. Eat light and fresh.', 'You have excess physical energy today. Hit the gym or go for a vigorous run!', 'Give your mind a break today. Step away from screens and do some deep breathing.', 'Go for a long walk in nature. Fresh air will do wonders for your overall wellbeing.', 'Treat yourself today. A long bath or a little skincare luxury will restore your spirit.', 'Focus on your posture and joints today. A good stretching session is exactly what you need.'],
  capricorn: ['Your vitality is high today! Get outside and soak up some sun, Capricorn.', 'Drink plenty of water and focus on your digestion today. Eat light and fresh.', 'You have excess physical energy today. Hit the gym or go for a vigorous run!', 'Give your mind a break today. Step away from screens and do some deep breathing.', 'Go for a long walk in nature. Fresh air will do wonders for your overall wellbeing.', 'Treat yourself today. A long bath or a little skincare luxury will restore your spirit.', 'Focus on your posture and joints today. A good stretching session is exactly what you need.'],
  aquarius: ['Your vitality is high today! Get outside and soak up some sun, Aquarius.', 'Drink plenty of water and focus on your digestion today. Eat light and fresh.', 'You have excess physical energy today. Hit the gym or go for a vigorous run!', 'Give your mind a break today. Step away from screens and do some deep breathing.', 'Go for a long walk in nature. Fresh air will do wonders for your overall wellbeing.', 'Treat yourself today. A long bath or a little skincare luxury will restore your spirit.', 'Focus on your posture and joints today. A good stretching session is exactly what you need.'],
  pisces: ['Your vitality is high today! Get outside and soak up some sun, Pisces.', 'Drink plenty of water and focus on your digestion today. Eat light and fresh.', 'You have excess physical energy today. Hit the gym or go for a vigorous run!', 'Give your mind a break today. Step away from screens and do some deep breathing.', 'Go for a long walk in nature. Fresh air will do wonders for your overall wellbeing.', 'Treat yourself today. A long bath or a little skincare luxury will restore your spirit.', 'Focus on your posture and joints today. A good stretching session is exactly what you need.'],
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



export function getLunarPhase(date: Date): number {
  const knownNewMoon = new Date(Date.UTC(2000, 0, 6, 18, 14, 0));
  const diffMs = date.getTime() - knownNewMoon.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  const cycleDays = 29.53058867;
  const currentPhase = diffDays % cycleDays;
  const phaseNormalized = currentPhase < 0 ? currentPhase + cycleDays : currentPhase;
  return Math.floor(phaseNormalized / (cycleDays / 8)) % 8;
}

export function getDailyNumerology(date: Date): number {
  const sum = date.getUTCDate() + (date.getUTCMonth() + 1) + date.getUTCFullYear();
  let root = sum;
  while (root > 9) {
    root = String(root).split('').reduce((a, b) => a + parseInt(b), 0);
  }
  return root;
}

export function getDayOfWeek(date: Date): number {
  return date.getUTCDay();
}

export function getDailyHoroscope(sign: ZodiacSign, date: Date = new Date()): DailyHoroscope {
  const dateKey = todayKey(date);
  const rng = seededRandom(dateKey, sign);
  const mood = pick(rng, MOODS);
  const luckyColor = pick(rng, COLORS);
  const luckyNumber = Math.floor(rng() * 9) + 1;
  const info = getZodiacInfo(sign);

  const loveIndex = getLunarPhase(date);
  const careerIndex = getDailyNumerology(date) - 1;
  const healthIndex = getDayOfWeek(date);

  const loveValue = LOVE[sign][loveIndex] || LOVE[sign][0];
  const careerValue = CAREER[sign][careerIndex] || CAREER[sign][0];
  const healthValue = HEALTH[sign][healthIndex] || HEALTH[sign][0];

  return {
    sign,
    dateKey,
    mood,
    luckyNumber,
    luckyColor,
    love: loveValue,
    career: careerValue,
    health: healthValue,
    loveIndex,
    careerIndex,
    healthIndex,
    summary: `${info.name} is feeling ${mood.toLowerCase()} today. ${loveValue}`,
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
