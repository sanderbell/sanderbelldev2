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
