import {logout} from "@netlify/identity";

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
  let guide = document.querySelector<HTMLDialogElement>("#pwa-guide");
  if (!guide) {
    guide = document.createElement("dialog"); guide.id = "pwa-guide"; guide.className = "pwa-guide";
    guide.setAttribute("aria-labelledby", "pwa-title");
    const ios = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const instructions = ios ? "Open the Share menu, then choose Add to Home Screen. Keep Open as Web App enabled if offered."
      : /Mac/.test(navigator.platform) ? "Use your browser's install icon. In Safari, choose File → Add to Dock."
      : "Open your browser's menu, then choose Install app or Add to Home Screen.";
    guide.innerHTML = `<h2 id="pwa-title">Install Huihui</h2><p>${instructions}</p><p>Open Huihui from its own icon. Your verified account and PIN are still required. An internet connection is needed for cloud replies.</p><button type="button">Got it</button>`;
    guide.querySelector("button")!.addEventListener("click", () => guide!.close());
    guide.addEventListener("click", event => { if (event.target === guide) guide!.close(); });
    document.body.append(guide);
  }
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
      await fetch("/hui/lock", {method: "POST", cache: "no-store"}).catch(() => {});
      await logout();
    } finally { location.replace("/hui/login"); }
  });
});
if ("serviceWorker" in navigator && window.isSecureContext) {
  void navigator.serviceWorker.register("/hui/sw.js", {scope: "/hui/", updateViaCache: "none"}).catch(() => {});
}
renderInstall();
