/// <reference types="vitest/config" />

// Configure Vitest (https://vitest.dev/config/)

import { defineConfig } from "vite"

import { guardLikeWatch } from "./src/index"

export default defineConfig({
  plugins: [guardLikeWatch()],
  test: {
    globals: true,
  },
})
