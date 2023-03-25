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
