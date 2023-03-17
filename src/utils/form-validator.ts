type TFieldName = string
type TValidationErrorText = string

type TValueType = "string"
type TFieldConfig = {
  maximumLength: number
  minimumLength: number
  prohibitedWords: string[]
  type: TValueType
}
export class FieldValidator {
  public config: TFieldConfig

  constructor({ type }: { type: TValueType }) {
    this.config = {
      maximumLength: Infinity,
      minimumLength: 0,
      prohibitedWords: [],
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

  public prohibitedWords(words: string[]) {
    this.config.prohibitedWords = words
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
    const fieldValue = values[fieldName]
    const fieldConfig = rules[fieldName].config

    switch (fieldConfig.type) {
      case "string": {
        if (typeof fieldValue !== "string") {
          result[fieldName] = "Должно быть строкой."
        } else if (fieldValue.length > fieldConfig.maximumLength) {
          result[fieldName] = `Не более ${fieldConfig.maximumLength} символов.`
        } else if (fieldValue.length < fieldConfig.minimumLength) {
          result[fieldName] = `Не менее ${fieldConfig.minimumLength} символов.`
        } else if (fieldConfig.prohibitedWords.some((word) => new RegExp(word, "gi").test(fieldValue))) {
          result[fieldName] = `Нецензурная лексика запрещена.`
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
