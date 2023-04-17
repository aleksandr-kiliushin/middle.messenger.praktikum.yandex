import { ChatsApi, TAddUserToChatPayload, TCreateChatPayload } from "@api/ChatsApi"
import { store } from "@store"

class ChatsController {
  private api: ChatsApi

  constructor() {
    this.api = new ChatsApi()
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
}

export const chatsController = new ChatsController()
