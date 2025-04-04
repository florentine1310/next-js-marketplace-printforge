import { expect, test } from '@playwright/test';

test('login test', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('/login');
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Email' }).fill('admin@test.at');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin');
  await page
    .getByRole('group', { name: 'User Login' })
    .getByRole('button')
    .click();
  await page.waitForURL('/profile/Admin');
  await expect(
    page.getByRole('heading', { name: 'User Admin Area' }),
  ).toBeVisible();
});
