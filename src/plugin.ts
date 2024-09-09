import { Plugin } from "rollup"

export type Watcher =
  | {
      pattern: RegExp | string
      action: (match: RegExpMatchArray, id: string) => string[]
    }
  | [pattern: RegExp | string, action: (match: RegExpMatchArray, id: string) => string[]]

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
        for (const file of filesToWatch) {
          this.addWatchFile(file)
        }
      }
    },
  }
}

export default guardLikeWatch
