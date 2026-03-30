import viteReact from "@vitejs/plugin-react";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [viteReact()],
  test: {
    exclude: [...configDefaults.exclude, "e2e/**/*"],
    environment: "happy-dom",
    setupFiles: ["happy-dom.setup.ts"],
  },
});
