import { TFieldName, TValidationErrorText } from "./types"

type TRenderFieldsErrors = (params: { errorsByFieldName: Record<TFieldName, TValidationErrorText> }) => void
export const renderFieldsErrors: TRenderFieldsErrors = ({ errorsByFieldName }) => {
  for (const fieldName in errorsByFieldName) {
    const field = document.querySelector(`[name="${fieldName}"]`)
    if (field !== null) {
      field.ariaInvalid = "true"
    }
  }
}
