"use client";

// Real, on-device hand detection using Google's MediaPipe HandLandmarker — this is a mature,
// well-established computer-vision task (unlike palm-*line* reading, which is not something a
// model can do reliably or meaningfully). We use it only to check "is there a hand in this
// photo at all", so a user can't submit an unrelated picture and get a palm reading out of it.
// The model runs entirely in the browser via WASM; the photo itself is never uploaded anywhere.
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";

const WASM_BASE = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm";
const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";

let landmarkerPromise: Promise<HandLandmarker> | null = null;

async function createLandmarker(delegate: "GPU" | "CPU"): Promise<HandLandmarker> {
  const vision = await FilesetResolver.forVisionTasks(WASM_BASE);
  return HandLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: MODEL_URL,
      delegate,
    },
    runningMode: "IMAGE",
    numHands: 1,
    minHandDetectionConfidence: 0.5,
  });
}

function getLandmarker(): Promise<HandLandmarker> {
  if (!landmarkerPromise) {
    // GPU delegate runs noticeably faster (near-instant per-frame inference vs. CPU's heavier
    // cost), which matters for keeping the tour feeling responsive — but it isn't supported in
    // every browser/GPU combination, so fall back to CPU rather than fail outright.
    landmarkerPromise = createLandmarker("GPU").catch(() => createLandmarker("CPU"));
  }
  return landmarkerPromise;
}

/** Kicks off loading the model in the background (WASM + weights) without waiting for it —
 * call this as early as possible (e.g. on mount of the palm-reading tool) so that by the time
 * the user actually takes or picks a photo, detection is instant instead of waiting on a cold
 * model load. Safe to call multiple times; only the first call does any work. */
export function preloadHandDetector(): void {
  void getLandmarker();
}

/** Resolves true if at least one hand is detected in the given image element. */
export async function detectHandInImage(image: HTMLImageElement): Promise<boolean> {
  const landmarker = await getLandmarker();
  const result = landmarker.detect(image);
  return (result.handednesses?.length ?? 0) > 0;
}
