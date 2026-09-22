"use client";

import { useState } from "react";
import { NakshatraInfo } from "@/lib/nakshatra";
import { useGamification } from "@/lib/gamification";
import { Button } from "@/components/ui/Button";
import { ShareButtons } from "@/components/ShareButtons";

export function NakshatraSelect({ info }: { info: NakshatraInfo }) {
  const { recordAction } = useGamification();
  const [selected, setSelected] = useState(false);

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const shareUrl = `${origin}/nakshatra/${info.slug}`;
  const ogQuery = `type=nakshatra&title=${encodeURIComponent(info.name)}&subtitle=${encodeURIComponent(`Ruled by ${info.rulingPlanet}`)}&big=${encodeURIComponent("✦")}`;

  if (!selected) {
    return (
      <div className="mt-6 text-center">
        <p className="mb-3 text-xs text-muted-soft">
          Already know this is your Nakshatra from a Vedic birth chart or priest?
        </p>
        <Button
          onClick={() => {
            setSelected(true);
            recordAction("nakshatra_select");
          }}
        >
          This is my Nakshatra ✦
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4 text-center">
      <p className="text-sm text-muted">
        {info.name} is now set as your Nakshatra. Share your reading below.
      </p>
      <ShareButtons
        shareUrl={shareUrl}
        ogQuery={ogQuery}
        caption={`My Nakshatra is ${info.name}, ruled by ${info.rulingPlanet} — from Cosmic Numbers. Find yours:`}
      />
    </div>
  );
}
