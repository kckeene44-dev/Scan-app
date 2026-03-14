const CACHE="scannerpos";

self.addEventListener("install",e=>{
e.waitUntil(
caches.open(CACHE).then(cache=>{
return cache.addAll([
"/",
"/index.html",
"/style.css",
"/app.js"
])
})
)
});

self.addEventListener("fetch",e=>{
e.respondWith(
caches.match(e.request).then(r=>{
return r || fetch(e.request)
})
)
});