"use client";

import { useEffect, useRef, useState } from "react";

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
  onError: (message: string) => void;
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
        }
        setReady(true);
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
    if (!video || !video.videoWidth) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
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
