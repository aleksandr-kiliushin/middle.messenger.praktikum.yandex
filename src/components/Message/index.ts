import { Block } from "@utils/Block"

import "./index.css"
import { template } from "./template"

export type TMessageProps = {
  imageSrc?: string
  isMessageByAuthorizedUser?: boolean
  text?: string
  time: string
}

export class Message extends Block<TMessageProps> {
  constructor(props: TMessageProps) {
    super(template, props)
  }
}
