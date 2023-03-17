import { validateForm, FieldValidator } from "./form-validator"

describe("validateForm", () => {
  test("string()", () => {
    expect(
      validateForm({
        rules: { firstName: new FieldValidator().string() },
        values: { firstName: 123 },
      })
    ).toEqual({
      firstName: "Должно быть строкой.",
    })
  })
})
