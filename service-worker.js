const CACHE_NAME = "kotajyp";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/potensi.html",
  "/pages/visi.html",
  "/pages/sejarah.html",
  "/css/materialize.min.css",
  "/css/style.css",
  "/js/fungsi.js",
  "/js/materialize.min.js",
  "/js/nav.js",
  "assets/icon.png",
  "assets/baseg.jpg",
  "assets/ciberi.jpg",
  "assets/jembatanmerah.jpg",
  "assets/jpr.jpg",
  "assets/jprlandscape.jpg",
  "assets/pasiir6.jpg",
  "assets/apple-icon.jpg",
  "assets/aj.jpg",
  "assets/night.png",
  "assets/jmbtn.jpeg"

];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }
 
        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
