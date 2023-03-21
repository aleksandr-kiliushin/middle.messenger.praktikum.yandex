import Handlebars from "handlebars"
import { PageWrapper } from "../../components/PageWrapper"
import { template } from "./template"

export const InternalServerError = () => {
  return PageWrapper({
    content: Handlebars.compile(template)({}),
  })
}
