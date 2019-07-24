const cacheName = 'v1';
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

// Call install event
self.addEventListener('install', e => {
    console.log('ServiceWorker: Installed');
    e.waitUntil(
        caches
        .open(cacheName)
        .then(cache => {
            console.log('Service Worker: Caching Files');
            cache.addAll(cacheAssets);
        })
        .then(() => self.skipWaiting())
    );
});

// Call activate event
self.addEventListener('activate', e => {
    console.log('ServiceWorker: Activated');
    // remove old caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache != cacheName) {
                        console.log('Service Worker: Cleasring Old Caches');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

//Call fetch event
self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});