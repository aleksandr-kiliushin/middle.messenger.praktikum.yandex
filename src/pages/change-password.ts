import { FieldConfig, renderFieldsErrors, validateFields } from "../utils/form-validator"

interface ISettingsFormControlsCollection extends HTMLFormControlsCollection {
  oldPassword: HTMLInputElement
  newPassword: HTMLInputElement
  newPasswordConfirmation: HTMLInputElement
}

const doesFormContainCorrectFields = (
  chatFormElements: HTMLFormControlsCollection
): chatFormElements is ISettingsFormControlsCollection => {
  if (!("oldPassword" in chatFormElements)) return false
  if (!(chatFormElements.oldPassword instanceof HTMLInputElement)) return false

  if (!("newPassword" in chatFormElements)) return false
  if (!(chatFormElements.newPassword instanceof HTMLInputElement)) return false

  if (!("newPasswordConfirmation" in chatFormElements)) return false
  if (!(chatFormElements.newPasswordConfirmation instanceof HTMLInputElement)) return false

  return true
}

const form = document.querySelector("form")
const fieldsNames = ["oldPassword", "newPassword", "newPasswordConfirmation"]

if (form instanceof HTMLFormElement) {
  const handleFieldBlur = () => {
    if (!doesFormContainCorrectFields(form.elements)) {
      console.error("Form does not contain appropriate fields.")
      return
    }

    const errorTextByFieldName = validateFields({
      rules: {
        oldPassword: new FieldConfig({ type: "string" }).isRequired({ value: true }),
        newPassword: new FieldConfig({ type: "string" }).isRequired({ value: true }),
        newPasswordConfirmation: new FieldConfig({ type: "string" }).isRequired({ value: true }),
      },
      values: {
        oldPassword: form.elements.oldPassword.value,
        newPassword: form.elements.newPassword.value,
        newPasswordConfirmation: form.elements.newPasswordConfirmation.value,
      },
    })
    renderFieldsErrors({ errorTextByFieldName })
  }

  for (const fieldName of fieldsNames) {
    const field = document.querySelector(`[name="${fieldName}"]`)
    if (field === null) continue

    field.addEventListener("blur", handleFieldBlur)
  }
}

if (form instanceof HTMLFormElement) {
  form.addEventListener("submit", (event) => {
    event.preventDefault()

    if (!doesFormContainCorrectFields(form.elements)) {
      console.error("Form does not contain appropriate fields.")
      return
    }

    const errorTextByFieldName = validateFields({
      rules: {
        oldPassword: new FieldConfig({ type: "string" }).isRequired({ value: true }),
        newPasswordConfirmation: new FieldConfig({ type: "string" }).isRequired({ value: true }),
        newPassword: new FieldConfig({ type: "string" }).isRequired({ value: true }),
      },
      values: {
        oldPassword: form.elements.oldPassword.value,
        newPasswordConfirmation: form.elements.newPasswordConfirmation.value,
        newPassword: form.elements.newPassword.value,
      },
    })
    renderFieldsErrors({ errorTextByFieldName })

    const hasFormErrors = Object.values(errorTextByFieldName).some((errorText) => errorText !== null)
    if (hasFormErrors) return

    console.log({
      oldPassword: form.elements.oldPassword.value,
      newPasswordConfirmation: form.elements.newPasswordConfirmation.value,
      newPassword: form.elements.newPassword.value,
    })
  })
}
