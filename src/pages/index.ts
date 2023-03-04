import { sum } from "../utils/sum"

const root = document.querySelector("#root")
if (root instanceof HTMLDivElement) {
  root.textContent = sum(6, -1).toString()
}
