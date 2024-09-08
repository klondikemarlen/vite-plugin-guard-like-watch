import { Plugin } from "rollup"

export function guardLikeWatch(): Plugin {
  return {
    name: "vite-plugin-guard-like-watch",
    buildStart() {
      this.addWatchFile("path/to/file/or/folder")
    },
    handleHotUpdate({ file, server }) {
      console.log(`File changed: ${file}`)
      // Add custom HMR handling or full reload logic here
      server.ws.send({ type: "full-reload" })
    },
  }
}

export default guardLikeWatch
