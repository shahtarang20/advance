"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { CameraCapture } from "@/components/ui/CameraCapture";
import { useTranslation } from "@/lib/I18nContext";
import type { Hand } from "@/lib/palmistry";
import { detectHandInImage, preloadHandDetector } from "@/lib/handDetector";

const PHOTO_SESSION_KEY = "cosmic-palm-photo";

function loadImage(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = dataUrl;
  });
}

export function PalmistryTool() {
  const [hand, setHand] = useState<Hand>("right");
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const [checkingPhoto, setCheckingPhoto] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
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
    try {
      const img = await loadImage(dataUrl);
      const hasHand = await detectHandInImage(img);
      if (hasHand) {
        setPhotoDataUrl(dataUrl);
      } else {
        setPhotoError(
          t("palmistry.tool.photo_no_hand", {
            defaultValue: "We couldn't find a hand in that photo — please upload a clear photo of an open palm.",
          })
        );
      }
    } catch {
      setPhotoError(
        t("palmistry.tool.photo_check_failed", {
          defaultValue: "Couldn't check that photo — please try a different one, or skip the photo entirely.",
        })
      );
    } finally {
      setCheckingPhoto(false);
    }
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

  const handleCameraCapture = (dataUrl: string) => {
    setCameraOpen(false);
    void validateAndSetPhoto(dataUrl);
  };

  const handleCameraError = (reason: "camera_unavailable" | "blank_frame") => {
    if (reason === "blank_frame") {
      setPhotoError(
        t("palmistry.tool.camera_blank_frame", {
          defaultValue: "That shot came out blank — give the camera a second to focus and try again.",
        })
      );
      return;
    }
    setPhotoError(
      t("palmistry.tool.camera_unavailable", {
        defaultValue: "Couldn't access the camera — check your browser's camera permission, or upload a photo instead.",
      })
    );
  };

  const handleSubmit = () => {
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
    router.push(`/result/palmistry?seed=${seed}&hand=${hand}`);
  };

  return (
    <GlassCard className="mx-auto max-w-xl p-8">
      <div className="space-y-6">
        <div>
          <p className="mb-2 text-sm font-medium text-muted">
            {t("palmistry.tool.photo_label", { defaultValue: "Take or upload a photo of your palm (optional)" })}
          </p>
          {cameraOpen ? (
            <CameraCapture onCapture={handleCameraCapture} onError={handleCameraError} onClose={() => setCameraOpen(false)} />
          ) : (
            <button
              type="button"
              onClick={() => (photoDataUrl || checkingPhoto ? undefined : fileInputRef.current?.click())}
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
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
          />
          {!cameraOpen && (
            <div className="mt-3 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setPhotoError(null);
                  setPhotoDataUrl(null);
                  setCameraOpen(true);
                }}
                disabled={checkingPhoto}
                className="flex-1 rounded-xl border border-[var(--surface-border)] px-4 py-2.5 text-sm font-medium text-muted transition hover:border-[var(--accent-solid)] disabled:opacity-50"
              >
                {t("palmistry.tool.use_camera", { defaultValue: "📷 Take Photo" })}
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={checkingPhoto}
                className="flex-1 rounded-xl border border-[var(--surface-border)] px-4 py-2.5 text-sm font-medium text-muted transition hover:border-[var(--accent-solid)] disabled:opacity-50"
              >
                {t("palmistry.tool.upload_photo", { defaultValue: "Upload Photo" })}
              </button>
            </div>
          )}
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
