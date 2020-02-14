var cacheName = '-v1';
var cacheFiles = [
    '.sw/',
    '.sw/login.html',
    '.sw/app.js ',
    '.sw/node.js ',
    '.sw/search.html ',
    '.sw/sign_up.html ',
    '.sw/service-worker.js',
    '.sw/manifest.webmanifest',
    '.sw/user_success.html',
    '.sw/style.css',
    
]


self.addEventListener('install', async e => {
    const cache =await caches.open(cacheName);
    await cache.addAll(cacheFiles)
    console.log("[SW] Installed");

    return self.skipWaiting();
});

self.addEventListener('activate', function(e){
    console.log("[ServiceWorker] Activated")

    e.waitUntil(
        caches.keys().then(function(cachesNames) {
            return Promise.all(cachesNames.map(function(thisCacheName){
                if (thisCacheName !== cacheName) {
                    console.log("[ServiceWorker] Removing Cached Files from", thisCacheName);
                    return caches.delete(thisCacheName);
                }
            }));
        })
    );
});

self.addEventListener('fetch', function(e){
    e.respondWith(
        caches.match(e.request).then(cacheRes => {
            return cacheRes || fetch(e.request);
        })
    );
    
});
console.log('service worker loaded');

self.addEventListener('push', e => {
    const data = e.data.json();
    console.log("received push");
    self.ServiceWorkerRegistration.showNotification(data.title, {

        body: "Notified by Martins",
        icon: "./icons/icons-128.png"
    });
});