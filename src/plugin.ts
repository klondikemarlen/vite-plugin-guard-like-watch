import { Plugin } from "rollup"

export type Watcher =
  | {
      pattern: RegExp | string
      action: (match: RegExpMatchArray, id: string) => string[]
      debug?: boolean
    }
  | [
      pattern: RegExp | string,
      action: (match: RegExpMatchArray, id: string) => string[],
      debug?: boolean,
    ]

/**
 * A Vite plugin that allows you to watch additional files when a file changes.
 *
 * Example:
 * ```ts
 * guardLikeWatch([[/(.*\/example)\.ts/, (match) => [`${match[1]}.html`, `${match[1]}.txt`], true]]),
 * ```
 * or
 * ```ts
 * guardLikeWatch([
 *  {
 *    pattern: /(.*\/example)\.ts/,
 *    action: (match) => [`${match[1]}.html`, `${match[1]}.txt`],
 *    debug: true,
 *   },
 * ])
 * ```
 */
export function guardLikeWatch(watchers: Watcher[]): Plugin {
  return {
    name: "vite-plugin-guard-like-watch",
    transform(_code, id) {
      for (const watcher of watchers) {
        const pattern = Array.isArray(watcher) ? watcher[0] : watcher.pattern
        const regexp = new RegExp(pattern)
        const match = id.match(regexp)
        if (match === null || match === undefined) return

        const action = Array.isArray(watcher) ? watcher[1] : watcher.action
        const filesToWatch = action(match, id)

        const debug = Array.isArray(watcher) ? watcher[2] : watcher.debug
        if (debug) {
          console.debug(
            `\nguard-like-watch:\n` +
              ` -> test file (id): ${id}\n` +
              ` -> additional files that will trigger this test to re-run:\n` +
              filesToWatch.map((file) => `    - ${file}`).join("\n")
          )
        }

        for (const file of filesToWatch) {
          this.addWatchFile(file)
        }
      }
    },
  }
}

export default guardLikeWatch
