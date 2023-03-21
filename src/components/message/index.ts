import Handlebars from "handlebars"
import { template } from "./template"
import "./index.css"

export const Message = (props: {
  imageSrc?: string
  isMessageByAuthorizedUser?: boolean
  text?: string
  time: string
}) => {
  return Handlebars.compile(template)(props)
}
