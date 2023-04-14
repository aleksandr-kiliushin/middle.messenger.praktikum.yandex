import { withStore } from "@store"

import { Block } from "@utils/Block"

export type TUser = {
  avatar: string
  display_name: string
  email: string
  first_name: string
  id: number
  login: string
  phone: string
  second_name: string
}

export type TLoadingStatus = "DONE" | "FAILED" | "INITIAL" | "LOADING"

export class PageBlock extends Block {
  constructor() {
    super("", {})
  }
}

export type TPageBlock = ReturnType<ReturnType<typeof withStore>> | typeof PageBlock
