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
  email: new FieldConfig({ type: "string" }).isRequired({ value: true }),
  first_name: new FieldConfig({ type: "string" }).isRequired({ value: true }),
  login: new FieldConfig({ type: "string" }).isRequired({ value: true }),
  password: new FieldConfig({ type: "string" }).isRequired({ value: true }),
  passwordConfirmation: new FieldConfig({ type: "string" }).isRequired({ value: true }),
  phone: new FieldConfig({ type: "string" }).isRequired({ value: true }),
  second_name: new FieldConfig({ type: "string" }).isRequired({ value: true }),
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

form.addEventListener("focusout", () => {
  const fieldsValidationResult = validateFields({
    rules: fieldsRulesConfig,
    values: getFieldsValues(),
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
