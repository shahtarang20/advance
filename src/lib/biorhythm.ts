export type BiorhythmDay = {
  date: string;
  physical: number;
  emotional: number;
  intellectual: number;
};

export type BiorhythmData = {
  days: BiorhythmDay[];
  todayPhysical: number;
  todayEmotional: number;
  todayIntellectual: number;
};

export function calculateBiorhythms(dobString: string): BiorhythmData | null {
  if (!dobString) return null;
  
  // Extract pure YYYY-MM-DD to avoid timezone offset shifts during parsing
  const parts = dobString.split("-");
  if (parts.length !== 3) return null;
  const [year, month, day] = parts.map(Number);
  
  // Exact UTC midnight for birth date
  const dobUTC = Date.UTC(year, month - 1, day);
  if (isNaN(dobUTC)) return null;

  const now = new Date();
  // Exact UTC midnight for 'today' in the user's local timezone
  const todayUTC = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  
  const msPerDay = 1000 * 60 * 60 * 24;
  const days = [];
  
  let todayPhysical = 0;
  let todayEmotional = 0;
  let todayIntellectual = 0;

  // 14 day window (7 days before, today, 6 days after)
  for (let i = -7; i <= 6; i++) {
    // Target date in UTC midnight
    const targetUTC = todayUTC + (i * msPerDay);
    
    // Exact mathematical days lived (integer, no DST fractional drift)
    const t = (targetUTC - dobUTC) / msPerDay;
    
    // Pure Sine wave calculation
    const physical = Math.sin((2 * Math.PI * t) / 23) * 100;
    const emotional = Math.sin((2 * Math.PI * t) / 28) * 100;
    const intellectual = Math.sin((2 * Math.PI * t) / 33) * 100;
    
    if (i === 0) {
      todayPhysical = physical;
      todayEmotional = emotional;
      todayIntellectual = intellectual;
    }
    
    // Formatting the target date back to local string for display
    const displayDate = new Date(targetUTC);
    // Adjust back to local timezone for the label only
    displayDate.setMinutes(displayDate.getMinutes() + displayDate.getTimezoneOffset());

    days.push({
      date: displayDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      physical: Math.round(physical),
      emotional: Math.round(emotional),
      intellectual: Math.round(intellectual),
    });
  }
  
  return {
    days,
    todayPhysical: Math.round(todayPhysical),
    todayEmotional: Math.round(todayEmotional),
    todayIntellectual: Math.round(todayIntellectual)
  };
}
