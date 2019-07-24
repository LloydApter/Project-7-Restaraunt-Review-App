const cacheName = 'v2';
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
    e.respondWith(
        fetch(e.request)
        .then(res => {
            //Make copy/clone of response
            const resClone = res.clone();
            //Open cache
            caches
            .open(cacheName)
            .then(cache => {
                //Add response to cache
                cache.put(e.request, resClone);
            });
            return res;
        }).catch(err => caches.match(e.request).then(res => res))
    )
});