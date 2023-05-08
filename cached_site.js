const cacheName = 'v1';

self.addEventListener('install', e => {
    console.log('Service Worker: Installed');
});


self.addEventListener('activate', e => {
    console.log('Service Worker: Activated');
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
            cacheNames.map(cache => {
                if (cache !== cacheName) {
                console.log('Service Worker: Clearing Old Cache');
                return caches.delete(cache);
                }
            })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
            return cachedResponse;
        }

        return fetch(event.request).then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
            }

            const responseToCache = response.clone();
            caches.open(cacheName).then(cache => {
            cache.put(event.request, responseToCache);
            });

            return response;
        });
        })
    );
});