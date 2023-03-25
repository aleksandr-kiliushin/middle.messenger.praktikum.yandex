import { createFieldValidator } from "../../utils/createFieldValidator"
import { FieldConfig } from "../../utils/form-validator"

export const fieldsRulesConfig = {
  message: new FieldConfig({ type: "string" }).isRequired({ value: true }),
}

export const validateField = createFieldValidator({ fieldsRulesConfig })
