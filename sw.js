const CACHE_NAME = 'csv-order-manager-v5';
const urlsToCache = [
  './',
  'index.html',
  'index.js',
  'manifest.json',
  'icon.png',
  'https://cdn.tailwindcss.com'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // ใช้ { cache: 'reload' } เพื่อให้แน่ใจว่าได้รับไฟล์เวอร์ชันล่าสุดจากเครือข่ายเสมอ
        const requests = urlsToCache.map(url => new Request(url, { cache: 'reload' }));
        return cache.addAll(requests);
      })
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // กลยุทธ์ Cache-First
        if (cachedResponse) {
          return cachedResponse;
        }

        // หากไม่มีในแคช ให้ดึงจากเครือข่าย
        return fetch(event.request).then(
          networkResponse => {
            // We don't cache opaque responses (e.g. from CDNs without CORS)
            if (!networkResponse || networkResponse.status !== 200) {
              return networkResponse;
            }
            
            // Do not cache the tailwind cdn as it's better fetched live
            if (event.request.url.startsWith('https://cdn.tailwindcss.com')) {
                return networkResponse;
            }

            const responseToCache = networkResponse.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return networkResponse;
          }
        ).catch(error => {
            console.error('Fetching failed:', error);
            // You could return a fallback offline page here.
            throw error;
        });
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});