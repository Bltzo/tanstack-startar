import { paraglideVitePlugin } from "@inlang/paraglide-js";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { nitroV2Plugin } from "@tanstack/nitro-v2-vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    devtools(), // Keep it first in the plugins array. (https://tanstack.com/devtools/latest/docs/quick-start)
    tanstackStart(),
    viteReact({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/i18n",
    }),
    nitroV2Plugin({ preset: "node-server" }),
    viteTsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
  ],
});
