export type MoonPhase = {
  id: string;
  name: string;
  emoji: string;
  description: string;
  manifestationTip: string;
};

const PHASES: MoonPhase[] = [
  {
    id: "new",
    name: "New Moon",
    emoji: "🌑",
    description: "The moon is between the Earth and Sun, appearing invisible.",
    manifestationTip: "A time for new beginnings. Set intentions, plant seeds, and start new projects.",
  },
  {
    id: "waxing_crescent",
    name: "Waxing Crescent",
    emoji: "🌒",
    description: "A small sliver of light appears on the right side.",
    manifestationTip: "Focus on building momentum. Take the first steps toward your new intentions.",
  },
  {
    id: "first_quarter",
    name: "First Quarter",
    emoji: "🌓",
    description: "The right half of the moon is illuminated.",
    manifestationTip: "Action time! Overcome obstacles and make decisive choices to push forward.",
  },
  {
    id: "waxing_gibbous",
    name: "Waxing Gibbous",
    emoji: "🌔",
    description: "More than half of the right side is illuminated.",
    manifestationTip: "Refine and adjust your plans. Trust the process and stay committed.",
  },
  {
    id: "full",
    name: "Full Moon",
    emoji: "🌕",
    description: "The moon is fully illuminated, its energy at its peak.",
    manifestationTip: "A time of culmination and intense energy. Celebrate successes and release what no longer serves you.",
  },
  {
    id: "waning_gibbous",
    name: "Waning Gibbous",
    emoji: "🌖",
    description: "The illumination begins to shrink on the right side.",
    manifestationTip: "Express gratitude. Harvest your efforts and share your wisdom with others.",
  },
  {
    id: "last_quarter",
    name: "Last Quarter",
    emoji: "🌗",
    description: "The left half of the moon is illuminated.",
    manifestationTip: "Forgive, let go, and clear physical and mental space. Tie up loose ends.",
  },
  {
    id: "waning_crescent",
    name: "Waning Crescent",
    emoji: "🌘",
    description: "A small sliver of light remains on the left side.",
    manifestationTip: "Rest, reflect, and restore your energy. Prepare for the next cycle.",
  }
];

export function getCurrentMoonPhase(date: Date = new Date()): MoonPhase {
  // Known New Moon: Jan 6, 2000, 12:24:01 UTC
  const LUNAR_MONTH = 29.53058867; // Days
  const knownNewMoon = new Date("2000-01-06T12:24:01Z").getTime();
  
  const diffMs = date.getTime() - knownNewMoon;
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  
  const phaseDays = diffDays % LUNAR_MONTH;
  const phaseRatio = (phaseDays + LUNAR_MONTH) % LUNAR_MONTH / LUNAR_MONTH; 
  
  // 8 phases, each taking up ~1/8th of the cycle (0.125)
  let index = Math.round(phaseRatio * 8);
  if (index >= 8) index = 0;
  
  return PHASES[index];
}
