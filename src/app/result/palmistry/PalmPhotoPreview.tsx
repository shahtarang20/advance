"use client";

import { useEffect, useState } from "react";
import { PHOTO_SESSION_KEY } from "@/app/palmistry/PalmistryTool";

export function PalmPhotoPreview() {
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);

  useEffect(() => {
    try {
      setPhotoDataUrl(sessionStorage.getItem(PHOTO_SESSION_KEY));
    } catch {
      // sessionStorage may be unavailable — just skip the preview.
    }
  }, []);

  if (!photoDataUrl) return null;

  return (
    <div className="mx-auto mb-8 h-40 w-40 overflow-hidden rounded-full border-4 border-[var(--surface-border)]">
      {/* eslint-disable-next-line @next/next/no-img-element -- ephemeral client-only preview from sessionStorage, never uploaded */}
      <img src={photoDataUrl} alt="" className="h-full w-full object-cover" />
    </div>
  );
}
