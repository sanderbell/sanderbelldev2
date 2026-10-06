import { handleAuthCallback, getUser, login, logout, acceptInvite, requestPasswordRecovery, updateUser } from "@netlify/identity";

const form = document.querySelector<HTMLFormElement>("#login-form")!;
const message = document.querySelector<HTMLElement>("#message")!;
const submit = document.querySelector<HTMLButtonElement>("#submit")!;
const email = document.querySelector<HTMLInputElement>("#email")!;
const password = document.querySelector<HTMLInputElement>("#password")!;
const pin = document.querySelector<HTMLInputElement>("#pin")!;
const recoveryButton = document.querySelector<HTMLButtonElement>("#email-link")!;
const accountButton = document.querySelector<HTMLButtonElement>("#switch-account")!;
const visibility = document.querySelector<HTMLButtonElement>("#show-password")!;
let invite: string | null = null;
let recovery = false;
let ready = false;
let busy = false;

function feedback(text: string, error = false) {
  message.textContent = text;
  message.dataset.state = error ? "error" : "info";
}
function setBusy(value: boolean) {
  busy = value;
  form.setAttribute("aria-busy", String(value));
  submit.disabled = value || !ready;
  recoveryButton.disabled = value || !ready;
  accountButton.disabled = value || !ready;
}
async function refresh(focus = true) {
  const user = await getUser();
  const creatingPassword = Boolean(invite || recovery);
  const identity = !user || creatingPassword;
  document.querySelector<HTMLElement>("#identity")!.hidden = !identity;
  document.querySelector<HTMLElement>("#email-group")!.hidden = creatingPassword;
  document.querySelector<HTMLElement>("#pin-group")!.hidden = identity;
  accountButton.hidden = identity;
  recoveryButton.hidden = creatingPassword;
  email.disabled = !identity || creatingPassword;
  email.required = identity && !creatingPassword;
  password.disabled = !identity;
  password.required = identity;
  password.minLength = creatingPassword ? 8 : 1;
  password.autocomplete = creatingPassword ? "new-password" : "current-password";
  document.querySelector<HTMLLabelElement>('label[for="password"]')!.textContent = creatingPassword ? "New password" : "Account password";
  pin.disabled = identity;
  pin.required = !identity;
  submit.textContent = invite ? "Accept invitation" : recovery ? "Save new password" : user ? "Open Huihui" : "Sign in";
  document.querySelector<HTMLElement>("#step-label")!.textContent = creatingPassword ? "Set your password" : user ? "Unlock your chat" : "Sign in to continue";
  if (focus && matchMedia("(hover: hover)").matches) (creatingPassword ? password : user ? pin : email).focus();
}
async function init() {
  setBusy(true);
  try {
    const callback = await handleAuthCallback();
    if (!callback) feedback("");
    if (callback?.type === "invite") {
      invite = callback.token || null;
      feedback("Create a password with at least 8 characters for your verified account.");
    } else if (callback?.type === "recovery") {
      recovery = true;
      feedback("Choose a new password with at least 8 characters.");
    }
    await refresh();
  } catch { feedback("This sign-in link is invalid or has expired. Request a new password reset link.", true); await refresh(false); }
  finally { ready = true; setBusy(false); }
}
form.addEventListener("submit", async event => {
  event.preventDefault();
  if (!ready || busy) return;
  feedback("Checking access…");
  setBusy(true);
  try {
    if (invite || recovery) {
      if (invite) await acceptInvite(invite, password.value);
      else await updateUser({password: password.value});
      invite = null; recovery = false; password.value = "";
      await refresh();
      feedback("Password saved. Enter your Huihui PIN.");
      return;
    }
    if (!(await getUser())) {
      await login(email.value.trim(), password.value);
      password.value = "";
      await refresh();
      feedback("Account verified. Enter your Huihui PIN.");
      return;
    }
    const response = await fetch("/hui/unlock", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({pin: pin.value}), signal: AbortSignal.timeout(15000), cache: "no-store",
    });
    if (response.status === 401) {
      await logout(); await refresh();
      feedback("Your session has expired. Please sign in again.", true);
      return;
    }
    if (!response.ok) {
      pin.value = "";
      throw new Error(response.status === 403 ? "Incorrect PIN or access denied. Please try again." : "Access is temporarily unavailable. Please try again.");
    }
    location.replace("/hui/");
  } catch (error) {
    feedback(error instanceof TypeError || (error instanceof DOMException && error.name === "TimeoutError")
      ? "Connection lost. Check your internet connection and try again."
      : error instanceof Error ? error.message : "Could not sign in. Please try again.", true);
  } finally { setBusy(false); }
});
recoveryButton.addEventListener("click", async () => {
  if (busy || !ready) return;
  if (!email.value.trim() || !email.reportValidity()) { email.focus(); feedback("Enter your account email first.", true); return; }
  setBusy(true);
  try { await requestPasswordRecovery(email.value.trim()); feedback("If this email is registered, a password reset link has been sent."); }
  catch { feedback("Could not send the password reset link. Please try again.", true); }
  finally { setBusy(false); }
});
accountButton.addEventListener("click", async () => {
  if (busy) return;
  setBusy(true);
  try {
    await fetch("/hui/lock", {method: "POST", cache: "no-store", signal: AbortSignal.timeout(10000)}).catch(() => {});
    await logout(); pin.value = ""; await refresh(); feedback("");
  } catch { feedback("Could not sign out. Please try again.", true); }
  finally { setBusy(false); }
});
visibility.addEventListener("click", () => {
  const show = password.type === "password";
  password.type = show ? "text" : "password";
  visibility.textContent = show ? "Hide" : "Show";
  visibility.setAttribute("aria-pressed", String(show));
  visibility.setAttribute("aria-label", show ? "Hide password" : "Show password");
});
void init();
