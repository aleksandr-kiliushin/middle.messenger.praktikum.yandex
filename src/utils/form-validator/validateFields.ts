import { FieldConfig } from "./index"
import { TFieldName, TValidationErrorText } from "./types"

export interface IValidateFormParams {
  rules: Record<TFieldName, FieldConfig>
  values: Record<TFieldName, unknown>
}

export type TValidateFormReturnValue = Record<TFieldName, string>

export const validateFields = ({ rules, values }: IValidateFormParams): TValidateFormReturnValue => {
  const result: Record<TFieldName, TValidationErrorText> = {}

  for (const fieldName in values) {
    const fieldValue = values[fieldName]
    const fieldConfig = rules[fieldName].config

    switch (fieldConfig.type) {
      case "string": {
        if (typeof fieldValue !== "string") {
          result[fieldName] = "Должно быть строкой."
        } else if (fieldConfig.isRequired && fieldValue === "") {
          result[fieldName] = `Обязательное поле.`
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
