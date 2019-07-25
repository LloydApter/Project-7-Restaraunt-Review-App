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

// Call service worker install event and cache files
self.addEventListener('install', e => {
    e.waitUntil(
        caches
        .open(cacheVersion)
        .then(cache => {
            cache.addAll(cacheAssets);
        })
        .then(() => self.skipWaiting())
    );
});

// Call activate event and clear old caches
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(cacheVersions => {
            return Promise.all(
                cacheVersions.map(cache => {
                    if (cache != cacheVersion) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

//Cache falling back to the network, for offline first apps
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
        .then(response => {
            return response || fetch(e.request);
        })
    );
});