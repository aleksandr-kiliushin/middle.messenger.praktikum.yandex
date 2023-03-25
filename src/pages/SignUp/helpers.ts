import { validations } from "../../utils/validations"
import { FieldConfig } from "../../utils/form-validator"

export const fieldsRulesConfig = {
  email: validations.email,
  first_name: validations.name,
  login: validations.login,
  password: validations.password,
  passwordConfirmation: new FieldConfig({ type: "string" }).isRequired({ value: true }),
  phone: validations.phone,
  second_name: validations.name,
}

export const isEventTargetField = (fieldName: unknown): fieldName is keyof typeof fieldsRulesConfig => {
  return typeof fieldName === "string" && fieldName in fieldsRulesConfig
}
