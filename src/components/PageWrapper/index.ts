import Handlebars from "handlebars"
import { Navigation } from "../Navigation"
import { template } from "./template"

export const PageWrapper = ({ content }: { content: unknown }) => {
  return Handlebars.compile(template)({
    Navigation: Navigation(),
    content,
  })
}
