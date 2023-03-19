import { FieldConfig, validateFields } from "./index"
import { IValidateFieldsParams, FieldsValidationResult } from "./validateFields"

describe("validate", () => {
  test.each<{
    input: IValidateFieldsParams
    output: FieldsValidationResult["errorTextByFieldName"]
  }>([
    {
      input: {
        rules: { firstName: new FieldConfig({ type: "string" }) },
        values: { firstName: "" },
      },
      output: { firstName: null },
    },
    {
      input: {
        rules: {
          firstName: new FieldConfig({ type: "string" }).isRequired({ value: true }),
        },
        values: { firstName: "" },
      },
      output: { firstName: "Обязательное поле." },
    },
    {
      input: {
        rules: { firstName: new FieldConfig({ type: "string" }) },
        values: { firstName: 123 },
      },
      output: { firstName: "Должно быть строкой." },
    },
    {
      input: {
        rules: {
          firstName: new FieldConfig({ type: "string" }).minimumLength({ value: 10 }),
        },
        values: { firstName: "Привет." },
      },
      output: { firstName: "Не менее 10 символов." },
    },
    {
      input: {
        rules: {
          firstName: new FieldConfig({ type: "string" }).maximumLength({ value: 10 }),
        },
        values: { firstName: "Привет, мир." },
      },
      output: { firstName: "Не более 10 символов." },
    },
    {
      input: {
        rules: {
          firstName: new FieldConfig({ type: "string" }).prohibitedWords({
            errorText: "Нецензурная лексика запрещена.",
            value: ["блин", "чудак"],
          }),
        },
        values: { firstName: "Привет, чудак." },
      },
      output: { firstName: "Нецензурная лексика запрещена." },
    },
    {
      input: {
        rules: {
          email: new FieldConfig({ type: "string" }).matches({
            errorText: "Некорректный формат почты.",
            value: /[\w-]+@\w+\.\w+/g,
          }),
        },
        values: { email: "me@.com" },
      },
      output: { email: "Некорректный формат почты." },
    },
  ])("$output", async ({ input, output }) => {
    expect(validateFields(input).errorTextByFieldName).toEqual(output)
  })
})
