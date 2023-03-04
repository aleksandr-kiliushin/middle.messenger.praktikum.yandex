import { sum } from "../utils/sum"

const root = document.querySelector("#chat-body")
if (root instanceof HTMLDivElement) {
  const calculationResult = sum(6, -1).toString()
  root.textContent = `6 + (-1) = ${calculationResult} (TypeScript works)`
}
