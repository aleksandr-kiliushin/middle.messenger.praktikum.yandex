import Handlebars from "handlebars"
import { template } from "./template"
import "./index.css"

export const ChatListItem = ({
  datetime,
  message,
  name,
  unreadMessagesCount,
}: {
  datetime: string
  message: string
  name: string
  unreadMessagesCount: number
}) => {
  return Handlebars.compile(template)({
    datetime,
    message,
    name,
    unreadMessagesCount,
  })
}
