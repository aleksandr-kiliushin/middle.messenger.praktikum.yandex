import Handlebars from "handlebars"
import { Button } from "../../components/Button"
import { PageWrapper } from "../../components/PageWrapper"
import { template } from "./template"

import "./script"

export const SignIn = () => {
  return PageWrapper({
    content: Handlebars.compile(template)({
      SubmitButton: new Button({
        startIconName: "login",
        text: "Авторизоваться",
        type: "submit",
      }).render(),
    }),
  })
}
