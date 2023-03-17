import { FieldConfig, validateFields } from "./index"
import { IValidateFormParams, TValidateFormReturnValue } from "./validateFields"

describe("validate", () => {
  test.each<{
    input: IValidateFormParams
    output: TValidateFormReturnValue
  }>([
    {
      input: {
        rules: {
          firstName: new FieldConfig({ type: "string" }),
        },
        values: {
          firstName: "",
        },
      },
      output: {},
    },
    {
      input: {
        rules: {
          firstName: new FieldConfig({ type: "string" }).isRequired(),
        },
        values: {
          firstName: "",
        },
      },
      output: {
        firstName: "Обязательное поле.",
      },
    },
    {
      input: {
        rules: {
          firstName: new FieldConfig({ type: "string" }),
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
          firstName: new FieldConfig({ type: "string" }).minimumLength(10),
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
          firstName: new FieldConfig({ type: "string" }).maximumLength(10),
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
          firstName: new FieldConfig({ type: "string" }).prohibitedWords(["блин", "чудак"]),
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
    expect(validateFields(input)).toEqual(output)
  })
})
