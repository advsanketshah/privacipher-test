var CACHE='ss-v2';
var PAGES=[
  '/',
  '/index.html',
  '/value.html',
  '/portfolio.html',
  '/cases.html',
  '/books.html',
  '/privacipher.html',
  '/resources.html',
  '/experience.html',
  '/certifications.html',
  '/education.html',
  '/testimonials.html',
  '/contact.html',
  '/nav.css',
  '/nav.js',
  '/sanket-photo.webp',
  '/sanket-photo.jpg',
  '/Sanket_Shah_Resume.pdf'
];

self.addEventListener('install',function(e){
  e.waitUntil(
    caches.open(CACHE).then(function(c){return c.addAll(PAGES);}).then(function(){return self.skipWaiting();})
  );
});

self.addEventListener('activate',function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));
    }).then(function(){return self.clients.claim();})
  );
});

self.addEventListener('fetch',function(e){
  // Only handle GET requests for same-origin pages and assets
  if(e.request.method!=='GET') return;
  var url=new URL(e.request.url);
  if(url.origin!==location.origin) return;

  e.respondWith(
    caches.match(e.request).then(function(cached){
      // Serve cached first (instant), then update cache in background
      var network=fetch(e.request).then(function(res){
        if(res.ok){
          var clone=res.clone();
          caches.open(CACHE).then(function(c){c.put(e.request,clone);});
        }
        return res;
      }).catch(function(){return cached;});
      return cached||network;
    })
  );
});
