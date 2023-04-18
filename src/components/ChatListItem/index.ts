import { TChat } from "@types"

import { Block, TBlockBaseProps } from "@utils/Block"
import { formatDatetime } from "@utils/formatDatetime"

import "./index.css"
import { template } from "./template"

export type TChatListItemProps = TBlockBaseProps &
  TChat & {
    isActive: boolean
  }

export class ChatListItem extends Block<TChatListItemProps> {
  constructor(props: TChatListItemProps) {
    const _props = { ...props }

    if (_props.last_message !== null) {
      _props.last_message.time = formatDatetime(new Date(_props.last_message.time))
    }

    super({ template, props: _props })
  }
}
