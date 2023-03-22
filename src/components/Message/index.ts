import { Block } from "../../utils/Block"
import { template } from "./template"
import "./index.css"

type TMessageProps = {
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
