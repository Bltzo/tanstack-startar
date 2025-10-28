import { defineConfig } from "vitest/config";

export default [
  "vitest.config.ts",
  defineConfig({
    test: {
      include: ["**/*.browser.{test,spec}.{ts,tsx}"],
      name: "browser",
      browser: { enabled: false },
    },
  }),
];
