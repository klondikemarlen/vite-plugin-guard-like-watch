import { Plugin } from "rollup"

export type Watch =
  | {
      pattern: RegExp | string
      action: (match: RegExpMatchArray, id: string) => string[]
    }
  | [RegExp | string, (match: RegExpMatchArray, id: string) => string[]]

export function guardLikeWatch(watches: Watch[]): Plugin {
  return {
    name: "vite-plugin-guard-like-watch",
    transform(_code, id) {
      for (const watch of watches) {
        const pattern = Array.isArray(watch) ? watch[0] : watch.pattern
        const regexp = new RegExp(pattern)
        const match = id.match(regexp)
        if (match === null || match === undefined) return

        const action = Array.isArray(watch) ? watch[1] : watch.action
        const filesToWatch = action(match, id)
        for (const file of filesToWatch) {
          this.addWatchFile(file)
        }
      }
    },
  }
}

export default guardLikeWatch
