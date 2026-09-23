"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { useTranslation } from "@/lib/I18nContext";
import type { Hand } from "@/lib/palmistry";
import { detectHandInImage, prepareImageForDetection, preloadHandDetector } from "@/lib/handDetector";

const PHOTO_SESSION_KEY = "cosmic-palm-photo";

// With the model preloaded, detection can resolve within a handful of milliseconds — fast
// enough that the "checking" state update and the final result update can both happen inside
// the same microtask flush, with no macrotask boundary for the browser to actually paint in
// between. The result: React processes the state change, but the user's screen never shows
// it — the "Checking your photo…" message effectively never renders. Enforcing a minimum
// visible duration (a real setTimeout, i.e. a genuine macrotask) guarantees a paint happens,
// and doubles as a deliberate, readable moment of feedback rather than an invisible flicker.
const MIN_CHECK_DISPLAY_MS = 600;

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const SCAN_PHASES = [
  { key: "palmistry.scan.phase1", defaultText: "Analyzing hand geometry and elemental shape..." },
  { key: "palmistry.scan.phase2", defaultText: "Isolating major line curvatures..." },
  { key: "palmistry.scan.phase3", defaultText: "Measuring planetary mount prominences..." },
  { key: "palmistry.scan.phase4", defaultText: "Cross-referencing algorithmic patterns..." },
  { key: "palmistry.scan.phase5", defaultText: "Generating life growth timeline..." },
];


export function PalmistryTool() {
  const [hand, setHand] = useState<Hand>("right");
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const [checkingPhoto, setCheckingPhoto] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanPhase, setScanPhase] = useState(0);
  // Two separate <input type="file"> elements rather than an in-app getUserMedia camera view:
  // getUserMedia requires a secure (HTTPS/localhost) context and its own runtime permission
  // grant, and silently fails on plain-HTTP origins (e.g. testing over a LAN IP on a phone) —
  // exactly the kind of environment where "Take Photo" would work for one person and not
  // another. `capture="environment"` opens the device's native camera app directly, using the
  // same OS-level mechanism "Upload Photo" already relies on, so both buttons are equally
  // reliable everywhere. Both still go through the identical hand-detection validation below.
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { t } = useTranslation();

  // Start loading the hand-detection model as soon as this tool is visible, well before the
  // user has picked a photo — by the time they actually submit one, detection runs instantly
  // instead of waiting on a cold model/WASM load, which is what made the first check feel slow.
  useEffect(() => {
    preloadHandDetector();
  }, []);

  const validateAndSetPhoto = async (dataUrl: string) => {
    setPhotoError(null);
    setPhotoDataUrl(null);
    setCheckingPhoto(true);
    const startedAt = Date.now();

    let hasHand = false;
    let failed = false;
    try {
      const canvas = await prepareImageForDetection(dataUrl);
      hasHand = await detectHandInImage(canvas);
    } catch {
      failed = true;
    }

    // Guarantee the "checking" state is actually visible for a moment, however fast the real
    // work finished (see MIN_CHECK_DISPLAY_MS above for why this is necessary, not cosmetic).
    const remaining = MIN_CHECK_DISPLAY_MS - (Date.now() - startedAt);
    if (remaining > 0) await wait(remaining);

    if (failed) {
      setPhotoError(
        t("palmistry.tool.photo_check_failed", {
          defaultValue: "Couldn't check that photo — please try a different one, or skip the photo entirely.",
        })
      );
    } else if (hasHand) {
      setPhotoDataUrl(dataUrl);
    } else {
      setPhotoError(
        t("palmistry.tool.photo_no_hand", {
          defaultValue: "We couldn't find a hand in that photo — please upload a clear photo of an open palm.",
        })
      );
    }
    setCheckingPhoto(false);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // Reset the input so choosing the same rejected file again still fires onChange.
    e.target.value = "";
    if (!file) return;

    const dataUrl: string = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
    await validateAndSetPhoto(dataUrl);
  };

  const handleSubmit = async () => {
    const seed = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    // The photo never leaves the browser — kept only in this tab's sessionStorage, purely so
    // the result page can show it back to you alongside the reading. Nothing is uploaded.
    try {
      if (photoDataUrl) sessionStorage.setItem(PHOTO_SESSION_KEY, photoDataUrl);
      else sessionStorage.removeItem(PHOTO_SESSION_KEY);
    } catch {
      // sessionStorage may be unavailable (private mode, quota) — the reading still works
      // without the photo preview.
    }

    setIsScanning(true);
    for (let i = 0; i < SCAN_PHASES.length; i++) {
      setScanPhase(i);
      await wait(800);
    }
    await wait(400); // Brief pause before redirect

    router.push(`/result/palmistry?seed=${seed}&hand=${hand}`);
  };

  if (isScanning) {
    return (
      <GlassCard className="mx-auto max-w-xl p-8 text-center overflow-hidden relative">
        <div className="absolute inset-0 z-0 opacity-10">
          {photoDataUrl && <img src={photoDataUrl} className="w-full h-full object-cover blur-md" alt="" />}
        </div>
        <div className="relative z-10 space-y-8 py-10">
          <div className="mx-auto h-48 w-48 md:h-56 md:w-56 relative overflow-hidden rounded-full border-4 border-[var(--accent-solid)] shadow-[0_0_30px_rgba(var(--accent-solid-rgb),0.3)]">
            {photoDataUrl ? (
              <img src={photoDataUrl} className="w-full h-full object-cover" alt="" />
            ) : (
              <div className="w-full h-full bg-[var(--surface-border)] flex items-center justify-center text-6xl">✋</div>
            )}
            
            {/* Scanning Laser Animation */}
            <motion.div
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute left-0 right-0 h-1 bg-[var(--accent-solid)] shadow-[0_0_20px_4px_var(--accent-solid)] z-20"
              style={{ top: 0 }}
            />
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-10 opacity-30 mix-blend-overlay"></div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold animate-pulse text-[var(--accent-solid)] mb-3 tracking-wide uppercase text-sm">
              {t("palmistry.scan.title", { defaultValue: "Deep Scan in Progress..." })}
            </h3>
            <p className="text-sm text-muted font-medium min-h-[1.5rem] transition-opacity duration-300">
              {t(SCAN_PHASES[scanPhase].key, { defaultValue: SCAN_PHASES[scanPhase].defaultText })}
            </p>
          </div>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="mx-auto max-w-xl p-8">
      <div className="space-y-6">
        <div>
          <p className="mb-2 text-sm font-medium text-muted">
            {t("palmistry.tool.photo_label", { defaultValue: "Take or upload a photo of your palm (optional)" })}
          </p>
          <button
            type="button"
            onClick={() => (photoDataUrl || checkingPhoto ? undefined : galleryInputRef.current?.click())}
            disabled={checkingPhoto}
            className={`flex h-48 w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed bg-[var(--surface)] transition hover:border-[var(--accent-solid)] ${
              photoError ? "border-rose-500" : "border-[var(--surface-border)]"
            }`}
          >
            {checkingPhoto ? (
              <span className="px-6 text-center text-sm text-muted-soft">
                {t("palmistry.tool.photo_checking", { defaultValue: "Checking your photo…" })}
              </span>
            ) : photoDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- ephemeral client-only preview, never uploaded
              <img src={photoDataUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              <span className="px-6 text-center text-sm text-muted-soft">
                {t("palmistry.tool.photo_placeholder", { defaultValue: "Tap to take a photo or choose one from your device" })}
              </span>
            )}
          </button>
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
          />
          <input ref={galleryInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          <div className="mt-3 flex gap-3">
            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              disabled={checkingPhoto}
              className="flex-1 rounded-xl border border-[var(--surface-border)] px-4 py-2.5 text-sm font-medium text-muted transition hover:border-[var(--accent-solid)] disabled:opacity-50"
            >
              {t("palmistry.tool.use_camera", { defaultValue: "📷 Take Photo" })}
            </button>
            <button
              type="button"
              onClick={() => galleryInputRef.current?.click()}
              disabled={checkingPhoto}
              className="flex-1 rounded-xl border border-[var(--surface-border)] px-4 py-2.5 text-sm font-medium text-muted transition hover:border-[var(--accent-solid)] disabled:opacity-50"
            >
              {t("palmistry.tool.upload_photo", { defaultValue: "Upload Photo" })}
            </button>
          </div>
          {photoError ? (
            <p className="mt-2 text-xs text-rose-500">{photoError}</p>
          ) : (
            <p className="mt-2 text-xs text-muted-soft">
              {t("palmistry.tool.photo_note", {
                defaultValue: "Your photo stays on this device only — it's never uploaded or stored anywhere.",
              })}
            </p>
          )}
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-muted">
            {t("palmistry.tool.hand_label", { defaultValue: "Which hand?" })}
          </p>
          <div className="flex gap-3">
            {(["right", "left"] as Hand[]).map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setHand(h)}
                className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                  hand === h
                    ? "border-[var(--accent-solid)] bg-[var(--accent-solid)]/10 text-[var(--foreground)]"
                    : "border-[var(--surface-border)] text-muted hover:border-[var(--accent-solid)]"
                }`}
              >
                {h === "right"
                  ? t("palmistry.tool.hand_right", { defaultValue: "Right hand" })
                  : t("palmistry.tool.hand_left", { defaultValue: "Left hand" })}
              </button>
            ))}
          </div>
        </div>

        <Button onClick={handleSubmit} disabled={checkingPhoto} className="w-full disabled:cursor-not-allowed disabled:opacity-50">
          {t("palmistry.tool.reveal", { defaultValue: "Reveal My Palm Reading" })}
        </Button>
      </div>
    </GlassCard>
  );
}

export { PHOTO_SESSION_KEY };
