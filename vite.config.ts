import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { nitroV2Plugin } from "@tanstack/nitro-v2-vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    nitroV2Plugin({ preset: "node-server" }),

    tanstackStart({
      srcDirectory: "./app",
    }),
    viteReact(),
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./app/i18n",
    }),
  ],
});
