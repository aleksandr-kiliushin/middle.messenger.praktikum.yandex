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
    super({
      template,
      props: {
        ...props,
        last_message:
          props.last_message === null
            ? null
            : {
                ...props.last_message,
                time: formatDatetime(new Date(props.last_message.time)),
              },
      },
    })
  }
}
