// Variables for cache name and array items to cache for service workers
var version = 'v1::';
const cacheAssets = [
    'index.hmtl',
    'restaurant.html',
    'js/dbhelper.js',
    'js/main.js',
    'js/regsw.js',
    'js/restaurant_info.js',
    'img/1.jpg',
    'img/2.jpg',
    'img/3.jpg',
    'img/4.jpg',
    'img/5.jpg',
    'img/6.jpg',
    'img/7.jpg',
    'img/8.jpg',
    'img/9.jpg',
    'img/10.jpg',
    'img/1.jpg',
    'css/styles.css',
    'css/medium.css',
    'css/large.css',
];

// Call service worker install event and cache files without waiting
self.addEventListener('install', e => {
    e.waitUntil(
        caches
        .open(cacheName)
        .then(cache => {
            cache.addAll(cacheAssets);
        })
        .then(() => self.skipWaiting())
    );
});

// Call activate event and clear old caches
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache != cacheName) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

//Call fetch event from cache when site is offline
self.addEventListener('fetch', e => {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});