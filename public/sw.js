// Choose a cache name
const cacheName = 'cache-v1';

// List the files to precache
const precacheResources = ['/', '/offline', '/styles/globals.css'];

// When the service worker is installed, open a new cache and add all files to it
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(precacheResources);
    }),
  );
});

// When a new service worker is activated, remove any old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        }),
      );
    }),
  );
});

// When the browser fetches a URL, try to fetch it from the network.
// If the network fails, try to get it from the cache.
// If it's not in the cache, show the offline page.
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          return caches.open(cacheName).then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
        .catch(() => {
          return caches.match(event.request).then((response) => {
            return response || caches.match('/offline');
          });
        }),
    );
  } else {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    )
  }
});
