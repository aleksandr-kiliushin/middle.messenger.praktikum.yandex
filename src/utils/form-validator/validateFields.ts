import { FieldConfig } from "./index"
import { TFieldName, TErrorText } from "./types"

export interface IValidateFormParams {
  rules: Record<TFieldName, FieldConfig>
  values: Record<TFieldName, unknown>
}

export type TValidateFormReturnValue = Record<TFieldName, TErrorText | null>

export const validateFields = ({ rules, values }: IValidateFormParams): TValidateFormReturnValue => {
  const errorTextByFieldName: TValidateFormReturnValue = {}

  for (const fieldName in values) {
    const fieldValue = values[fieldName]
    const fieldConfig = rules[fieldName].config

    switch (fieldConfig.type.value) {
      case "string": {
        if (typeof fieldValue !== "string") {
          errorTextByFieldName[fieldName] = fieldConfig.type.errorText ?? "Должно быть строкой."
        } else if (fieldConfig.isRequired.value && fieldValue === "") {
          errorTextByFieldName[fieldName] = fieldConfig.isRequired.errorText ?? "Обязательное поле."
        } else if (fieldValue.length > fieldConfig.maximumLength.value) {
          errorTextByFieldName[fieldName] =
            fieldConfig.maximumLength.errorText ?? `Не более ${fieldConfig.maximumLength.value} символов.`
        } else if (fieldValue.length < fieldConfig.minimumLength.value) {
          errorTextByFieldName[fieldName] =
            fieldConfig.maximumLength.errorText ?? `Не менее ${fieldConfig.minimumLength.value} символов.`
        } else if (fieldConfig.prohibitedWords.value.some((word) => new RegExp(word, "gi").test(fieldValue))) {
          errorTextByFieldName[fieldName] = fieldConfig.prohibitedWords.errorText ?? "Найдены недопустимые символы."
        } else {
          errorTextByFieldName[fieldName] = null
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
