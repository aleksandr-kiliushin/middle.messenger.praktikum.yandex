import { TFieldName, TErrorText } from "./types"

type TRenderFieldsErrors = (params: { errorTextByFieldName: Record<TFieldName, TErrorText> }) => void
export const renderFieldsErrors: TRenderFieldsErrors = ({ errorTextByFieldName }) => {
  for (const fieldName in errorTextByFieldName) {
    const field = document.querySelector(`[name="${fieldName}"]`)
    const errorText = errorTextByFieldName[fieldName]
    if (field !== null) {
      field.ariaInvalid = errorText == "" ? "false" : "true"
    }
  }
}
