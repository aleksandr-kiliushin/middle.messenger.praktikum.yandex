import { validateForm, FieldValidator, IValidateFormParams, TValidateFormReturnValue } from "./form-validator"

describe("validateForm", () => {
  test.each<{
    input: IValidateFormParams
    output: TValidateFormReturnValue
  }>([
    {
      input: {
        rules: {
          firstName: new FieldValidator({ type: "string" }),
        },
        values: {
          firstName: 123,
        },
      },
      output: {
        firstName: "Должно быть строкой.",
      },
    },
  ])("$output", async ({ input, output }) => {
    expect(validateForm(input)).toEqual(output)
  })
})
