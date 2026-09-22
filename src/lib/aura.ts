export type ChakraColor = {
  id: string;
  name: string;
  chakra: string;
  colorHex: string;
  description: string;
  strength: string;
  balanceTip: string;
};

export const AURA_COLORS: Record<number, ChakraColor> = {
  1: {
    id: "red",
    name: "Red Aura",
    chakra: "Root Chakra",
    colorHex: "#ef4444", // Tailwind red-500
    description: "A red aura signifies a deeply grounded, fiery, and passionate personality. You are a natural-born leader, fearless, and deeply connected to your physical reality.",
    strength: "Unmatched courage, high physical energy, and the ability to manifest ideas into reality quickly.",
    balanceTip: "When imbalanced, you may feel angry or restless. Spend time in nature and practice grounding meditations to release excess energy.",
  },
  2: {
    id: "orange",
    name: "Orange Aura",
    chakra: "Sacral Chakra",
    colorHex: "#f97316", // Tailwind orange-500
    description: "An orange aura radiates creativity, sensuality, and joy. You are highly sociable, emotionally intelligent, and thrive when you are expressing yourself.",
    strength: "Vibrant creativity, strong emotional connections, and an infectious enthusiasm for life.",
    balanceTip: "If your energy feels stagnant, engage in a creative hobby or movement like dancing to get your sacral energy flowing again.",
  },
  3: {
    id: "yellow",
    name: "Yellow Aura",
    chakra: "Solar Plexus Chakra",
    colorHex: "#eab308", // Tailwind yellow-500
    description: "A yellow aura shines with intellect, optimism, and strong personal power. You have a radiant, sunny disposition and a powerful sense of self-worth.",
    strength: "Brilliant intellect, unshakeable confidence, and the ability to inspire others with your positive outlook.",
    balanceTip: "A blocked solar plexus can lead to self-doubt. Practice affirmations of self-worth and spend time in direct sunlight to recharge.",
  },
  4: {
    id: "green",
    name: "Green Aura",
    chakra: "Heart Chakra",
    colorHex: "#22c55e", // Tailwind green-500
    description: "A green aura indicates a natural healer. You are deeply compassionate, loving, and intimately connected to nature and the well-being of others.",
    strength: "Profound empathy, unconditional love, and a calming presence that puts others at ease.",
    balanceTip: "You tend to give too much of yourself. Ensure you set healthy boundaries and practice radical self-care to avoid emotional burnout.",
  },
  5: {
    id: "blue",
    name: "Blue Aura",
    chakra: "Throat Chakra",
    colorHex: "#3b82f6", // Tailwind blue-500
    description: "A blue aura reflects a deeply expressive, calm, and honest soul. You are a natural communicator who values truth, clarity, and peace.",
    strength: "Exceptional communication skills, deep inner peace, and the courage to speak your authentic truth.",
    balanceTip: "If you feel misunderstood, your throat chakra may be blocked. Try journaling or singing to clear the energy pathway of expression.",
  },
  6: {
    id: "indigo",
    name: "Indigo Aura",
    chakra: "Third Eye Chakra",
    colorHex: "#6366f1", // Tailwind indigo-500
    description: "An indigo aura is the mark of a highly intuitive, spiritually gifted individual. You see beyond the surface and possess a deep, inner knowing.",
    strength: "Powerful psychic abilities, deep spiritual insight, and a strong connection to your inner guidance.",
    balanceTip: "To avoid feeling overwhelmed by your sensitivities, practice grounding exercises and trust the visions you receive.",
  },
  7: {
    id: "violet",
    name: "Violet Aura",
    chakra: "Crown Chakra",
    colorHex: "#8b5cf6", // Tailwind violet-500
    description: "A violet aura signifies a highly evolved spiritual seeker. You are deeply connected to the divine, possessing wisdom and a visionary mind.",
    strength: "Profound spiritual wisdom, visionary leadership, and a deep sense of universal connection.",
    balanceTip: "You may struggle with feeling disconnected from the physical world. Remember to ground yourself in your body through physical exercise.",
  },
  8: {
    id: "magenta",
    name: "Magenta Aura",
    chakra: "Universal Love (High Heart)",
    colorHex: "#d946ef", // Tailwind fuchsia-500
    description: "A magenta aura is rare, combining physical mastery with deep spiritual wisdom. You are a non-conformist, bringing radical new ideas of love and harmony into the world.",
    strength: "Fearless individuality, boundless creative energy, and the ability to manifest on a grand scale.",
    balanceTip: "Your intense energy can sometimes scatter. Focus on one major goal at a time to fully channel your immense manifestation power.",
  },
  9: {
    id: "gold",
    name: "Gold / White Aura",
    chakra: "Spiritual Enlightenment",
    colorHex: "#fbbf24", // Tailwind amber-400
    description: "A gold or white aura is the signature of an enlightened soul. You are a spiritual teacher, radiating divine protection, purity, and universal wisdom.",
    strength: "A pure heart, powerful spiritual protection, and the ability to uplift the consciousness of everyone you meet.",
    balanceTip: "Because you operate at such a high frequency, the dense energies of the world can be draining. Protect your energy field with regular spiritual cleansing.",
  },
};

export function getAuraForLifePath(lifePathNumber: number): ChakraColor {
  // Map life path 1-9 to aura. Master numbers 11, 22, 33 reduce to 2, 4, 6.
  const reduced = lifePathNumber > 9 ? (lifePathNumber % 9 || 9) : lifePathNumber;
  return AURA_COLORS[reduced];
}

export const auraNameKey = (aura: ChakraColor) => `aura.color.${aura.id}.name`;
export const auraChakraKey = (aura: ChakraColor) => `aura.color.${aura.id}.chakra`;
export const auraDescriptionKey = (aura: ChakraColor) => `aura.color.${aura.id}.description`;
export const auraStrengthKey = (aura: ChakraColor) => `aura.color.${aura.id}.strength`;
export const auraBalanceTipKey = (aura: ChakraColor) => `aura.color.${aura.id}.balanceTip`;
