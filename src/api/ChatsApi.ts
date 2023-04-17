import { TChat, TUser } from "@types"

import { request } from "@utils/request"

export type TCreateChatPayload = {
  title: string
}

export type TAddUserToChatPayload = {
  chatId: TChat["id"]
  users: TUser["id"][]
}

export class ChatsApi {
  public fetchChats() {
    return request<TChat[]>({ method: "GET", url: "/chats" })
  }

  public createChat({ payload }: { payload: TCreateChatPayload }) {
    return request({ method: "POST", url: "/chats", payload })
  }

  public addUserToChat({ payload }: { payload: TAddUserToChatPayload }) {
    return request({ method: "PUT", url: "/chats/users", payload })
  }
}
