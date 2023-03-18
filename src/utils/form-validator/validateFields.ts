import { FieldConfig } from "./index"
import { TFieldName, TErrorText } from "./types"

export interface IValidateFormParams {
  rules: Record<TFieldName, FieldConfig>
  values: Record<TFieldName, unknown>
}

export type TValidateFormReturnValue = Record<TFieldName, string>

export const validateFields = ({ rules, values }: IValidateFormParams): TValidateFormReturnValue => {
  const errorTextByFieldName: Record<TFieldName, TErrorText> = {}

  for (const fieldName in values) {
    const fieldValue = values[fieldName]
    const fieldConfig = rules[fieldName].config

    switch (fieldConfig.type) {
      case "string": {
        if (typeof fieldValue !== "string") {
          errorTextByFieldName[fieldName] = "Должно быть строкой."
        } else if (fieldConfig.isRequired && fieldValue === "") {
          errorTextByFieldName[fieldName] = `Обязательное поле.`
        } else if (fieldValue.length > fieldConfig.maximumLength) {
          errorTextByFieldName[fieldName] = `Не более ${fieldConfig.maximumLength} символов.`
        } else if (fieldValue.length < fieldConfig.minimumLength) {
          errorTextByFieldName[fieldName] = `Не менее ${fieldConfig.minimumLength} символов.`
        } else if (fieldConfig.prohibitedWords.some((word) => new RegExp(word, "gi").test(fieldValue))) {
          errorTextByFieldName[fieldName] = `Нецензурная лексика запрещена.`
        } else {
          errorTextByFieldName[fieldName] = ""
        }
        break
      }

      default: {
        errorTextByFieldName[fieldName] = "Неверный тип данных."
        break
      }
    }
  }

  return errorTextByFieldName
}
