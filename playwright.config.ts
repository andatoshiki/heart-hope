import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: "http://127.0.0.1:4321",
    viewport: { width: 1440, height: 900 },
  },
  webServer: {
    command: "pnpm dev --host 127.0.0.1",
    port: 4321,
    reuseExistingServer: true,
  },
});
