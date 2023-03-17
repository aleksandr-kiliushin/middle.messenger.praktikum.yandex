import { TFieldName, TValidationErrorText } from "./types"

type TRenderFieldsErrors = (params: { errorsByFieldName: Record<TFieldName, TValidationErrorText> }) => void
export const renderFieldsErrors: TRenderFieldsErrors = ({ errorsByFieldName }) => {
  console.log("errorsByFieldName >>", errorsByFieldName)
}
