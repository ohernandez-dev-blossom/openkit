// OpenKit.tools Service Worker - Auto-updating PWA
const VERSION = '1.0.0';
const CACHE_NAME = `openkit-v${VERSION}`;
const RUNTIME_CACHE = `openkit-runtime-${VERSION}`;
const OFFLINE_URL = '/';

// Assets to cache immediately
const PRECACHE_ASSETS = [
  '/',
  '/favicon.svg',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
];

// Install event - cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  // Activate immediately
  self.skipWaiting();
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE)
          .map((name) => {
            console.log('Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );
  // Take control immediately
  self.clients.claim();
  console.log('Service Worker activated, version:', VERSION);
});

// Fetch event - network-first strategy for pages, cache-first for assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip external requests
  if (url.origin !== self.location.origin) return;
  
  // For navigation requests (pages), use network-first
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache the new version
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // Fallback to cache
          return caches.match(request).then((cached) => {
            return cached || caches.match(OFFLINE_URL);
          });
        })
    );
    return;
  }
  
  // For assets, use cache-first with network fallback
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) {
        // Return cached, but also update cache in background
        fetch(request).then((response) => {
          if (response.ok) {
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, response);
            });
          }
        }).catch(() => {});
        return cached;
      }
      
      // Not in cache, fetch and cache
      return fetch(request).then((response) => {
        if (response.ok) {
          const responseClone = response.clone();
          const cacheName = request.url.match(/\.(js|css|woff2?|png|jpg|jpeg|svg|gif|webp|ico)$/i) 
            ? CACHE_NAME 
            : RUNTIME_CACHE;
          
          caches.open(cacheName).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return response;
      }).catch(() => {
        // If network fails, try to return offline page for navigation
        if (request.mode === 'navigate') {
          return caches.match(OFFLINE_URL);
        }
        throw new Error('Network request failed and no cache available');
      });
    })
  );
});

// Listen for update messages
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
