import { Block } from "@utils/Block"

import "./index.css"
import { template } from "./template"

export type TChatListItemProps = {
  datetime: string
  message: string
  name: string
  unreadMessagesCount: number
}

export class ChatListItem extends Block<TChatListItemProps> {
  constructor(props: TChatListItemProps) {
    super(template, props)
  }
}
