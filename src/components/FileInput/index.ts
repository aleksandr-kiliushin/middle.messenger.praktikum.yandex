import Handlebars from "handlebars"
import { template } from "./template"

export const FileInput = (props: { name: string }) => {
  return Handlebars.compile(template)(props)
}
