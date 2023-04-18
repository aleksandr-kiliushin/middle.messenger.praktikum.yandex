import { request } from "@utils/request"

import { TChat, TUser } from "@types"

export type TCreateChatPayload = {
  title: string
}

export type TDeleteChatPayload = {
  chatId: TChat["id"]
}

export type TAddUserToChatPayload = {
  chatId: TChat["id"]
  users: TUser["id"][]
}

export type TDeleteChatParticipantPayload = {
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

  public deleteChat({ payload }: { payload: TDeleteChatPayload }) {
    return request({ method: "DELETE", url: "/chats", payload })
  }

  public addUserToChat({ payload }: { payload: TAddUserToChatPayload }) {
    return request({ method: "PUT", url: "/chats/users", payload })
  }

  public deleteChatParticipant({ payload }: { payload: TDeleteChatParticipantPayload }) {
    return request({ method: "DELETE", url: "/chats/users", payload })
  }

  public async fetchChatParticipants({ chatId }: { chatId: TChat["id"] }) {
    return request<TUser[]>({ method: "GET", url: `/chats/${chatId}/users` })
  }

  public async fetchChatToken({ chatId }: { chatId: TChat["id"] }) {
    return request<{ token: string }>({ method: "POST", url: `/chats/token/${chatId}` })
  }
}
