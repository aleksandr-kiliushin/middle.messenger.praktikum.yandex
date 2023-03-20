import { FieldConfig, validateFields } from "../../utils/form-validator"

interface IFormControlsCollection extends HTMLFormControlsCollection {
  login: HTMLInputElement
  password: HTMLInputElement
}

const fieldClassByFieldName: [string, typeof HTMLElement][] = [
  ["login", HTMLInputElement],
  ["password", HTMLInputElement],
]

const doesFormContainCorrectFields = (
  chatFormElements: HTMLFormControlsCollection
): chatFormElements is IFormControlsCollection => {
  return fieldClassByFieldName.every(([fieldName, fieldClass]) => {
    return chatFormElements.namedItem(fieldName) instanceof fieldClass
  })
}

const fieldsRulesConfig = {
  login: new FieldConfig({ type: "string" }).isRequired({ value: true }),
  password: new FieldConfig({ type: "string" }).isRequired({ value: true }),
}

const isEventTargetField = (fieldName: unknown): fieldName is keyof typeof fieldsRulesConfig => {
  return typeof fieldName === "string" && fieldName in fieldsRulesConfig
}

const form = document.querySelector("form")

if (!(form instanceof HTMLFormElement)) throw new Error("Form is not found.")
if (!doesFormContainCorrectFields(form.elements)) throw new Error("Form does not have appropriate elements.")

const formElements = form.elements

const getFieldsValues = () => ({
  login: formElements.login.value,
  password: formElements.password.value,
})

form.addEventListener("focusout", (event) => {
  if (!(event.target instanceof HTMLElement)) return
  const fieldName = event.target.getAttribute("name")
  if (!isEventTargetField(fieldName)) return

  const fieldsValidationResult = validateFields({
    rules: { [fieldName]: fieldsRulesConfig[fieldName] },
    values: { [fieldName]: getFieldsValues()[fieldName] },
  })
  fieldsValidationResult.renderErrors()
})

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
