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
        caches.open('ride-static-v1').then((cache) => {
            return cache.addAll(ursToCatch);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).then((response) => {
            if(response.status === 404){
                return new Response('Whoops, Not found');
            }
            return response;
        }).catch(() => {
            return new Response('That totally failed!');
        })
    );
});