const CACHE_NAME = "foundu-v1";

const APP_SHELL = [
  "./",
  "./index.html",
  "./login.html",
  "./register.html",
  "./dashboard.html",
  "./search.html",
  "./item-details.html",
  "./my-reports.html",
  "./profile.html",
  "./report-lost.html",
  "./report-found.html",
  "./manifest.json",
  "./css/style.css",
  "./css/components.css",
  "./css/responsive.css",
  "./js/scripts.js",
  "./js/language.js",
  "./js/auth.js",
  "./js/auth-guard.js",
  "./js/guest-guard.js",
  "./js/dashboard.js",
  "./js/item-details.js",
  "./js/my-reports.js",
  "./js/profile.js",
  "./js/report-found.js",
  "./js/report-lost.js",
  "./js/search.js",
  "./js/firebase.js",
  "./images/logo.png",
  "./images/icon-192.png",
  "./images/icon-512.png",
  "./images/kbu%20building.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") return;

  // Let Firebase, Google Fonts, Font Awesome, Cloudinary, etc. use the network.
  if (new URL(request.url).origin !== self.location.origin) return;

  // Network-first for HTML so users receive the newest page when online.
  if (request.mode === "navigate" || request.destination === "document") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match("./index.html")))
    );
    return;
  }

  // Cache-first for local static assets.
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request).then((response) => {
        if (response && response.status === 200 && response.type === "basic") {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
