import type { Config } from "@netlify/edge-functions";

export default async (request: Request) => {
  const reply = (status: number, value: string) => new Response(value, { status, headers: { "Cache-Control": "no-store" } });
  if (request.method !== "POST") return reply(405, "Method not allowed");
  const expected = Netlify.env.get("MDLB_WEBHOOK_SECRET");
  if (!expected || request.headers.get("x-telegram-bot-api-secret-token") !== expected) return reply(403, "Forbidden");
  const body = await request.text();
  if (body.length > 100000) return reply(413, "Too large");
  let update;
  try { update = JSON.parse(body); } catch { return reply(400, "Invalid update"); }
  const message = update.message;
  const owner = Number(Netlify.env.get("MDLB_OWNER_ID"));
  if (!owner || message?.from?.id !== owner || message?.chat?.id !== owner || message?.chat?.type !== "private") return reply(200, "{}");
  const endpoint = Netlify.env.get("MDLB_MODAL_URL");
  if (!endpoint) return reply(503, "Cloud not configured");
  const upstream = await fetch(endpoint + "/telegram", {
    method: "POST", body,
    headers: { "Content-Type": "application/json", "Modal-Key": Netlify.env.get("HUI_MODAL_KEY") || "", "Modal-Secret": Netlify.env.get("HUI_MODAL_SECRET") || "" },
  });
  return reply(upstream.ok ? 200 : 503, "{}");
};
export const config: Config = { path: "/mdlb/webhook" };
