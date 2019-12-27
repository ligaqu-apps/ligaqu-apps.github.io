importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/manifest.html', revision: '1' },
    { url: '/team.html', revision: '1' },
    { url: '/push.html', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/css/materialize-icons.css', revision: '1' },
    { url: '/css/style.css', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/db-ligaqu.js', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/cekServiceWorker.js', revision: '1' },
    { url: '/js/snarkdown.umd.js', revision: '1' },
    { url: '/pages/about.html', revision: '1' },
    { url: '/pages/home.html', revision: '1' },
    { url: '/pages/klasemen.html', revision: '1' },
    { url: '/pages/tanding.html', revision: '1' },
    { url: '/pages/tersimpan.html', revision: '1' },
    { url: '/icons/icon-128x128.png', revision: '1' },
    { url: '/icons/icon-144x144.png', revision: '1' },
    { url: '/icons/icon-152x152.png', revision: '1' },
    { url: '/icons/icon-192x192.png', revision: '1' },
    { url: '/icons/icon-384x384.png', revision: '1' },
    { url: '/icons/icon-512x512.png', revision: '1' },
    { url: '/icons/icon-72x72.png', revision: '1' },
    { url: '/icons/icon-96x96.png', revision: '1' },
    { url: '/icons/icon-32x32.png', revision: '1' },
    { url: '/icons/icon-16x16.png', revision: '1' }
]);

workbox.routing.registerRoute(
    /^https:\/\/api\.football\-data\.org\/v2\//,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'football-data-api',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60, // selama 30 hari
            }),
        ],
    })
);

self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: 'img/icon-48.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});