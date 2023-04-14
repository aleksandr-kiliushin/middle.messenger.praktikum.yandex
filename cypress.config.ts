import { defineConfig } from "cypress"

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:1234",
    viewportHeight: 800,
    viewportWidth: 800,
  },
})
