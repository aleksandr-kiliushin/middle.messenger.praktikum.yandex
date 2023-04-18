import { TChat } from "@types"

import { Block, TBlockBaseProps } from "@utils/Block"

import "./index.css"
import { template } from "./template"

export type TChatListItemProps = TBlockBaseProps &
  TChat & {
    isActive: boolean
  }

export class ChatListItem extends Block<TChatListItemProps> {
  constructor(props: TChatListItemProps) {
    super({ template, props })
  }
}
