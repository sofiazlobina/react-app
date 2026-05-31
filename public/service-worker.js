const CACHE_NAME = 'react-app-v1';
const OFFLINE_URL = '/offline.html';

const urlsToCache = [
  '/',
  '/index.html',
  '/offline.html',
];

// Установка Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Install');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Активация Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Activate');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Перехват запросов
self.addEventListener('fetch', (event) => {
  // Пропускаем запросы к API
  if (event.request.url.includes('/api/')) {
    event.respondWith(fetchFromNetworkOnly(event.request));
    return;
  }

  // Для остальных ресурсов используем стратегию Cache First
  event.respondWith(fetchFromCacheFirst(event.request));
});

// Стратегия: только сеть (для API)
async function fetchFromNetworkOnly(request) {
  try {
    const response = await fetch(request);
    return response;
  } catch (error) {
    console.log('[SW] Network request failed:', error);
    return new Response(JSON.stringify({
      error: 'Offline',
      message: 'You are offline. Some features are unavailable.'
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Стратегия: сначала кеш (для статики)
async function fetchFromCacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('[SW] Serving from cache:', request.url);
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('[SW] Fetch failed, serving offline page');
    return caches.match(OFFLINE_URL);
  }
}

// Обработка сообщений от приложения
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
