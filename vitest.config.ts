import viteReact from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [viteReact(), viteTsConfigPaths({ projects: ["./tsconfig.json"] })],
  test: {
    exclude: [...configDefaults.exclude, "e2e/**/*"],
    environment: "happy-dom",
    setupFiles: ["happy-dom.setup.ts"],
  },
});
