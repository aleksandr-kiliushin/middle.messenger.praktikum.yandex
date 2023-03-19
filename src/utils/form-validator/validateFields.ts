import { FieldConfig } from "./index"
import { TFieldName, TErrorText } from "./types"

export interface IValidateFieldsParams {
  rules: Record<TFieldName, FieldConfig>
  values: Record<TFieldName, unknown>
}

export type TErrorTextByFieldName = Record<TFieldName, TErrorText | null>

export class FieldsValidationResult {
  public errorTextByFieldName: TErrorTextByFieldName

  constructor() {
    this.errorTextByFieldName = {}
  }

  public setFieldError({ errorText, fieldName }: { errorText: string | null; fieldName: TFieldName }) {
    this.errorTextByFieldName[fieldName] = errorText
    return this
  }

  public isValid() {
    return Object.values(this.errorTextByFieldName).some((errorText) => errorText !== null)
  }

  public renderErrors() {
    for (const fieldName in this.errorTextByFieldName) {
      const field = document.querySelector(`[name="${fieldName}"]`)
      const errorText = this.errorTextByFieldName[fieldName]
      if (field !== null) {
        field.ariaInvalid = errorText == null ? "false" : "true"
      }
    }
    return this
  }
}

export const validateFields = ({ rules, values }: IValidateFieldsParams): FieldsValidationResult => {
  const fieldsValidationResult = new FieldsValidationResult()

  for (const fieldName in values) {
    const fieldValue = values[fieldName]
    const fieldConfig = rules[fieldName].config

    switch (fieldConfig.type.value) {
      case "string": {
        if (typeof fieldValue !== "string") {
          fieldsValidationResult.setFieldError({
            errorText: fieldConfig.type.errorText ?? "Должно быть строкой.",
            fieldName,
          })
        } else if (fieldConfig.isRequired.value && fieldValue === "") {
          fieldsValidationResult.setFieldError({
            errorText: fieldConfig.isRequired.errorText ?? "Обязательное поле.",
            fieldName,
          })
        } else if (fieldValue.length > fieldConfig.maximumLength.value) {
          fieldsValidationResult.setFieldError({
            errorText: fieldConfig.maximumLength.errorText ?? `Не более ${fieldConfig.maximumLength.value} символов.`,
            fieldName,
          })
        } else if (fieldValue.length < fieldConfig.minimumLength.value) {
          fieldsValidationResult.setFieldError({
            errorText: fieldConfig.maximumLength.errorText ?? `Не менее ${fieldConfig.minimumLength.value} символов.`,
            fieldName,
          })
        } else if (fieldConfig.prohibitedWords.value.some((word) => new RegExp(word, "gi").test(fieldValue))) {
          fieldsValidationResult.setFieldError({
            errorText: fieldConfig.prohibitedWords.errorText ?? "Найдены недопустимые символы.",
            fieldName,
          })
        } else if (!fieldConfig.matches.value.test(fieldValue)) {
          fieldsValidationResult.setFieldError({
            errorText: fieldConfig.matches.errorText ?? "Проверьте правильность значения.",
            fieldName,
          })
        } else {
          fieldsValidationResult.setFieldError({
            errorText: null,
            fieldName,
          })
        }
        break
      }

      default: {
        fieldsValidationResult.setFieldError({
          errorText: "Неверный тип данных.",
          fieldName,
        })
        break
      }
    }
  }

  return fieldsValidationResult
}
