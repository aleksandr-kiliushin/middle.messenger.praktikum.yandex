import { validateFields } from "../../utils/form-validator"
import { fieldsRulesConfig } from "./helpers"
import { IFormControlsCollection } from "./types"

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
