describe("Authorization", () => {
  describe("Registration", () => {
    it("case: the user inputs a username that is already taken", () => {
      cy.visit("/sign-up")
      cy.get('input[name="email"]').type("john_doe@yandex.ru")
      cy.get('input[name="login"]').type("john_doe")
      cy.get('input[name="first_name"]').type("John")
      cy.get('input[name="second_name"]').type("Doe")
      cy.get('input[name="phone"]').type("79801112233")
      cy.get('input[name="password"]').type("Qwerty123")
      cy.get('input[name="passwordConfirmation"]').type("Qwerty123")

      cy.intercept("POST", "https://ya-praktikum.tech/api/v2/auth/signup", { fixture: "registration.json" })
      cy.get("button").contains("Зарегистрироваться").click()

      cy.url().should("equal", "http://localhost:1234/messenger")
    })
  })
})
