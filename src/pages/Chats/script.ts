document.addEventListener("DOMContentLoaded", () => {
  const chatMessagesBlock = document.querySelector(".chat_messages")
  if (chatMessagesBlock instanceof HTMLDivElement) {
    chatMessagesBlock.scrollTo(0, chatMessagesBlock.scrollHeight)
  }
})
