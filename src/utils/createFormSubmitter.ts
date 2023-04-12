import { FieldConfig, validateFields } from "./form-validator"

export const createFormSubmitter = <TFormFields extends Record<string, FormDataEntryValue>>({
  fieldsRulesConfig,
  onValidationSuccess,
}: {
  fieldsRulesConfig: Record<string, FieldConfig>
  onValidationSuccess: (params: { formValues: TFormFields }) => void
}) => {
  return (event: Event) => {
    event.preventDefault()

    if (!(event.target instanceof HTMLFormElement)) {
      console.error("event.target is not a form element.")
      return
    }

    const formValues = Object.fromEntries(new FormData(event.target))

    const fieldsValidationResult = validateFields({
      rules: fieldsRulesConfig,
      values: formValues,
    })

    fieldsValidationResult.renderErrors()

    if (!fieldsValidationResult.isValid()) return

    onValidationSuccess({ formValues: formValues as TFormFields })
  }
}
