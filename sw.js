const CACHE='law-exam-2026-11-15-v1';
const FILES=['./','index.html','style.css','app.js','content.js','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('law-exam-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;const u=new URL(event.request.url);if(u.origin!==self.location.origin||!u.href.startsWith(self.registration.scope))return;event.respondWith(caches.open(CACHE).then(async c=>{const hit=await c.match(event.request,{ignoreSearch:true});if(hit)return hit;try{return await fetch(event.request)}catch(e){if(event.request.mode==='navigate')return c.match('index.html');return Response.error()}}))});
