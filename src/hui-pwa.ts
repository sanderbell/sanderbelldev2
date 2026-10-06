import {getUser, logout} from "@netlify/identity";

type InstallPrompt = Event & {prompt(): Promise<void>; userChoice: Promise<{outcome: string}>};
let installPrompt: InstallPrompt | null = null;
const standalone = matchMedia("(display-mode: standalone)");
function renderInstall() {
  const installed = standalone.matches || Boolean((navigator as Navigator & {standalone?: boolean}).standalone);
  document.querySelectorAll<HTMLElement>("[data-pwa-install]").forEach(button => { button.hidden = installed; });
}
window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault(); installPrompt = event as InstallPrompt; renderInstall();
});
window.addEventListener("appinstalled", () => {
  installPrompt = null;
  document.querySelectorAll<HTMLElement>("[data-pwa-install]").forEach(button => { button.hidden = true; });
});
standalone.addEventListener("change", renderInstall);
function showGuide() {
  const ru = document.documentElement.lang === "ru";
  const copy = ru ? {
    title: "Установить Huihui", ios: "Открой меню «Поделиться» и выбери «На экран Домой». Если доступно, оставь включённым «Открывать как веб-приложение».",
    mac: "Нажми значок установки в браузере. В Safari выбери «Файл → Добавить в Dock».",
    other: "Открой меню браузера и выбери «Установить приложение» или «Добавить на главный экран».",
    detail: "Открывай Huihui через отдельную иконку. Для входа нужны подтверждённый аккаунт и PIN. Для облачных ответов нужен интернет.", close: "Понятно",
  } : {
    title: "Install Huihui", ios: "Open the Share menu, then choose Add to Home Screen. Keep Open as Web App enabled if offered.",
    mac: "Use your browser's install icon. In Safari, choose File → Add to Dock.",
    other: "Open your browser's menu, then choose Install app or Add to Home Screen.",
    detail: "Open Huihui from its own icon. Your verified account and PIN are still required. An internet connection is needed for cloud replies.", close: "Got it",
  };
  let guide = document.querySelector<HTMLDialogElement>("#pwa-guide");
  if (!guide) {
    guide = document.createElement("dialog"); guide.id = "pwa-guide"; guide.className = "pwa-guide";
    guide.setAttribute("aria-labelledby", "pwa-title");
    document.body.append(guide);
    guide.addEventListener("click", event => {
      const rect = guide!.getBoundingClientRect();
      if (event.target === guide && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) guide!.close();
    });
  }
  const ios = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const instructions = ios ? copy.ios : /Mac/.test(navigator.platform) ? copy.mac : copy.other;
  guide.innerHTML = `<h2 id="pwa-title">${copy.title}</h2><p>${instructions}</p><p>${copy.detail}</p><button type="button" autofocus>${copy.close}</button>`;
  guide.querySelector("button")!.addEventListener("click", () => guide!.close());
  guide.showModal();
}
document.querySelectorAll<HTMLButtonElement>("[data-pwa-install]").forEach(button => {
  button.addEventListener("click", async () => {
    if (!installPrompt) { showGuide(); return; }
    const prompt = installPrompt; installPrompt = null;
    try { await prompt.prompt(); await prompt.userChoice; } catch { showGuide(); }
  });
});
document.querySelectorAll<HTMLButtonElement>("[data-pwa-signout]").forEach(button => {
  button.addEventListener("click", async () => {
    button.disabled = true;
    document.dispatchEvent(new Event("hui:signout"));
    document.documentElement.classList.add("access-checking");
    try {
      await fetch("/hui/lock", {method: "POST", cache: "no-store", signal: AbortSignal.timeout(10000)}).catch(() => {});
      await logout();
    } finally { location.replace("/hui/login"); }
  });
});
if ("serviceWorker" in navigator && window.isSecureContext) {
  void navigator.serviceWorker.register("/hui/sw.js", {scope: "/hui/", updateViaCache: "none"}).catch(() => {});
}
renderInstall();
// Rehydrate the SDK so its token renewal continues in the installed chat window.
if (document.querySelector("#composer")) void getUser();
