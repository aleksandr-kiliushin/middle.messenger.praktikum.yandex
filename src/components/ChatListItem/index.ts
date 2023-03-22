import { template } from "./template"
import "./index.css"
import { Block } from "../../utils/Block"

type TChatListItemProps = {
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
