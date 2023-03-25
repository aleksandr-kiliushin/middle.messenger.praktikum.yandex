import { request } from "../../utils/request"
import { validateFields } from "../../utils/form-validator"
import "./index.css"
import { IFormControlsCollection } from "./types"
import { fieldsRulesConfig } from "./helpers"

const fieldClassByFieldName: [string, typeof HTMLElement][] = [["message", HTMLTextAreaElement]]

const doesFormContainCorrectFields = (
  chatFormElements: HTMLFormControlsCollection
): chatFormElements is IFormControlsCollection => {
  return fieldClassByFieldName.every(([fieldName, fieldClass]) => {
    return chatFormElements.namedItem(fieldName) instanceof fieldClass
  })
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname !== "/chats") return

  const form = document.querySelector("form")

  if (!(form instanceof HTMLFormElement)) throw new Error("Form is not found.")
  if (!doesFormContainCorrectFields(form.elements)) throw new Error("Form does not have appropriate elements.")

  const formElements = form.elements

  const getFieldsValues = () => ({
    message: formElements.message.value,
  })

  form.addEventListener("submit", (event) => {
    event.preventDefault()

    const fieldsValidationResult = validateFields({
      rules: fieldsRulesConfig,
      values: getFieldsValues(),
    })
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

  request({ method: "GET", url: "https://jsonplaceholder.typicode.com/posts/1" }).then((response) =>
    console.log(JSON.parse(response.response))
  )
})
