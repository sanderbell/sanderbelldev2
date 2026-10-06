// Network-only private PWA. Never cache pages, chat requests, responses, or images.
const privacyHeaders = {"Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet", "X-Content-Type-Options": "nosniff"};
const offline = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="robots" content="noindex,nofollow"><meta name="theme-color" content="#101013"><title>Huihui · Offline</title><style>body{margin:0;min-height:100dvh;display:grid;place-items:center;background:#101013;color:#ededf0;font:16px/1.6 system-ui;padding:24px;box-sizing:border-box}main{max-width:340px}h1{font-size:28px}p{color:#9a98a3}a{color:#c6f35b}</style><main><h1>You're offline.</h1><p>Reconnect to open your private chat. Cloud replies require an internet connection.</p><a href="/hui/">Try again</a></main></html>`;
self.addEventListener("install", event => event.waitUntil(self.skipWaiting()));
self.addEventListener("activate", event => event.waitUntil((async () => {
  // Only remove caches owned by Huihui; other apps on this origin are untouched.
  for (const name of await caches.keys()) if (name.startsWith("huihui-pwa-")) await caches.delete(name);
  await self.clients.claim();
})()));
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith("/hui/")) return;
  event.respondWith(fetch(event.request, {cache: "no-store"}).catch(() => {
    if (event.request.mode === "navigate") return new Response(offline, {status: 503, headers: {...privacyHeaders, "Content-Type": "text/html; charset=utf-8", "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'"}});
    return new Response('{"error":"You are offline. Reconnect and try again."}', {status: 503, headers: {...privacyHeaders, "Content-Type": "application/json"}});
  }));
});
