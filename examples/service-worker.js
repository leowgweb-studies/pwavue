let cacheName = 'conhecendo-service-worker';
let filesToCache = [
    '/',
    'index.html',
    'styles.css'
];

self.addEventListener('install', function(e){
    console.log('[ServiceWork] Installer');
    e.waitUntil(
        caches.open(cacheName).then(function(cache){
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', function(e){
    console.log('[ServiceWork] Activate');
});

self.addEventListener('fetch', function(e){
    console.log('[ServiceWork] Fetch', e.request.url);
    e.respondWith(   
        caches.match(e.request).then(function(response){
            console.log('[ServiceWork] Get cache for', e.request.url);
            return response || fetch(e.request);
        })
    );
});