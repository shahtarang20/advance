"use client";

import { useEffect, useRef, useState } from "react";

/** Samples a downscaled copy of the frame and flags it as blank if brightness is near-uniform
 * (all black, all one color) — the signature of a not-yet-decoded or lens-covered frame. */
function isLikelyBlankFrame(ctx: CanvasRenderingContext2D, width: number, height: number): boolean {
  const sampleSize = 32;
  const sampleCanvas = document.createElement("canvas");
  sampleCanvas.width = sampleSize;
  sampleCanvas.height = sampleSize;
  const sampleCtx = sampleCanvas.getContext("2d");
  if (!sampleCtx) return false;
  sampleCtx.drawImage(ctx.canvas, 0, 0, width, height, 0, 0, sampleSize, sampleSize);
  const { data } = sampleCtx.getImageData(0, 0, sampleSize, sampleSize);

  let sum = 0;
  let sumSq = 0;
  const count = sampleSize * sampleSize;
  for (let i = 0; i < data.length; i += 4) {
    const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
    sum += brightness;
    sumSq += brightness * brightness;
  }
  const mean = sum / count;
  const variance = sumSq / count - mean * mean;

  // Near-zero variance means almost every sampled pixel is the same brightness — a blank,
  // solid-color, or lens-covered frame. Real photos of anything (including a palm) have far
  // more variation than this.
  return variance < 4 || mean < 3;
}

/**
 * In-app live camera capture using getUserMedia — gives an actual "take photo from within the
 * app" experience (a live preview + shutter button) rather than just handing off to the OS
 * camera app via <input capture>, which is the only option on many desktop browsers anyway.
 * The video stream and captured frame never leave the device; nothing is uploaded here.
 */
export function CameraCapture({
  onCapture,
  onError,
  onClose,
}: {
  onCapture: (dataUrl: string) => void;
  onError: (reason: "camera_unavailable" | "blank_frame") => void;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function start() {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error("getUserMedia unsupported");
        }
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          // `play()` resolving only means playback started, not that a real frame has been
          // decoded yet — capturing too early can grab a blank/black frame, which is a
          // degenerate input the hand-detection model wasn't designed for and can misread as a
          // "hand" (unlike a genuinely blank upload, which it correctly rejects). Wait for an
          // actual decoded frame (readyState >= HAVE_CURRENT_DATA) before allowing capture.
          if (videoRef.current.readyState < 2) {
            await new Promise<void>((resolve) => {
              const video = videoRef.current;
              if (!video) return resolve();
              video.addEventListener("loadeddata", () => resolve(), { once: true });
            });
          }
        }
        if (!cancelled) setReady(true);
      } catch {
        onError("camera_unavailable");
        onClose();
      }
    }

    start();

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- start/stop only on mount/unmount
  }, []);

  const handleCapture = () => {
    const video = videoRef.current;
    if (!video || !video.videoWidth || video.readyState < 2) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Defense-in-depth: a blank/near-black frame (camera warming up, permission race, covered
    // lens) is a degenerate input the hand-detection model wasn't designed for and can
    // misclassify — reject it here before it ever reaches the model, rather than trusting the
    // model to correctly say "no hand" on garbage pixels.
    if (isLikelyBlankFrame(ctx, canvas.width, canvas.height)) {
      onError("blank_frame");
      return;
    }

    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    onCapture(dataUrl);
  };

  return (
    <div className="flex h-48 w-full flex-col overflow-hidden rounded-2xl border-2 border-[var(--accent-solid)] bg-black">
      <div className="relative flex-1">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption -- live camera preview, no audio track */}
        <video ref={videoRef} playsInline muted className="h-full w-full object-cover" />
      </div>
      <div className="flex shrink-0 items-center justify-center gap-3 bg-black/60 p-2">
        <button
          type="button"
          onClick={handleCapture}
          disabled={!ready}
          className="btn-tap rounded-full bg-white px-5 py-2 text-sm font-medium text-black disabled:opacity-50"
        >
          📸
        </button>
        <button
          type="button"
          onClick={() => {
            streamRef.current?.getTracks().forEach((t) => t.stop());
            onClose();
          }}
          className="btn-tap rounded-full border border-white/40 px-4 py-2 text-sm text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
