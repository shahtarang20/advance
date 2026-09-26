// Minimal Service Worker required for PWA installability.
// Browsers require a service worker with a fetch handler to consider the app a valid PWA and show the native install prompt.

self.addEventListener("install", (e) => {
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (e) => {
  // A simple pass-through fetch handler is enough to pass the PWA install criteria.
  // Explicitly do not call e.respondWith() so it defaults to standard network fetch.
});
