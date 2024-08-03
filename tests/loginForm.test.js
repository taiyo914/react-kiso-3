// tests/loginForm.test.js
import { test, expect } from '@playwright/test';

test('@のないメールアドレスに対してエラーメッセージが出る', async ({ page }) => {
  await page.goto('/');
  
  await page.fill('input[type="email"]', 'invalid-email');
  await page.fill('input[type="password"]', 'password123');
  await page.click('button[type="submit"]');

  // デバッグ用にスクリーンショットを撮る
  // await page.screenshot({ path: 'invalid-email.png' });

  const errorMessage = page.locator('text=有効なメールアドレスではありません');
    //awaitが必要ないのは.locatorメソッドが同期処理だから
  await expect(errorMessage).toBeVisible();
});

test('6文字未満のパスワードに対してエラーメッセージが出る', async ({ page }) => {
  await page.goto('/');
  
  await page.fill('input[type="email"]', 'test@example.com');
  await page.fill('input[type="password"]', '123');
  await page.click('button[type="submit"]');
  
  const errorMessage = page.locator('text=パスワードは6文字以上で入力してください');
  await expect(errorMessage).toBeVisible();
});

test('有効なメールアドレスとパスワードに対してエラーメッセージが出ない', async ({ page }) => {
  await page.goto('/');
  
  await page.fill('input[type="email"]', 'test@example.com');
  await page.fill('input[type="password"]', 'password123');
  await page.click('button[type="submit"]');
  
  const emailError = page.locator('text=有効なメールアドレスではありません');
  const passwordError = page.locator('text=パスワードは6文字以上で入力してください');
  await expect(emailError).toHaveCount(0);
  await expect(passwordError).toHaveCount(0);
});
