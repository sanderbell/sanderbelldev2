import {test, expect, type Page} from '@playwright/test';
import {build} from 'esbuild';
import {resolve} from 'node:path';
import AxeBuilder from '@axe-core/playwright';

let loginBundle: string;
test.beforeAll(async () => {
  const result = await build({entryPoints: ['src/hui-login.ts'], bundle: true, format: 'esm', write: false,
    plugins: [{name: 'identity-fixture', setup(builder) {
      builder.onResolve({filter: /^@netlify\/identity$/}, () => ({path: resolve('tests/fixtures/identity.ts')}));
    }}],
  });
  loginBundle = result.outputFiles[0].text;
});
async function loginPage(page: Page, mode: 'anonymous' | 'pin' | 'recovery' | 'invite' = 'anonymous') {
  await page.route('**/hui/login.js', route => route.fulfill({body: loginBundle, contentType: 'text/javascript'}));
  await page.route('**/hui/pwa.js', route => route.fulfill({body: ''}));
  await page.addInitScript(mode => {
    Object.assign(window, {huiAuthFixture: {
      user: mode === 'pin' || mode === 'recovery' ? {email: 'owner@example.test'} : null,
      callback: mode === 'recovery' ? {type: 'recovery'} : mode === 'invite' ? {type: 'invite', token: 'test-only-token'} : null,
      calls: [],
    }});
  }, mode);
  await page.goto('/hui/login');
  await expect(page.locator('#submit')).toBeEnabled();
}

test('sign-in validates inputs, shows the PIN step and handles incorrect PIN', async ({page}) => {
  await loginPage(page);
  await page.locator('#email').fill('owner@example.test');
  await page.locator('#password').fill('test-password');
  await page.locator('#show-password').click();
  await expect(page.locator('#password')).toHaveAttribute('type', 'text');
  await page.locator('#submit').click();
  await expect(page.locator('#pin')).toBeVisible();
  await expect(page.locator('#identity')).toBeHidden();
  await expect(page.locator('#password')).toBeDisabled();
  await page.route('**/hui/unlock', route => route.fulfill({status: 403, body: 'Invalid PIN'}));
  await page.locator('#pin').fill('9999'); await page.locator('#submit').click();
  await expect(page.locator('#message')).toContainText('Incorrect PIN');
  await expect(page.locator('#pin')).toHaveValue('');
  await page.route('**/hui/lock', route => route.fulfill({json: {}}));
  await page.locator('#switch-account').click();
  await expect(page.locator('#email')).toBeVisible();
  await expect(page.locator('#pin')).toBeDisabled();
});

for (const mode of ['recovery', 'invite'] as const) {
  test(`${mode} callback sets a new password before unlocking`, async ({page}) => {
    await loginPage(page, mode);
    await expect(page.locator('#email')).toBeHidden();
    await expect(page.locator('#email')).toBeDisabled();
    await expect(page.locator('#password')).toHaveAttribute('autocomplete', 'new-password');
    await page.locator('#password').fill('new-test-password');
    await page.locator('#submit').click();
    await expect(page.locator('#pin')).toBeVisible();
    await expect(page.locator('#message')).toContainText('Password saved');
  });
}

test('forgot password requires an email and describes the recovery link accurately', async ({page}) => {
  await loginPage(page);
  await page.locator('#email-link').click();
  await expect(page.locator('#message')).toContainText('Enter your account email');
  await page.locator('#email').fill('owner@example.test');
  await page.locator('#email-link').click();
  await expect(page.locator('#message')).toContainText('password reset link has been sent');
});

test('login accessibility checks pass at a narrow viewport', async ({page}) => {
  await page.setViewportSize({width: 320, height: 568}); await loginPage(page);
  const results = await new AxeBuilder({page}).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  expect(results.violations).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
