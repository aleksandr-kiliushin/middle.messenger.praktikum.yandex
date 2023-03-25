import { validations } from "../../utils/validations"
import { FieldConfig } from "../../utils/form-validator"

export const fieldsRulesConfig = {
  oldPassword: new FieldConfig({ type: "string" }).isRequired({ value: true }),
  newPassword: validations.password,
  newPasswordConfirmation: new FieldConfig({ type: "string" }).isRequired({ value: true }),
}

export const isEventTargetField = (fieldName: unknown): fieldName is keyof typeof fieldsRulesConfig => {
  return typeof fieldName === "string" && fieldName in fieldsRulesConfig
}
