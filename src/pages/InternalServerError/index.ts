import Handlebars from "handlebars"
import { PageWrapper } from "../../components/PageWrapper"
import { template } from "./template"

export const InternalServerError = () => {
  return new PageWrapper({
    content: Handlebars.compile(template)({}),
  }).markup
}
