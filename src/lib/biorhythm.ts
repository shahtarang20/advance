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
  
  const dob = new Date(dobString);
  if (isNaN(dob.getTime())) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Calculate days since birth for today
  const msPerDay = 1000 * 60 * 60 * 24;
  
  const days = [];
  
  let todayPhysical = 0;
  let todayEmotional = 0;
  let todayIntellectual = 0;

  // We want a 14 day window (7 days before, today, 6 days after)
  for (let i = -7; i <= 6; i++) {
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + i);
    
    // Exact days lived from birth to target date
    const t = (targetDate.getTime() - dob.getTime()) / msPerDay;
    
    // Sine wave calculation
    const physical = Math.sin((2 * Math.PI * t) / 23) * 100;
    const emotional = Math.sin((2 * Math.PI * t) / 28) * 100;
    const intellectual = Math.sin((2 * Math.PI * t) / 33) * 100;
    
    if (i === 0) {
      todayPhysical = physical;
      todayEmotional = emotional;
      todayIntellectual = intellectual;
    }
    
    days.push({
      date: targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
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
