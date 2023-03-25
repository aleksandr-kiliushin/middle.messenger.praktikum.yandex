import Handlebars from "handlebars"
import { Button } from "../../components/Button"
import { PageWrapper } from "../../components/PageWrapper"
import { template } from "./template"
import { Block } from "../../utils/Block"
import { Input } from "../../components/Input"
import { fieldsRulesConfig, validateField } from "./helpers"
import { Form } from "../../components/Form"
import { Row } from "../../components/Row"
import { createFormSubmitter } from "../../utils/createFormSubmitter"

export class SignIn extends Block {
  constructor() {
    super(
      new PageWrapper({
        content: Handlebars.compile(template)({
          form: new Form({
            rows: [
              new Row({
                field: new Input({
                  name: "login",
                  type: "text",
                  eventsListeners: { input: validateField, blur: validateField },
                }).markup,
                label: "Логин",
                name: "login",
              }).markup,
              new Row({
                field: new Input({
                  name: "password",
                  type: "password",
                  eventsListeners: { input: validateField, blur: validateField },
                }).markup,
                label: "Пароль",
                name: "password",
              }).markup,
            ],
            buttons: [
              new Button({
                startIconName: "login",
                text: "Авторизоваться",
                type: "submit",
              }).markup,
            ],
            eventsListeners: {
              submit: createFormSubmitter({
                fieldsRulesConfig,
                onValidationSuccess: console.log,
              }),
            },
          }).markup,
        }),
      }).markup,
      {}
    )
  }
}
