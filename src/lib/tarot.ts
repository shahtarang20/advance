export type TarotCard = {
  id: number; // 0 to 21
  name: string;
  numeral: string;
  imageFallback: string; // Since we don't have actual images, we'll use emojis or symbols as placeholders
  element: string;
  uprightMeaning: string;
  reversedMeaning: string;
  description: string;
};

export const MAJOR_ARCANA: TarotCard[] = [
  {
    id: 0,
    name: "The Fool",
    numeral: "0",
    imageFallback: "🃏",
    element: "Air",
    uprightMeaning: "New beginnings, innocence, spontaneity, a free spirit.",
    reversedMeaning: "Recklessness, risk-taking, holding back.",
    description: "The Fool represents new beginnings, having faith in the future, being inexperienced, not knowing what to expect, having beginner's luck, improvisation and believing in the universe. It is the card of unlimited potential.",
  },
  {
    id: 1,
    name: "The Magician",
    numeral: "I",
    imageFallback: "🪄",
    element: "Air",
    uprightMeaning: "Manifestation, resourcefulness, power, inspired action.",
    reversedMeaning: "Manipulation, poor planning, untapped talents.",
    description: "The Magician brings the tools, resources, and energy you need to make your dreams come true. You possess the spiritual, physical, mental, and emotional power to manifest your desires.",
  },
  {
    id: 2,
    name: "The High Priestess",
    numeral: "II",
    imageFallback: "🌙",
    element: "Water",
    uprightMeaning: "Intuition, sacred knowledge, divine feminine, the subconscious mind.",
    reversedMeaning: "Secrets, disconnected from intuition, withdrawal and silence.",
    description: "The High Priestess sits at the gate before the great Mystery, indicating that it is time to retreat and reflect upon your inner world. Trust your intuition over your intellect.",
  },
  {
    id: 3,
    name: "The Empress",
    numeral: "III",
    imageFallback: "🌾",
    element: "Earth",
    uprightMeaning: "Femininity, beauty, nature, nurturing, abundance.",
    reversedMeaning: "Creative block, dependence on others, emptiness.",
    description: "The Empress represents a deep connection with our femininity, translating to elegance, sensuality, fertility, creative expression, and nurturing. She calls on you to connect with nature and your senses.",
  },
  {
    id: 4,
    name: "The Emperor",
    numeral: "IV",
    imageFallback: "👑",
    element: "Fire",
    uprightMeaning: "Authority, establishment, structure, a father figure.",
    reversedMeaning: "Domination, excessive control, lack of discipline, inflexibility.",
    description: "The Emperor is a symbol of authority, structure, and solid foundations. He suggests that you have the power to organize your world, bring order to chaos, and lay down rules and systems.",
  },
  {
    id: 5,
    name: "The Hierophant",
    numeral: "V",
    imageFallback: "🗝️",
    element: "Earth",
    uprightMeaning: "Spiritual wisdom, religious beliefs, conformity, tradition, institutions.",
    reversedMeaning: "Personal beliefs, freedom, challenging the status quo.",
    description: "The Hierophant stands for tradition, convention, and orthodox institutions. It suggests following established structures and honoring long-held beliefs, seeking guidance from a trusted mentor.",
  },
  {
    id: 6,
    name: "The Lovers",
    numeral: "VI",
    imageFallback: "❤️",
    element: "Air",
    uprightMeaning: "Love, harmony, relationships, values alignment, choices.",
    reversedMeaning: "Self-love, disharmony, imbalance, misalignment of values.",
    description: "The Lovers represent deep connections and meaningful relationships. Beyond romance, this card signifies a choice between two paths, requiring alignment of personal values and careful consideration.",
  },
  {
    id: 7,
    name: "The Chariot",
    numeral: "VII",
    imageFallback: "🏇",
    element: "Water",
    uprightMeaning: "Control, willpower, success, action, determination.",
    reversedMeaning: "Self-discipline, opposition, lack of direction.",
    description: "The Chariot represents overcoming challenges and gaining victory through maintaining control of your surroundings. It requires absolute focus, determination, and willpower.",
  },
  {
    id: 8,
    name: "Strength",
    numeral: "VIII",
    imageFallback: "🦁",
    element: "Fire",
    uprightMeaning: "Strength, courage, persuasion, influence, compassion.",
    reversedMeaning: "Inner strength, self-doubt, low energy, raw emotion.",
    description: "Strength represents mastering raw emotions and bringing calm to yourself or a situation. It is not about brute force, but rather soft control, patience, and deep compassion.",
  },
  {
    id: 9,
    name: "The Hermit",
    numeral: "IX",
    imageFallback: "🏮",
    element: "Earth",
    uprightMeaning: "Soul-searching, introspection, being alone, inner guidance.",
    reversedMeaning: "Isolation, loneliness, withdrawal.",
    description: "The Hermit shows that you are taking a break from everyday life to draw your energy and attention inward. You are seeking answers from within, looking for your inner truth.",
  },
  {
    id: 10,
    name: "Wheel of Fortune",
    numeral: "X",
    imageFallback: "🎡",
    element: "Fire",
    uprightMeaning: "Good luck, karma, life cycles, destiny, a turning point.",
    reversedMeaning: "Bad luck, resistance to change, breaking cycles.",
    description: "The Wheel of Fortune reminds us that the wheel is always turning and life is in a constant state of change. What goes up must come down; stay centered through the ups and downs.",
  },
  {
    id: 11,
    name: "Justice",
    numeral: "XI",
    imageFallback: "⚖️",
    element: "Air",
    uprightMeaning: "Justice, fairness, truth, cause and effect, law.",
    reversedMeaning: "Unfairness, lack of accountability, dishonesty.",
    description: "Justice indicates that the fairest decision will be made. You are being called to account for your actions and will be judged accordingly. It is a time for truth and integrity.",
  },
  {
    id: 12,
    name: "The Hanged Man",
    numeral: "XII",
    imageFallback: "🙃",
    element: "Water",
    uprightMeaning: "Pause, surrender, letting go, new perspectives.",
    reversedMeaning: "Delays, resistance, stalling, indecision.",
    description: "The Hanged Man asks you to suspend action and view the world from a different angle. It represents a necessary pause, a surrender to the current situation to gain profound insight.",
  },
  {
    id: 13,
    name: "Death",
    numeral: "XIII",
    imageFallback: "💀",
    element: "Water",
    uprightMeaning: "Endings, change, transformation, transition.",
    reversedMeaning: "Resistance to change, personal transformation, inner purging.",
    description: "Death rarely means physical death. Instead, it signifies the end of a major phase or aspect of your life that you realize is no longer serving you, clearing the way for new beginnings.",
  },
  {
    id: 14,
    name: "Temperance",
    numeral: "XIV",
    imageFallback: "🕊️",
    element: "Fire",
    uprightMeaning: "Balance, moderation, patience, purpose.",
    reversedMeaning: "Imbalance, excess, self-healing, re-alignment.",
    description: "Temperance calls for balance, tranquility, and moderation. You are taking the middle road, avoiding extremes, and calmly synthesizing opposites to create something new and harmonious.",
  },
  {
    id: 15,
    name: "The Devil",
    numeral: "XV",
    imageFallback: "⛓️",
    element: "Earth",
    uprightMeaning: "Shadow self, attachment, addiction, restriction, sexuality.",
    reversedMeaning: "Releasing limiting beliefs, exploring dark thoughts, detachment.",
    description: "The Devil represents feeling trapped, empty, and unfulfilled. It brings to light the hidden forces of negativity, materialism, and harmful habits holding you back from your true potential.",
  },
  {
    id: 16,
    name: "The Tower",
    numeral: "XVI",
    imageFallback: "🌩️",
    element: "Fire",
    uprightMeaning: "Sudden change, upheaval, chaos, revelation, awakening.",
    reversedMeaning: "Personal transformation, fear of change, averting disaster.",
    description: "The Tower strikes to tear down structures built on false foundations. Though painful and disruptive, this sudden upheaval brings radical awakening and necessary clearing for the truth.",
  },
  {
    id: 17,
    name: "The Star",
    numeral: "XVII",
    imageFallback: "⭐",
    element: "Air",
    uprightMeaning: "Hope, faith, purpose, renewal, spirituality.",
    reversedMeaning: "Lack of faith, despair, self-trust, disconnection.",
    description: "The Star follows the destruction of the Tower with renewed hope and faith. It represents a period of peace, spiritual healing, and connection to the divine universe.",
  },
  {
    id: 18,
    name: "The Moon",
    numeral: "XVIII",
    imageFallback: "🌝",
    element: "Water",
    uprightMeaning: "Illusion, fear, anxiety, subconscious, intuition.",
    reversedMeaning: "Release of fear, repressed emotion, inner confusion.",
    description: "The Moon reveals that things are not as they seem. It speaks to the realm of the subconscious, hidden fears, and deep intuition. You must trust your inner feeling to navigate the darkness.",
  },
  {
    id: 19,
    name: "The Sun",
    numeral: "XIX",
    imageFallback: "☀️",
    element: "Fire",
    uprightMeaning: "Positivity, fun, warmth, success, vitality.",
    reversedMeaning: "Inner child, feeling down, overly optimistic.",
    description: "The Sun shines with success, radiance, and abundance. It gives you strength and tells you that no matter where you go, positive energy will follow you and bring joy to your path.",
  },
  {
    id: 20,
    name: "Judgement",
    numeral: "XX",
    imageFallback: "📯",
    element: "Fire",
    uprightMeaning: "Judgement, rebirth, inner calling, absolution.",
    reversedMeaning: "Self-doubt, inner critic, ignoring the call.",
    description: "Judgement calls for you to rise up and embrace a higher level of consciousness. It is a time for self-evaluation, letting go of past grievances, and stepping into your true calling.",
  },
  {
    id: 21,
    name: "The World",
    numeral: "XXI",
    imageFallback: "🌍",
    element: "Earth",
    uprightMeaning: "Completion, integration, accomplishment, travel.",
    reversedMeaning: "Seeking personal closure, short-cuts, delays.",
    description: "The World signifies completion and harmony. You have come to the end of a long journey, integrating all lessons learned, and are now ready to celebrate your wholeness and step into a new cycle.",
  },
];

export const MINOR_ARCANA: TarotCard[] = [
  {
    id: 22,
    name: "Ace of Wands",
    numeral: "I",
    imageFallback: "🔥",
    element: "Fire",
    uprightMeaning: "Upright meaning for Ace of Wands.",
    reversedMeaning: "Reversed meaning for Ace of Wands.",
    description: "The Ace of Wands represents energy related to Fire. This is a minor arcana card."
  },
  {
    id: 23,
    name: "Two of Wands",
    numeral: "II",
    imageFallback: "🔥",
    element: "Fire",
    uprightMeaning: "Upright meaning for Two of Wands.",
    reversedMeaning: "Reversed meaning for Two of Wands.",
    description: "The Two of Wands represents energy related to Fire. This is a minor arcana card."
  },
  {
    id: 24,
    name: "Three of Wands",
    numeral: "III",
    imageFallback: "🔥",
    element: "Fire",
    uprightMeaning: "Upright meaning for Three of Wands.",
    reversedMeaning: "Reversed meaning for Three of Wands.",
    description: "The Three of Wands represents energy related to Fire. This is a minor arcana card."
  },
  {
    id: 25,
    name: "Four of Wands",
    numeral: "IV",
    imageFallback: "🔥",
    element: "Fire",
    uprightMeaning: "Upright meaning for Four of Wands.",
    reversedMeaning: "Reversed meaning for Four of Wands.",
    description: "The Four of Wands represents energy related to Fire. This is a minor arcana card."
  },
  {
    id: 26,
    name: "Five of Wands",
    numeral: "V",
    imageFallback: "🔥",
    element: "Fire",
    uprightMeaning: "Upright meaning for Five of Wands.",
    reversedMeaning: "Reversed meaning for Five of Wands.",
    description: "The Five of Wands represents energy related to Fire. This is a minor arcana card."
  },
  {
    id: 27,
    name: "Six of Wands",
    numeral: "VI",
    imageFallback: "🔥",
    element: "Fire",
    uprightMeaning: "Upright meaning for Six of Wands.",
    reversedMeaning: "Reversed meaning for Six of Wands.",
    description: "The Six of Wands represents energy related to Fire. This is a minor arcana card."
  },
  {
    id: 28,
    name: "Seven of Wands",
    numeral: "VII",
    imageFallback: "🔥",
    element: "Fire",
    uprightMeaning: "Upright meaning for Seven of Wands.",
    reversedMeaning: "Reversed meaning for Seven of Wands.",
    description: "The Seven of Wands represents energy related to Fire. This is a minor arcana card."
  },
  {
    id: 29,
    name: "Eight of Wands",
    numeral: "VIII",
    imageFallback: "🔥",
    element: "Fire",
    uprightMeaning: "Upright meaning for Eight of Wands.",
    reversedMeaning: "Reversed meaning for Eight of Wands.",
    description: "The Eight of Wands represents energy related to Fire. This is a minor arcana card."
  },
  {
    id: 30,
    name: "Nine of Wands",
    numeral: "IX",
    imageFallback: "🔥",
    element: "Fire",
    uprightMeaning: "Upright meaning for Nine of Wands.",
    reversedMeaning: "Reversed meaning for Nine of Wands.",
    description: "The Nine of Wands represents energy related to Fire. This is a minor arcana card."
  },
  {
    id: 31,
    name: "Ten of Wands",
    numeral: "X",
    imageFallback: "🔥",
    element: "Fire",
    uprightMeaning: "Upright meaning for Ten of Wands.",
    reversedMeaning: "Reversed meaning for Ten of Wands.",
    description: "The Ten of Wands represents energy related to Fire. This is a minor arcana card."
  },
  {
    id: 32,
    name: "Page of Wands",
    numeral: "XI",
    imageFallback: "🔥",
    element: "Fire",
    uprightMeaning: "Upright meaning for Page of Wands.",
    reversedMeaning: "Reversed meaning for Page of Wands.",
    description: "The Page of Wands represents energy related to Fire. This is a minor arcana card."
  },
  {
    id: 33,
    name: "Knight of Wands",
    numeral: "XII",
    imageFallback: "🔥",
    element: "Fire",
    uprightMeaning: "Upright meaning for Knight of Wands.",
    reversedMeaning: "Reversed meaning for Knight of Wands.",
    description: "The Knight of Wands represents energy related to Fire. This is a minor arcana card."
  },
  {
    id: 34,
    name: "Queen of Wands",
    numeral: "XIII",
    imageFallback: "🔥",
    element: "Fire",
    uprightMeaning: "Upright meaning for Queen of Wands.",
    reversedMeaning: "Reversed meaning for Queen of Wands.",
    description: "The Queen of Wands represents energy related to Fire. This is a minor arcana card."
  },
  {
    id: 35,
    name: "King of Wands",
    numeral: "XIV",
    imageFallback: "🔥",
    element: "Fire",
    uprightMeaning: "Upright meaning for King of Wands.",
    reversedMeaning: "Reversed meaning for King of Wands.",
    description: "The King of Wands represents energy related to Fire. This is a minor arcana card."
  },
  {
    id: 36,
    name: "Ace of Cups",
    numeral: "I",
    imageFallback: "💧",
    element: "Water",
    uprightMeaning: "Upright meaning for Ace of Cups.",
    reversedMeaning: "Reversed meaning for Ace of Cups.",
    description: "The Ace of Cups represents energy related to Water. This is a minor arcana card."
  },
  {
    id: 37,
    name: "Two of Cups",
    numeral: "II",
    imageFallback: "💧",
    element: "Water",
    uprightMeaning: "Upright meaning for Two of Cups.",
    reversedMeaning: "Reversed meaning for Two of Cups.",
    description: "The Two of Cups represents energy related to Water. This is a minor arcana card."
  },
  {
    id: 38,
    name: "Three of Cups",
    numeral: "III",
    imageFallback: "💧",
    element: "Water",
    uprightMeaning: "Upright meaning for Three of Cups.",
    reversedMeaning: "Reversed meaning for Three of Cups.",
    description: "The Three of Cups represents energy related to Water. This is a minor arcana card."
  },
  {
    id: 39,
    name: "Four of Cups",
    numeral: "IV",
    imageFallback: "💧",
    element: "Water",
    uprightMeaning: "Upright meaning for Four of Cups.",
    reversedMeaning: "Reversed meaning for Four of Cups.",
    description: "The Four of Cups represents energy related to Water. This is a minor arcana card."
  },
  {
    id: 40,
    name: "Five of Cups",
    numeral: "V",
    imageFallback: "💧",
    element: "Water",
    uprightMeaning: "Upright meaning for Five of Cups.",
    reversedMeaning: "Reversed meaning for Five of Cups.",
    description: "The Five of Cups represents energy related to Water. This is a minor arcana card."
  },
  {
    id: 41,
    name: "Six of Cups",
    numeral: "VI",
    imageFallback: "💧",
    element: "Water",
    uprightMeaning: "Upright meaning for Six of Cups.",
    reversedMeaning: "Reversed meaning for Six of Cups.",
    description: "The Six of Cups represents energy related to Water. This is a minor arcana card."
  },
  {
    id: 42,
    name: "Seven of Cups",
    numeral: "VII",
    imageFallback: "💧",
    element: "Water",
    uprightMeaning: "Upright meaning for Seven of Cups.",
    reversedMeaning: "Reversed meaning for Seven of Cups.",
    description: "The Seven of Cups represents energy related to Water. This is a minor arcana card."
  },
  {
    id: 43,
    name: "Eight of Cups",
    numeral: "VIII",
    imageFallback: "💧",
    element: "Water",
    uprightMeaning: "Upright meaning for Eight of Cups.",
    reversedMeaning: "Reversed meaning for Eight of Cups.",
    description: "The Eight of Cups represents energy related to Water. This is a minor arcana card."
  },
  {
    id: 44,
    name: "Nine of Cups",
    numeral: "IX",
    imageFallback: "💧",
    element: "Water",
    uprightMeaning: "Upright meaning for Nine of Cups.",
    reversedMeaning: "Reversed meaning for Nine of Cups.",
    description: "The Nine of Cups represents energy related to Water. This is a minor arcana card."
  },
  {
    id: 45,
    name: "Ten of Cups",
    numeral: "X",
    imageFallback: "💧",
    element: "Water",
    uprightMeaning: "Upright meaning for Ten of Cups.",
    reversedMeaning: "Reversed meaning for Ten of Cups.",
    description: "The Ten of Cups represents energy related to Water. This is a minor arcana card."
  },
  {
    id: 46,
    name: "Page of Cups",
    numeral: "XI",
    imageFallback: "💧",
    element: "Water",
    uprightMeaning: "Upright meaning for Page of Cups.",
    reversedMeaning: "Reversed meaning for Page of Cups.",
    description: "The Page of Cups represents energy related to Water. This is a minor arcana card."
  },
  {
    id: 47,
    name: "Knight of Cups",
    numeral: "XII",
    imageFallback: "💧",
    element: "Water",
    uprightMeaning: "Upright meaning for Knight of Cups.",
    reversedMeaning: "Reversed meaning for Knight of Cups.",
    description: "The Knight of Cups represents energy related to Water. This is a minor arcana card."
  },
  {
    id: 48,
    name: "Queen of Cups",
    numeral: "XIII",
    imageFallback: "💧",
    element: "Water",
    uprightMeaning: "Upright meaning for Queen of Cups.",
    reversedMeaning: "Reversed meaning for Queen of Cups.",
    description: "The Queen of Cups represents energy related to Water. This is a minor arcana card."
  },
  {
    id: 49,
    name: "King of Cups",
    numeral: "XIV",
    imageFallback: "💧",
    element: "Water",
    uprightMeaning: "Upright meaning for King of Cups.",
    reversedMeaning: "Reversed meaning for King of Cups.",
    description: "The King of Cups represents energy related to Water. This is a minor arcana card."
  },
  {
    id: 50,
    name: "Ace of Swords",
    numeral: "I",
    imageFallback: "🗡️",
    element: "Air",
    uprightMeaning: "Upright meaning for Ace of Swords.",
    reversedMeaning: "Reversed meaning for Ace of Swords.",
    description: "The Ace of Swords represents energy related to Air. This is a minor arcana card."
  },
  {
    id: 51,
    name: "Two of Swords",
    numeral: "II",
    imageFallback: "🗡️",
    element: "Air",
    uprightMeaning: "Upright meaning for Two of Swords.",
    reversedMeaning: "Reversed meaning for Two of Swords.",
    description: "The Two of Swords represents energy related to Air. This is a minor arcana card."
  },
  {
    id: 52,
    name: "Three of Swords",
    numeral: "III",
    imageFallback: "🗡️",
    element: "Air",
    uprightMeaning: "Upright meaning for Three of Swords.",
    reversedMeaning: "Reversed meaning for Three of Swords.",
    description: "The Three of Swords represents energy related to Air. This is a minor arcana card."
  },
  {
    id: 53,
    name: "Four of Swords",
    numeral: "IV",
    imageFallback: "🗡️",
    element: "Air",
    uprightMeaning: "Upright meaning for Four of Swords.",
    reversedMeaning: "Reversed meaning for Four of Swords.",
    description: "The Four of Swords represents energy related to Air. This is a minor arcana card."
  },
  {
    id: 54,
    name: "Five of Swords",
    numeral: "V",
    imageFallback: "🗡️",
    element: "Air",
    uprightMeaning: "Upright meaning for Five of Swords.",
    reversedMeaning: "Reversed meaning for Five of Swords.",
    description: "The Five of Swords represents energy related to Air. This is a minor arcana card."
  },
  {
    id: 55,
    name: "Six of Swords",
    numeral: "VI",
    imageFallback: "🗡️",
    element: "Air",
    uprightMeaning: "Upright meaning for Six of Swords.",
    reversedMeaning: "Reversed meaning for Six of Swords.",
    description: "The Six of Swords represents energy related to Air. This is a minor arcana card."
  },
  {
    id: 56,
    name: "Seven of Swords",
    numeral: "VII",
    imageFallback: "🗡️",
    element: "Air",
    uprightMeaning: "Upright meaning for Seven of Swords.",
    reversedMeaning: "Reversed meaning for Seven of Swords.",
    description: "The Seven of Swords represents energy related to Air. This is a minor arcana card."
  },
  {
    id: 57,
    name: "Eight of Swords",
    numeral: "VIII",
    imageFallback: "🗡️",
    element: "Air",
    uprightMeaning: "Upright meaning for Eight of Swords.",
    reversedMeaning: "Reversed meaning for Eight of Swords.",
    description: "The Eight of Swords represents energy related to Air. This is a minor arcana card."
  },
  {
    id: 58,
    name: "Nine of Swords",
    numeral: "IX",
    imageFallback: "🗡️",
    element: "Air",
    uprightMeaning: "Upright meaning for Nine of Swords.",
    reversedMeaning: "Reversed meaning for Nine of Swords.",
    description: "The Nine of Swords represents energy related to Air. This is a minor arcana card."
  },
  {
    id: 59,
    name: "Ten of Swords",
    numeral: "X",
    imageFallback: "🗡️",
    element: "Air",
    uprightMeaning: "Upright meaning for Ten of Swords.",
    reversedMeaning: "Reversed meaning for Ten of Swords.",
    description: "The Ten of Swords represents energy related to Air. This is a minor arcana card."
  },
  {
    id: 60,
    name: "Page of Swords",
    numeral: "XI",
    imageFallback: "🗡️",
    element: "Air",
    uprightMeaning: "Upright meaning for Page of Swords.",
    reversedMeaning: "Reversed meaning for Page of Swords.",
    description: "The Page of Swords represents energy related to Air. This is a minor arcana card."
  },
  {
    id: 61,
    name: "Knight of Swords",
    numeral: "XII",
    imageFallback: "🗡️",
    element: "Air",
    uprightMeaning: "Upright meaning for Knight of Swords.",
    reversedMeaning: "Reversed meaning for Knight of Swords.",
    description: "The Knight of Swords represents energy related to Air. This is a minor arcana card."
  },
  {
    id: 62,
    name: "Queen of Swords",
    numeral: "XIII",
    imageFallback: "🗡️",
    element: "Air",
    uprightMeaning: "Upright meaning for Queen of Swords.",
    reversedMeaning: "Reversed meaning for Queen of Swords.",
    description: "The Queen of Swords represents energy related to Air. This is a minor arcana card."
  },
  {
    id: 63,
    name: "King of Swords",
    numeral: "XIV",
    imageFallback: "🗡️",
    element: "Air",
    uprightMeaning: "Upright meaning for King of Swords.",
    reversedMeaning: "Reversed meaning for King of Swords.",
    description: "The King of Swords represents energy related to Air. This is a minor arcana card."
  },
  {
    id: 64,
    name: "Ace of Pentacles",
    numeral: "I",
    imageFallback: "🪙",
    element: "Earth",
    uprightMeaning: "Upright meaning for Ace of Pentacles.",
    reversedMeaning: "Reversed meaning for Ace of Pentacles.",
    description: "The Ace of Pentacles represents energy related to Earth. This is a minor arcana card."
  },
  {
    id: 65,
    name: "Two of Pentacles",
    numeral: "II",
    imageFallback: "🪙",
    element: "Earth",
    uprightMeaning: "Upright meaning for Two of Pentacles.",
    reversedMeaning: "Reversed meaning for Two of Pentacles.",
    description: "The Two of Pentacles represents energy related to Earth. This is a minor arcana card."
  },
  {
    id: 66,
    name: "Three of Pentacles",
    numeral: "III",
    imageFallback: "🪙",
    element: "Earth",
    uprightMeaning: "Upright meaning for Three of Pentacles.",
    reversedMeaning: "Reversed meaning for Three of Pentacles.",
    description: "The Three of Pentacles represents energy related to Earth. This is a minor arcana card."
  },
  {
    id: 67,
    name: "Four of Pentacles",
    numeral: "IV",
    imageFallback: "🪙",
    element: "Earth",
    uprightMeaning: "Upright meaning for Four of Pentacles.",
    reversedMeaning: "Reversed meaning for Four of Pentacles.",
    description: "The Four of Pentacles represents energy related to Earth. This is a minor arcana card."
  },
  {
    id: 68,
    name: "Five of Pentacles",
    numeral: "V",
    imageFallback: "🪙",
    element: "Earth",
    uprightMeaning: "Upright meaning for Five of Pentacles.",
    reversedMeaning: "Reversed meaning for Five of Pentacles.",
    description: "The Five of Pentacles represents energy related to Earth. This is a minor arcana card."
  },
  {
    id: 69,
    name: "Six of Pentacles",
    numeral: "VI",
    imageFallback: "🪙",
    element: "Earth",
    uprightMeaning: "Upright meaning for Six of Pentacles.",
    reversedMeaning: "Reversed meaning for Six of Pentacles.",
    description: "The Six of Pentacles represents energy related to Earth. This is a minor arcana card."
  },
  {
    id: 70,
    name: "Seven of Pentacles",
    numeral: "VII",
    imageFallback: "🪙",
    element: "Earth",
    uprightMeaning: "Upright meaning for Seven of Pentacles.",
    reversedMeaning: "Reversed meaning for Seven of Pentacles.",
    description: "The Seven of Pentacles represents energy related to Earth. This is a minor arcana card."
  },
  {
    id: 71,
    name: "Eight of Pentacles",
    numeral: "VIII",
    imageFallback: "🪙",
    element: "Earth",
    uprightMeaning: "Upright meaning for Eight of Pentacles.",
    reversedMeaning: "Reversed meaning for Eight of Pentacles.",
    description: "The Eight of Pentacles represents energy related to Earth. This is a minor arcana card."
  },
  {
    id: 72,
    name: "Nine of Pentacles",
    numeral: "IX",
    imageFallback: "🪙",
    element: "Earth",
    uprightMeaning: "Upright meaning for Nine of Pentacles.",
    reversedMeaning: "Reversed meaning for Nine of Pentacles.",
    description: "The Nine of Pentacles represents energy related to Earth. This is a minor arcana card."
  },
  {
    id: 73,
    name: "Ten of Pentacles",
    numeral: "X",
    imageFallback: "🪙",
    element: "Earth",
    uprightMeaning: "Upright meaning for Ten of Pentacles.",
    reversedMeaning: "Reversed meaning for Ten of Pentacles.",
    description: "The Ten of Pentacles represents energy related to Earth. This is a minor arcana card."
  },
  {
    id: 74,
    name: "Page of Pentacles",
    numeral: "XI",
    imageFallback: "🪙",
    element: "Earth",
    uprightMeaning: "Upright meaning for Page of Pentacles.",
    reversedMeaning: "Reversed meaning for Page of Pentacles.",
    description: "The Page of Pentacles represents energy related to Earth. This is a minor arcana card."
  },
  {
    id: 75,
    name: "Knight of Pentacles",
    numeral: "XII",
    imageFallback: "🪙",
    element: "Earth",
    uprightMeaning: "Upright meaning for Knight of Pentacles.",
    reversedMeaning: "Reversed meaning for Knight of Pentacles.",
    description: "The Knight of Pentacles represents energy related to Earth. This is a minor arcana card."
  },
  {
    id: 76,
    name: "Queen of Pentacles",
    numeral: "XIII",
    imageFallback: "🪙",
    element: "Earth",
    uprightMeaning: "Upright meaning for Queen of Pentacles.",
    reversedMeaning: "Reversed meaning for Queen of Pentacles.",
    description: "The Queen of Pentacles represents energy related to Earth. This is a minor arcana card."
  },
  {
    id: 77,
    name: "King of Pentacles",
    numeral: "XIV",
    imageFallback: "🪙",
    element: "Earth",
    uprightMeaning: "Upright meaning for King of Pentacles.",
    reversedMeaning: "Reversed meaning for King of Pentacles.",
    description: "The King of Pentacles represents energy related to Earth. This is a minor arcana card."
  },
];

export const TAROT_DECK: TarotCard[] = [...MAJOR_ARCANA, ...MINOR_ARCANA];

export function pullRandomCards(count: number): { card: TarotCard; isReversed: boolean }[] {
  const deck = [...TAROT_DECK];
  const pulled: { card: TarotCard; isReversed: boolean }[] = [];

  for (let i = 0; i < count; i++) {
    if (deck.length === 0) break;
    const randomIndex = Math.floor(Math.random() * deck.length);
    const card = deck.splice(randomIndex, 1)[0];
    const isReversed = Math.random() > 0.6; // 40% chance of being reversed
    pulled.push({ card, isReversed });
  }

  return pulled;
}

// Deterministic, seedable variant of pullRandomCards so a draw can be encoded in a
// shareable URL (`?seed=...`) and reproduced exactly on revisit.
function hashSeed(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  }
  return h;
}

function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function pullSeededCards(seed: string, count: number): { card: TarotCard; isReversed: boolean }[] {
  const rand = mulberry32(hashSeed(seed));
  const deck = [...TAROT_DECK];
  const pulled: { card: TarotCard; isReversed: boolean }[] = [];

  for (let i = 0; i < count; i++) {
    if (deck.length === 0) break;
    const randomIndex = Math.floor(rand() * deck.length);
    const card = deck.splice(randomIndex, 1)[0];
    const isReversed = rand() > 0.6;
    pulled.push({ card, isReversed });
  }

  return pulled;
}
