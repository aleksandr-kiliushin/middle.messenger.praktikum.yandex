import Handlebars from "handlebars"
import { template } from "./template"
import "./index.css"

export const Button = ({
  endIconName,
  startIconName,
  text,
  type,
}: {
  endIconName?: string
  startIconName?: string
  text?: string
  type: "button" | "submit"
}) => {
  return Handlebars.compile(template)({
    endIconName,
    startIconName,
    text,
    type,
  })
}
