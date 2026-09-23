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

function createLandmarker(): Promise<HandLandmarker> {
  return FilesetResolver.forVisionTasks(WASM_BASE).then((vision) =>
    HandLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: MODEL_URL,
        // CPU only: the GPU/WebGL delegate was tried briefly for speed, but it's noticeably
        // less reliable on real devices — it let non-palm photos through that the CPU delegate
        // correctly rejects. For a one-shot "is there a hand here" gate, correctness matters
        // far more than the ~tens-of-milliseconds difference, and the real source of any
        // sluggishness was the cold model load anyway, which `preloadHandDetector` below fixes
        // regardless of which delegate is used.
        delegate: "CPU",
      },
      runningMode: "IMAGE",
      numHands: 1,
      // Deliberately strict — this is a hard gate ("reject anything that isn't clearly a hand"),
      // not a best-guess score, so a higher threshold than the library's 0.5 default is correct
      // here even though it means very ambiguous hand photos might occasionally need a retake.
      minHandDetectionConfidence: 0.75,
    })
  );
}

function getLandmarker(): Promise<HandLandmarker> {
  if (!landmarkerPromise) {
    landmarkerPromise = createLandmarker();
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
