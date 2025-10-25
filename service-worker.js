// Instalación del Service Worker y almacenamiento en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('lopesan-v1').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/hotel-lopesan.png',
        '/style.css'
      ]);
    })
  );
});

// Activación y limpieza de cachés antiguas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== 'lopesan-v1') {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Interceptar peticiones y servir desde caché
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
