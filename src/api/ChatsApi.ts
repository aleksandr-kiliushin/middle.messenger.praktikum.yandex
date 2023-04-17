import { TChat } from "@types"

import { request } from "@utils/request"

export type TCreateChatPayload = {
  title: string
}

export class ChatsApi {
  public fetchChats() {
    return request<TChat[]>({ method: "GET", url: "/chats" })
  }

  public createChat({ payload }: { payload: TCreateChatPayload }) {
    return request({ method: "POST", url: "/chats", payload })
  }
}
