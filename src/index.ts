import { App } from "./App"
import "./styles"

const root = document.querySelector("#root")

if (root === null) {
  throw new Error("#root is not found.")
}

root.innerHTML = App()
