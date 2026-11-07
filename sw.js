const CACHE_NAME='energiebruecken-netlify-v2-static-1';
const SHELL=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png','./matching.html','./matching.css','./matching-ui.mjs','./matching-engine.mjs'];
const ALLOWED=new Set(SHELL.map(p=>new URL(p,self.registration.scope).pathname));
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(SHELL)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('energiebruecken-')&&k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const req=e.request;if(req.method!=='GET')return;const url=new URL(req.url);if(url.origin!==self.location.origin||!ALLOWED.has(url.pathname))return;e.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(res=>{if(res.ok&&res.type==='basic'){const copy=res.clone();e.waitUntil(caches.open(CACHE_NAME).then(c=>c.put(req,copy)));}return res;})));});
