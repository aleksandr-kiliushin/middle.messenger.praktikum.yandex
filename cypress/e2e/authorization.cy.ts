import { testUsers } from "@cypress/constants/test-users"

describe("Authorization", () => {
  it("signing up", () => {
    cy.visit("/sign-up")
    cy.get('input[name="email"]').type(testUsers.johnDoe.email)
    cy.get('input[name="login"]').type(testUsers.johnDoe.login)
    cy.get('input[name="first_name"]').type(testUsers.johnDoe.first_name)
    cy.get('input[name="second_name"]').type(testUsers.johnDoe.second_name)
    cy.get('input[name="phone"]').type(testUsers.johnDoe.phone)
    cy.get('input[name="password"]').type(testUsers.johnDoe.password)
    cy.get('input[name="passwordConfirmation"]').type(testUsers.johnDoe.password)

    cy.intercept("POST", "https://ya-praktikum.tech/api/v2/auth/signup", { fixture: "registration.json" })
    cy.get("button").contains("Зарегистрироваться").click()

    cy.url().should("equal", "http://localhost:1234/messenger")
  })

  it("signing in", () => {
    cy.visit("/")
    cy.get('input[name="login"]').type(testUsers.johnDoe.login)
    cy.get('input[name="password"]').type(testUsers.johnDoe.password)

    cy.intercept("POST", "https://ya-praktikum.tech/api/v2/auth/signin", { statusCode: 200 })
    cy.get("button").contains("Войти").click()

    cy.url().should("equal", "http://localhost:1234/messenger")
  })

  it("signing out", () => {
    cy.intercept("GET", "https://ya-praktikum.tech/api/v2/auth/user", { fixture: "john-doe.json" })
    cy.visit("/profile")

    cy.intercept("POST", "https://ya-praktikum.tech/api/v2/auth/logout", { statusCode: 200 })
    cy.get("button").contains("Выйти").click()

    cy.url().should("equal", "http://localhost:1234/")
  })
})
