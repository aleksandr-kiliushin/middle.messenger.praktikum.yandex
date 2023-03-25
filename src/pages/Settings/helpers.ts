import { validations } from "../../utils/validations"
import { FieldConfig } from "../../utils/form-validator"
import { createFieldValidator } from "../../utils/createFieldValidator"

export const fieldsRulesConfig = {
  display_name: new FieldConfig({ type: "string" }).isRequired({ value: true }),
  email: validations.email,
  first_name: validations.name,
  login: validations.login,
  phone: validations.phone,
  second_name: validations.name,
}

export const validateField = createFieldValidator({ fieldsRulesConfig })
