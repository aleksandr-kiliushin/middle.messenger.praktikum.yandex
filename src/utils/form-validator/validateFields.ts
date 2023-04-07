import { FieldConfig } from "./index"
import { TErrorText, TFieldName } from "./types"

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
  }

  public isValid() {
    return Object.values(this.errorTextByFieldName).every((errorText) => errorText === null)
  }

  public renderErrors() {
    for (const fieldName in this.errorTextByFieldName) {
      const field = document.querySelector(`[name="${fieldName}"]`)

      const errorText = this.errorTextByFieldName[fieldName]
      if (field !== null) {
        field.ariaInvalid = errorText == null ? "false" : "true"
      }

      const fieldErrorNode = document.querySelector(`[name="${fieldName}"] + .row-error`)
      if (fieldErrorNode instanceof HTMLParagraphElement) {
        fieldErrorNode.innerText = errorText === null ? "" : errorText
      }
    }
    return this
  }
}

export const validateFields = ({ rules, values }: IValidateFieldsParams): FieldsValidationResult => {
  const fieldsValidationResult = new FieldsValidationResult()

  fieldsNamesIteration: for (const fieldName in values) {
    const fieldValue = values[fieldName]
    const fieldRules = rules[fieldName].rules
    const valueTypeDefinedByRules = fieldRules[0].value

    if (typeof valueTypeDefinedByRules === "string") {
      if (typeof fieldValue !== "string") {
        fieldsValidationResult.setFieldError({
          errorText: "Должно быть строкой.",
          fieldName,
        })
        continue
      }

      for (const rule of fieldRules) {
        if (rule.ruleName === "isRequired" && rule.value && fieldValue === "") {
          fieldsValidationResult.setFieldError({
            errorText: rule.errorText ?? "Обязательное поле.",
            fieldName,
          })
          continue fieldsNamesIteration
        }

        if (rule.ruleName === "maximumLength" && fieldValue.length > rule.value) {
          fieldsValidationResult.setFieldError({
            errorText: rule.errorText ?? `Не более ${rule.value} символов.`,
            fieldName,
          })
          continue fieldsNamesIteration
        }

        if (rule.ruleName === "minimumLength" && fieldValue.length < rule.value) {
          fieldsValidationResult.setFieldError({
            errorText: rule.errorText ?? `Не менее ${rule.value} символов.`,
            fieldName,
          })
          continue fieldsNamesIteration
        }

        if (rule.ruleName === "prohibitedWords" && rule.value.some((word) => new RegExp(word, "gi").test(fieldValue))) {
          fieldsValidationResult.setFieldError({
            errorText: rule.errorText ?? "Найдены недопустимые символы.",
            fieldName,
          })
          continue fieldsNamesIteration
        }

        if (rule.ruleName === "matches" && !rule.value.test(fieldValue)) {
          fieldsValidationResult.setFieldError({
            errorText: rule.errorText ?? "Некорректное значение.",
            fieldName,
          })
          continue fieldsNamesIteration
        }
      }
    }

    fieldsValidationResult.setFieldError({
      errorText: null,
      fieldName,
    })
  }

  return fieldsValidationResult
}
