const CACHE_NAME='energiebruecken-netlify-v2.1-static-20261107';
const SHELL=['./','./index.html','./standalone.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png','./matching.html','./matching.css','./matching-ui.mjs','./matching-engine.mjs','./map-v21.css','./map-v21.mjs'];
const ALLOWED=new Set(SHELL.map(p=>new URL(p,self.registration.scope).pathname));
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(SHELL)));
  self.skipWaiting();
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('energiebruecken-')&&key!==CACHE_NAME).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  const req=event.request;if(req.method!=='GET')return;
  const url=new URL(req.url);if(url.origin!==self.location.origin||!ALLOWED.has(url.pathname))return;
  if(req.mode==='navigate'||url.pathname.endsWith('/index.html')||url.pathname===new URL('./',self.registration.scope).pathname){
    event.respondWith(fetch(req).then(async res=>{if(res.ok){const cache=await caches.open(CACHE_NAME);await cache.put(req,res.clone());}return res;}).catch(async()=>{const cached=await caches.match(req);return cached||caches.match('./index.html');}));
    return;
  }
  event.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(res=>{if(res.ok&&res.type==='basic'){const copy=res.clone();event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.put(req,copy)));}return res;})));
});
