import { FieldConfig, validateFields } from "../../utils/form-validator"

interface IFormControlsCollection extends HTMLFormControlsCollection {
  oldPassword: HTMLInputElement
  newPassword: HTMLInputElement
  newPasswordConfirmation: HTMLInputElement
}

const fieldClassByFieldName: [string, typeof HTMLElement][] = [
  ["oldPassword", HTMLInputElement],
  ["newPassword", HTMLInputElement],
  ["newPasswordConfirmation", HTMLInputElement],
]

const doesFormContainCorrectFields = (
  chatFormElements: HTMLFormControlsCollection
): chatFormElements is IFormControlsCollection => {
  return fieldClassByFieldName.every(([fieldName, fieldClass]) => {
    return chatFormElements.namedItem(fieldName) instanceof fieldClass
  })
}

const fieldsRulesConfig = {
  oldPassword: new FieldConfig({ type: "string" }).isRequired({ value: true }),
  newPassword: new FieldConfig({ type: "string" })
    .isRequired({ value: true })
    .minimumLength({ value: 8 })
    .maximumLength({ value: 40 })
    .matches({
      errorText: "Обязательны хотя бы одна заглавная буква и цифра.",
      value: /^(?=.*[A-Z])(?=.*\d).*$/,
    }),
  newPasswordConfirmation: new FieldConfig({ type: "string" }).isRequired({ value: true }),
}

const isEventTargetField = (fieldName: unknown): fieldName is keyof typeof fieldsRulesConfig => {
  return typeof fieldName === "string" && fieldName in fieldsRulesConfig
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname !== "/change-password") return

  const form = document.querySelector("form")

  if (!(form instanceof HTMLFormElement)) throw new Error("Form is not found.")
  if (!doesFormContainCorrectFields(form.elements)) throw new Error("Form does not have appropriate elements.")

  const formElements = form.elements

  const getFieldsValues = () => ({
    oldPassword: formElements.oldPassword.value,
    newPassword: formElements.newPassword.value,
    newPasswordConfirmation: formElements.newPasswordConfirmation.value,
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
