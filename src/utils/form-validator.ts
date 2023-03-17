type TFieldName = string
type TValidationErrorText = string

type TValueType = "string"
type TFieldConfig = {
  type: TValueType
}
export class FieldValidator {
  public config: TFieldConfig

  constructor({ type }: { type: TValueType }) {
    this.config = { type }
  }

  public string() {
    this.config = { ...this.config, type: "string" }
    return this
  }
}

type TValidateForm = (params: {
  rules: Record<TFieldName, FieldValidator>
  values: Record<TFieldName, unknown>
}) => Record<TFieldName, string>
export const validateForm: TValidateForm = ({ rules, values }) => {
  const result: Record<TFieldName, TValidationErrorText> = {}

  for (const fieldName in values) {
    const value = values[fieldName]

    switch (rules[fieldName].config.type) {
      case "string": {
        if (typeof value !== "string") {
          result[fieldName] = "Должно быть строкой."
          break
        }
        break
      }

      default: {
        result[fieldName] = "Неверный тип данных."
        break
      }
    }
  }

  return result
}

type TSetFieldsErrors = (params: { errorsByFieldName: Record<TFieldName, TValidationErrorText> }) => void
export const setFieldsErrors: TSetFieldsErrors = ({ errorsByFieldName }) => {
  console.log("errorsByFieldName >>", errorsByFieldName)
}
