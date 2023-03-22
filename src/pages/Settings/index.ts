import Handlebars from "handlebars"
import { Button } from "../../components/Button"
import { PageWrapper } from "../../components/PageWrapper"
import { template } from "./template"

import "./script"

export const Settings = () => {
  return PageWrapper({
    content: Handlebars.compile(template)({
      SubmitButton: new Button({
        startIconName: "save",
        text: "Сохранить",
        type: "submit",
      }).markup,
    }),
  })
}
