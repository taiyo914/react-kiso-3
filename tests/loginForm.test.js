// tests/loginForm.test.js
import { test, expect } from '@playwright/test';

test('shows error message on invalid email', async ({ page }) => {
  await page.goto('/');
  
  await page.fill('input[type="email"]', 'invalid-email');
  await page.fill('input[type="password"]', 'password123');
  await page.click('button[type="submit"]');

  // デバッグ用にスクリーンショットを撮る
  // await page.screenshot({ path: 'invalid-email.png' });

  const errorMessage = page.locator('text=Invalid email address');
    //awaitが必要ないのは.locatorメソッドが同期処理だから
  await expect(errorMessage).toBeVisible();
});

test('shows error message on short password', async ({ page }) => {
  await page.goto('/');
  
  await page.fill('input[type="email"]', 'test@example.com');
  await page.fill('input[type="password"]', '123');
  await page.click('button[type="submit"]');
  
  const errorMessage = page.locator('text=Password must be at least 6 characters long');
  await expect(errorMessage).toBeVisible();
});

test('does not show error message when inputs are valid', async ({ page }) => {
  await page.goto('/');
  
  await page.fill('input[type="email"]', 'test@example.com');
  await page.fill('input[type="password"]', 'password123');
  await page.click('button[type="submit"]');
  
  const emailError = page.locator('text=Invalid email address');
  const passwordError = page.locator('text=Password must be at least 6 characters long');
  await expect(emailError).toHaveCount(0);
  await expect(passwordError).toHaveCount(0);
});
