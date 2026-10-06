import type { Context, Config } from "@netlify/edge-functions";

const privacyHeaders = {
  "Cache-Control": "no-store", "CDN-Cache-Control": "no-store", "Netlify-CDN-Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet, noimageindex",
  "X-Content-Type-Options": "nosniff", "X-Frame-Options": "DENY", "Referrer-Policy": "no-referrer",
  "Cross-Origin-Resource-Policy": "same-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  "Content-Security-Policy": "default-src 'self'; img-src 'self' data: blob:; connect-src 'self'; worker-src 'self'; manifest-src 'self'; frame-ancestors 'none'; form-action 'self'; object-src 'none'; base-uri 'self'",
  "Vary": "Cookie",
};
function response(body: BodyInit | null, status = 200, headers: HeadersInit = {}) {
  return new Response(body, { status, headers: { ...privacyHeaders, ...headers } });
}
function cookie(request: Request, name: string) {
  return (request.headers.get("cookie") || "").split(";").map(x => x.trim()).find(x => x.startsWith(name + "="))?.slice(name.length + 1) || "";
}
async function sign(value: string, secret: string) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return Array.from(new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value))), n => n.toString(16).padStart(2, "0")).join("");
}
function equal(a: string, b: string) {
  let mismatch = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) mismatch |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return mismatch === 0;
}

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  // Alternative Netlify origins/previews must never expose the private application.
  if (url.hostname !== "sanderbell.dev") return response("Not found", 404);
  if (url.pathname === "/hui") return response(null, 302, { Location: "/hui/" });
  if (!["GET", "HEAD", "POST"].includes(request.method)) return response("Method not allowed", 405);
  // Only generic sign-in/install metadata is public; it contains no chat data or cloud credentials.
  const publicFiles = new Set(["/hui/login", "/hui/login.html", "/hui/login.js", "/hui/login.css", "/hui/pwa.js", "/hui/pwa.css", "/hui/sw.js", "/hui/manifest.webmanifest", "/hui/icons/icon-192.png", "/hui/icons/icon-512.png", "/hui/icons/icon-maskable-512.png", "/hui/icons/apple-touch-icon.png"]);
  if (publicFiles.has(url.pathname)) {
    if (request.method === "POST") return response("Method not allowed", 405);
    const result = await context.next();
    const headers = new Headers(result.headers);
    for (const [name, value] of Object.entries(privacyHeaders)) headers.set(name, value);
    if (url.pathname === "/hui/manifest.webmanifest") headers.set("Content-Type", "application/manifest+json");
    if (url.pathname === "/hui/sw.js") headers.set("Service-Worker-Allowed", "/hui/");
    return new Response(result.body, { status: result.status, headers });
  }
  if (request.method === "POST" && request.headers.get("origin") !== url.origin) return response("Forbidden", 403);
  const token = cookie(request, "nf_jwt");
  let user: { id: string; email: string; confirmed_at?: string } | null = null;
  if (token) {
    try {
      const verified = await fetch(url.origin + "/.netlify/identity/user", { headers: { Authorization: "Bearer " + token }, cache: "no-store" });
      if (verified.ok) user = await verified.json();
    } catch { return response("Sign-in is temporarily unavailable", 503); }
  }
  const owner = Netlify.env.get("HUI_OWNER_EMAIL");
  if (!user || !user.confirmed_at || user.email.toLowerCase() !== owner?.toLowerCase()) {
    return url.pathname.includes("/api/") || url.pathname.endsWith("/unlock")
      ? response("Unauthorized", 401) : response(null, 302, { Location: "/hui/login" });
  }
  const key = Netlify.env.get("HUI_SESSION_KEY");
  if (!key) return response("Private access is not configured", 503);
  if (url.pathname === "/hui/unlock") {
    if (request.method !== "POST") return response("Method not allowed", 405);
    if (Number(request.headers.get("content-length") || "0") > 1000) return response("Too large", 413);
    const body = await request.json().catch(() => ({}));
    const pin = Netlify.env.get("HUI_PIN");
    if (!pin || !equal(String(body.pin || ""), pin)) return response("Invalid PIN", 403);
    const expires = Math.floor(Date.now() / 1000) + 7 * 24 * 3600;
    const value = `${user.id}.${expires}`;
    const signed = `${value}.${await sign(value, key)}`;
    return response("{}", 200, { "Content-Type": "application/json", "Set-Cookie": `hui_session=${signed}; Path=/hui; HttpOnly; Secure; SameSite=Strict; Max-Age=604800` });
  }
  if (url.pathname === "/hui/lock") {
    if (request.method !== "POST") return response("Method not allowed", 405);
    return response("{}", 200, { "Content-Type": "application/json", "Set-Cookie": "hui_session=; Path=/hui; HttpOnly; Secure; SameSite=Strict; Max-Age=0" });
  }
  const [subject, expiresText, signature] = cookie(request, "hui_session").split(".");
  const expires = Number(expiresText);
  if (subject !== user.id || !Number.isFinite(expires) || expires < Date.now() / 1000
      || !equal(signature || "", await sign(`${subject}.${expiresText}`, key))) {
    return url.pathname.includes("/api/") ? response("Unauthorized", 401) : response(null, 302, { Location: "/hui/login" });
  }
  if (url.pathname.startsWith("/hui/api/")) {
    const allowed = new Map([["/hui/api/chat", "POST"], ["/hui/api/health", "GET"]]);
    if (allowed.get(url.pathname) !== request.method) return response("Not found", 404);
    if (Number(request.headers.get("content-length") || "0") > 24000000) return response("Too large", 413);
    const endpoint = Netlify.env.get("HUI_MODAL_URL");
    const modalKey = Netlify.env.get("HUI_MODAL_KEY");
    const modalSecret = Netlify.env.get("HUI_MODAL_SECRET");
    if (!endpoint || !modalKey || !modalSecret) return response("Cloud is being configured", 503);
    const upstream = await fetch(endpoint + url.pathname.slice(4), {
      method: request.method, body: request.method === "POST" ? request.body : undefined,
      headers: { "Content-Type": "application/json", "Modal-Key": modalKey, "Modal-Secret": modalSecret },
      signal: request.signal,
    });
    return response(upstream.body, upstream.status, { "Content-Type": upstream.headers.get("content-type") || "application/json" });
  }
  const allowedFiles = new Set(["/hui/", "/hui/index.html", "/hui/app.js", "/hui/appearance.js", "/hui/styles.css", "/hui/favicon.svg"]);
  if (!allowedFiles.has(url.pathname)) return response("Not found", 404);
  if (request.method === "POST") return response("Method not allowed", 405);
  const result = await context.next();
  const headers = new Headers(result.headers);
  for (const [name, value] of Object.entries(privacyHeaders)) headers.set(name, value);
  return new Response(result.body, { status: result.status, headers });
};

export const config: Config = { path: ["/hui", "/hui/*"] };
