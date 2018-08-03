let staticCacheName = 'ride-static-v3';

self.addEventListener('install', (event) => {
    const ursToCatch = [
        '/',
        '/index.html',
        '/login.html',
        '/signup.html',
        '/js/all_rides.js',
        '/js/cookie_file.js',
        '/js/dialogs.js',
        '/js/login.js',
        '/js/main.js',
        '/js/reusable.js',
        '/js/ride.js',
        '/js/user.js',
        '/css/main.css',
        '/css/responsive.css',
        '/images/bicycle-ride.png'
    ];

    event.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            return cache.addAll(ursToCatch);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter((cacheName) => {
                    return cacheName.startsWith('ride-') && 
                        cacheName != staticCacheName;
                }).map((cacheName) => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
})

self.addEventListener('fetch', (event) => {
    //Respond with an entry from the cache if there is one
    //if there isn't, fetch from the network.
    event.respondWith(
        caches.match(event.request).then((response) => {
            if(response) return response;
            return fetch(event.request);
        })
    );
});