const staticCacheName = 'ride-static-v3';
const dynamicCacheName = 'dynamic-v1';

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

self.addEventListener('install', (event) => {
 

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
                        cacheName !== staticCacheName;
                }).map((cacheName) => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
})


//fetch cache 
self.addEventListener('fetch', event => {

    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request)
                .then(response => caches.open(dynamicCacheName)
                    .then(cache => {
                    cache.put(event.request, response.clone());
                    return response;
                })).catch(() => {
                    console.log('Service Worker error caching and fetching');
                }))
    );

});