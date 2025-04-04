import { expect, test } from '@playwright/test';

test('add to cart test', async ({ page }) => {
  await page.goto('/');

  // go to models page
  await page.getByRole('link', { name: '3D Models' }).click();
  await page.waitForURL('/models');
  await expect(
    page.getByRole('heading', { name: 'All 3D Models' }),
  ).toBeVisible();
  await page
    .locator('section div')
    .filter({ hasText: 'homeWall Hook OrganizerA' })
    .getByRole('button')
    .click();
  await page.waitForURL('/login?returnTo=models/2');
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
  await page.getByRole('link', { name: '3D Models' }).click();
  await page.waitForURL('/models');
  await expect(
    page.getByRole('heading', { name: 'All 3D Models' }),
  ).toBeVisible();
  await page.getByRole('link', { name: 'Wall Hook Organizer' }).click();
  await page.waitForURL('/models/2');
  await expect(
    page.getByRole('heading', { name: 'Wall Hook Organizer' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'printer Get It Printed' }).click();
  await page.getByRole('link', { name: 'cart' }).click();
  await page.waitForURL('/cart');
  await expect(
    page.getByRole('cell', { name: 'Wall Hook Organizer' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Proceed To Checkout' }).click();
  await page.waitForURL('/checkout');
  await expect(page.getByRole('heading', { name: 'Checkout' })).toBeVisible();
  await expect(
    page.getByRole('cell', { name: 'Wall Hook Organizer' }),
  ).toBeVisible();
});
