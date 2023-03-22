import Handlebars from "handlebars"
import { Button } from "../../components/Button"
import { PageWrapper } from "../../components/PageWrapper"
import { template } from "./template"
import "./script"
import { Block } from "../../utils/Block"

export class SignIn extends Block {
  constructor() {
    super(
      new PageWrapper({
        content: Handlebars.compile(template)({
          SubmitButton: new Button({
            startIconName: "login",
            text: "Авторизоваться",
            type: "submit",
          }).markup,
        }),
      }).markup,
      {}
    )
  }
}
