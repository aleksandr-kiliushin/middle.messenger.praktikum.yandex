import Handlebars from "handlebars"
import { Button } from "../../components/Button"
import { PageWrapper } from "../../components/PageWrapper"
import { template } from "./template"
import { Block } from "../../utils/Block"
import { Input } from "../../components/Input"
import { validations } from "../../utils/validations"
import { FieldConfig } from "../../utils/form-validator"
import { createFieldValidator } from "../../utils/createFieldValidator"
import { Form } from "../../components/Form"
import { createFormSubmitter } from "../../utils/createFormSubmitter"
import { Row } from "../../components/Row"

const fieldsRulesConfig = {
  email: validations.email,
  first_name: validations.name,
  login: validations.login,
  password: validations.password,
  passwordConfirmation: new FieldConfig({ type: "string" }).isRequired({ value: true }),
  phone: validations.phone,
  second_name: validations.name,
}

export const validateField = createFieldValidator({ fieldsRulesConfig })

export class SignUp extends Block {
  constructor() {
    super(
      new PageWrapper({
        content: Handlebars.compile(template)({
          form: new Form({
            rows: [
              new Row({
                field: new Input({
                  name: "email",
                  type: "text",
                  eventsListeners: { input: validateField, blur: validateField },
                }).markup,
                label: "Почта",
                name: "email",
              }).markup,
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
                  name: "first_name",
                  type: "text",
                  eventsListeners: { input: validateField, blur: validateField },
                }).markup,
                label: "Имя",
                name: "first_name",
              }).markup,
              new Row({
                field: new Input({
                  name: "second_name",
                  type: "text",
                  eventsListeners: { input: validateField, blur: validateField },
                }).markup,
                label: "Фамилия",
                name: "second_name",
              }).markup,
              new Row({
                field: new Input({
                  name: "phone",
                  type: "text",
                  eventsListeners: { input: validateField, blur: validateField },
                }).markup,
                label: "Телефон",
                name: "phone",
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
              new Row({
                field: new Input({
                  name: "passwordConfirmation",
                  type: "password",
                  eventsListeners: { input: validateField, blur: validateField },
                }).markup,
                label: "Повторите пароль",
                name: "passwordConfirmation",
              }).markup,
            ],
            buttons: [
              new Button({
                text: "Зарегистрироваться",
                type: "submit",
              }).markup,
            ],
            eventsListeners: {
              submit: createFormSubmitter({
                fieldsRulesConfig,
                onValidationSuccess: console.log,
              }),
            },
            className: "rows",
          }).markup,
        }),
      }).markup,
      {}
    )
  }
}
