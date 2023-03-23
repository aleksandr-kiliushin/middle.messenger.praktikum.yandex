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
    {
      input: {
        rules: {
          phone: new FieldConfig({ type: "string" })
            .isRequired({ value: true })
            .minimumLength({ value: 10 })
            .maximumLength({ value: 15 })
            .matches({
              errorText: "Должен состоять из цифр, может начинается с плюса.",
              value: /^(\+?)\d+$/,
            }),
        },
        values: { phone: "hehe" },
      },
      output: { phone: "Не менее 10 символов." },
    },
    {
      input: {
        rules: {
          phone: new FieldConfig({ type: "string" })
            .isRequired({ value: true })
            .minimumLength({ value: 10 })
            .maximumLength({ value: 15 })
            .matches({
              errorText: "Должен состоять из цифр, может начинается с плюса.",
              value: /^(\+?)\d+$/,
            }),
        },
        values: { phone: "hehehehehehehehehehehehehe" },
      },
      output: { phone: "Не более 15 символов." },
    },
    {
      input: {
        rules: {
          phone: new FieldConfig({ type: "string" })
            .isRequired({ value: true })
            .minimumLength({ value: 10 })
            .maximumLength({ value: 15 })
            .matches({
              errorText: "Должен состоять из цифр, может начинается с плюса.",
              value: /^(\+?)\d+$/,
            }),
        },
        values: { phone: "heheheheheheh" },
      },
      output: { phone: "Должен состоять из цифр, может начинается с плюса." },
    },
    {
      input: {
        rules: {
          first_name: new FieldConfig({ type: "string" })
            .isRequired({ value: true })
            .matches({
              errorText: "Должно начинаться с большой буквы.",
              value: /^[А-ЯA-Z]/g,
            })
            .matches({
              errorText: "Из символов разрешен только дефис.",
              value: /^[А-ЯA-Z-]+$/g,
            }),
        },
        values: { first_name: "" },
      },
      output: { first_name: "Обязательное поле." },
    },
    {
      input: {
        rules: {
          first_name: new FieldConfig({ type: "string" })
            .isRequired({ value: true })
            .matches({
              errorText: "Должно начинаться с большой буквы.",
              value: /^[А-ЯA-Z]/g,
            })
            .matches({
              errorText: "Из символов разрешен только дефис.",
              value: /^[А-ЯA-Z-]+$/g,
            }),
        },
        values: { first_name: "john" },
      },
      output: { first_name: "Должно начинаться с большой буквы." },
    },
    {
      input: {
        rules: {
          first_name: new FieldConfig({ type: "string" })
            .isRequired({ value: true })
            .matches({
              errorText: "Должно начинаться с большой буквы.",
              value: /^[А-ЯA-Z]/g,
            })
            .matches({
              errorText: "Из символов разрешен только дефис.",
              value: /^[А-ЯA-Z-]+$/g,
            }),
        },
        values: { first_name: "John_" },
      },
      output: { first_name: "Из символов разрешен только дефис." },
    },
  ])("$output", async ({ input, output }) => {
    expect(validateFields(input).errorTextByFieldName).toEqual(output)
  })
})
