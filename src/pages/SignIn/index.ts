import Handlebars from "handlebars"
import { Button } from "../../components/Button"
import { PageWrapper } from "../../components/PageWrapper"
import { template } from "./template"
import "./script"
import { Block } from "../../utils/Block"
import { Input } from "../../components/Input"
import { fieldsRulesConfig, isEventTargetField } from "./helpers"
import { validateFields } from "../../utils/form-validator"

const validateField = (event: HTMLElementEventMap["input"] | HTMLElementEventMap["blur"]) => {
  if (!(event.target instanceof HTMLInputElement) && !(event.target instanceof HTMLTextAreaElement)) return
  const fieldName = event.target.getAttribute("name")
  if (!isEventTargetField(fieldName)) return

  validateFields({
    rules: { [fieldName]: fieldsRulesConfig[fieldName] },
    values: { [fieldName]: event.target.value },
  }).renderErrors()
}

export class SignIn extends Block {
  constructor() {
    super(
      new PageWrapper({
        content: Handlebars.compile(template)({
          LoginInput: new Input({
            name: "login",
            type: "text",
            eventsListeners: {
              input: validateField,
              blur: validateField,
            },
          }).markup,
          PasswordInput: new Input({
            name: "password",
            type: "password",
            eventsListeners: {
              input: validateField,
              blur: validateField,
            },
          }).markup,
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
