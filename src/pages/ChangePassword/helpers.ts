import { validations } from "../../utils/validations"
import { FieldConfig, validateFields } from "../../utils/form-validator"

export const fieldsRulesConfig = {
  oldPassword: new FieldConfig({ type: "string" }).isRequired({ value: true }),
  newPassword: validations.password,
  newPasswordConfirmation: new FieldConfig({ type: "string" }).isRequired({ value: true }),
}

export const isEventTargetField = (fieldName: unknown): fieldName is keyof typeof fieldsRulesConfig => {
  return typeof fieldName === "string" && fieldName in fieldsRulesConfig
}

export const validateField = (event: HTMLElementEventMap["input"] | HTMLElementEventMap["blur"]) => {
  if (!(event.target instanceof HTMLInputElement) && !(event.target instanceof HTMLTextAreaElement)) return
  const fieldName = event.target.getAttribute("name")
  if (!isEventTargetField(fieldName)) return

  validateFields({
    rules: { [fieldName]: fieldsRulesConfig[fieldName] },
    values: { [fieldName]: event.target.value },
  }).renderErrors()
}
