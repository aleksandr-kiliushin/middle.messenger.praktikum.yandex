import Handlebars from "handlebars"
import { Button } from "../../components/Button"
import { PageWrapper } from "../../components/PageWrapper"
import { template } from "./template"
import "./script"
import { Block } from "../../utils/Block"
import { fieldsRulesConfig, isEventTargetField } from "./helpers"
import { validateFields } from "../../utils/form-validator"
import { Input } from "../../components/Input"

const validateField = (event: HTMLElementEventMap["input"] | HTMLElementEventMap["blur"]) => {
  if (!(event.target instanceof HTMLInputElement) && !(event.target instanceof HTMLTextAreaElement)) return
  const fieldName = event.target.getAttribute("name")
  if (!isEventTargetField(fieldName)) return

  validateFields({
    rules: { [fieldName]: fieldsRulesConfig[fieldName] },
    values: { [fieldName]: event.target.value },
  }).renderErrors()
}

export class ChangePassword extends Block {
  constructor() {
    super(
      new PageWrapper({
        content: Handlebars.compile(template)({
          OldPasswordInput: new Input({
            name: "oldPassword",
            type: "text",
            eventsListeners: {
              input: validateField,
              blur: validateField,
            },
          }).markup,
          NewPasswordInput: new Input({
            name: "newPassword",
            type: "password",
            eventsListeners: {
              input: validateField,
              blur: validateField,
            },
          }).markup,
          NewPasswordConfirmationInput: new Input({
            name: "newPasswordConfirmation",
            type: "password",
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
