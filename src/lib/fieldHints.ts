"use client";

import { useEffect, useState } from "react";

/** Shows a field's tap-hand hint on its first two encounters (page loads where the field was
 * still empty/untouched), then stops for good — matching the same "first couple of times, then
 * get out of the way" idea already used for the language/hamburger nav hints, applied per input
 * field instead of per nav button. Each field gets its own counter, keyed by a caller-supplied
 * id, so unrelated fields never affect each other's count. */
export function useFieldHint(fieldId: string) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const key = `cosmic-field-hint-count-${fieldId}`;
    let count = 0;
    try {
      count = parseInt(window.localStorage.getItem(key) || "0", 10) || 0;
    } catch {
      // localStorage unavailable — default to showing once, harmlessly, rather than crashing.
    }
    if (count >= 2) return;
    setShow(true);
    try {
      window.localStorage.setItem(key, String(count + 1));
    } catch {
      // Best-effort only.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fieldId is a stable id per call site
  }, []);

  // Called on the field's own focus/first interaction — dismisses the hint immediately rather
  // than waiting for the animation to just sit there behind whatever the user is now typing.
  const dismiss = () => setShow(false);

  return { show, dismiss };
}
