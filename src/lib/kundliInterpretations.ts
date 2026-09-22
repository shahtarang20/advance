// Interpretive content for Kundli results.
//
// Depth is prioritized on the three highest-value, most-asked-about placements: Moon Rashi (the
// commonly-asked "what is my rashi"), Lagna/Ascendant, and Sun Rashi — 12 real entries each. The
// remaining six grahas (Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu) get a shorter,
// genuinely-written 1-2 sentence "significance in [Rashi]" line per sign (72 more entries) rather
// than being left blank, giving a real foundation across all 9 x 12 = 108 graha/Rashi
// combinations without overstating depth anywhere but the top three.

import type { Rashi, Graha } from "./kundli";

export const MOON_RASHI_MEANING: Record<Rashi, string> = {
  Mesha: "With the Moon in Mesha (Aries), your emotional instinct is to act first and reflect later — you feel things intensely and want to move on that feeling immediately. This gives real courage and a refreshing directness, but it can also mean impatience with slower-moving people or situations. Learning to pause before reacting is the main emotional growth edge for this placement.",
  Vrishabha: "With the Moon in Vrishabha (Taurus), your emotional nature craves stability, comfort, and the tangible — a settled home, good food, familiar routines. You're steady and dependable once your sense of security is met, though change can feel genuinely threatening rather than just inconvenient. This placement often brings a calm, grounding presence that others lean on.",
  Mithuna: "With the Moon in Mithuna (Gemini), your emotions process through talking, thinking, and connecting — you understand your own feelings by putting them into words. This makes you an engaging communicator and a quick emotional adapter, though feelings can sometimes stay intellectualized rather than fully felt. Variety and mental stimulation are emotional needs, not luxuries, for this placement.",
  Karka: "With the Moon in Karka (Cancer), this is the Moon's own sign — its most emotionally attuned placement. You feel deeply, remember tenderly, and are instinctively nurturing toward the people you love, often building a strong sense of home and family wherever you are. The flip side is real sensitivity to rejection and a tendency to retreat into your shell when hurt.",
  Simha: "With the Moon in Simha (Leo), your emotional wellbeing is tied to being seen, respected, and appreciated for who you genuinely are. There's a warm, generous, dramatic quality to how you feel and express emotion — you love wholeheartedly and want that mirrored back. When that recognition is missing, it can sting more than it would for other placements.",
  Kanya: "With the Moon in Kanya (Virgo), you process emotion through analysis and usefulness — you feel most at ease when you can do something practical about what you're feeling. This brings a caring, detail-oriented, quietly devoted style of showing love, though self-criticism and worry can run high if left unchecked.",
  Tula: "With the Moon in Tula (Libra), your emotional equilibrium depends heavily on harmony, fairness, and connection with others — conflict and imbalance genuinely unsettle you. You're naturally diplomatic and relationship-oriented, skilled at seeing multiple sides, though you may struggle to identify your own feelings when they're inconvenient for keeping the peace.",
  Vrishchika: "With the Moon in Vrishchika (Scorpio), you feel everything at high intensity and rarely on the surface — your emotional life runs deep, private, and transformative. This gives remarkable resilience and loyalty once trust is earned, but trust itself is not given lightly, and old hurts can be held onto for a long time.",
  Dhanu: "With the Moon in Dhanu (Sagittarius), your emotional nature is optimistic, freedom-loving, and philosophical — you process feelings by zooming out and finding meaning or humor in them. This gives real resilience and a contagious hopefulness, though you may avoid sitting with heavier emotions by staying in constant motion.",
  Makara: "With the Moon in Makara (Capricorn), you tend to manage emotion through structure, responsibility, and self-control rather than open display. This gives real emotional maturity and staying power under pressure, but it can also mean underexpressing needs until they build up, or mistaking productivity for emotional resolution.",
  Kumbha: "With the Moon in Kumbha (Aquarius), you relate to your own feelings somewhat like an observer — analytical, a little detached, oriented toward the collective rather than just the personal. This gives an unusually open-minded, humanitarian emotional style, though close ones may sometimes wish for more overt warmth or vulnerability.",
  Meena: "With the Moon in Meena (Pisces), this is one of the most emotionally sensitive and imaginative placements — you absorb the feelings of people and places around you almost like a sponge. Compassion, intuition, and creativity run deep, but clear emotional boundaries are essential so you don't lose yourself in others' moods.",
};

export const LAGNA_MEANING: Record<Rashi, string> = {
  Mesha: "A Mesha (Aries) Lagna gives a bold, direct, high-energy first impression — you tend to lead with action, come across as confident and a little impatient, and approach life as something to be tackled head-on rather than waited out.",
  Vrishabha: "A Vrishabha (Taurus) Lagna gives a calm, grounded, steady presence — people read you as reliable and unhurried, with a natural appreciation for comfort, beauty, and doing things at your own pace rather than being rushed.",
  Mithuna: "A Mithuna (Gemini) Lagna gives a quick, curious, conversational first impression — you come across as mentally agile and sociable, someone who notices details and enjoys exchanging ideas more than sitting still.",
  Karka: "A Karka (Cancer) Lagna gives a gentle, protective, home-oriented presence — you often come across as caring and a little reserved at first, warming up once trust is built, with strong instincts toward family and emotional security.",
  Simha: "A Simha (Leo) Lagna gives a warm, confident, natural-leader presence — you tend to walk into a room with quiet self-assurance and a flair for the dramatic, drawing attention whether you're seeking it or not.",
  Kanya: "A Kanya (Virgo) Lagna gives a precise, observant, modest first impression — you come across as capable and detail-oriented, someone others trust to notice what's been missed and quietly get things right.",
  Tula: "A Tula (Libra) Lagna gives a charming, diplomatic, aesthetically-minded presence — you tend to come across as easy to get along with, genuinely interested in fairness and other people, and naturally drawn to balance and beauty.",
  Vrishchika: "A Vrishchika (Scorpio) Lagna gives an intense, magnetic, somewhat guarded first impression — people often sense there's real depth and strength beneath a composed surface, and you reveal yourself selectively rather than all at once.",
  Dhanu: "A Dhanu (Sagittarius) Lagna gives an open, optimistic, adventure-seeking presence — you tend to come across as frank, philosophical, and restless for the next horizon, whether that's travel, ideas, or new experience.",
  Makara: "A Makara (Capricorn) Lagna gives a serious, composed, ambitious first impression — you often appear older or more responsible than your years, approaching life with discipline and a long-term view rather than impulse.",
  Kumbha: "A Kumbha (Aquarius) Lagna gives an unconventional, independent, idea-driven presence — you tend to come across as original and a little detached from convention, more interested in concepts and causes than small talk.",
  Meena: "A Meena (Pisces) Lagna gives a soft, imaginative, empathetic first impression — you often come across as dreamy and compassionate, easily attuned to others' moods, with a gentle, slightly otherworldly quality.",
};

export const SUN_RASHI_MEANING: Record<Rashi, string> = {
  Mesha: "Sun in Mesha (Aries) gives a core identity built around initiative, courage, and independence — your sense of purpose is strongest when you're leading, starting something new, or facing a challenge head-on.",
  Vrishabha: "Sun in Vrishabha (Taurus) gives a core identity built around stability, patience, and material security — your sense of purpose is strongest when building something lasting and enjoying life's tangible pleasures.",
  Mithuna: "Sun in Mithuna (Gemini) gives a core identity built around curiosity, communication, and versatility — your sense of purpose is strongest when learning, connecting, and engaging with a variety of ideas and people.",
  Karka: "Sun in Karka (Cancer) gives a core identity built around nurturing, emotional depth, and belonging — your sense of purpose is strongest when caring for family or a close community, and building a real sense of home.",
  Simha: "Sun in Simha (Leo) — the Sun's own sign — gives a strong, confident core identity built around self-expression and leadership; your sense of purpose is strongest when you're creating, performing, or guiding others visibly.",
  Kanya: "Sun in Kanya (Virgo) gives a core identity built around service, competence, and improvement — your sense of purpose is strongest when your skill and attention to detail are put to genuinely useful work.",
  Tula: "Sun in Tula (Libra) gives a core identity built around partnership, balance, and fairness — your sense of purpose is strongest in relationships and collaborative settings where harmony and justice matter.",
  Vrishchika: "Sun in Vrishchika (Scorpio) gives a core identity built around depth, intensity, and transformation — your sense of purpose is strongest when engaging with what's hidden, difficult, or genuinely meaningful rather than surface-level.",
  Dhanu: "Sun in Dhanu (Sagittarius) gives a core identity built around exploration, belief, and growth — your sense of purpose is strongest when learning, teaching, traveling, or pursuing a larger philosophy of life.",
  Makara: "Sun in Makara (Capricorn) gives a core identity built around achievement, discipline, and long-term responsibility — your sense of purpose is strongest when working steadily toward status or a lasting structure.",
  Kumbha: "Sun in Kumbha (Aquarius) gives a core identity built around individuality, innovation, and the collective good — your sense of purpose is strongest when contributing original ideas to a larger community or cause.",
  Meena: "Sun in Meena (Pisces) gives a core identity built around compassion, imagination, and spiritual sensitivity — your sense of purpose is strongest when creating, helping, or connecting to something beyond the everyday.",
};

const PLANET_THEMES: Record<Graha, string> = {
  Sun: "identity, vitality, and authority",
  Moon: "emotions, instincts, and the mind",
  Mars: "drive, courage, and assertiveness",
  Mercury: "communication, intellect, and analysis",
  Jupiter: "wisdom, growth, and good fortune",
  Venus: "love, beauty, and relationships",
  Saturn: "discipline, responsibility, and long-term effort",
  Rahu: "ambition, obsession, and worldly desire — an unconventional, amplifying influence",
  Ketu: "detachment, introspection, and past-life karma — a quietly spiritualizing influence",
};

const RASHI_FLAVOR: Record<Rashi, string> = {
  Mesha: "bold, fast-moving, pioneering energy",
  Vrishabha: "steady, patient, materially-grounded energy",
  Mithuna: "curious, communicative, adaptable energy",
  Karka: "nurturing, emotionally sensitive energy",
  Simha: "confident, expressive, leadership-oriented energy",
  Kanya: "precise, analytical, service-minded energy",
  Tula: "diplomatic, harmony-seeking, relational energy",
  Vrishchika: "intense, transformative, deeply private energy",
  Dhanu: "expansive, optimistic, philosophical energy",
  Makara: "disciplined, ambitious, structure-building energy",
  Kumbha: "independent, unconventional, idea-driven energy",
  Meena: "compassionate, imaginative, boundary-dissolving energy",
};

/** Generic but genuine 1-2 sentence significance text for any graha-in-rashi combination. */
export function planetInRashiSignificance(graha: Graha, rashi: Rashi): string {
  return `${graha} governs ${PLANET_THEMES[graha]} in your chart. Placed in ${rashi}, this expresses through ${RASHI_FLAVOR[rashi]} — coloring how you experience and act on ${PLANET_THEMES[graha].split(",")[0]} in daily life.`;
}
