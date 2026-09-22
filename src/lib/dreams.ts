export type DreamSymbol = {
  keyword: string;
  category: string;
  meaning: string;
};

const DREAM_DICTIONARY: DreamSymbol[] = [
  { keyword: "flying", category: "Freedom", meaning: "Flying represents liberation, rising above challenges, and spiritual freedom. You are breaking free from limitations in your waking life." },
  { keyword: "falling", category: "Anxiety", meaning: "Falling signifies a loss of control or a feeling of being overwhelmed. The universe is telling you to ground yourself and find stability." },
  { keyword: "water", category: "Emotions", meaning: "Water is the universal symbol for the subconscious and deep emotions. Calm water means peace; turbulent water suggests emotional unrest." },
  { keyword: "teeth", category: "Insecurity", meaning: "Teeth falling out is a classic symbol of insecurity, specifically regarding your appearance, communication, or a recent loss of power." },
  { keyword: "chase", category: "Avoidance", meaning: "Being chased means you are running away from an issue, fear, or repressed emotion in your waking life. It's time to turn around and face it." },
  { keyword: "snake", category: "Transformation", meaning: "Snakes represent shedding the old skin and rebirth. It can also point to a hidden threat or a profound spiritual awakening." },
  { keyword: "death", category: "New Beginnings", meaning: "Death in a dream rarely means literal death. It symbolizes the end of a phase, habit, or relationship, making room for a massive transformation." },
  { keyword: "naked", category: "Vulnerability", meaning: "Being naked in public reflects a fear of exposure, being judged, or feeling utterly vulnerable and unprepared for a situation." },
  { keyword: "fire", category: "Passion", meaning: "Fire represents burning passion, anger, or rapid transformation. It is the energy of destroying the old to forge the new." },
  { keyword: "spider", category: "Creation", meaning: "Spiders weave webs, symbolizing your destiny and creative power. You are the architect of your own life, but be careful not to feel trapped by your own designs." },
  { keyword: "house", category: "The Self", meaning: "A house represents your mind and soul. Discovering new rooms means discovering hidden talents or aspects of your personality." },
  { keyword: "ocean", category: "The Subconscious", meaning: "The ocean is the vast unknown of your inner world. It represents profound spiritual depths, hidden potentials, and the infinite nature of your soul." },
];

export function analyzeDream(dreamText: string): DreamSymbol[] {
  if (!dreamText) return [];
  
  const text = dreamText.toLowerCase();
  const detectedSymbols: DreamSymbol[] = [];
  
  for (const symbol of DREAM_DICTIONARY) {
    // Basic substring check. For a real NLP system this would be lemmatized
    if (text.includes(symbol.keyword)) {
      detectedSymbols.push(symbol);
    }
  }
  
  // Also check variations for "chase" like "chased", "chasing"
  if (text.includes("chased") || text.includes("chasing") || text.includes("ran away")) {
    if (!detectedSymbols.find(s => s.keyword === "chase")) {
      detectedSymbols.push(DREAM_DICTIONARY.find(s => s.keyword === "chase")!);
    }
  }
  
  return detectedSymbols;
}
