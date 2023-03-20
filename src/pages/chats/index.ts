import { FieldConfig, validateFields } from "../../utils/form-validator"
import "./index.css"

interface IFormControlsCollection extends HTMLFormControlsCollection {
  message: HTMLTextAreaElement
}

const fieldClassByFieldName: [string, typeof HTMLElement][] = [["message", HTMLTextAreaElement]]

const doesFormContainCorrectFields = (
  chatFormElements: HTMLFormControlsCollection
): chatFormElements is IFormControlsCollection => {
  return fieldClassByFieldName.every(([fieldName, fieldClass]) => {
    return chatFormElements.namedItem(fieldName) instanceof fieldClass
  })
}

const fieldsRulesConfig = {
  message: new FieldConfig({ type: "string" }).prohibitedWords({
    value: ["блин"],
    errorText: "Нецензурная лексика запрещена.",
  }),
}

const form = document.querySelector("form")

if (!(form instanceof HTMLFormElement)) throw new Error("Form is not found.")
if (!doesFormContainCorrectFields(form.elements)) throw new Error("Form does not have appropriate elements.")

const formElements = form.elements

const getFieldsValues = () => ({
  message: formElements.message.value,
})

form.addEventListener("focusout", () => {
  const fieldsValidationResult = validateFields({
    rules: fieldsRulesConfig,
    values: getFieldsValues(),
  }).renderErrors()
  fieldsValidationResult.renderErrors()
})

form.addEventListener("submit", (event) => {
  event.preventDefault()

  const fieldsValidationResult = validateFields({
    rules: fieldsRulesConfig,
    values: getFieldsValues(),
  }).renderErrors()
  fieldsValidationResult.renderErrors()

  if (!fieldsValidationResult.isValid()) return

  console.log(getFieldsValues())
})

const chatFormMessageField = document.querySelector("textarea[name='message']")
if (chatFormMessageField instanceof HTMLTextAreaElement) {
  chatFormMessageField.addEventListener("input", () => {
    chatFormMessageField.style.height = ""
    chatFormMessageField.style.height = chatFormMessageField.scrollHeight + "px"
  })
}

const chatMessagesBlock = document.querySelector(".chat_messages")
if (chatMessagesBlock instanceof HTMLDivElement) {
  chatMessagesBlock.scrollTo(0, chatMessagesBlock.scrollHeight)
}
