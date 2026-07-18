const CACHE_PREFIX = 'czech-mn-offline';
const CACHE_NAME = `${CACHE_PREFIX}-v1`;
const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/czech-flag.svg',
];

function isSameOrigin(request) {
  return new URL(request.url).origin === self.location.origin;
}

function isCacheableResponse(response) {
  return response && response.ok && response.type !== 'opaque';
}

async function putInCache(request, response) {
  if (!isCacheableResponse(response)) return;
  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, response.clone());
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
          .map((key) => caches.delete(key)),
      ))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET' || !isSameOrigin(request)) return;

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        await putInCache('/index.html', response);
        return response;
      } catch {
        return (await caches.match('/index.html')) || (await caches.match('/'));
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;

    try {
      const response = await fetch(request);
      await putInCache(request, response);
      return response;
    } catch {
      return cached || Response.error();
    }
  })());
});
