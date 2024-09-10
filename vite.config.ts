/// <reference types="vitest/config" />

import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import tsconfigPaths from "vite-tsconfig-paths"

import guardLikeWatch from "./src/plugin"

// Configure Vitest (https://vitest.dev/config/)
export default defineConfig({
  plugins: [
    tsconfigPaths({
      root: ".",
      projects: ["./tsconfig.json", "./tests/tsconfig.json"],
    }),
    dts({
      include: ["src/**/*.ts"],
      outDir: "dist/types",
    }),
    guardLikeWatch(/(.*\/example)\.ts/, (match) => [`${match[1]}.html`, `${match[1]}.txt`], true),
    guardLikeWatch({
      pattern: /(.*)\/example\/example\.ts/,
      action: (match) => [`${match[1]}/src/plugin.ts`],
      debug: true,
    }),
  ],
  build: {
    lib: {
      entry: "./src/plugin.ts",
      name: "VitePluginGuardLikeWatch",
      fileName: "vite-plugin-guard-like-watch",
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: ["vite"],
    },
  },
  test: {
    globals: true,
    root: ".",
    globalSetup: "./tests/global-setup.ts",
    setupFiles: ["./tests/setup.ts"],
    // Mocking
    clearMocks: true,
    mockReset: true,
    restoreMocks: true,
    unstubEnvs: true,
    unstubGlobals: true,
  },
})
