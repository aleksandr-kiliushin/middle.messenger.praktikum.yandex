import Handlebars from "handlebars"
import { Button } from "../../components/Button"
import { PageWrapper } from "../../components/PageWrapper"
import { template } from "./template"
import "./script"
import { Block } from "../../utils/Block"

export class SignUp extends Block {
  constructor() {
    super(
      new PageWrapper({
        content: Handlebars.compile(template)({
          SubmitButton: new Button({
            text: "Зарегистрироваться",
            type: "submit",
          }).markup,
        }),
      }).markup,
      {}
    )
  }
}
