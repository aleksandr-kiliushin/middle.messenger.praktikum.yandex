import { TValidateFormReturnValue } from "./validateFields"

type TRenderFieldsErrors = (params: { errorTextByFieldName: TValidateFormReturnValue }) => void
export const renderFieldsErrors: TRenderFieldsErrors = ({ errorTextByFieldName }) => {
  for (const fieldName in errorTextByFieldName) {
    const field = document.querySelector(`[name="${fieldName}"]`)
    const errorText = errorTextByFieldName[fieldName]
    if (field !== null) {
      field.ariaInvalid = errorText == null ? "false" : "true"
    }
  }
}
