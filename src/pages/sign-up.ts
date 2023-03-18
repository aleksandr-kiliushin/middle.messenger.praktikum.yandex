import { FieldConfig, renderFieldsErrors, validateFields } from "../utils/form-validator"

interface ISettingsFormControlsCollection extends HTMLFormControlsCollection {
  first_name: HTMLInputElement
  email: HTMLInputElement
  login: HTMLInputElement
  password: HTMLInputElement
  passwordConfirmation: HTMLInputElement
  phone: HTMLInputElement
  second_name: HTMLInputElement
}

const doesFormContainCorrectFields = (
  chatFormElements: HTMLFormControlsCollection
): chatFormElements is ISettingsFormControlsCollection => {
  if (!("first_name" in chatFormElements)) return false
  if (!(chatFormElements.first_name instanceof HTMLInputElement)) return false

  if (!("email" in chatFormElements)) return false
  if (!(chatFormElements.email instanceof HTMLInputElement)) return false

  if (!("login" in chatFormElements)) return false
  if (!(chatFormElements.login instanceof HTMLInputElement)) return false

  if (!("password" in chatFormElements)) return false
  if (!(chatFormElements.password instanceof HTMLInputElement)) return false

  if (!("passwordConfirmation" in chatFormElements)) return false
  if (!(chatFormElements.passwordConfirmation instanceof HTMLInputElement)) return false

  if (!("phone" in chatFormElements)) return false
  if (!(chatFormElements.phone instanceof HTMLInputElement)) return false

  if (!("second_name" in chatFormElements)) return false
  if (!(chatFormElements.second_name instanceof HTMLInputElement)) return false

  return true
}

const form = document.querySelector("form")
const fieldsNames = ["email", "first_name", "login", "password", "passwordConfirmation", "phone", "second_name"]

if (form instanceof HTMLFormElement) {
  const handleFieldBlur = () => {
    if (!doesFormContainCorrectFields(form.elements)) {
      console.error("Form does not contain appropriate fields.")
      return
    }

    const errorTextByFieldName = validateFields({
      rules: {
        email: new FieldConfig({ type: "string" }).isRequired(),
        first_name: new FieldConfig({ type: "string" }).isRequired(),
        login: new FieldConfig({ type: "string" }).isRequired(),
        password: new FieldConfig({ type: "string" }).isRequired(),
        passwordConfirmation: new FieldConfig({ type: "string" }).isRequired(),
        phone: new FieldConfig({ type: "string" }).isRequired(),
        second_name: new FieldConfig({ type: "string" }).isRequired(),
      },
      values: {
        email: form.elements.email.value,
        first_name: form.elements.first_name.value,
        login: form.elements.login.value,
        password: form.elements.password.value,
        passwordConfirmation: form.elements.passwordConfirmation.value,
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
        email: new FieldConfig({ type: "string" }).isRequired(),
        first_name: new FieldConfig({ type: "string" }).isRequired(),
        login: new FieldConfig({ type: "string" }).isRequired(),
        password: new FieldConfig({ type: "string" }).isRequired(),
        passwordConfirmation: new FieldConfig({ type: "string" }).isRequired(),
        phone: new FieldConfig({ type: "string" }).isRequired(),
        second_name: new FieldConfig({ type: "string" }).isRequired(),
      },
      values: {
        email: form.elements.email.value,
        first_name: form.elements.first_name.value,
        login: form.elements.login.value,
        password: form.elements.password.value,
        passwordConfirmation: form.elements.passwordConfirmation.value,
        phone: form.elements.phone.value,
        second_name: form.elements.second_name.value,
      },
    })
    renderFieldsErrors({ errorTextByFieldName })

    const hasFormErrors = Object.values(errorTextByFieldName).some((errorText) => errorText !== "")
    if (hasFormErrors) return

    console.log({
      email: form.elements.email.value,
      first_name: form.elements.first_name.value,
      login: form.elements.login.value,
      password: form.elements.password.value,
      passwordConfirmation: form.elements.passwordConfirmation.value,
      phone: form.elements.phone.value,
      second_name: form.elements.second_name.value,
    })
  })
}
