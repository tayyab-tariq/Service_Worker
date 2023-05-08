const cacheName = 'v2';

const cacheAssets = [
    'home.html',
    'about.html',
    '/css/styles.css',
    '/js/main.js'
];

self.addEventListener('install', e => {
    console.log('Service Worker: Installed');

    e.waitUntil(
        caches
        .open(cacheName)
        .then(cache => {
            console.log('Service Worker: Caching Files');
            return cache.addAll(cacheAssets);
        })
        .then(() => {
            console.log('Service Worker: Files Cached');
            return self.skipWaiting();
        })
        .catch(error => {
            console.error('Service Worker: Failed to cache files:', error);
        })
    );
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

self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))                   //      if live service fails, it loads from cache
    );
})
