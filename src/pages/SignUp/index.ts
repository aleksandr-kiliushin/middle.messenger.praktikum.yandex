import Handlebars from "handlebars"
import { Button } from "../../components/Button"
import { PageWrapper } from "../../components/PageWrapper"
import { template } from "./template"

import "./script"

export const SignUp = () => {
  return PageWrapper({
    content: Handlebars.compile(template)({
      SubmitButton: Button({
        text: "Зарегистрироваться",
        type: "submit",
      }),
    }),
  })
}
