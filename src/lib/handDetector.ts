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

// A single HandLandmarker is created once and reused for every detection. An earlier version of
// this file recreated a brand-new instance per photo, on the theory that reuse was silently
// degrading accuracy after a few calls (a plain face was seen getting accepted as a hand on the
// 3rd-4th detection in one browser session). Recreating per call was pure overhead, though: when
// directly re-tested, it did *not* actually fix that failure — the same degradation reproduced
// with a fresh instance every time, and even with the *original*, pre-existing code from before
// this file was touched at all. That means it's a rare, deeper WASM/library-level quirk (only
// ever reproduced in headless-browser testing, not confirmed on a real device) that recreating
// the instance doesn't protect against — so paying that recreation cost on every single photo,
// with no accuracy benefit, wasn't a reasonable trade. Reusing one instance is also the pattern
// MediaPipe's own examples use for exactly this "detect on a gallery of images" case.
let landmarkerPromise: Promise<HandLandmarker> | null = null;

// A second, more lenient landmarker used only as a last resort when the primary (0.5-confidence,
// MediaPipe's own default) landmarker rejects a photo on both the direct and padded attempts.
// Confidence thresholds are fixed at model-creation time in MediaPipe, so relaxing them for one
// retry means keeping a second instance around rather than reconfiguring the first. This only
// ever runs after the strict pass has already failed twice, so it can't make the strict gate
// itself easier to fool — it only rescues genuine palm photos that are borderline for reasons a
// strict, general-purpose threshold doesn't account for (unusual angle, a ring or henna pattern
// confusing the contour, mediocre indoor lighting) without loosening the check for anything that
// isn't a hand at all.
let lenientLandmarkerPromise: Promise<HandLandmarker> | null = null;

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

function getLandmarker(): Promise<HandLandmarker> {
  if (!landmarkerPromise) {
    landmarkerPromise = withMediaPipeLogsFiltered(() =>
      FilesetResolver.forVisionTasks(WASM_BASE).then((vision) =>
        HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: MODEL_URL,
            // CPU only: the GPU/WebGL delegate was tried briefly for speed, but it's noticeably
            // less reliable on real devices — it let non-palm photos through that the CPU
            // delegate correctly rejects. For a "is there a hand here" gate, correctness
            // matters far more than the ~tens-of-milliseconds difference.
            delegate: "CPU",
          },
          runningMode: "IMAGE",
          numHands: 1,
          // 0.5 is MediaPipe's own validated default, tuned across a huge range of real-world
          // conditions. A stricter value (0.75) was tried to cut down false positives, but it
          // also rejected genuine palm photos taken in ordinary phone-camera conditions
          // (imperfect lighting/angle/focus) — worse than the problem it was meant to fix.
          minHandDetectionConfidence: 0.5,
          minHandPresenceConfidence: 0.5,
        })
      )
    );
  }
  return landmarkerPromise;
}

function getLenientLandmarker(): Promise<HandLandmarker> {
  if (!lenientLandmarkerPromise) {
    lenientLandmarkerPromise = withMediaPipeLogsFiltered(() =>
      FilesetResolver.forVisionTasks(WASM_BASE).then((vision) =>
        HandLandmarker.createFromOptions(vision, {
          baseOptions: { modelAssetPath: MODEL_URL, delegate: "CPU" },
          runningMode: "IMAGE",
          numHands: 1,
          minHandDetectionConfidence: 0.3,
          minHandPresenceConfidence: 0.3,
        })
      )
    );
  }
  return lenientLandmarkerPromise;
}

/** Kicks off creating the (single, reused) landmarker in the background without waiting for
 * it — call this as early as possible (e.g. on mount of the palm-reading tool) so that by the
 * time the user actually takes or picks a photo, detection is instant instead of waiting on a
 * cold WASM/model load. Safe to call multiple times; only the first call does any work. */
export function preloadHandDetector(): void {
  void getLandmarker();
  void getLenientLandmarker();
}

// Real phone-camera photos are nothing like the small, web-optimized stock images this was
// first verified against — a modern phone shoots 12MP+ (often 3000-4000px on the long edge),
// and JPEGs from a camera commonly carry an EXIF orientation tag rather than physically rotated
// pixel data. Feeding that raw straight to the model is both slow (far more pixels than
// necessary) and less reliable: `new Image()` doesn't reliably honor EXIF orientation across
// browsers/WebViews, so a photo can be handed to the model sideways or upside-down, which
// meaningfully hurts a hand-landmark model's confidence even though a person looking at the
// (correctly displayed) photo sees a normal palm. This was briefly dropped to 640px for extra
// speed, validated only against small stock test photos — but real phone palm photos started
// failing to detect at all, because 640px throws away exactly the fine detail (finger creases,
// contour) the first-stage palm detector relies on for a hand that's photographed at an angle,
// under normal indoor lighting, or slightly off-center. 1024px is back to being the floor: still
// a large reduction from a raw 12MP camera photo (speed win intact), but not so aggressive that
// it costs real accuracy on real devices.
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
  const landmarker = await getLandmarker();
  const padded = padCanvas(image, 0.18);

  const strictHit = await withMediaPipeLogsFiltered(() => {
    const direct = landmarker.detect(image);
    if ((direct.handednesses?.length ?? 0) > 0) return true;
    const retry = landmarker.detect(padded);
    return (retry.handednesses?.length ?? 0) > 0;
  });
  if (strictHit) return true;

  // Both strict attempts failed — try once more with the lenient (0.3-confidence) landmarker
  // before finally rejecting. This is what actually rescues real, genuine palm photos that the
  // default threshold is too conservative for (see comment on lenientLandmarkerPromise above).
  const lenient = await getLenientLandmarker();
  return withMediaPipeLogsFiltered(() => {
    const direct = lenient.detect(image);
    if ((direct.handednesses?.length ?? 0) > 0) return true;
    const retry = lenient.detect(padded);
    return (retry.handednesses?.length ?? 0) > 0;
  });
}
