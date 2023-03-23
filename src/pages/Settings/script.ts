import { FieldConfig, validateFields } from "../../utils/form-validator"

interface IFormControlsCollection extends HTMLFormControlsCollection {
  display_name: HTMLInputElement
  first_name: HTMLInputElement
  email: HTMLInputElement
  login: HTMLInputElement
  phone: HTMLInputElement
  second_name: HTMLInputElement
}

const fieldClassByFieldName: [string, typeof HTMLElement][] = [
  ["display_name", HTMLInputElement],
  ["first_name", HTMLInputElement],
  ["email", HTMLInputElement],
  ["login", HTMLInputElement],
  ["phone", HTMLInputElement],
  ["second_name", HTMLInputElement],
]

const doesFormContainCorrectFields = (
  chatFormElements: HTMLFormControlsCollection
): chatFormElements is IFormControlsCollection => {
  return fieldClassByFieldName.every(([fieldName, fieldClass]) => {
    return chatFormElements.namedItem(fieldName) instanceof fieldClass
  })
}

const fieldsRulesConfig = {
  display_name: new FieldConfig({ type: "string" }).isRequired({ value: true }),
  email: new FieldConfig({ type: "string" }).isRequired({ value: true }).matches({ value: /[\w-]+@\w+\.\w+/ }),
  first_name: new FieldConfig({ type: "string" })
    .isRequired({ value: true })
    .matches({
      errorText: "Первая буква должна быть заглавной.",
      value: /^[А-ЯA-Z]/,
    })
    .matches({
      errorText: 'Из символов разрешен только "-".',
      value: /^[a-zа-я-]+$/i,
    }),
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
  phone: new FieldConfig({ type: "string" })
    .isRequired({ value: true })
    .minimumLength({ value: 10 })
    .maximumLength({ value: 15 })
    .matches({
      errorText: "Должен состоять из цифр, может начинается с плюса.",
      value: /^(\+?)\d+$/,
    }),
  second_name: new FieldConfig({ type: "string" })
    .isRequired({ value: true })
    .matches({
      errorText: "Первая буква должна быть заглавной.",
      value: /^[А-ЯA-Z]/,
    })
    .matches({
      errorText: 'Из символов разрешен только "-".',
      value: /^[a-zа-я-]+$/i,
    }),
}

const isEventTargetField = (fieldName: unknown): fieldName is keyof typeof fieldsRulesConfig => {
  return typeof fieldName === "string" && fieldName in fieldsRulesConfig
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname !== "/settings") return

  const form = document.querySelector("form")

  if (!(form instanceof HTMLFormElement)) throw new Error("Form is not found.")
  if (!doesFormContainCorrectFields(form.elements)) throw new Error("Form does not have appropriate elements.")

  const formElements = form.elements

  const getFieldsValues = () => ({
    display_name: formElements.display_name.value,
    email: formElements.email.value,
    first_name: formElements.first_name.value,
    login: formElements.login.value,
    phone: formElements.phone.value,
    second_name: formElements.second_name.value,
  })

  const validateField = (event: HTMLElementEventMap["focusout"] | HTMLElementEventMap["input"]) => {
    if (!(event.target instanceof HTMLElement)) return
    const fieldName = event.target.getAttribute("name")
    if (!isEventTargetField(fieldName)) return

    const fieldsValidationResult = validateFields({
      rules: { [fieldName]: fieldsRulesConfig[fieldName] },
      values: { [fieldName]: getFieldsValues()[fieldName] },
    })
    fieldsValidationResult.renderErrors()
  }
  form.addEventListener("focusout", validateField) // Используется "focusout" в качестве всплывающего аналога "blur".
  form.addEventListener("input", validateField)

  form.addEventListener("submit", (event) => {
    event.preventDefault()

    const fieldsValidationResult = validateFields({
      rules: fieldsRulesConfig,
      values: getFieldsValues(),
    })
    fieldsValidationResult.renderErrors()

    if (!fieldsValidationResult.isValid()) return

    console.log(getFieldsValues())
  })
})
