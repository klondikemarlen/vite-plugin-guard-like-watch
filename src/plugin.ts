import { Plugin } from "rollup"

export type WatchPattern = RegExp | string
export type WatchAction = (match: RegExpMatchArray, id: string) => string[]
export type WatchOptions = {
  pattern: WatchPattern
  action: WatchAction
  debug?: boolean
}

/**
 * A Vite plugin that allows you to watch additional files when a file changes.
 *
 * Example:
 * ```ts
 * guardLikeWatch(/(.*\/example)\.ts/, (match) => [`${match[1]}.html`, `${match[1]}.txt`], true),
 * ```
 * or
 * ```ts
 * guardLikeWatch({
 *    pattern: /(.*\/example)\.ts/,
 *    action: (match) => [`${match[1]}.html`, `${match[1]}.txt`],
 *    debug: true,
 * })
 * ```
 *
 * If you want multiple patterns, just make use a separate `guardLikeWatch` plugin useage for each pattern.
 */
function guardLikeWatch(pattern: WatchPattern, action: WatchAction, debug?: boolean): Plugin
function guardLikeWatch(watch: WatchOptions): Plugin
function guardLikeWatch(
  watchOptionsOrWatchPattern: WatchOptions | WatchPattern,
  maybeAction?: WatchAction,
  maybeDebug?: boolean
): Plugin {
  let pattern: WatchPattern
  let action: WatchAction
  let debug: boolean
  if (isWatchOptions(watchOptionsOrWatchPattern)) {
    const watchOptions = watchOptionsOrWatchPattern
    pattern = watchOptions.pattern
    action = watchOptions.action
    debug = watchOptions.debug ?? false
  } else {
    pattern = watchOptionsOrWatchPattern
    if (maybeAction === undefined) {
      throw new Error("Expected the second argument to be a WatchAction function.")
    }
    action = maybeAction
    debug = maybeDebug ?? false
  }

  return {
    name: "vite-plugin-guard-like-watch",
    transform(_code, id) {
      const regexp = new RegExp(pattern)
      const match = id.match(regexp)
      if (match === null || match === undefined) return

      const filesToWatch = action(match, id)

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
    },
  }
}

function isWatchOptions(watch: WatchOptions | WatchPattern): watch is WatchOptions {
  if (typeof watch === "object" && "pattern" in watch && "action" in watch) {
    return true
  }

  return false
}

export default guardLikeWatch
