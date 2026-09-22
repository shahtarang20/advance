// Lightweight, dependency-free input validation shared across the calculator tools.
// Keeps error copy calm and specific — no ALL CAPS, no alarming language.

const MIN_YEAR = 1900;

/** Returns an error message if the name is unusable for numerology math, otherwise null. */
export function validateName(name: string): string | null {
  const trimmed = name.trim();
  if (!trimmed) return "Please enter a name.";
  if (!/[a-zA-Z]/.test(trimmed)) return "Please include at least one letter — numbers alone can't be calculated.";
  return null;
}

/** Returns an error message if the date of birth is invalid, in the future, or unreasonably old. */
export function validateDob(dob: string): string | null {
  if (!dob) return "Please enter a date of birth.";
  const parsed = new Date(`${dob}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return "That date doesn't look valid.";

  const year = Number(dob.slice(0, 4));
  if (year < MIN_YEAR) return `Please enter a year of ${MIN_YEAR} or later.`;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (parsed.getTime() > today.getTime()) return "Date of birth can't be in the future.";

  return null;
}
