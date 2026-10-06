import { handleAuthCallback, getUser, login, acceptInvite, requestPasswordRecovery } from "@netlify/identity";

const form = document.querySelector<HTMLFormElement>("form")!;
const message = document.querySelector<HTMLElement>("#message")!;
let invite: string | null = null;
async function refresh() {
  document.querySelector<HTMLInputElement>("#password")!.autocomplete = invite ? "new-password" : "current-password";
  const user = await getUser();
  document.querySelector<HTMLElement>("#identity")!.hidden = !!user && !invite;
  document.querySelector<HTMLElement>("#pin-group")!.hidden = !user || !!invite;
  document.querySelector<HTMLElement>("#submit")!.textContent = invite ? "Accept invitation" : user ? "Open Huihui" : "Sign in";
}
async function init() {
  try {
    const callback = await handleAuthCallback();
    if (callback?.type === "invite") {
      invite = callback.token || null;
      message.textContent = "Create a password for your verified account. Enter the Huihui PIN separately.";
    }
    await refresh();
  } catch { message.textContent = "This sign-in link is invalid or has expired. Request a new one."; }
}
form.addEventListener("submit", async event => {
  event.preventDefault();
  const data = new FormData(form);
  message.textContent = "Checking access…";
  const submit = document.querySelector<HTMLButtonElement>("#submit")!;
  submit.disabled = true;
  try {
    if (invite) {
      await acceptInvite(invite, String(data.get("password")));
      invite = null;
      await refresh();
      message.textContent = "Account verified. Enter your Huihui PIN.";
      return;
    }
    if (!(await getUser())) await login(String(data.get("email")), String(data.get("password")));
    const pin = String(data.get("pin") || "");
    if (!pin) { await refresh(); message.textContent = "Enter your Huihui PIN."; return; }
    const response = await fetch("/hui/unlock", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ pin }) });
    if (!response.ok) throw new Error("Access denied or incorrect PIN.");
    location.replace("/hui/");
  } catch (error) { message.textContent = error instanceof Error ? error.message : "Could not sign in. Please try again."; }
  finally { submit.disabled = false; }
});
document.querySelector("#email-link")!.addEventListener("click", async () => {
  const email = String(new FormData(form).get("email") || "");
  try { await requestPasswordRecovery(email); message.textContent = "If this email is registered, a sign-in link has been sent."; }
  catch { message.textContent = "Could not send the sign-in link. Please try again."; }
});
void init();
