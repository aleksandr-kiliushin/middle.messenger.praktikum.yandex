import { FieldConfig, validateFields } from "../../utils/form-validator"

interface IFormControlsCollection extends HTMLFormControlsCollection {
  first_name: HTMLInputElement
  email: HTMLInputElement
  login: HTMLInputElement
  password: HTMLInputElement
  passwordConfirmation: HTMLInputElement
  phone: HTMLInputElement
  second_name: HTMLInputElement
}

const fieldClassByFieldName: [string, typeof HTMLElement][] = [
  ["first_name", HTMLInputElement],
  ["email", HTMLInputElement],
  ["login", HTMLInputElement],
  ["password", HTMLInputElement],
  ["passwordConfirmation", HTMLInputElement],
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
  email: new FieldConfig({ type: "string" }).isRequired({ value: true }).matches({ value: /[\w-]+@\w+\.\w+/g }),
  first_name: new FieldConfig({ type: "string" }).isRequired({ value: true }).matches({
    errorText: "Должно начинаться с большой буквы. Из символов разрешен только дефис.",
    value: /^[А-ЯA-Z][A-Za-zА-Яа-я-]*$/g,
  }),
  login: new FieldConfig({ type: "string" })
    .isRequired({ value: true })
    .minimumLength({ value: 3 })
    .maximumLength({ value: 20 })
    .matches({
      errorText:
        "Не должен состоять только из цифр, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание).",
      value: /^(?=[a-z0-9_-]*$)(?![0-9]+$)[a-z0-9_-]*$/gi,
    }),
  password: new FieldConfig({ type: "string" })
    .isRequired({ value: true })
    .minimumLength({ value: 8 })
    .maximumLength({ value: 40 })
    .matches({
      errorText: "Обязательны хотя бы одна заглавная буква и цифра.",
      value: /^(?=.*[A-Z])(?=.*\d).*$/,
    }),
  passwordConfirmation: new FieldConfig({ type: "string" }).isRequired({ value: true }),
  phone: new FieldConfig({ type: "string" }).isRequired({ value: true }),
  second_name: new FieldConfig({ type: "string" }).isRequired({ value: true }).matches({
    errorText: "Должно начинаться с большой буквы. Из символов разрешен только дефис.",
    value: /^[А-ЯA-Z][A-Za-zА-Яа-я-]*$/g,
  }),
}

const isEventTargetField = (fieldName: unknown): fieldName is keyof typeof fieldsRulesConfig => {
  return typeof fieldName === "string" && fieldName in fieldsRulesConfig
}

const form = document.querySelector("form")

if (!(form instanceof HTMLFormElement)) throw new Error("Form is not found.")
if (!doesFormContainCorrectFields(form.elements)) throw new Error("Form does not have appropriate elements.")

const formElements = form.elements

const getFieldsValues = () => ({
  email: formElements.email.value,
  first_name: formElements.first_name.value,
  login: formElements.login.value,
  password: formElements.password.value,
  passwordConfirmation: formElements.passwordConfirmation.value,
  phone: formElements.phone.value,
  second_name: formElements.second_name.value,
})

form.addEventListener("focusout", (event) => {
  if (!(event.target instanceof HTMLElement)) return
  const fieldName = event.target.getAttribute("name")
  if (!isEventTargetField(fieldName)) return

  const fieldsValidationResult = validateFields({
    rules: { [fieldName]: fieldsRulesConfig[fieldName] },
    values: { [fieldName]: getFieldsValues()[fieldName] },
  }).renderErrors()
  fieldsValidationResult.renderErrors()
})

form.addEventListener("submit", (event) => {
  event.preventDefault()

  const fieldsValidationResult = validateFields({
    rules: fieldsRulesConfig,
    values: getFieldsValues(),
  }).renderErrors()
  fieldsValidationResult.renderErrors()

  if (!fieldsValidationResult.isValid()) return

  console.log(getFieldsValues())
})
