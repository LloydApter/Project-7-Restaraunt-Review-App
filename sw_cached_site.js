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
    'data/restaurants.json',
    'css/styles.css',
    'css/medium.css',
    'css/large.css',
];

// Call activate event
self.addEventListener('activate', e => {
    // remove old caches
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

//Call fetch event to update content of site from server
self.addEventListener('fetch', e => {
    e.respondWith(
        //Check cache first for content
        caches.match(e.request)
        .then(response => {
            //Make clone of response
            const resClone = resonse.clone();
            //Open cache
            caches
                .open(cacheVersion)
                .then(cache => {
                    //Add response from server to browser cache
                    cache.put(e.request, resClone);
                });
            return response || fetch(e.request);
            //Call fetch event from cache when site is offline
            // }).catch(err => caches.match(e.request).then(response => response))
        })
    );
});