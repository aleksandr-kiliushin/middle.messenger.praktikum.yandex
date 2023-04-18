import { ChatsApi, TAddUserToChatPayload, TCreateChatPayload } from "@api/ChatsApi"
import { store } from "@store"

class ChatsController {
  private api: ChatsApi
  private activeChatSocket: WebSocket | null

  constructor() {
    this.api = new ChatsApi()
    this.activeChatSocket = null
  }

  public async fetchAndSetChats() {
    const response = await this.api.fetchChats()
    if (response.data === null) return
    store.setState("chats", response.data)
  }

  public async createChat({ payload }: { payload: TCreateChatPayload }) {
    await this.api.createChat({ payload })
    await this.fetchAndSetChats()
  }

  public async addUserToChat({ payload }: { payload: TAddUserToChatPayload }) {
    await this.api.addUserToChat({ payload })
  }

  public async fetchAndSetChatParticipants() {
    const { activeChatId } = store.getState()
    if (activeChatId === null) return

    const response = await this.api.fetchChatParticipants({ chatId: activeChatId })
    if (response.data !== null) {
      store.setState("activeChatParticipants", response.data)
    }
  }

  public async setupChatConnection() {
    const { activeChatId, authorizedUserData } = store.getState()
    if (authorizedUserData === null) return
    if (activeChatId === null) return

    const chatTokenResponse = await this.api.fetchChatToken({ chatId: activeChatId })
    if (chatTokenResponse.data === null) {
      console.error("Chat token fetching failed.")
      return
    }

    const { token } = chatTokenResponse.data

    const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${authorizedUserData.id}/${activeChatId}/${token}`)
    socket.addEventListener("open", () => {
      console.log("Соединение установлено")
      socket.send(JSON.stringify({ content: "Моё первое сообщение миру!", type: "message" }))
    })
    socket.addEventListener("close", (event) => {
      if (event.wasClean) {
        console.log("Соединение закрыто чисто")
      } else {
        console.error("Обрыв соединения")
      }
      console.log(`Код: ${event.code} | Причина: ${event.reason}`)
    })
    socket.addEventListener("message", (event) => {
      console.log("Получены данные", event.data)
    })
    socket.addEventListener("error", (event) => {
      if ("message" in event) {
        console.error("Ошибка", event.message)
      } else {
        console.error("Unknown WebSocket error.")
      }
    })
    this.activeChatSocket = socket
  }
}

export const chatsController = new ChatsController()
