import Handlebars from "handlebars"
import { Button } from "../../components/Button"
import { PageWrapper } from "../../components/PageWrapper"
import { template } from "./template"
import "./script"
import { Block } from "../../utils/Block"
import { Input } from "../../components/Input"
import { validateField } from "./helpers"

export class Settings extends Block {
  constructor() {
    super(
      new PageWrapper({
        content: Handlebars.compile(template)({
          EmailInput: new Input({
            name: "email",
            type: "text",
            eventsListeners: {
              input: validateField,
              blur: validateField,
            },
          }).markup,
          LoginInput: new Input({
            name: "login",
            type: "text",
            eventsListeners: {
              input: validateField,
              blur: validateField,
            },
          }).markup,
          FirstNameInput: new Input({
            name: "first_name",
            type: "text",
            eventsListeners: {
              input: validateField,
              blur: validateField,
            },
          }).markup,
          SecondNameInput: new Input({
            name: "second_name",
            type: "text",
            eventsListeners: {
              input: validateField,
              blur: validateField,
            },
          }).markup,
          DisplayNameInput: new Input({
            name: "display_name",
            type: "text",
            eventsListeners: {
              input: validateField,
              blur: validateField,
            },
          }).markup,
          PhoneInput: new Input({
            name: "phone",
            type: "text",
            eventsListeners: {
              input: validateField,
              blur: validateField,
            },
          }).markup,
          SubmitButton: new Button({
            startIconName: "save",
            text: "Сохранить",
            type: "submit",
          }).markup,
        }),
      }).markup,
      {}
    )
  }
}
