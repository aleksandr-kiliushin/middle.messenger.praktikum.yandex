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

    console.log({
      message: chatForm.elements.message.value,
    })
  })
}
