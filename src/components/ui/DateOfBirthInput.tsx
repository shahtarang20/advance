"use client";

// Plain typeable date field (DD/MM/YYYY) — replaces the native <input type="date">, which pops
// open a calendar picker that many users find awkward for entering a birth date (especially far
// back in years). Internally still emits/accepts the ISO "YYYY-MM-DD" format every calculation
// function and validator in this app already expects, so no downstream code needs to change.

function isoToDisplay(iso: string): string {
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return "";
  return `${d}/${m}/${y}`;
}

function formatTyping(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 8);
  const parts: string[] = [];
  if (digits.length > 0) parts.push(digits.slice(0, Math.min(2, digits.length)));
  if (digits.length > 2) parts.push(digits.slice(2, Math.min(4, digits.length)));
  if (digits.length > 4) parts.push(digits.slice(4, 8));
  return parts.join("/");
}

function displayToIso(display: string): string {
  const digits = display.replace(/\D/g, "");
  if (digits.length < 8) return "";
  const d = digits.slice(0, 2);
  const m = digits.slice(2, 4);
  const y = digits.slice(4, 8);
  return `${y}-${m}-${d}`;
}

export function DateOfBirthInput({
  id,
  value,
  onChange,
  onFocus,
  className = "",
  ariaInvalid,
  ariaDescribedBy,
}: {
  id?: string;
  value: string;
  onChange: (isoValue: string) => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  className?: string;
  ariaInvalid?: boolean;
  ariaDescribedBy?: string;
}) {
  return (
    <input
      id={id}
      type="text"
      inputMode="numeric"
      autoComplete="bday"
      placeholder="DD/MM/YYYY"
      value={isoToDisplay(value) || formatTyping(value)}
      aria-invalid={ariaInvalid}
      aria-describedby={ariaDescribedBy}
      onChange={(e) => {
        const formatted = formatTyping(e.target.value);
        onChange(displayToIso(formatted) || formatted);
      }}
      onFocus={onFocus}
      className={className}
    />
  );
}
