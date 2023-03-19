import { FieldConfig, renderFieldsErrors, validateFields } from "../../utils/form-validator"

interface IChatFormControlsCollection extends HTMLFormControlsCollection {
  message: HTMLTextAreaElement
}

const doesFormContainCorrectFields = (
  chatFormElements: HTMLFormControlsCollection
): chatFormElements is IChatFormControlsCollection => {
  if (!("message" in chatFormElements)) return false
  if (!(chatFormElements.message instanceof HTMLTextAreaElement)) return false
  return true
}

const chatForm = document.querySelector(".chat_form")
const chatFormMessageField = document.querySelector(".chat_form textarea")
const chatMessagesBlock = document.querySelector(".chat_messages")

if (chatMessagesBlock instanceof HTMLDivElement) {
  chatMessagesBlock.scrollTo(0, chatMessagesBlock.scrollHeight)
}

if (chatForm instanceof HTMLFormElement && chatFormMessageField instanceof HTMLTextAreaElement) {
  chatFormMessageField.addEventListener("input", () => {
    chatFormMessageField.style.height = ""
    chatFormMessageField.style.height = chatFormMessageField.scrollHeight + "px"
  })

  chatFormMessageField.addEventListener("blur", () => {
    if (!doesFormContainCorrectFields(chatForm.elements)) {
      console.error("Form does not contain appropriate fields.")
      return
    }

    const errorTextByFieldName = validateFields({
      rules: {
        message: new FieldConfig({ type: "string" }).prohibitedWords({
          value: ["блин"],
          errorText: "Нецензурная лексика запрещена.",
        }),
      },
      values: {
        message: chatForm.elements.message.value,
      },
    })
    renderFieldsErrors({ errorTextByFieldName })
  })
}

if (chatForm instanceof HTMLFormElement) {
  chatForm.addEventListener("submit", (event) => {
    event.preventDefault()

    if (!doesFormContainCorrectFields(chatForm.elements)) {
      console.error("Form does not contain appropriate fields.")
      return
    }

    const errorTextByFieldName = validateFields({
      rules: {
        message: new FieldConfig({ type: "string" }).prohibitedWords({
          value: ["блин"],
          errorText: "Нецензурная лексика запрещена.",
        }),
      },
      values: {
        message: chatForm.elements.message.value,
      },
    })
    renderFieldsErrors({ errorTextByFieldName })

    const hasFormErrors = Object.values(errorTextByFieldName).some((errorText) => errorText !== null)
    if (hasFormErrors) return

    console.log({
      message: chatForm.elements.message.value,
    })
  })
}
