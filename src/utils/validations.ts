import { FieldConfig } from "./form-validator"

export const validations = {
  email: new FieldConfig({ type: "string" }).isRequired({ value: true }).matches({ value: /^\w+@\w+\.\w+$/ }),
  login: new FieldConfig({ type: "string" })
    .isRequired({ value: true })
    .minimumLength({ value: 3 })
    .maximumLength({ value: 20 })
    .matches({ value: /^[^\s]+$/, errorText: "Нельзя использовать пробелы." })
    .matches({ value: /^\d*[^\d]+\d*$/, errorText: "Не должен состоять только из цифр." })
    .matches({
      value: /^[\w-]+$/,
      errorText: 'Из спецсимволов допустимы только "-" и "_".',
    }),
  name: new FieldConfig({ type: "string" })
    .isRequired({ value: true })
    .matches({
      errorText: "Первая буква должна быть заглавной.",
      value: /^[А-ЯA-Z]/,
    })
    .matches({
      errorText: 'Из символов разрешен только "-".',
      value: /^[a-zа-я-]+$/i,
    }),
  password: new FieldConfig({ type: "string" })
    .isRequired({ value: true })
    .minimumLength({ value: 8 })
    .maximumLength({ value: 40 })
    .matches({
      errorText: "Обязательны хотя бы одна заглавная буква и цифра.",
      value: /^(?=.*[A-Z])(?=.*\d).*$/,
    }),
  phone: new FieldConfig({ type: "string" })
    .isRequired({ value: true })
    .minimumLength({ value: 10 })
    .maximumLength({ value: 15 })
    .matches({
      errorText: "Должен состоять из цифр, может начинается с плюса.",
      value: /^(\+?)\d+$/,
    }),
} satisfies Record<string, FieldConfig>
