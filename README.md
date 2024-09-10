# vite-plugin-guard-like-watch

A Vite plugin inspired by Ruby Guard's watch feature.

## Installation and Usage

```bash
npm install --save-dev vite-plugin-guard-like-watch
```

```ts
/// <reference types="vitest/config" />

// Configure Vitest (https://vitest.dev/config/)
import { defineConfig } from "vite"
import guardLikeWatch from "vite-plugin-guard-like-watch"

export default defineConfig({
  test: {
    /* for example, use global to avoid globals imports (describe, test, expect): */
    // globals: true,
  },
  plugins: [
    // Note: debug is optional, but you'll probably need it to get set up.
    guardLikeWatch(/(.*\/example)\.ts/, (match) => [`${match[1]}.html`, `${match[1]}.txt`], true),
    guardLikeWatch({
      pattern: /(.*)\/example\/example\.ts/,
      action: (match) => [`${match[1]}/src/vite-plugin-guard-like-watch.ts`],
      debug: true,
    }),
    // Relative paths will also work, though I'm not entirely sure of the implications. e.g.
    guardLikeWatch(
      /tests\/mailers\/(.*)\.test\.ts/,
      (match) => [`src/templates/${match[1]}.html`, `src/templates/${match[1]}.txt`],
      true
    ),
    guardLikeWatch({
      pattern: /tests\/mailers\/(.*)\.test\.ts/,
      action: (match) => [`src/templates/${match[1]}.html`, `src/templates/${match[1]}.txt`],
      debug: true,
    }),
    // You can also use a string instead of a RegExp. e.g.
    guardLikeWatch(
      "tests/mailers/*.test.ts",
      (match) => [`src/templates/${match[1]}.html`, `src/templates/${match[1]}.txt`],
      true
    ),
    guardLikeWatch({
      pattern: "tests/mailers/*.test.ts",
      action: (match) => [`src/templates/${match[1]}.html`, `src/templates/${match[1]}.txt`],
      debug: true,
    }),
  ],
})
```

## Development

1. Clone the repository.

   ```bash
   git clone git@github.com:klondikemarlen/vite-plugin-guard-like-watch.git
   ```

2. Install `asdf` and `asdf-nodejs`. See https://asdf-vm.com/guide/getting-started.html, for more details.

   ```bash
   git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.14.1
   asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git
   asdf install
   ```

3. Install dependencies.

   ```bash
   npm install
   ```

4. Run the tests.

   ```bash
   npm run test
   # or
   npm t(est)
   ```

## Deployment

Plugin located at https://www.npmjs.com/package/vite-plugin-guard-like-watch.

1. Login to npm.

   ```bash
   npm login
   ```

2. Publish the package.
   ```bash
   npm publish
   ```
