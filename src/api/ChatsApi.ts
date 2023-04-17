import { TChat } from "@types"

import { request } from "@utils/request"

export class ChatsApi {
  public fetchChats() {
    return request<TChat[]>({ method: "GET", url: "/chats" })
  }
}
