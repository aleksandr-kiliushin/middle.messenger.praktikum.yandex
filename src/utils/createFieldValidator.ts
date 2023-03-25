import { FieldConfig, validateFields } from "./form-validator"

export const createFieldValidator = ({ fieldsRulesConfig }: { fieldsRulesConfig: Record<string, FieldConfig> }) => {
  const isEventTargetField = (fieldName: unknown): fieldName is keyof typeof fieldsRulesConfig => {
    return typeof fieldName === "string" && fieldName in fieldsRulesConfig
  }

  return (event: HTMLElementEventMap["input"] | HTMLElementEventMap["blur"]) => {
    if (!(event.target instanceof HTMLInputElement) && !(event.target instanceof HTMLTextAreaElement)) return
    const fieldName = event.target.getAttribute("name")
    if (!isEventTargetField(fieldName)) return

    validateFields({
      rules: { [fieldName]: fieldsRulesConfig[fieldName] },
      values: { [fieldName]: event.target.value },
    }).renderErrors()
  }
}
