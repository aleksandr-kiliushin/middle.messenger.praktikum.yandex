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

    this.activeChatSocket?.close(1000, "Чат был закрыт и открыт другой")

    const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${authorizedUserData.id}/${activeChatId}/${token}`)
    socket.addEventListener("open", () => {
      console.log("Соединение установлено")
      socket.send(JSON.stringify({ content: "0", type: "get old" }))
    })
    socket.addEventListener("close", (event) => {
      if (event.wasClean) {
        console.log("Соединение закрыто чисто.")
      } else {
        console.error("Обрыв соединения.")
      }
      console.log(`Код: ${event.code} | Причина: ${event.reason || "Неизвестна"}.`)
    })
    socket.addEventListener("message", (event) => {
      const eventData = JSON.parse(event.data)
      console.log("Получены данные:", eventData)

      if (eventData instanceof Array) {
        store.setState("activeChatMessages", [...store.getState().activeChatMessages, ...eventData.reverse()])
      }
      if (eventData.type === "message") {
        store.setState("activeChatMessages", [...store.getState().activeChatMessages, eventData])
      }
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

  public sendMessage({ content }: { content: string }) {
    if (this.activeChatSocket === null) return
    this.activeChatSocket.send(JSON.stringify({ content, type: "message" }))
  }
}

export const chatsController = new ChatsController()
