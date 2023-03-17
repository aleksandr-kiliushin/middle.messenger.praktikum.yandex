import { validateForm, setFieldsErrors, FieldValidator } from "../utils/form-validator"

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

if (chatForm instanceof HTMLFormElement) {
  chatForm.addEventListener("submit", (event) => {
    event.preventDefault()

    if (!doesFormContainCorrectFields(chatForm.elements)) {
      console.error("Form does not contain appropriate fields.")
      return
    }

    const errorsByFieldName = validateForm({
      rules: {
        message: new FieldValidator().string(),
      },
      values: {
        message: chatForm.elements.message.value,
      },
    })

    if (Object.keys(errorsByFieldName).length !== 0) {
      setFieldsErrors({ errorsByFieldName })
      return
    }

    console.log({
      message: chatForm.elements.message.value,
    })
  })
}
