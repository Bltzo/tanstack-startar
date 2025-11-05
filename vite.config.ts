import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { nitroV2Plugin } from "@tanstack/nitro-v2-vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tanstackStart(),

    react({
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
  ],
});
