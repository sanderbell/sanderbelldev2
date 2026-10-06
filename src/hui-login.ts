import { handleAuthCallback, getUser, login, acceptInvite, requestPasswordRecovery } from "@netlify/identity";

const form = document.querySelector<HTMLFormElement>("form")!;
const message = document.querySelector<HTMLElement>("#message")!;
let invite: string | null = null;
async function refresh() {
  const user = await getUser();
  document.querySelector<HTMLElement>("#identity")!.hidden = !!user && !invite;
  document.querySelector<HTMLElement>("#pin-group")!.hidden = !user || !!invite;
  document.querySelector<HTMLElement>("#submit")!.textContent = invite ? "Принять приглашение" : user ? "Открыть Huihui" : "Войти";
}
async function init() {
  try {
    const callback = await handleAuthCallback();
    if (callback?.type === "invite") {
      invite = callback.token || null;
      message.textContent = "Создай пароль для подтверждённой учётной записи. PIN Huihui вводится отдельно.";
    }
    await refresh();
  } catch { message.textContent = "Ссылка входа недействительна. Запроси новую."; }
}
form.addEventListener("submit", async event => {
  event.preventDefault();
  const data = new FormData(form);
  message.textContent = "Проверяю доступ…";
  try {
    if (invite) {
      await acceptInvite(invite, String(data.get("password")));
      invite = null;
      await refresh();
      message.textContent = "Учётная запись подтверждена. Теперь введи PIN Huihui.";
      return;
    }
    if (!(await getUser())) await login(String(data.get("email")), String(data.get("password")));
    const pin = String(data.get("pin") || "");
    if (!pin) { await refresh(); message.textContent = "Введи PIN Huihui."; return; }
    const response = await fetch("/hui/unlock", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ pin }) });
    if (!response.ok) throw new Error("Нет доступа или неверный PIN.");
    location.replace("/hui/");
  } catch (error) { message.textContent = error instanceof Error ? error.message : "Не удалось войти."; }
});
document.querySelector("#email-link")!.addEventListener("click", async () => {
  const email = String(new FormData(form).get("email") || "");
  try { await requestPasswordRecovery(email); message.textContent = "Если адрес зарегистрирован, ссылка входа отправлена на почту."; }
  catch { message.textContent = "Не удалось отправить ссылку входа."; }
});
void init();
