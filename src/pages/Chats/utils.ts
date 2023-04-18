export const scrollToTheLatestMessage = () => {
  const chatMessagesBlock = document.querySelector(".chat_messages")
  if (!(chatMessagesBlock instanceof HTMLDivElement)) return
  chatMessagesBlock.scrollTo({ top: chatMessagesBlock.scrollHeight })
}
