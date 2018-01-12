// importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0-alpha.3/workbox-sw.js');

importScripts('https://unpkg.com/workbox-sw@2.0.3/build/importScripts/workbox-sw.dev.v2.0.3.js');


// Note: Ignore the error that Glitch raises about WorkboxSW being undefined.
const workbox = new WorkboxSW({
  // skipWaiting: true,
  clientsClaim: true
});


workbox.router.registerNavigationRoute('index.html', {
  whitelist: [/./],
  blacklist: [],
});
//

workbox.router.registerRoute(
  'https://unpkg.com/tachyons@4.9.0/css/tachyons.min.css',
  workbox.strategies.cacheFirst({
    cacheName: 'css',
    cacheExpiration: {
      maxEntries: 2,
      maxAgeSeconds: 7 * 24 * 60 * 60,
    },
    cacheableResponse: {statuses: [0, 200]},
  }),
);

console.log(workbox)
workbox.router.registerRoute(
 /\.(?:js|css)$/,
 workbox.strategies.networkFirst({networkTimeoutSeconds: 2})
);




// self.addEventListener('push', (event) => {
//   const title = 'Get Started With Workbox';
//   const options = {
//     body: event.data.text()
//   };
//   event.waitUntil(self.registration.showNotification(title, options));
// });

workbox.precache([
  {
    "url": "assets/img/check.svg",
    "revision": "6c2afaaeaad69a5ae17a0d733115da92"
  },
  {
    "url": "assets/img/close.svg",
    "revision": "b7d92306b93e84a8be4b4969701c5518"
  },
  {
    "url": "assets/img/hamburger-menu.svg",
    "revision": "f6d194a7775d13f0660787def48fe866"
  },
  {
    "url": "assets/img/plus.svg",
    "revision": "ca68ee8e24bd6a9c936ca3e51859335c"
  },
  {
    "url": "assets/js/index-bundle.js",
    "revision": "ec9df5687d4409dc457cfb4e676b4908"
  },
  {
    "url": "assets/js/index-bundle.js.map",
    "revision": "49cbfa30c0bf6cbed9591f32026d8d79"
  },
  {
    "url": "index.html",
    "revision": "15c13f223e1b3416fe8581f02db6b2ee"
  },
  {
    "url": "sw-dev.js",
    "revision": "7542fdb91e3082514c8c6807dbc1ea67"
  },
  {
    "url": "sw.js",
    "revision": "7542fdb91e3082514c8c6807dbc1ea67"
  }
]);


// workbox.router.registerRoute(
//  /\.(?:png|gif|jpg|jpeg|svg)$/,
//  workbox.strategies.cacheFirst({
//    cacheName: 'images',
//    cacheExpiration: {
//      maxEntries: 10,
//      maxAgeSeconds: 7 * 24 * 60 * 60,
//    },
//    cacheableResponse: {statuses: [0, 200]},
//  }),
// );
