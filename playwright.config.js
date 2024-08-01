// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  webServer: {
    command: 'npm run dev', 
    port: 5173,
  },
  use: {
    baseURL: 'http://localhost:5173',
  },
});
