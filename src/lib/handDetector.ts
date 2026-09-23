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

// MediaPipe's compiled WASM module writes its own internal diagnostics (delegate creation,
// OpenGL capability checks, calculator-graph notices) straight to stderr, which Emscripten
// routes through console.error/console.warn — so Next's dev overlay shows them as if they were
// application errors, even though nothing failed. These exact patterns are long-standing, known
// benign MediaPipe/TFLite log lines (confirmed here by testing detection end-to-end with real
// photos and getting correct results every time); this only filters lines matching them, never
// genuine errors.
const KNOWN_BENIGN_LOG_PATTERNS = [
  /OpenGL error checking is disabled/i,
  /XNNPACK delegate/i,
  /Feedback manager requires a model/i,
  /landmark_projection_calculator/i,
  /inference_feedback_manager/i,
  /gl_context/i,
];

function isKnownBenignMediaPipeLog(args: unknown[]): boolean {
  const text = args.map((a) => String(a)).join(" ");
  return KNOWN_BENIGN_LOG_PATTERNS.some((p) => p.test(text));
}

/** Runs `fn`, temporarily filtering out MediaPipe's own known-benign console noise (see above)
 * without touching genuine errors/warnings from anywhere else. */
async function withMediaPipeLogsFiltered<T>(fn: () => Promise<T> | T): Promise<T> {
  const originalError = console.error;
  const originalWarn = console.warn;
  const originalLog = console.log;
  const filtered =
    (original: typeof console.log) =>
    (...args: unknown[]) => {
      if (isKnownBenignMediaPipeLog(args)) return;
      original(...args);
    };
  console.error = filtered(originalError);
  console.warn = filtered(originalWarn);
  console.log = filtered(originalLog);
  try {
    return await fn();
  } finally {
    console.error = originalError;
    console.warn = originalWarn;
    console.log = originalLog;
  }
}

function createLandmarker(): Promise<HandLandmarker> {
  return withMediaPipeLogsFiltered(() =>
    FilesetResolver.forVisionTasks(WASM_BASE).then((vision) =>
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
        // 0.5 is MediaPipe's own validated default, tuned across a huge range of real-world
        // conditions. A stricter value (0.75) was tried to cut down false positives, but it also
        // rejected genuine palm photos taken in ordinary phone-camera conditions (imperfect
        // lighting/angle/focus) — worse than the problem it was meant to fix.
        minHandDetectionConfidence: 0.5,
        minHandPresenceConfidence: 0.5,
      })
    )
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
  return withMediaPipeLogsFiltered(() => {
    const result = landmarker.detect(image);
    return (result.handednesses?.length ?? 0) > 0;
  });
}
