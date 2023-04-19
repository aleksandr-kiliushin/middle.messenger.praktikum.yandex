import { API_BASE_URL } from "@constants"

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
  cy.intercept("POST", API_BASE_URL + "/auth/signin", { statusCode: 200 })
  cy.intercept("POST", API_BASE_URL + "/auth/logout", { statusCode: 200 })
  cy.intercept("POST", API_BASE_URL + "/auth/signup", { fixture: "registration.json" })
  cy.intercept("GET", API_BASE_URL + "/auth/user", { fixture: "authorized-user.json" })
})
