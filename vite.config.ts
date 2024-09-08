/// <reference types="vitest/config" />

// Configure Vitest (https://vitest.dev/config/)

import { defineConfig, type Plugin } from "vite"

export default defineConfig({
  plugins: [],
  test: {
    globals: true,
  },
})
