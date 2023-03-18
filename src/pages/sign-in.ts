import { FieldConfig, renderFieldsErrors, validateFields } from "../utils/form-validator"

interface ISettingsFormControlsCollection extends HTMLFormControlsCollection {
  login: HTMLInputElement
  password: HTMLInputElement
}

const doesFormContainCorrectFields = (
  chatFormElements: HTMLFormControlsCollection
): chatFormElements is ISettingsFormControlsCollection => {
  if (!("login" in chatFormElements)) return false
  if (!(chatFormElements.login instanceof HTMLInputElement)) return false

  if (!("password" in chatFormElements)) return false
  if (!(chatFormElements.password instanceof HTMLInputElement)) return false

  return true
}

const form = document.querySelector("form")
const fieldsNames = ["login", "", "password", "login", "phone", "second_name"]

if (form instanceof HTMLFormElement) {
  const handleFieldBlur = () => {
    if (!doesFormContainCorrectFields(form.elements)) {
      console.error("Form does not contain appropriate fields.")
      return
    }

    const errorTextByFieldName = validateFields({
      rules: {
        login: new FieldConfig({ type: "string" }).isRequired(),
        password: new FieldConfig({ type: "string" }).isRequired(),
      },
      values: {
        login: form.elements.login.value,
        password: form.elements.password.value,
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
        login: new FieldConfig({ type: "string" }).isRequired(),
        password: new FieldConfig({ type: "string" }).isRequired(),
      },
      values: {
        login: form.elements.login.value,
        password: form.elements.password.value,
      },
    })
    renderFieldsErrors({ errorTextByFieldName })

    const hasFormErrors = Object.values(errorTextByFieldName).some((errorText) => errorText !== "")
    if (hasFormErrors) return

    console.log({
      login: form.elements.login.value,
      password: form.elements.password.value,
    })
  })
}