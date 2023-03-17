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
          firstName: "Привет.",
        },
      },
      output: {},
    },
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
    {
      input: {
        rules: {
          firstName: new FieldValidator({ type: "string" }).minimumLength(10),
        },
        values: {
          firstName: "Привет.",
        },
      },
      output: {
        firstName: "Не менее 10 символов.",
      },
    },
    {
      input: {
        rules: {
          firstName: new FieldValidator({ type: "string" }).maximumLength(10),
        },
        values: {
          firstName: "Привет, мир.",
        },
      },
      output: {
        firstName: "Не более 10 символов.",
      },
    },
    {
      input: {
        rules: {
          firstName: new FieldValidator({ type: "string" }).prohibitedWords(["блин", "чудак"]),
        },
        values: {
          firstName: "Привет, чудак.",
        },
      },
      output: {
        firstName: "Нецензурная лексика запрещена.",
      },
    },
  ])("$output", async ({ input, output }) => {
    expect(validateForm(input)).toEqual(output)
  })
})
