type TFieldName = string
type TValidationErrorText = string

type TValueType = "string"
type TFieldConfig = {
  maximumLength: number
  minimumLength: number
  type: TValueType
}
export class FieldValidator {
  public config: TFieldConfig

  constructor({ type }: { type: TValueType }) {
    this.config = {
      maximumLength: Infinity,
      minimumLength: 0,
      type,
    }
  }

  public maximumLength(length: number) {
    this.config.maximumLength = length
    return this
  }

  public minimumLength(length: number) {
    this.config.minimumLength = length
    return this
  }
}

export interface IValidateFormParams {
  rules: Record<TFieldName, FieldValidator>
  values: Record<TFieldName, unknown>
}
export type TValidateFormReturnValue = Record<TFieldName, string>
export const validateForm = ({ rules, values }: IValidateFormParams): TValidateFormReturnValue => {
  const result: Record<TFieldName, TValidationErrorText> = {}

  for (const fieldName in values) {
    const value = values[fieldName]

    switch (rules[fieldName].config.type) {
      case "string": {
        if (typeof value !== "string") {
          result[fieldName] = "Должно быть строкой."
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
