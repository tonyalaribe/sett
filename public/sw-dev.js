importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0-alpha.3/workbox-sw.js');

// Note: Ignore the error that Glitch raises about WorkboxSW being undefined.
// const workbox = new WorkboxSW({
//   skipWaiting: true,
//   clientsClaim: true
// });


// workbox.router.registerRoute(
//   new RegExp('^https://hacker-news.firebaseio.com'),
//   workbox.strategies.staleWhileRevalidate()
// );

workbox.precaching.preacheAndRoute([
    '/assets/js/index-bundle.js',
    '/assets/css/main.min.css',
    { url: '/', revision: '383676' },
]);

workbox.routing.registerRoute(
 /\.(?:js|css)$/,
 workbox.strategies.staleWhileRevalidate(),
);


workbox.routing.registerRoute(
 /\.(?:png|gif|jpg|jpeg|svg)$/,
 workbox.strategies.cacheFirst({
   cacheName: 'images',
   plugins: [
     new workbox.expiration.Plugin({
       maxEntries: 60,
       maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
     }),
   ],
 }),
);

self.addEventListener('push', (event) => {
  const title = 'Get Started With Workbox';
  const options = {
    body: event.data.text()
  };
  event.waitUntil(self.registration.showNotification(title, options));
});


workbox.precache([]);
