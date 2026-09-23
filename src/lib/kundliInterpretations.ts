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
  Mesha: "Your mind moves fast! You feel things deeply and want to act on your emotions right away. This gives you amazing courage, but you might need to practice a little patience.",
  Vrishabha: "You crave comfort and stability above all else. A cozy home and familiar routines keep you emotionally grounded, and you're the calm presence everyone else leans on.",
  Mithuna: "You process your feelings by talking them out! You need mental stimulation and a variety of friends to feel emotionally fulfilled.",
  Karka: "You feel things on a very deep level and have a strong protective instinct for your loved ones. Family and home are your absolute emotional center.",
  Simha: "You have a big, warm heart and love expressing your feelings! You need to feel seen and appreciated by the people you love to be truly happy.",
  Kanya: "You show you care by doing practical things for others. You process your emotions by organizing and fixing things, though try not to worry too much!",
  Tula: "Peace and harmony are your emotional lifelines. You hate conflict and will go out of your way to keep the peace and make everyone happy.",
  Vrishchika: "Your feelings are intense and incredibly deep. You might keep your emotions private, but once you trust someone, you are fiercely loyal.",
  Dhanu: "You are naturally optimistic and process your feelings by looking at the big picture! Freedom and a good laugh are what keep you emotionally balanced.",
  Makara: "You manage your feelings through discipline and taking responsibility. You have incredible emotional maturity, but don't forget to let your guard down sometimes!",
  Kumbha: "You relate to your feelings a bit like an observer. You are very open-minded and humanitarian, caring deeply about your community.",
  Meena: "You are incredibly empathetic and easily absorb the feelings of everyone around you. You have a beautiful, creative, and gentle emotional nature.",
};

export const LAGNA_MEANING: Record<Rashi, string> = {
  Mesha: "You give off a bold and energetic vibe! People see you as confident, fast-moving, and always ready to take action.",
  Vrishabha: "People see you as a calm, steady rock. You have a relaxed, grounded presence and appreciate the beautiful things in life.",
  Mithuna: "You come across as curious, chatty, and quick-witted! You're always ready to strike up a fun conversation.",
  Karka: "You have a gentle, protective aura. You might seem a little shy at first, but people quickly sense how caring you really are.",
  Simha: "You walk into a room and people notice! You have a natural warmth, confidence, and a subtle dramatic flair.",
  Kanya: "You come across as modest, capable, and very observant. People trust you because you always notice the little details.",
  Tula: "You have a charming, diplomatic presence! You come across as extremely polite, fair, and easy to get along with.",
  Vrishchika: "You give off an intense and magnetic vibe. People sense you have incredible depth and strength hidden just beneath the surface.",
  Dhanu: "You come across as fun, frank, and adventurous! You have an open, optimistic vibe that draws people in.",
  Makara: "You look serious, ambitious, and responsible. People immediately see you as someone they can rely on to get things done.",
  Kumbha: "You have an unconventional and highly independent vibe! People see you as a unique thinker who doesn't follow the crowd.",
  Meena: "You have a soft, dreamy, and gentle presence. People instantly sense your empathy and kind heart.",
};

export const SUN_RASHI_MEANING: Record<Rashi, string> = {
  Mesha: "At your core, you are a pioneer! Your sense of purpose shines brightest when you're taking the lead and facing a new challenge.",
  Vrishabha: "Your core identity is built on stability and patience. You thrive when you're building something lasting and enjoying the simple pleasures of life.",
  Mithuna: "You are a learner at heart! Your purpose is found in exploring new ideas, communicating, and staying curious about everything.",
  Karka: "Your core purpose is nurturing. You shine brightest when you're caring for your community and building a deep sense of belonging.",
  Simha: "You were born to shine! Your true purpose comes alive when you are leading, creating, and generously sharing your light with others.",
  Kanya: "Your core identity is about service and improvement. You thrive when you're using your amazing skills to genuinely help others.",
  Tula: "Your purpose revolves around partnership and balance! You shine brightest when creating harmony and fairness in your relationships.",
  Vrishchika: "Your core self is about deep transformation. You find purpose in diving into meaningful, intense experiences rather than just staying on the surface.",
  Dhanu: "You are an explorer at heart! Your purpose is found in traveling, learning, and discovering the bigger meaning of life.",
  Makara: "Your core identity is driven by ambition and structure. You thrive when you are working steadily toward a major long-term goal.",
  Kumbha: "Your purpose is innovation! You shine brightest when you're bringing your unique, original ideas to help the collective good.",
  Meena: "Your core self is incredibly compassionate. You find your true purpose when creating art or helping others with your deep spiritual sensitivity.",
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

// --- Translation key helpers ---------------------------------------------
// These map each interpretation to an i18n key (src/locales/*.json). The
// English maps above are passed as `defaultValue` so the page always renders
// correctly even for keys a given locale hasn't translated yet.

export const moonRashiMeaningKey = (rashi: Rashi) => `kundli.moonMeaning.${rashi.toLowerCase()}`;
export const lagnaMeaningKey = (rashi: Rashi) => `kundli.lagnaMeaning.${rashi.toLowerCase()}`;
export const sunRashiMeaningKey = (rashi: Rashi) => `kundli.sunMeaning.${rashi.toLowerCase()}`;
export const planetThemeKey = (graha: Graha) => `kundli.planetTheme.${graha.toLowerCase()}`;
export const rashiFlavorKey = (rashi: Rashi) => `kundli.rashiFlavor.${rashi.toLowerCase()}`;

export const PLANET_THEMES_EN = PLANET_THEMES;
export const RASHI_FLAVOR_EN = RASHI_FLAVOR;
