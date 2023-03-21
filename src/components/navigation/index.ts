import Handlebars from "handlebars"
import { template } from "./template"
import "./index.css"

export const Navigation = () => {
  return Handlebars.compile(template)({})
}
