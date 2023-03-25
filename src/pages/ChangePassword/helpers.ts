import { validations } from "../../utils/validations"
import { FieldConfig } from "../../utils/form-validator"
import { createFieldValidator } from "../../utils/createFieldValidator"

export const fieldsRulesConfig = {
  oldPassword: new FieldConfig({ type: "string" }).isRequired({ value: true }),
  newPassword: validations.password,
  newPasswordConfirmation: new FieldConfig({ type: "string" }).isRequired({ value: true }),
}

export const validateField = createFieldValidator({ fieldsRulesConfig })
