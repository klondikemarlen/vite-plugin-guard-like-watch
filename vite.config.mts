/// <reference types="vitest/config" />

import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

import { guardLikeWatch } from "./src/plugin"

// Configure Vitest (https://vitest.dev/config/)
export default defineConfig({
  plugins: [
    tsconfigPaths({
      root: ".",
      projects: ["./tsconfig.json", "./tests/tsconfig.json"],
    }),
    guardLikeWatch([[/(.*\/example)\.ts/, (match) => [`${match[1]}.html`, `${match[1]}.txt`], true]]),
  ],
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
