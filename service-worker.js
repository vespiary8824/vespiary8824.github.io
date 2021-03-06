const CACHE_NAME = 'sw-cache-example';
const toCache = [
	'/',
	'/index.html',
	'/manifest.json',
	'/js/pwa.js',
	'/js/status.js',
	'/images/icons/icon-152x152.png',
	'/images/icons/icon-57x57.png',
	'/images/h1_logo.png'
];

self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then(function (cache) {
				return cache.addAll(toCache)
			})
			.then(self.skipWaiting())
	)
})

self.addEventListener('fetch', function (event) {
	event.respondWith(
		fetch(event.request)
			.catch(() => {
				return caches.open(CACHE_NAME)
					.then((cache) => {
						return cache.match(event.request)
					})
			})
	)
})

self.addEventListener('activate', function (event) {
	event.waitUntil(
		caches.keys()
			.then((keyList) => {
				return Promise.all(keyList.map((key) => {
					if (key !== CACHE_NAME) {
						console.log('[ServiceWorker] Removing old cache', key)
						return caches.delete(key)
					}
				}))
			})
			.then(() => self.clients.claim())
	)
})
