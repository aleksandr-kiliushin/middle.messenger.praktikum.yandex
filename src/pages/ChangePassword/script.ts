import { validateFields } from "../../utils/form-validator"
import { fieldsRulesConfig } from "./helpers"
import { IFormControlsCollection } from "./types"

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
