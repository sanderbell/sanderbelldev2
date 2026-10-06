"use strict";

/* ---------- Helpers ---------- */
const $ = (selector) => document.querySelector(selector);
const root = document.documentElement;
const icon = (name) => `<svg><use href="#i-${name}"/></svg>`;
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
const hoverDevice = matchMedia("(hover: hover)").matches;
const mobile = matchMedia("(max-width: 820px)");

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function iconButton(name, action, label) {
  const button = el("button", "icon-btn");
  button.type = "button";
  button.dataset.act = action;
  button.title = label;
  button.setAttribute("aria-label", label);
  button.innerHTML = icon(name);
  return button;
}

const store = {
  read(key, fallback) {
    try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; } catch { return fallback; }
  },
  write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; }
  },
};

/* ---------- Elements ---------- */
const thread = $("#thread");
const scroller = $("#scroller");
const list = $("#chat-list");
const input = $("#prompt");
const form = $("#composer");
const sendButton = $("#send");
const thinkButton = $("#think");
const titleEl = $("#chat-title");
const statusEl = $("#status");
const search = $("#search");
const toBottom = $("#to-bottom");
const attachmentsEl = $("#attachments");
const fileInput = $("#file");
const settingsDialog = $("#settings");
const lightbox = $("#lightbox");
const sidebar = $("#sidebar");

/* ---------- State ---------- */
const KEYS = { chats: "huihui-chats-v2", settings: "huihui-settings", draft: "huihui-draft", active: "huihui-active", legacy: "huihui-chat-history-v1" };
const DEFAULT_SETTINGS = { theme: "system", accent: "lime", lang: "en", think: false, showThinking: false, instructions: "", sidebar: true };
const MAX_THINKING_CHARS = 40_000;

let settings = { ...DEFAULT_SETTINGS, ...store.read(KEYS.settings, {}) };

/* ---------- Language ---------- */
const pluralRu = (n, one, few, many) => {
  const mod10 = n % 10, mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
};
const formatSize = (bytes, mb, kb) => (bytes > 1e6 ? `${(bytes / 1e6).toFixed(1)} ${mb}` : `${Math.ceil(bytes / 1e3)} ${kb}`);

const STRINGS = {
  en: {
    chats: "Chats",
    newChat: "New chat",
    newChatShortcut: "New chat · ⌘⇧O",
    searchChats: "Search chats",
    settings: "Settings",
    hideSidebar: "Hide sidebar · ⌘B",
    showSidebar: "Show sidebar · ⌘B",
    exportChat: "Export chat as Markdown",
    toBottom: "Scroll to bottom",
    placeholder: "Ask anything…",
    message: "Message",
    attach: "Attach image",
    think: "Deeper",
    thinkTitle: "The model reasons before answering. Slower, for hard problems; reasoning is capped at 4096 tokens.",
    hint: "<kbd>Enter</kbd> send · <kbd>⇧ Enter</kbd> new line · <kbd>Esc</kbd> stop · history stays in this browser",
    dropHint: "Drop to attach",
    send: "Send",
    stop: "Stop",
    statusChecking: "checking…",
    statusOk: "cloud",
    statusDown: "offline",
    statusOkTitle: "Private cloud model is available",
    close: "Close",
    theme: "Theme",
    themeSystem: "System",
    themeLight: "Light",
    themeDark: "Dark",
    accent: "Accent",
    accentLime: "Lime",
    accentSky: "Sky",
    accentViolet: "Violet",
    accentAmber: "Amber",
    accentRose: "Rose",
    showReasoning: "Show reasoning",
    showReasoningHelp: "Stream the model's thinking in “Deeper” mode. It collapses once the answer starts.",
    instructions: "Instructions for the model",
    instructionsPlaceholder: "E.g. keep answers short, code examples in Python.",
    instructionsHelp: "Added to every request. Saved automatically.",
    shortcuts: "Keyboard shortcuts",
    scSidebar: "Toggle sidebar",
    scThink: "“Deeper” mode",
    scStop: "Stop answer",
    scEdit: "Edit last message",
    scFocus: "Focus input",
    data: "Data",
    storageInfo: (n, bytes) => `${n} ${n === 1 ? "chat" : "chats"} · ${formatSize(bytes, "MB", "KB")} · stored only in this browser.`,
    wipe: "Delete all chats",
    wipeConfirm: "Delete everything? Click again",
    emptyTitle: "How can I help?",
    emptySub: "Private cloud inference. Chat history stays in this browser.",
    starters: [
      { title: "Explain simply", hint: "a complex topic, no jargon", prompt: "Explain in simple terms: " },
      { title: "Break down a task", hint: "into concrete steps", prompt: "Break this task into concrete steps: " },
      { title: "Review code", hint: "find the bug, suggest a fix", prompt: "Find the problem in this code and suggest a fix:\n\n" },
      { title: "Improve text", hint: "clearer, shorter, livelier", prompt: "Make this text clearer and shorter, keeping the meaning:\n\n" },
    ],
    today: "Today",
    yesterday: "Yesterday",
    week: "Previous 7 days",
    month: "Previous 30 days",
    older: "Older",
    listEmpty: "Your chats will appear here",
    noResults: "Nothing found",
    rename: "Rename",
    delete: "Delete",
    chatName: "Chat name",
    copy: "Copy",
    edit: "Edit",
    regenerate: "Regenerate",
    retry: "Retry",
    code: "code",
    cancel: "Cancel",
    editMessage: "Edit message",
    attachedImage: "Attached image",
    removeImage: "Remove image",
    image: "Image",
    phaseWaiting: "Thinking",
    phaseThinking: "Reasoning",
    phaseAnswering: "Writing the answer",
    seconds: (n) => `${n} s`,
    reasoning: "Reasoning",
    thoughtFor: (n) => `Thought for ${n} s`,
    metaThought: (n) => `thought ${n} s`,
    metaTps: (n) => `${n} tok/s`,
    metaThinkCapped: "reasoning limit",
    metaTruncated: "cut off by limit",
    metaStopped: "stopped",
    chatDeleted: "Chat deleted",
    undo: "Undo",
    exported: "Chat saved as Markdown",
    allDeleted: "All chats deleted",
    thinkOn: "“Deeper” on — slower but more thoughtful answers",
    thinkOff: "“Deeper” off",
    copyFailed: "Couldn't copy",
    stopFirst: "Stop the current answer first",
    maxImages: (n) => `Up to ${n} images at a time`,
    openFailed: (name) => `Couldn't open ${name || "the image"}`,
    storageFull: "Browser storage is full — older images were removed from history",
    saveFailed: "Couldn't save history: browser storage is full",
    errServer: "The Huihui server isn't responding. Run `hui app` again.",
    errOllama: "Cloud is unavailable. Check the spending limit and try again.",
    errModel: "Cloud model weights are not ready.",
    errEmpty: "The model returned an empty answer.",
    errCapped: "The model used up its limit before answering. Try without “Deeper” or simplify the question.",
    errHttp: (n) => `The server responded with ${n}`,
    err_ollama_down: "Cloud model is unavailable. Try again later.",
    err_generic: "Couldn't get an answer from Huihui.",
    you: "You",
    imagesCount: (n) => `[images: ${n}]`,
    answerReady: "● Answer ready · Huihui",
  },
  ru: {
    chats: "Чаты",
    newChat: "Новый чат",
    newChatShortcut: "Новый чат · ⌘⇧O",
    searchChats: "Поиск по чатам",
    settings: "Настройки",
    hideSidebar: "Скрыть панель · ⌘B",
    showSidebar: "Показать панель · ⌘B",
    exportChat: "Сохранить чат в Markdown",
    toBottom: "Вниз",
    placeholder: "Спроси что угодно…",
    message: "Сообщение",
    attach: "Прикрепить изображение",
    think: "Глубже",
    thinkTitle: "Модель рассуждает перед ответом. Медленнее, для сложных задач; размышления ограничены 4096 токенами.",
    hint: "<kbd>Enter</kbd> отправить · <kbd>⇧ Enter</kbd> перенос · <kbd>Esc</kbd> стоп · история хранится в этом браузере",
    dropHint: "Отпусти, чтобы прикрепить",
    send: "Отправить",
    stop: "Остановить",
    statusChecking: "проверяю…",
    statusOk: "облако",
    statusDown: "офлайн",
    statusOkTitle: "Личная облачная модель доступна",
    close: "Закрыть",
    theme: "Тема",
    themeSystem: "Системная",
    themeLight: "Светлая",
    themeDark: "Тёмная",
    accent: "Акцент",
    accentLime: "Лайм",
    accentSky: "Небо",
    accentViolet: "Фиалка",
    accentAmber: "Янтарь",
    accentRose: "Роза",
    showReasoning: "Показывать размышления",
    showReasoningHelp: "Стримить ход мыслей модели в режиме «Глубже». Сворачивается, когда начинается ответ.",
    instructions: "Указания для модели",
    instructionsPlaceholder: "Например: обращайся на «ты», отвечай коротко, примеры кода — на Python.",
    instructionsHelp: "Добавляются к каждому запросу. Сохраняются автоматически.",
    shortcuts: "Горячие клавиши",
    scSidebar: "Панель чатов",
    scThink: "Режим «Глубже»",
    scStop: "Остановить ответ",
    scEdit: "Изменить последнее сообщение",
    scFocus: "Фокус на поле ввода",
    data: "Данные",
    storageInfo: (n, bytes) => `${n} ${pluralRu(n, "чат", "чата", "чатов")} · ${formatSize(bytes, "МБ", "КБ")} · хранятся только в этом браузере.`,
    wipe: "Удалить все чаты",
    wipeConfirm: "Точно удалить всё? Нажми ещё раз",
    emptyTitle: "Чем помочь?",
    emptySub: "Личный облачный чат. История хранится в этом браузере.",
    starters: [
      { title: "Объяснить просто", hint: "сложную тему без жаргона", prompt: "Объясни простыми словами: " },
      { title: "Разбить задачу", hint: "на конкретные шаги", prompt: "Разбей эту задачу на конкретные шаги: " },
      { title: "Проверить код", hint: "найти баг и предложить фикс", prompt: "Найди проблему в этом коде и предложи исправление:\n\n" },
      { title: "Улучшить текст", hint: "яснее, короче, живее", prompt: "Сделай этот текст яснее и короче, сохранив смысл:\n\n" },
    ],
    today: "Сегодня",
    yesterday: "Вчера",
    week: "Последние 7 дней",
    month: "Последние 30 дней",
    older: "Ранее",
    listEmpty: "Здесь появятся твои чаты",
    noResults: "Ничего не найдено",
    rename: "Переименовать",
    delete: "Удалить",
    chatName: "Название чата",
    copy: "Копировать",
    edit: "Изменить",
    regenerate: "Ответить заново",
    retry: "Повторить",
    code: "код",
    cancel: "Отмена",
    editMessage: "Изменить сообщение",
    attachedImage: "Прикреплённое изображение",
    removeImage: "Убрать изображение",
    image: "Изображение",
    phaseWaiting: "Думаю",
    phaseThinking: "Размышляю",
    phaseAnswering: "Формулирую ответ",
    seconds: (n) => `${n} с`,
    reasoning: "Размышления",
    thoughtFor: (n) => `Думал ${n} с`,
    metaThought: (n) => `думал ${n} с`,
    metaTps: (n) => `${n} ток/с`,
    metaThinkCapped: "лимит размышлений",
    metaTruncated: "обрезано по лимиту",
    metaStopped: "остановлено",
    chatDeleted: "Чат удалён",
    undo: "Вернуть",
    exported: "Чат сохранён в Markdown",
    allDeleted: "Все чаты удалены",
    thinkOn: "«Глубже» включено — ответы медленнее, но обдуманнее",
    thinkOff: "«Глубже» выключено",
    copyFailed: "Не удалось скопировать",
    stopFirst: "Сначала останови текущий ответ",
    maxImages: (n) => `Не больше ${n} изображений за раз`,
    openFailed: (name) => `Не удалось открыть ${name || "изображение"}`,
    storageFull: "Хранилище браузера заполнено — старые изображения убраны из истории",
    saveFailed: "Не удалось сохранить историю: хранилище браузера заполнено",
    errServer: "Сервер Huihui не отвечает. Запусти `hui app` ещё раз.",
    errOllama: "Облако недоступно. Проверь лимит расходов и попробуй снова.",
    errModel: "Веса облачной модели ещё не готовы.",
    errEmpty: "Модель вернула пустой ответ.",
    errCapped: "Модель потратила весь лимит и не успела ответить. Попробуй без «Глубже» или упрости вопрос.",
    errHttp: (n) => `Сервер ответил ${n}`,
    err_ollama_down: "Облачная модель недоступна. Попробуй позже.",
    err_generic: "Не удалось получить ответ от Huihui.",
    you: "Я",
    imagesCount: (n) => `[изображений: ${n}]`,
    answerReady: "● Ответ готов · Huihui",
  },
};

let lang = settings.lang === "ru" ? "ru" : "en";

function t(key, ...args) {
  const value = STRINGS[lang][key] ?? STRINGS.en[key] ?? key;
  return typeof value === "function" ? value(...args) : value;
}

function applyStaticText() {
  root.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((node) => { node.textContent = t(node.dataset.i18n); });
  document.querySelectorAll("[data-i18n-html]").forEach((node) => { node.innerHTML = t(node.dataset.i18nHtml); });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => { node.placeholder = t(node.dataset.i18nPlaceholder); });
  document.querySelectorAll("[data-i18n-aria]").forEach((node) => node.setAttribute("aria-label", t(node.dataset.i18nAria)));
  document.querySelectorAll("[data-i18n-title]").forEach((node) => {
    node.title = t(node.dataset.i18nTitle);
    // Icon-only buttons need a spoken name; drop the shortcut suffix from it.
    if (!node.textContent.trim()) node.setAttribute("aria-label", node.title.split(" · ")[0]);
  });
}

let chats = loadChats();
let activeId = store.read(KEYS.active, null); // null means an unsaved new chat
if (!chats.some((chat) => chat.id === activeId)) activeId = null;
let live = null; // the response currently being streamed
let lastError = null;
let attachments = [];
let stick = true;
let health = { state: "checking", reason: "" }; // reason is a string key

function loadChats() {
  const saved = store.read(KEYS.chats, null);
  if (Array.isArray(saved)) return saved;
  const legacy = store.read(KEYS.legacy, []);
  if (!Array.isArray(legacy) || !legacy.length) return [];
  const firstUser = legacy.find((m) => m.role === "user");
  const now = Date.now();
  return [{ id: uid(), title: makeTitle(firstUser?.content || ""), messages: legacy, createdAt: now, updatedAt: now }];
}

function saveChats() {
  if (store.write(KEYS.chats, chats)) return;
  // Images take most of the space; drop them oldest-first until history fits.
  const byAge = [...chats].sort((a, b) => a.updatedAt - b.updatedAt);
  for (const chat of byAge) {
    for (const message of chat.messages) {
      if (!message.images) continue;
      delete message.images;
      message.imagesDropped = true;
      if (store.write(KEYS.chats, chats)) {
        toast(t("storageFull"));
        return;
      }
    }
  }
  toast(t("saveFailed"));
}

function saveSettings() { store.write(KEYS.settings, settings); }
const activeChat = () => chats.find((chat) => chat.id === activeId) || null;

function makeTitle(text) {
  const line = text.replace(/\s+/g, " ").trim();
  if (!line) return t("image");
  return line.length > 52 ? `${line.slice(0, 50).trimEnd()}…` : line;
}

/* ---------- Theme ---------- */
const prefersLight = matchMedia("(prefers-color-scheme: light)");

function applyTheme(animate = false) {
  const theme = settings.theme === "system" ? (prefersLight.matches ? "light" : "dark") : settings.theme;
  if (animate) {
    root.classList.add("theme-switching");
    setTimeout(() => root.classList.remove("theme-switching"), 350);
  }
  root.dataset.theme = theme;
  root.dataset.accent = settings.accent;
}
prefersLight.addEventListener("change", () => settings.theme === "system" && applyTheme(true));

/* ---------- Markdown ---------- */
const escapeHtml = (text) => text.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const LIST_ITEM = /^(\s*)([-*+]|\d{1,3}[.)])\s+(.*)$/;
const TABLE_RULE = /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/;
const link = (href, text) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

function inline(text) {
  const stash = [];
  const keep = (html) => `\u0000${stash.push(html) - 1}\u0000`;
  let s = escapeHtml(text);
  s = s.replace(/`([^`\n]+)`/g, (_, code) => keep(`<code>${code}</code>`));
  s = s.replace(/\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)/g, (_, label, href) => keep(link(href, label)));
  s = s.replace(/https?:\/\/[^\s<\u0000]+/g, (url) => {
    const tail = url.match(/(?:[.,;:!?)\]*_]|&quot;|&#39;|&gt;)+$/);
    const clean = tail ? url.slice(0, tail.index) : url;
    return keep(link(clean, clean)) + (tail ? tail[0] : "");
  });
  s = s
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/__(.+?)__/g, "<strong>$1</strong>")
    .replace(/(^|[^*\w])\*(?![\s*])(.+?)(?<!\s)\*(?!\*)/g, "$1<em>$2</em>")
    .replace(/(^|[^\w])_(?![\s_])(.+?)(?<!\s)_(?!\w)/g, "$1<em>$2</em>")
    .replace(/~~(.+?)~~/g, "<del>$1</del>");
  return s.replace(/\u0000(\d+)\u0000/g, (_, index) => stash[index]);
}

function codeBlock(code, lang) {
  return `<div class="code"><div class="code-head"><span>${escapeHtml(lang || t("code"))}</span>`
    + `<button type="button" data-copy-code>${icon("copy")}<span>${t("copy")}</span></button></div>`
    + `<pre><code>${escapeHtml(code)}</code></pre></div>`;
}

function table(rows) {
  const cells = (row) => row.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => inline(cell.trim()));
  const [head, ...body] = rows;
  return `<div class="table-wrap"><table><thead><tr>${cells(head).map((c) => `<th>${c}</th>`).join("")}</tr></thead>`
    + `<tbody>${body.map((row) => `<tr>${cells(row).map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}

function parseList(lines, start) {
  const first = lines[start].match(LIST_ITEM);
  const indent = first[1].length;
  const ordered = /\d/.test(first[2]);
  const sameLevel = (m) => m && m[1].length >= indent && m[1].length < indent + 2 && /\d/.test(m[2]) === ordered;
  const items = [];
  let current = null;
  let offset = 0;
  let i = start;
  while (i < lines.length) {
    const line = lines[i];
    const match = line.match(LIST_ITEM);
    const lineIndent = line.match(/^\s*/)[0].length;
    if (sameLevel(match)) {
      current = [match[3]];
      offset = indent + match[2].length + 1;
      items.push(current);
      i++;
    } else if (!line.trim()) {
      let next = i + 1;
      while (next < lines.length && !lines[next].trim()) next++;
      if (next >= lines.length) break;
      const nextIndent = lines[next].match(/^\s*/)[0].length;
      if (nextIndent > indent) { current.push(""); i = next; }
      else if (sameLevel(lines[next].match(LIST_ITEM))) i = next;
      else break;
    } else if (lineIndent > indent) {
      current.push(line.slice(Math.min(lineIndent, offset)));
      i++;
    } else if (match || /^(#{1,6}\s|>|```|~~~)/.test(line.trim())) {
      break;
    } else {
      current.push(line.trim());
      i++;
    }
  }
  const tag = ordered ? "ol" : "ul";
  const startAttr = ordered && parseInt(first[2], 10) !== 1 ? ` start="${parseInt(first[2], 10)}"` : "";
  const html = `<${tag}${startAttr}>${items.map((item) => `<li>${renderMarkdown(item.join("\n"))}</li>`).join("")}</${tag}>`;
  return { html, next: i };
}

function renderMarkdown(source) {
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const out = [];
  let paragraph = [];
  const flush = () => {
    if (paragraph.length) out.push(`<p>${paragraph.map(inline).join("<br>")}</p>`);
    paragraph = [];
  };
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const fence = line.match(/^\s*(```|~~~)\s*([\w+#.-]*)/);
    if (fence) {
      flush();
      const body = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith(fence[1])) body.push(lines[i++]);
      i++;
      out.push(codeBlock(body.join("\n"), fence[2]));
      continue;
    }
    if (!line.trim()) { flush(); i++; continue; }
    const heading = line.match(/^\s*(#{1,6})\s+(.*)$/);
    if (heading) {
      flush();
      const level = Math.min(heading[1].length, 4);
      out.push(`<h${level}>${inline(heading[2].replace(/\s+#+\s*$/, ""))}</h${level}>`);
      i++;
      continue;
    }
    if (/^\s*([-*_])(\s*\1){2,}\s*$/.test(line)) { flush(); out.push("<hr>"); i++; continue; }
    if (/^\s*>/.test(line)) {
      flush();
      const body = [];
      while (i < lines.length && /^\s*>/.test(lines[i])) body.push(lines[i++].replace(/^\s*>\s?/, ""));
      out.push(`<blockquote>${renderMarkdown(body.join("\n"))}</blockquote>`);
      continue;
    }
    if (line.includes("|") && i + 1 < lines.length && lines[i + 1].includes("|") && TABLE_RULE.test(lines[i + 1])) {
      flush();
      const rows = [line];
      i += 2;
      while (i < lines.length && lines[i].includes("|") && lines[i].trim()) rows.push(lines[i++]);
      out.push(table(rows));
      continue;
    }
    if (LIST_ITEM.test(line)) {
      flush();
      const { html, next } = parseList(lines, i);
      out.push(html);
      i = next;
      continue;
    }
    paragraph.push(line);
    i++;
  }
  flush();
  return out.join("");
}

// Some models leak raw <think> blocks into content; never show them.
const visibleText = (text) => text.replace(/<think>[\s\S]*?(?:<\/think>|$)/g, "");

/* ---------- Thread ---------- */
function formatMeta(meta = {}, reasoningShown = false) {
  const parts = [];
  if (meta.thinkMs >= 1000 && !reasoningShown) parts.push(t("metaThought", Math.round(meta.thinkMs / 1000)));
  if (meta.tps) parts.push(t("metaTps", meta.tps.toFixed(1)));
  if (meta.thinkCapped) parts.push(t("metaThinkCapped"));
  if (meta.truncated) parts.push(t("metaTruncated"));
  if (meta.stopped) parts.push(t("metaStopped"));
  return parts.join(" · ");
}

function messageEl(message, index) {
  const article = el("article", `msg ${message.role}`);
  article.dataset.index = index;
  const actions = el("div", "actions");
  if (message.role === "user") {
    if (message.images?.length) {
      const images = el("div", "images");
      for (const data of message.images) {
        const img = new Image();
        img.src = `data:image/jpeg;base64,${data}`;
        img.alt = t("attachedImage");
        img.dataset.zoom = "";
        images.append(img);
      }
      article.append(images);
    }
    if (message.content) article.append(el("div", "bubble", message.content));
    actions.append(iconButton("copy", "copy", t("copy")), iconButton("edit", "edit", t("edit")));
  } else {
    const reasoningShown = Boolean(settings.showThinking && message.thinking);
    if (reasoningShown) {
      const block = reasoningEl();
      const seconds = Math.round((message.meta?.thinkMs || 0) / 1000);
      block.querySelector(".r-label").textContent = seconds ? t("thoughtFor", seconds) : t("reasoning");
      block.querySelector(".reasoning-body").innerHTML = renderMarkdown(message.thinking);
      article.append(block);
    }
    const md = el("div", "md");
    md.innerHTML = renderMarkdown(visibleText(message.content));
    article.append(md);
    actions.append(iconButton("copy", "copy", t("copy")), iconButton("retry", "retry", t("regenerate")));
    const meta = formatMeta(message.meta, reasoningShown);
    if (meta) actions.append(el("span", "meta", meta));
  }
  article.append(actions);
  return article;
}

function errorEl(message) {
  const article = el("article", "msg error");
  const box = el("div", "error-box");
  box.append(el("span", null, message));
  const retry = el("button", null, t("retry"));
  retry.type = "button";
  retry.dataset.act = "retry";
  box.append(retry);
  article.append(box);
  return article;
}

function emptyEl() {
  const wrap = el("div", "empty");
  wrap.innerHTML = `<span class="orb" aria-hidden="true"></span>`;
  wrap.append(el("h2", null, t("emptyTitle")), el("p", null, t("emptySub")));
  if (health.state === "down") wrap.append(el("div", "notice", t(health.reason)));
  const starters = el("div", "starters");
  for (const starter of t("starters")) {
    const button = el("button");
    button.type = "button";
    button.dataset.prompt = starter.prompt;
    button.append(el("strong", null, starter.title), el("span", null, starter.hint));
    starters.append(button);
  }
  wrap.append(starters);
  return wrap;
}

function markLast() {
  const messages = thread.querySelectorAll(".msg.user, .msg.assistant");
  messages.forEach((node, i) => node.classList.toggle("last", i === messages.length - 1));
}

function renderThread() {
  const chat = activeChat();
  store.write(KEYS.active, activeId);
  thread.replaceChildren();
  const isLive = live && live.chatId === activeId;
  if (!chat?.messages.length && !isLive) {
    thread.append(emptyEl());
  } else {
    chat.messages.forEach((message, index) => thread.append(messageEl(message, index)));
    if (isLive) thread.append(live.el);
    if (lastError && lastError.chatId === activeId) thread.append(errorEl(lastError.message));
  }
  markLast();
  titleEl.textContent = chat?.title || t("newChat");
  $("#export").hidden = !chat?.messages.length;
  stick = true;
  scrollToEnd();
}

function scrollToEnd() { scroller.scrollTop = scroller.scrollHeight; }

scroller.addEventListener("scroll", () => {
  const distance = scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight;
  stick = distance < 80;
  toBottom.classList.toggle("show", distance > 240);
}, { passive: true });
toBottom.addEventListener("click", () => scroller.scrollTo({ top: scroller.scrollHeight, behavior: "smooth" }));

/* ---------- Chat list ---------- */
function groupOf(timestamp) {
  const day = 864e5;
  const today = new Date().setHours(0, 0, 0, 0);
  if (timestamp >= today) return t("today");
  if (timestamp >= today - day) return t("yesterday");
  if (timestamp >= today - 6 * day) return t("week");
  if (timestamp >= today - 29 * day) return t("month");
  return t("older");
}

function renderList() {
  const query = search.value.trim().toLowerCase();
  const items = [...chats]
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .filter((chat) => !query || chat.title.toLowerCase().includes(query)
      || chat.messages.some((m) => m.content.toLowerCase().includes(query)));
  list.replaceChildren();
  if (!items.length) {
    list.append(el("div", "list-empty", t(query ? "noResults" : "listEmpty")));
    return;
  }
  let group = null;
  for (const chat of items) {
    const label = groupOf(chat.updatedAt);
    if (label !== group) { list.append(el("div", "group-label", label)); group = label; }
    const item = el("div", `chat-item${chat.id === activeId ? " active" : ""}`);
    item.dataset.id = chat.id;
    if (live?.chatId === chat.id) item.append(el("span", "live-dot"));
    const open = el("button", "open", chat.title);
    open.type = "button";
    open.title = chat.title;
    const actions = el("div", "item-actions");
    actions.append(iconButton("edit", "rename", t("rename")), iconButton("trash", "delete", t("delete")));
    item.append(open, actions);
    list.append(item);
  }
}

function openChat(id) {
  setSidebarIfMobile(false);
  if (id === activeId) return;
  activeId = id;
  renderThread();
  renderList();
  if (hoverDevice) input.focus();
}

function newChat() {
  setSidebarIfMobile(false);
  if (activeId !== null) {
    activeId = null;
    renderThread();
    renderList();
  }
  input.focus();
}

function deleteChat(id) {
  const index = chats.findIndex((chat) => chat.id === id);
  if (index < 0) return;
  const [removed] = chats.splice(index, 1);
  if (live?.chatId === id) live.controller.abort();
  if (lastError?.chatId === id) lastError = null;
  if (activeId === id) { activeId = null; renderThread(); }
  saveChats();
  renderList();
  toast(t("chatDeleted"), {
    action: t("undo"),
    onAction: () => {
      chats.splice(Math.min(index, chats.length), 0, removed);
      saveChats();
      renderList();
    },
  });
}

function startRename(id) {
  const chat = chats.find((c) => c.id === id);
  const item = list.querySelector(`[data-id="${id}"]`);
  if (!chat || !item) return;
  const field = el("input");
  field.value = chat.title;
  field.setAttribute("aria-label", t("chatName"));
  item.replaceChildren(field);
  field.focus();
  field.select();
  let finished = false;
  const finish = (commit) => {
    if (finished) return;
    finished = true;
    if (commit && field.value.trim()) {
      chat.title = field.value.trim().slice(0, 80);
      saveChats();
      if (activeId === id) titleEl.textContent = chat.title;
    }
    renderList();
  };
  field.addEventListener("keydown", (event) => {
    if (event.key === "Enter") finish(true);
    if (event.key === "Escape") { event.stopPropagation(); finish(false); }
  });
  field.addEventListener("blur", () => finish(true));
}

list.addEventListener("click", (event) => {
  const item = event.target.closest(".chat-item");
  if (!item) return;
  const action = event.target.closest("[data-act]")?.dataset.act;
  if (action === "rename") startRename(item.dataset.id);
  else if (action === "delete") deleteChat(item.dataset.id);
  else if (event.target.closest(".open")) openChat(item.dataset.id);
});
list.addEventListener("dblclick", (event) => {
  const item = event.target.closest(".chat-item");
  if (item && event.target.closest(".open")) startRename(item.dataset.id);
});
search.addEventListener("input", renderList);
search.addEventListener("keydown", (event) => {
  if (event.key === "Escape") { event.stopPropagation(); search.value = ""; renderList(); input.focus(); }
  if (event.key === "Enter") list.querySelector(".open")?.click();
});
titleEl.addEventListener("dblclick", () => {
  if (!activeId) return;
  setSidebar(true);
  startRename(activeId);
});

/* ---------- Generation ---------- */
function setBusy(busy) {
  form.classList.toggle("busy", busy);
  sendButton.setAttribute("aria-label", t(busy ? "stop" : "send"));
  sendButton.title = busy ? `${t("stop")} · Esc` : "";
  updateSendState();
}

function updateSendState() {
  sendButton.disabled = !live && !input.value.trim() && !attachments.length;
}

function reasoningEl() {
  const block = el("div", "reasoning");
  block.innerHTML = `<button type="button" class="reasoning-toggle">${icon("chevron")}<span class="r-label"></span>`
    + `<span class="budget" hidden><i></i></span></button>`
    + `<div class="reasoning-wrap"><div class="reasoning-inner"><div class="reasoning-body md"></div></div></div>`;
  return block;
}

function liveEl() {
  const article = el("article", "msg assistant streaming");
  const block = reasoningEl();
  block.hidden = true;
  article.append(block);
  article.insertAdjacentHTML("beforeend", `<div class="status-line"><span class="orb" aria-hidden="true"></span>`
    + `<span class="label shimmer"></span><span class="elapsed"></span><span class="budget" hidden><i></i></span></div>`
    + `<div class="md"></div>`);
  return article;
}

function updateLiveStatus() {
  if (!live) return;
  const thinkingNow = live.phase === "thinking";
  const progress = live.thinkBudget ? Math.min(1, live.thinkTokens / live.thinkBudget) : 0;
  const block = live.el.querySelector(".reasoning");
  const showReasoning = Boolean(settings.showThinking && live.thinking);
  block.hidden = !showReasoning;
  if (showReasoning) {
    if (!live.reasoningToggled) block.classList.toggle("open", thinkingNow);
    const label = block.querySelector(".r-label");
    const thinkSeconds = Math.round((live.thinkMs || performance.now() - live.thinkStart) / 1000);
    label.textContent = thinkingNow ? `${t("phaseThinking")} · ${t("seconds", thinkSeconds)}` : t("thoughtFor", thinkSeconds);
    label.classList.toggle("shimmer", thinkingNow);
    const budget = block.querySelector(".budget");
    budget.hidden = !(live.thinkBudget && thinkingNow);
    budget.firstChild.style.transform = `scaleX(${progress})`;
  }

  const line = live.el.querySelector(".status-line");
  line.hidden = live.phase === "writing" || (showReasoning && thinkingNow);
  if (line.hidden) return;
  line.querySelector(".label").textContent = t({ waiting: "phaseWaiting", thinking: "phaseThinking", answering: "phaseAnswering" }[live.phase]);
  const budget = line.querySelector(".budget");
  budget.hidden = !(live.thinkBudget && thinkingNow);
  budget.firstChild.style.transform = `scaleX(${progress})`;
  const seconds = Math.floor((performance.now() - live.started) / 1000);
  line.querySelector(".elapsed").textContent = seconds >= 1 ? t("seconds", seconds) : "";
}

let renderQueued = false;
function scheduleLiveRender() {
  if (renderQueued) return;
  renderQueued = true;
  requestAnimationFrame(() => {
    renderQueued = false;
    if (!live) return;
    live.el.querySelector(".md").innerHTML = renderMarkdown(visibleText(live.content));
    if (settings.showThinking && live.thinking) {
      const body = live.el.querySelector(".reasoning-body");
      const follow = body.scrollHeight - body.scrollTop - body.clientHeight < 40;
      body.innerHTML = renderMarkdown(live.thinking);
      if (follow) body.scrollTop = body.scrollHeight;
    }
    updateLiveStatus();
    if (stick && activeId === live.chatId) scrollToEnd();
  });
}

function handleEvent(event) {
  if (event.type === "start") {
    live.thinkBudget = event.thinkBudget;
  } else if (event.type === "thinking") {
    if (!live.thinkStart) live.thinkStart = performance.now();
    live.thinkTokens++;
    live.thinking += event.text || "";
    if (live.phase === "waiting") live.phase = "thinking";
    scheduleLiveRender();
  } else if (event.type === "fallback") {
    if (live.thinkStart) live.thinkMs = performance.now() - live.thinkStart;
    live.phase = "answering";
  } else if (event.type === "delta") {
    if (live.phase !== "writing") {
      if (live.thinkStart && !live.thinkMs) live.thinkMs = performance.now() - live.thinkStart;
      live.phase = "writing";
    }
    live.content += event.content;
    scheduleLiveRender();
  } else if (event.type === "done") {
    live.stats = event;
  } else if (event.type === "error") {
    throw new Error(event.code ? t(`err_${event.code}`) : event.error);
  }
}

async function generate(chat) {
  const controller = new AbortController();
  live = {
    chatId: chat.id, content: "", phase: "waiting", started: performance.now(), controller, stats: null, el: liveEl(),
    thinkStart: 0, thinkMs: 0, thinkTokens: 0, thinkBudget: 0, thinking: "", reasoningToggled: false,
  };
  if (activeId === chat.id) {
    thread.querySelector(".empty")?.remove();
    thread.append(live.el);
    markLast();
    stick = true;
    scrollToEnd();
  }
  setBusy(true);
  renderList();
  const ticker = setInterval(updateLiveStatus, 250);

  let error = null;
  let stopped = false;
  try {
    const response = await fetch("/hui/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        messages: chat.messages.map(({ role, content, images }) => (images ? { role, content, images } : { role, content })),
        think: settings.think,
        instructions: settings.instructions,
      }),
    });
    if (response.status === 401) { location.replace("/hui/login"); return; }
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.code ? t(`err_${data.code}`) : data.error || t("errHttp", response.status));
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop();
      for (const line of lines) if (line.trim()) handleEvent(JSON.parse(line));
    }
  } catch (caught) {
    if (caught.name === "AbortError") stopped = true;
    else error = caught instanceof TypeError ? t("errServer") : caught.message;
  }
  clearInterval(ticker);

  const { el: liveNode, stats, thinkMs } = live;
  const thinking = live.thinking.trim().slice(-MAX_THINKING_CHARS);
  const content = visibleText(live.content).trim();
  live = null;
  setBusy(false);

  const target = chats.find((c) => c.id === chat.id);
  if (!target) { renderList(); return; }
  if (content) {
    const meta = {};
    if (thinkMs >= 1000) meta.thinkMs = Math.round(thinkMs);
    if (stats?.evalCount && stats?.evalDuration) meta.tps = Math.round((stats.evalCount / (stats.evalDuration / 1e9)) * 10) / 10;
    if (stats?.reason === "length") meta.truncated = true;
    if (stats?.thinkCapped) meta.thinkCapped = true;
    if (stopped) meta.stopped = true;
    const message = { role: "assistant", content, meta };
    if (thinking) message.thinking = thinking;
    target.messages.push(message);
    target.updatedAt = Date.now();
    saveChats();
  } else if (!stopped && !error) {
    error = t(stats?.reason === "length" ? "errCapped" : "errEmpty");
  }
  if (error) lastError = { chatId: target.id, message: error };

  if (activeId === target.id) {
    if (content) {
      const finalNode = messageEl(target.messages.at(-1), target.messages.length - 1);
      finalNode.style.animation = "none";
      liveNode.replaceWith(finalNode);
    } else {
      liveNode.remove();
    }
    if (error) thread.append(errorEl(error));
    markLast();
    if (stick) scrollToEnd();
  }
  renderList();
  if (document.hidden && content) document.title = t("answerReady");
}

function stop() { live?.controller.abort(); }
document.addEventListener("hui:signout", stop);

function send() {
  if (live) { stop(); return; }
  const text = input.value.trim();
  if (!text && !attachments.length) return;
  let chat = activeChat();
  if (!chat) {
    const now = Date.now();
    chat = { id: uid(), title: makeTitle(text), messages: [], createdAt: now, updatedAt: now };
    chats.push(chat);
    activeId = chat.id;
  }
  const message = { role: "user", content: text };
  if (attachments.length) message.images = attachments.map((a) => a.data);
  chat.messages.push(message);
  chat.updatedAt = Date.now();
  lastError = null;
  input.value = "";
  attachments = [];
  renderAttachments();
  resize();
  saveDraft();
  saveChats();
  renderThread();
  renderList();
  generate(chat);
}

function regenerate() {
  const chat = activeChat();
  if (live || !chat) return;
  if (chat.messages.at(-1)?.role === "assistant") chat.messages.pop();
  if (chat.messages.at(-1)?.role !== "user") return;
  lastError = null;
  saveChats();
  renderThread();
  generate(chat);
}

function startEdit(index) {
  const chat = activeChat();
  if (!chat) return;
  if (live) { toast(t("stopFirst")); return; }
  const message = chat.messages[index];
  const article = thread.querySelector(`.msg.user[data-index="${index}"]`);
  if (!message || !article) return;
  const box = el("div", "edit-box");
  const field = el("textarea");
  field.value = message.content;
  field.setAttribute("aria-label", t("editMessage"));
  const row = el("div", "row");
  const cancel = el("button", "btn ghost", t("cancel"));
  const save = el("button", "btn primary", t("send"));
  cancel.type = save.type = "button";
  row.append(cancel, save);
  box.append(field, row);
  article.replaceChildren(box);
  const fit = () => { field.style.height = "auto"; field.style.height = `${Math.min(field.scrollHeight + 2, 360)}px`; };
  fit();
  field.focus();
  field.setSelectionRange(field.value.length, field.value.length);

  const commit = () => {
    const text = field.value.trim();
    if (!text && !message.images) return;
    chat.messages = chat.messages.slice(0, index);
    chat.messages.push({ ...message, content: text });
    chat.updatedAt = Date.now();
    if (index === 0) chat.title = makeTitle(text);
    lastError = null;
    saveChats();
    renderThread();
    renderList();
    generate(chat);
  };
  field.addEventListener("input", fit);
  field.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey && !event.isComposing) { event.preventDefault(); commit(); }
    if (event.key === "Escape") { event.stopPropagation(); renderThread(); input.focus(); }
  });
  cancel.addEventListener("click", () => { renderThread(); input.focus(); });
  save.addEventListener("click", commit);
}

async function copyText(text, button) {
  try {
    await navigator.clipboard.writeText(text);
    if (!button) return;
    const use = button.querySelector("use");
    use.setAttribute("href", "#i-check");
    button.classList.add("done");
    setTimeout(() => { use.setAttribute("href", "#i-copy"); button.classList.remove("done"); }, 1400);
  } catch {
    toast(t("copyFailed"));
  }
}

thread.addEventListener("click", (event) => {
  const starter = event.target.closest("[data-prompt]");
  if (starter) {
    input.value = starter.dataset.prompt;
    resize();
    updateSendState();
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
    return;
  }
  const reasoningToggle = event.target.closest(".reasoning-toggle");
  if (reasoningToggle) {
    reasoningToggle.parentElement.classList.toggle("open");
    if (live && live.el.contains(reasoningToggle)) live.reasoningToggled = true;
    return;
  }
  const codeCopy = event.target.closest("[data-copy-code]");
  if (codeCopy) { copyText(codeCopy.closest(".code").querySelector("code").textContent, codeCopy); return; }
  const zoom = event.target.closest("img[data-zoom]");
  if (zoom) { lightbox.querySelector("img").src = zoom.src; lightbox.showModal(); return; }

  const action = event.target.closest("[data-act]");
  if (!action) return;
  const index = Number(action.closest(".msg")?.dataset.index);
  const message = activeChat()?.messages[index];
  if (action.dataset.act === "copy" && message) copyText(message.content, action);
  else if (action.dataset.act === "edit") startEdit(index);
  else if (action.dataset.act === "retry") regenerate();
});
lightbox.addEventListener("click", () => lightbox.close());

/* ---------- Composer ---------- */
function resize() {
  input.style.height = "auto";
  input.style.height = `${Math.min(input.scrollHeight, 240)}px`;
  input.style.overflowY = input.scrollHeight > 240 ? "auto" : "hidden";
}

let draftTimer;
function saveDraft() {
  clearTimeout(draftTimer);
  draftTimer = setTimeout(() => {
    try { localStorage.setItem(KEYS.draft, input.value); } catch {}
  }, 300);
}

function renderThink() {
  thinkButton.setAttribute("aria-pressed", String(settings.think));
}

function toggleThink() {
  settings.think = !settings.think;
  saveSettings();
  renderThink();
  toast(t(settings.think ? "thinkOn" : "thinkOff"), { duration: 2200 });
}

form.addEventListener("submit", (event) => { event.preventDefault(); send(); });
input.addEventListener("input", () => { resize(); updateSendState(); saveDraft(); });
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey && !event.isComposing) {
    event.preventDefault();
    if (!live) send();
  } else if (event.key === "ArrowUp" && !input.value && !attachments.length) {
    const messages = activeChat()?.messages || [];
    const index = messages.map((m) => m.role).lastIndexOf("user");
    if (index >= 0) { event.preventDefault(); startEdit(index); }
  }
});
thinkButton.addEventListener("click", toggleThink);

/* ---------- Attachments ---------- */
const MAX_ATTACHMENTS = 4;

async function downscale(file, max = 1280) {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const context = canvas.getContext("2d");
  context.fillStyle = "#fff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close?.();
  return canvas.toDataURL("image/jpeg", 0.85);
}

async function addFiles(files) {
  const images = [...files].filter((file) => file.type.startsWith("image/"));
  if (!images.length) return;
  for (const file of images) {
    if (attachments.length >= MAX_ATTACHMENTS) { toast(t("maxImages", MAX_ATTACHMENTS)); break; }
    try {
      const url = await downscale(file);
      attachments.push({ url, data: url.slice(url.indexOf(",") + 1) });
    } catch {
      toast(t("openFailed", file.name));
    }
  }
  renderAttachments();
  updateSendState();
  input.focus();
}

function renderAttachments() {
  attachmentsEl.replaceChildren(...attachments.map((attachment, index) => {
    const thumb = el("div", "thumb");
    const img = new Image();
    img.src = attachment.url;
    img.alt = "";
    const remove = el("button");
    remove.type = "button";
    remove.setAttribute("aria-label", t("removeImage"));
    remove.innerHTML = icon("x");
    remove.addEventListener("click", () => {
      attachments.splice(index, 1);
      renderAttachments();
      updateSendState();
      input.focus();
    });
    thumb.append(img, remove);
    return thumb;
  }));
}

$("#attach").addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", () => { addFiles(fileInput.files); fileInput.value = ""; });
input.addEventListener("paste", (event) => {
  const files = [...(event.clipboardData?.files || [])].filter((file) => file.type.startsWith("image/"));
  if (files.length) { event.preventDefault(); addFiles(files); }
});

const main = $(".main");
const dropOverlay = $("#drop-overlay");
let dragDepth = 0;
const hasFiles = (event) => [...(event.dataTransfer?.types || [])].includes("Files");
main.addEventListener("dragenter", (event) => {
  if (!hasFiles(event)) return;
  event.preventDefault();
  dragDepth++;
  dropOverlay.classList.add("show");
});
main.addEventListener("dragover", (event) => { if (hasFiles(event)) event.preventDefault(); });
main.addEventListener("dragleave", () => {
  dragDepth = Math.max(0, dragDepth - 1);
  if (!dragDepth) dropOverlay.classList.remove("show");
});
main.addEventListener("drop", (event) => {
  if (!hasFiles(event)) return;
  event.preventDefault();
  dragDepth = 0;
  dropOverlay.classList.remove("show");
  addFiles(event.dataTransfer.files);
});

/* ---------- Sidebar ---------- */
function sidebarIsOpen() {
  return mobile.matches ? root.classList.contains("sidebar-open") : settings.sidebar;
}

function setSidebar(open) {
  if (mobile.matches) {
    root.classList.toggle("sidebar-open", open);
  } else {
    settings.sidebar = open;
    saveSettings();
    root.classList.toggle("sidebar-collapsed", !open);
  }
  sidebar.inert = !open;
}

function setSidebarIfMobile(open) { if (mobile.matches) setSidebar(open); }
function syncSidebar() { sidebar.inert = !sidebarIsOpen(); }

$("#collapse").addEventListener("click", () => setSidebar(false));
$("#expand").addEventListener("click", () => setSidebar(true));
$("#scrim").addEventListener("click", () => setSidebar(false));
mobile.addEventListener("change", () => { root.classList.remove("sidebar-open"); syncSidebar(); });
$("#new-chat").addEventListener("click", newChat);
$("#new-chat-top").addEventListener("click", newChat);

/* ---------- Export ---------- */
$("#export").addEventListener("click", () => {
  const chat = activeChat();
  if (!chat?.messages.length) return;
  const body = chat.messages.map((m) => {
    const images = m.images?.length ? `\n\n_${t("imagesCount", m.images.length)}_` : "";
    return `### ${m.role === "user" ? t("you") : "Huihui"}\n\n${m.content}${images}`;
  }).join("\n\n---\n\n");
  const blob = new Blob([`# ${chat.title}\n\n${body}\n`], { type: "text/markdown;charset=utf-8" });
  const anchor = document.createElement("a");
  anchor.href = URL.createObjectURL(blob);
  anchor.download = `${chat.title.replace(/[\\/:*?"<>|]+/g, " ").trim().slice(0, 60) || "chat"}.md`;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(anchor.href), 1000);
  toast(t("exported"));
});

/* ---------- Settings ---------- */
const langPicker = $("#lang-picker");
const showReasoning = $("#show-reasoning");
const themePicker = $("#theme-picker");
const accentPicker = $("#accent-picker");
const instructions = $("#instructions");
const wipe = $("#wipe");

function syncSettingsUI() {
  for (const button of langPicker.children) button.setAttribute("aria-checked", String(button.dataset.value === lang));
  showReasoning.checked = settings.showThinking;
  for (const button of themePicker.children) button.setAttribute("aria-checked", String(button.dataset.value === settings.theme));
  for (const button of accentPicker.children) button.setAttribute("aria-checked", String(button.dataset.value === settings.accent));
  instructions.value = settings.instructions;
  const bytes = new Blob([localStorage.getItem(KEYS.chats) || ""]).size;
  $("#storage-info").textContent = t("storageInfo", chats.length, bytes);
}

function openSettings() {
  if (settingsDialog.open) return;
  syncSettingsUI();
  settingsDialog.showModal();
}

$("#open-settings").addEventListener("click", openSettings);
settingsDialog.addEventListener("click", (event) => { if (event.target === settingsDialog) settingsDialog.close(); });
settingsDialog.addEventListener("close", () => {
  wipe.classList.remove("confirm");
  wipe.textContent = t("wipe");
  if (hoverDevice) input.focus();
});
langPicker.addEventListener("click", (event) => {
  const value = event.target.closest("[data-value]")?.dataset.value;
  if (!value || value === lang) return;
  lang = settings.lang = value;
  saveSettings();
  refreshLanguage();
  syncSettingsUI();
});
showReasoning.addEventListener("change", () => {
  settings.showThinking = showReasoning.checked;
  saveSettings();
  if (!live) renderThread();
});
themePicker.addEventListener("click", (event) => {
  const value = event.target.closest("[data-value]")?.dataset.value;
  if (!value) return;
  settings.theme = value;
  saveSettings();
  applyTheme(true);
  syncSettingsUI();
});
accentPicker.addEventListener("click", (event) => {
  const value = event.target.closest("[data-value]")?.dataset.value;
  if (!value) return;
  settings.accent = value;
  saveSettings();
  applyTheme(true);
  syncSettingsUI();
});
let instructionsTimer;
instructions.addEventListener("input", () => {
  clearTimeout(instructionsTimer);
  instructionsTimer = setTimeout(() => { settings.instructions = instructions.value; saveSettings(); }, 300);
});
wipe.addEventListener("click", () => {
  if (!wipe.classList.contains("confirm")) {
    wipe.classList.add("confirm");
    wipe.textContent = t("wipeConfirm");
    return;
  }
  stop();
  chats = [];
  activeId = null;
  lastError = null;
  saveChats();
  renderThread();
  renderList();
  settingsDialog.close();
  toast(t("allDeleted"));
});

/* ---------- Health ---------- */
async function checkHealth() {
  let next;
  try {
    const response = await fetch("/hui/api/health", { cache: "no-store" });
    if (response.status === 401 || response.status === 403) { location.replace("/hui/login"); return; }
    const data = await response.json();
    if (data.ollama && data.model) next = { state: "ok", reason: "" };
    else next = { state: "down", reason: data.ollama ? "errModel" : "errOllama" };
  } catch {
    next = { state: "down", reason: "errServer" };
  }
  const changed = next.state !== health.state;
  health = next;
  renderStatus();
  if (root.classList.contains("access-checking") && next.state !== "ok") { location.replace("/hui/"); return; }
  root.classList.remove("access-checking");
  if (changed && thread.querySelector(".empty")) thread.querySelector(".empty").replaceWith(emptyEl());
}

function renderStatus() {
  statusEl.dataset.state = health.state;
  statusEl.title = health.state === "ok" ? t("statusOkTitle") : health.state === "down" ? t(health.reason) : "";
  statusEl.querySelector("span").textContent = t({ ok: "statusOk", down: "statusDown", checking: "statusChecking" }[health.state]);
}

/* ---------- Toasts ---------- */
function toast(text, { action, onAction, duration = 4000 } = {}) {
  const node = el("div", "toast");
  node.append(el("span", null, text));
  const dismiss = () => {
    if (node.classList.contains("out")) return;
    node.classList.add("out");
    node.addEventListener("animationend", () => node.remove(), { once: true });
  };
  if (action) {
    const button = el("button", null, action);
    button.type = "button";
    button.addEventListener("click", () => { onAction(); dismiss(); });
    node.append(button);
  }
  const container = $("#toasts");
  while (container.children.length >= 3) container.firstChild.remove();
  container.append(node);
  setTimeout(dismiss, duration);
}

/* ---------- Global keys ---------- */
const isTyping = (target) => target.closest?.("input, textarea, [contenteditable]");

document.addEventListener("keydown", (event) => {
  const mod = event.metaKey || event.ctrlKey;
  if (mod && event.shiftKey && event.code === "KeyO") { event.preventDefault(); newChat(); }
  else if (mod && !event.shiftKey && event.code === "KeyK") {
    event.preventDefault();
    setSidebar(true);
    search.focus();
    search.select();
  } else if (mod && !event.shiftKey && event.code === "KeyB") { event.preventDefault(); setSidebar(!sidebarIsOpen()); }
  else if (mod && event.shiftKey && event.code === "KeyD") { event.preventDefault(); toggleThink(); }
  else if (mod && event.key === ",") { event.preventDefault(); openSettings(); }
  else if (event.key === "Escape" && !document.querySelector("dialog[open]")) {
    if (live) { event.preventDefault(); stop(); }
    else if (mobile.matches && sidebarIsOpen()) setSidebar(false);
  } else if (!mod && !event.altKey && !isTyping(event.target) && !document.querySelector("dialog[open]")) {
    if (event.key === "/") { event.preventDefault(); input.focus(); }
    else if (event.key.length === 1) input.focus(); // start typing anywhere
  }
});

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) { document.title = "Huihui"; checkHealth(); }
});

function refreshLanguage() {
  applyStaticText();
  renderStatus();
  setBusy(Boolean(live));
  renderList();
  // Rebuild messages in place without losing the reader's scroll position.
  const top = scroller.scrollTop;
  renderThread();
  scroller.scrollTop = top;
}

/* ---------- Boot ---------- */
applyStaticText();
applyTheme();
renderThink();
syncSidebar();
try { input.value = localStorage.getItem(KEYS.draft) || ""; } catch {}
setBusy(false);
renderList();
renderThread();
resize();
requestAnimationFrame(resize);
window.addEventListener("resize", resize);
function fitViewport() {
  if (window.visualViewport?.scale === 1) root.style.setProperty("--app-height", `${window.visualViewport.height}px`);
}
window.visualViewport?.addEventListener("resize", fitViewport);
fitViewport();
window.addEventListener("pageshow", event => { if (event.persisted) { root.classList.add("access-checking"); checkHealth(); } });
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") checkHealth(); });
window.addEventListener("online", checkHealth);
window.addEventListener("offline", checkHealth);
updateSendState();
if (hoverDevice) input.focus();
checkHealth();
setInterval(checkHealth, 20000);
