const CACHE = "plex-premium-v31";
const OFFLINE_URL = "/offline.html";
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE).then(cache =>
      cache.addAll([
        OFFLINE_URL,
        "/manifest.webmanifest",
        "/plex-premium/icon-512.png",
        "/plex-premium/icon-1024.png",
        "/plex-premium/splash.png"
      ])
    )
  );
  self.skipWaiting();
});
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const copy = response.clone();
        caches.open(CACHE)
          .then(cache => cache.put(event.request, copy))
          .catch(() => {});
        return response;
      })
      .catch(() =>
        caches.match(event.request)
          .then(response =>
            response || caches.match(OFFLINE_URL)
          )
      )
  );
});
