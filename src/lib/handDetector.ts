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

function getLandmarker(): Promise<HandLandmarker> {
  if (!landmarkerPromise) {
    landmarkerPromise = (async () => {
      const vision = await FilesetResolver.forVisionTasks(WASM_BASE);
      return HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: MODEL_URL,
          delegate: "CPU",
        },
        runningMode: "IMAGE",
        numHands: 1,
        minHandDetectionConfidence: 0.5,
      });
    })();
  }
  return landmarkerPromise;
}

/** Resolves true if at least one hand is detected in the given image element. */
export async function detectHandInImage(image: HTMLImageElement): Promise<boolean> {
  const landmarker = await getLandmarker();
  const result = landmarker.detect(image);
  return (result.handednesses?.length ?? 0) > 0;
}
