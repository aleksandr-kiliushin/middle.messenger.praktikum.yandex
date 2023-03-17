type TFieldName = string
type TValidationErrorText = string

class FieldValidator {
  constructor() {}
}

type TValidateForm = (params: {
  rules: Record<TFieldName, FieldValidator>
  values: Record<TFieldName, unknown>
}) => Record<TFieldName, string[]>
export const validateForm: TValidateForm = ({ rules, values }) => {
  console.log("rules >>", rules)
  console.log("values >>", values)
  return {}
}

type TSetFieldsErrors = (params: { errorsByFieldName: Record<TFieldName, TValidationErrorText[]> }) => void
export const setFieldsErrors: TSetFieldsErrors = ({ errorsByFieldName }) => {
  console.log("errorsByFieldName >>", errorsByFieldName)
}
