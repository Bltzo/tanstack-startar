import { defineConfig } from "vitest/config";

export default [
  "vitest.config.ts",
  defineConfig({
    test: {
      include: ["**/*.browser.{test,spec}.{ts,tsx}"],
      name: "browser",
      browser: {
        enabled: false,
        name: "chromium",
        // @ts-expect-error - Vitest browser provider types issue
        provider: "playwright",
      },
    },
  }),
];
