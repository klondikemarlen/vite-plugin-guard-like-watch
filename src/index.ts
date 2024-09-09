import { Plugin } from "rollup"

export function guardLikeWatch(): Plugin {
  return {
    name: "vite-plugin-guard-like-watch",
    transform(_code, id) {
      console.log(`id:`, id)
    }
  }
}

export default guardLikeWatch
