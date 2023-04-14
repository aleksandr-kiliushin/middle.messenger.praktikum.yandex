// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
// Import commands.js using ES2015 syntax:
import "./commands"

// Alternatively you can use CommonJS syntax:
// require('./commands')

beforeEach(() => {
  localStorage.clear()
  cy.intercept("POST", "https://ya-praktikum.tech/api/v2/auth/signin", { statusCode: 200 })
  cy.intercept("POST", "https://ya-praktikum.tech/api/v2/auth/logout", { statusCode: 200 })
  cy.intercept("POST", "https://ya-praktikum.tech/api/v2/auth/signup", { fixture: "registration.json" })
  cy.intercept("GET", "https://ya-praktikum.tech/api/v2/auth/user", { fixture: "authorized-user.json" })
})
