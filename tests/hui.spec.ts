import {test, expect, type Page} from '@playwright/test';

const chat = {id: 'fixture-chat', title: 'A saved conversation', createdAt: Date.now(), updatedAt: Date.now(), messages: [
  {role: 'user', content: 'Original question'}, {role: 'assistant', content: 'Original answer'},
]};
async function boot(page: Page, saved = true) {
  await page.route('**/hui/api/health', route => route.fulfill({json: {ollama: true, model: true}}));
  await page.route('**/hui/api/chat', route => route.fulfill({contentType: 'application/x-ndjson', body:
    JSON.stringify({type: 'delta', content: 'A complete answer'}) + '\n' + JSON.stringify({type: 'done', reason: 'stop'})}));
  // Keep all fixtures local: no identity calls or service worker in chat tests.
  await page.route('**/hui/pwa.js', route => route.fulfill({body: ''}));
  await page.addInitScript(({chat, saved}) => {
    if (!localStorage.getItem('test-seeded')) {
      localStorage.setItem('huihui-chats-v2', JSON.stringify(saved ? [chat] : []));
      localStorage.setItem('huihui-settings', JSON.stringify({theme: 'dark', lang: 'en'}));
      localStorage.setItem('test-seeded', 'true');
    }
  }, {chat, saved});
  await page.goto('/hui/');
  await expect(page.locator('#main-status')).toHaveAttribute('data-state', 'ok');
}

test('drafts stay with their chat and survive reload', async ({page}) => {
  await boot(page);
  await page.locator('#prompt').fill('New chat draft');
  await page.getByRole('button', {name: chat.title, exact: true}).click();
  await expect(page.locator('#prompt')).toHaveValue('');
  await page.locator('#prompt').fill('Saved chat draft');
  await page.locator('#new-chat').click();
  await expect(page.locator('#prompt')).toHaveValue('New chat draft');
  await page.reload();
  await expect(page.locator('#prompt')).toHaveValue('New chat draft');
  await page.getByRole('button', {name: chat.title, exact: true}).click();
  await expect(page.locator('#prompt')).toHaveValue('Saved chat draft');
});

test('stream consumes final event without a newline and saves the answer', async ({page}) => {
  await boot(page, false);
  await page.locator('#prompt').fill('Hello');
  await page.locator('#prompt').press('Enter');
  await expect(page.locator('.msg.assistant > .md')).toHaveText('A complete answer');
  await expect(page.locator('#composer')).not.toHaveClass(/busy/);
  await page.reload();
  await expect(page.locator('.msg.assistant > .md')).toHaveText('A complete answer');
});

test('errors offer retry and partial answers survive an interrupted stream', async ({page}) => {
  await boot(page, false);
  await page.route('**/hui/api/chat', route => route.fulfill({body:
    JSON.stringify({type: 'delta', content: 'Partial answer'}) + '\n' + JSON.stringify({type: 'error', error: 'Test interruption'})}));
  await page.locator('#prompt').fill('Hello'); await page.locator('#send').click();
  await expect(page.locator('.error-box')).toContainText('Test interruption');
  await expect(page.locator('.msg.assistant > .md')).toHaveText('Partial answer');
  await expect(page.locator('.meta')).toContainText('connection interrupted');
  await page.route('**/hui/api/chat', route => route.fulfill({body: JSON.stringify({type: 'delta', content: 'Recovered answer'})}));
  await page.getByRole('button', {name: 'Retry', exact: true}).click();
  await expect(page.locator('.msg.assistant > .md')).toHaveText('Recovered answer');
  await expect(page.locator('.error-box')).toHaveCount(0);
});

test('delete can be undone and settings radios work with arrow keys', async ({page}) => {
  await boot(page);
  const item = page.locator('.chat-item'); await item.hover();
  await item.getByRole('button', {name: 'Delete', exact: true}).click();
  await expect(item).toHaveCount(0);
  await page.getByRole('button', {name: 'Undo'}).click();
  await expect(page.locator('#chat-title')).toHaveText(chat.title);
  await page.locator('#settings-top').click();
  await page.locator('#theme-picker [data-value="dark"]').focus();
  await page.keyboard.press('ArrowLeft');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.locator('#lang-picker [data-value="ru"]').click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
  await expect(page.locator('[data-pwa-signout]')).toHaveText('Выйти');
  await page.keyboard.press('Escape');
  await expect(page.locator('#settings')).not.toBeVisible();
});

test('offline has reconnect feedback without losing the draft', async ({page}) => {
  await boot(page, false);
  await page.locator('#prompt').fill('Keep my draft');
  await page.route('**/hui/api/health', route => route.abort());
  await page.evaluate(() => window.dispatchEvent(new Event('offline')));
  await expect(page.locator('#connection')).toBeVisible();
  await expect(page.locator('#prompt')).toHaveValue('Keep my draft');
  await page.route('**/hui/api/health', route => route.fulfill({json: {ollama: true, model: true}}));
  await page.locator('#reconnect').click();
  await expect(page.locator('#connection')).toBeHidden();
});

test.describe('mobile', () => {
  test.use({viewport: {width: 390, height: 844}, isMobile: true, hasTouch: true});
  test('Enter inserts a newline; sidebar traps focus and restores it', async ({page}) => {
    await boot(page);
    await page.locator('#prompt').fill('First line');
    await page.locator('#prompt').press('Enter');
    await expect(page.locator('#prompt')).toHaveValue('First line\n');
    await expect(page.locator('.msg.user')).toHaveCount(0);
    await page.locator('#expand').click();
    await expect(page.locator('#sidebar')).toHaveAttribute('aria-modal', 'true');
    await page.locator('#collapse').focus(); await page.keyboard.press('Shift+Tab');
    await expect(page.locator('#open-settings')).toBeFocused();
    await page.keyboard.press('Tab'); await expect(page.locator('#collapse')).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(page.locator('#expand')).toBeFocused();
    await page.locator('#send').click();
    await expect(page.locator('.msg.assistant > .md')).toHaveText('A complete answer');
  });
});

test('bulk deletion requires confirmation and removes legacy history and drafts', async ({page}) => {
  await boot(page);
  await page.locator('#prompt').fill('A draft');
  await page.evaluate(() => localStorage.setItem('huihui-chat-history-v1', '[{"role":"user","content":"legacy"}]'));
  await page.locator('#settings-top').click(); await page.locator('#wipe').click();
  await expect(page.locator('#confirm-delete')).toBeVisible();
  await expect(page.locator('#cancel-delete')).toBeFocused();
  await page.locator('#cancel-delete').click();
  await expect(page.locator('.chat-item')).toHaveCount(1);
  await page.locator('#wipe').click(); await page.locator('#confirm-wipe').click();
  await expect(page.locator('.chat-item')).toHaveCount(0);
  await expect(page.locator('#prompt')).toHaveValue('');
  await page.reload();
  await expect(page.locator('.chat-item')).toHaveCount(0);
  await expect(page.locator('#prompt')).toHaveValue('');
});

test('search, rename, edit and Markdown export work together', async ({page}) => {
  await boot(page);
  await page.locator('#search').fill('Original answer');
  await expect(page.locator('.chat-item')).toHaveCount(1);
  await page.locator('.chat-item').hover(); await page.getByRole('button', {name: 'Rename', exact: true}).click();
  await page.locator('.chat-item input').fill('Renamed conversation'); await page.locator('.chat-item input').press('Enter');
  await page.getByRole('button', {name: 'Renamed conversation', exact: true}).click();
  await page.locator('.msg.user').hover(); await page.locator('.msg.user [data-act="edit"]').click();
  await expect(page.locator('.edit-warning')).toContainText('replaces the answers');
  await page.locator('.edit-box textarea').fill('An edited question'); await page.locator('.edit-box .primary').click();
  await expect(page.locator('.msg.user .bubble')).toHaveText('An edited question');
  await expect(page.locator('.msg.assistant > .md')).toHaveText('A complete answer');
  const download = page.waitForEvent('download'); await page.locator('#export').click();
  expect((await download).suggestedFilename()).toMatch(/\.md$/);
});

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`layout fits at ${width}px in both themes`, async ({page}) => {
    await page.setViewportSize({width, height: 900}); await boot(page, false);
    for (const theme of ['dark', 'light']) {
      await page.locator('#settings-top').click(); await page.locator(`#theme-picker [data-value="${theme}"]`).click();
      await page.keyboard.press('Escape');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      const composer = await page.locator('#composer').boundingBox();
      expect(composer!.x).toBeGreaterThanOrEqual(0); expect(composer!.x + composer!.width).toBeLessThanOrEqual(width);
      const send = await page.locator('#send').boundingBox(); expect(send!.y + send!.height).toBeLessThanOrEqual(900);
    }
  });
}

test.describe('mobile keyboard geometry', () => {
  test.use({viewport: {width: 390, height: 844}, isMobile: true, hasTouch: true});
  test('focus and keyboard viewport changes keep the editor height stable', async ({page}) => {
    await boot(page, false);
    await page.locator('#prompt').fill('A draft with\nseveral lines\nthat stays put');
    const original = await page.locator('#prompt').boundingBox();
    // Model iOS visual viewport height + pan changes independently of layout viewport.
    await page.evaluate(() => {
      const viewport = Object.assign(new EventTarget(), {height: 844, offsetTop: 0, scale: 1});
      Object.defineProperty(window, 'visualViewport', {configurable: true, value: viewport});
      Object.assign(window, {testViewport: viewport});
      viewport.addEventListener('resize', () => window.dispatchEvent(new Event('resize')));
      viewport.addEventListener('scroll', () => window.dispatchEvent(new Event('resize')));
    });
    for (const [height, top] of [[510, 0], [480, 32], [510, 0], [844, 0]]) {
      await page.evaluate(({height, top}) => {
        const viewport = (window as unknown as {testViewport: EventTarget & {height: number; offsetTop: number}}).testViewport;
        viewport.height = height; viewport.offsetTop = top; viewport.dispatchEvent(new Event('resize')); viewport.dispatchEvent(new Event('scroll'));
      }, {height, top});
      await expect(page.locator('html')).toHaveCSS('--app-height', `${height}px`);
      const prompt = await page.locator('#prompt').boundingBox(); const composer = await page.locator('#composer').boundingBox();
      expect(prompt!.height).toBeCloseTo(original!.height, 0);
      expect(composer!.y + composer!.height).toBeLessThanOrEqual(height + top);
      expect(await page.evaluate(() => scrollY)).toBe(0);
    }
    await page.locator('#prompt').focus();
    await expect(page.locator('#prompt')).toHaveValue('A draft with\nseveral lines\nthat stays put');
    await page.evaluate(() => {
      const viewport = (window as unknown as {testViewport: EventTarget & {height: number; offsetTop: number}}).testViewport;
      viewport.height = 510; viewport.offsetTop = 32; viewport.dispatchEvent(new Event('resize'));
    });
    await expect(page.locator('html')).toHaveCSS('--app-height', '510px');
    await page.locator('#settings-top').click();
    const sheet = await page.locator('#settings').boundingBox();
    expect(sheet!.y).toBeGreaterThanOrEqual(32);
    expect(sheet!.y + sheet!.height).toBeLessThanOrEqual(542);
    await expect(page.locator('#instructions')).toHaveCSS('font-size', '16px');
  });
});

test('chat and settings pass accessibility checks in both themes', async ({page}) => {
  const {default: AxeBuilder} = await import('@axe-core/playwright');
  await boot(page, false);
  for (const theme of ['dark', 'light']) {
    await page.locator('#settings-top').click(); await page.locator(`#theme-picker [data-value="${theme}"]`).click();
    await expect(page.locator('html')).not.toHaveClass(/theme-switching/);
    let results = await new AxeBuilder({page}).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(results.violations).toEqual([]);
    await page.keyboard.press('Escape');
    results = await new AxeBuilder({page}).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(results.violations).toEqual([]);
  }
});

test('image preparation stays with its draft and enforces the attachment limit', async ({page}) => {
  await boot(page);
  await page.evaluate(() => {
    const decode = window.createImageBitmap.bind(window);
    window.createImageBitmap = ((...args: Parameters<typeof createImageBitmap>) => new Promise(resolve => setTimeout(resolve, 200)).then(() => Reflect.apply(decode, window, args))) as typeof createImageBitmap;
  });
  const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAADUlEQVR4AWJigAI4AwAAAP//Y0HangAAAAZJREFUAwAASAAFuIFDmQAAAABJRU5ErkJggg==', 'base64');
  const image = {name: 'fixture.png', mimeType: 'image/png', buffer: png};
  await page.locator('#file').setInputFiles([image, image, image, image, image]);
  await expect(page.locator('#attachment-status')).toContainText('Preparing');
  await expect(page.locator('#send')).toBeDisabled();
  await page.getByRole('button', {name: chat.title, exact: true}).click();
  await expect(page.locator('.thumb')).toHaveCount(0);
  await page.locator('#new-chat').click();
  await expect(page.locator('.thumb')).toHaveCount(4);
  await expect(page.locator('#attachment-status')).toBeEmpty();
  await page.locator('.thumb button').first().click(); await expect(page.locator('.thumb')).toHaveCount(3);
});

test('stop restores the composer and preserves the next draft', async ({page}) => {
  await boot(page, false);
  await page.route('**/hui/api/chat', async route => {
    await new Promise(resolve => setTimeout(resolve, 800));
    await route.fulfill({body: JSON.stringify({type: 'delta', content: 'Late answer'})}).catch(() => {});
  });
  await page.locator('#prompt').fill('First request'); await page.locator('#send').click();
  await expect(page.locator('#composer')).toHaveClass(/busy/);
  await page.locator('#prompt').fill('Next draft'); await page.locator('#send').click();
  await expect(page.locator('#composer')).not.toHaveClass(/busy/);
  await expect(page.locator('#prompt')).toHaveValue('Next draft');
  await expect(page.locator('.msg.assistant')).toHaveCount(0);
});

test('storage quota cleanup does not remove images from the outgoing request', async ({page}) => {
  await boot(page, false);
  const image = {name: 'fixture.png', mimeType: 'image/png', buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAADUlEQVR4AWJigAI4AwAAAP//Y0HangAAAAZJREFUAwAASAAFuIFDmQAAAABJRU5ErkJggg==', 'base64')};
  await page.locator('#file').setInputFiles(image);
  await expect(page.locator('.thumb')).toHaveCount(1);
  await page.evaluate(() => {
    const write = Storage.prototype.setItem;
    Storage.prototype.setItem = function(key, value) {
      if (key === 'huihui-chats-v2' && JSON.parse(value).some((chat: {messages: {images?: string[]}[]}) => chat.messages.some(m => m.images?.length))) throw new DOMException('Test quota exceeded', 'QuotaExceededError');
      return write.call(this, key, value);
    };
  });
  const request = page.waitForRequest('**/hui/api/chat'); await page.locator('#send').click();
  expect((await request).postDataJSON().messages[0].images).toHaveLength(1);
  await expect(page.locator('.msg.assistant > .md')).toHaveText('A complete answer');
});

test('theme, accents and viewport sizing work with the production CSP', async ({page}) => {
  const {readFile} = await import('node:fs/promises');
  const source = await readFile('netlify/edge-functions/hui.ts', 'utf8');
  const policy = source.match(/"Content-Security-Policy": "([^"]+)"/)![1];
  await page.route('**/hui/', async route => {
    const response = await route.fetch();
    await route.fulfill({response, headers: {...response.headers(), 'Content-Security-Policy': policy}});
  });
  await boot(page, false);
  await page.locator('#settings-top').click();
  await expect(page.locator('#accent-picker [data-value="lime"]')).toHaveCSS('background-color', 'rgb(198, 243, 91)');
  await page.locator('#accent-picker [data-value="sky"]').click();
  await expect(page.locator('html')).toHaveAttribute('data-accent', 'sky');
  await page.locator('#theme-picker [data-value="light"]').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.keyboard.press('Escape');
  await page.locator('#prompt').fill('CSP allows the editor to resize\nfor multiple lines');
  expect((await page.locator('#prompt').boundingBox())!.height).toBeGreaterThan(40);
});
