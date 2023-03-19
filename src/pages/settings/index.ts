import { FieldConfig, renderFieldsErrors, validateFields } from "../../utils/form-validator"

interface IFormControlsCollection extends HTMLFormControlsCollection {
  display_name: HTMLInputElement
  first_name: HTMLInputElement
  email: HTMLInputElement
  login: HTMLInputElement
  phone: HTMLInputElement
  second_name: HTMLInputElement
}

const doesFormContainCorrectFields = (
  chatFormElements: HTMLFormControlsCollection
): chatFormElements is IFormControlsCollection => {
  if (!("display_name" in chatFormElements)) return false
  if (!(chatFormElements.display_name instanceof HTMLInputElement)) return false

  if (!("first_name" in chatFormElements)) return false
  if (!(chatFormElements.first_name instanceof HTMLInputElement)) return false

  if (!("email" in chatFormElements)) return false
  if (!(chatFormElements.email instanceof HTMLInputElement)) return false

  if (!("login" in chatFormElements)) return false
  if (!(chatFormElements.login instanceof HTMLInputElement)) return false

  if (!("phone" in chatFormElements)) return false
  if (!(chatFormElements.phone instanceof HTMLInputElement)) return false

  if (!("second_name" in chatFormElements)) return false
  if (!(chatFormElements.second_name instanceof HTMLInputElement)) return false

  return true
}

const form = document.querySelector("form")
const fieldsNames = ["display_name", "email", "first_name", "login", "phone", "second_name"]

if (form instanceof HTMLFormElement) {
  const handleFieldBlur = () => {
    if (!doesFormContainCorrectFields(form.elements)) {
      console.error("Form does not contain appropriate fields.")
      return
    }

    const errorTextByFieldName = validateFields({
      rules: {
        display_name: new FieldConfig({ type: "string" }).isRequired({ value: true }),
        email: new FieldConfig({ type: "string" }).isRequired({ value: true }),
        first_name: new FieldConfig({ type: "string" }).isRequired({ value: true }),
        login: new FieldConfig({ type: "string" }).isRequired({ value: true }),
        phone: new FieldConfig({ type: "string" }).isRequired({ value: true }),
        second_name: new FieldConfig({ type: "string" }).isRequired({ value: true }),
      },
      values: {
        display_name: form.elements.display_name.value,
        email: form.elements.email.value,
        first_name: form.elements.first_name.value,
        login: form.elements.login.value,
        phone: form.elements.phone.value,
        second_name: form.elements.second_name.value,
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
        display_name: new FieldConfig({ type: "string" }).isRequired({ value: true }),
        email: new FieldConfig({ type: "string" }).isRequired({ value: true }),
        first_name: new FieldConfig({ type: "string" }).isRequired({ value: true }),
        login: new FieldConfig({ type: "string" }).isRequired({ value: true }),
        phone: new FieldConfig({ type: "string" }).isRequired({ value: true }),
        second_name: new FieldConfig({ type: "string" }).isRequired({ value: true }),
      },
      values: {
        display_name: form.elements.display_name.value,
        email: form.elements.email.value,
        first_name: form.elements.first_name.value,
        login: form.elements.login.value,
        phone: form.elements.phone.value,
        second_name: form.elements.second_name.value,
      },
    })
    renderFieldsErrors({ errorTextByFieldName })

    const hasFormErrors = Object.values(errorTextByFieldName).some((errorText) => errorText !== null)
    if (hasFormErrors) return

    console.log({
      display_name: form.elements.display_name.value,
      email: form.elements.email.value,
      first_name: form.elements.first_name.value,
      login: form.elements.login.value,
      phone: form.elements.phone.value,
      second_name: form.elements.second_name.value,
    })
  })
}
