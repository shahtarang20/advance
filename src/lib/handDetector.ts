"use client";

// Real, on-device hand detection using Google's MediaPipe HandLandmarker — this is a mature,
// well-established computer-vision task (unlike palm-*line* reading, which is not something a
// model can do reliably or meaningfully). We use it only to check "is there a hand in this
// photo at all", so a user can't submit an unrelated picture and get a palm reading out of it.
// The model runs entirely in the browser via WASM; the photo itself is never uploaded anywhere.
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";

type VisionFileset = Awaited<ReturnType<typeof FilesetResolver.forVisionTasks>>;

const WASM_BASE = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm";
const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";

// Only the WASM runtime fileset is cached/reused — it's the expensive part (a real network
// fetch + WASM instantiation). A *fresh* HandLandmarker is created from it for every single
// detection (see detectHandInImage) rather than reusing one instance across calls: reusing one
// instance was found, through direct testing, to silently degrade after a handful of calls —
// a plain face photo got accepted as a hand on the 3rd–4th detection in the same session, even
// though the exact same photo was correctly rejected as the 1st or 2nd call. That's a real
// statefulness bug in the reused graph, not a tuning problem, and it's exactly the kind of thing
// that would explain "sometimes it just doesn't work" for a real user trying a few photos.
let visionPromise: Promise<VisionFileset> | null = null;

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

function getVisionFileset(): Promise<VisionFileset> {
  if (!visionPromise) {
    visionPromise = withMediaPipeLogsFiltered(() => FilesetResolver.forVisionTasks(WASM_BASE));
  }
  return visionPromise;
}

/** Creates a brand-new HandLandmarker for a single detection — see the comment above
 * `visionPromise` for why this isn't reused across calls. Creating it from the already-resolved
 * `vision` fileset is cheap (no WASM re-instantiation, and the model file is HTTP-cached after
 * the first fetch), so this stays fast despite not caching the landmarker itself. */
async function createLandmarker(): Promise<HandLandmarker> {
  const vision = await getVisionFileset();
  return withMediaPipeLogsFiltered(() =>
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
  );
}

/** Kicks off loading the WASM runtime in the background (the actual slow part) without waiting
 * for it — call this as early as possible (e.g. on mount of the palm-reading tool) so that by
 * the time the user actually takes or picks a photo, creating a fresh landmarker for it is
 * near-instant instead of waiting on a cold WASM load. Safe to call multiple times; only the
 * first call does any work. */
export function preloadHandDetector(): void {
  void getVisionFileset();
}

// Real phone-camera photos are nothing like the small, web-optimized stock images this was
// first verified against — a modern phone shoots 12MP+ (often 3000-4000px on the long edge),
// and JPEGs from a camera commonly carry an EXIF orientation tag rather than physically rotated
// pixel data. Feeding that raw straight to the model is both slow (far more pixels than
// necessary) and less reliable: `new Image()` doesn't reliably honor EXIF orientation across
// browsers/WebViews, so a photo can be handed to the model sideways or upside-down, which
// meaningfully hurts a hand-landmark model's confidence even though a person looking at the
// (correctly displayed) photo sees a normal palm.
const MAX_DETECTION_DIMENSION = 1024;

/** Decodes a photo with EXIF orientation explicitly and correctly applied — `createImageBitmap`
 * with `imageOrientation: "from-image"` is the standards-based, explicit way to guarantee this
 * (unlike relying on an <img> element's implicit, browser-dependent decode behavior) — then
 * downscales it to a size much closer to what the model was actually validated against. Pass
 * the resulting canvas to `detectHandInImage`. */
export async function prepareImageForDetection(dataUrl: string): Promise<HTMLCanvasElement> {
  const blob = await (await fetch(dataUrl)).blob();
  const bitmap = await createImageBitmap(blob, { imageOrientation: "from-image" });
  try {
    const scale = Math.min(1, MAX_DETECTION_DIMENSION / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("2D canvas context unavailable");
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    return canvas;
  } finally {
    bitmap.close();
  }
}

/** Returns a version of `source` with neutral-gray padding added around every edge. A very
 * close-up, edge-to-edge photo of a palm — the natural result of someone photographing their
 * own hand at arm's length, which is exactly what this feature asks for — often has the hand
 * cropped flush against the frame boundary (fingers or wrist cut off). The first-stage palm
 * detector in MediaPipe's pipeline is generally trained on photos with some surrounding
 * context, so a hand with no margin around it can genuinely score lower than the same hand
 * photographed with a bit of room to spare. */
function padCanvas(source: HTMLCanvasElement, paddingRatio: number): HTMLCanvasElement {
  const padX = Math.round(source.width * paddingRatio);
  const padY = Math.round(source.height * paddingRatio);
  const canvas = document.createElement("canvas");
  canvas.width = source.width + padX * 2;
  canvas.height = source.height + padY * 2;
  const ctx = canvas.getContext("2d");
  if (!ctx) return source;
  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(source, padX, padY);
  return canvas;
}

/** Resolves true if at least one hand is detected in the given (already oriented and
 * appropriately-sized — see `prepareImageForDetection`) image. If the direct pass finds
 * nothing, retries once with padding added around the frame (see `padCanvas`) before giving
 * up — this specifically rescues the very common "close-up selfie of my own palm, hand fills
 * the whole frame" case without weakening the check for anything that's genuinely not a hand
 * (a face or a landscape doesn't become a hand just because it gained a gray border). */
export async function detectHandInImage(image: HTMLCanvasElement): Promise<boolean> {
  const landmarker = await createLandmarker();
  try {
    return await withMediaPipeLogsFiltered(() => {
      const direct = landmarker.detect(image);
      if ((direct.handednesses?.length ?? 0) > 0) return true;

      const padded = padCanvas(image, 0.18);
      const retry = landmarker.detect(padded);
      return (retry.handednesses?.length ?? 0) > 0;
    });
  } finally {
    landmarker.close();
  }
}
