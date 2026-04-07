self.addEventListener("activate", (event) => {
  // Minimal no-op service worker.
  // This exists to prevent 404s if the browser/previous build tries to load `/sw.js`.
  event.waitUntil(self.clients.claim());
});

