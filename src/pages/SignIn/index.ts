import { TSignInPayload } from "@api/AuthApi"
import { authController } from "@controllers/authController"
import Handlebars from "handlebars"

import { Button } from "@components/Button"
import { Form } from "@components/Form"
import { Input } from "@components/Input"
import { PageWrapper } from "@components/PageWrapper"
import { Row } from "@components/Row"

import { Block } from "@utils/Block"
import { createFieldValidator } from "@utils/createFieldValidator"
import { createFormSubmitter } from "@utils/createFormSubmitter"
import { fillFormWithSampleValues } from "@utils/fillFormWithSampleValues"
import { FieldConfig } from "@utils/form-validator"
import { router } from "@utils/router"

import { template } from "./template"

const fieldsRulesConfig = {
  login: new FieldConfig({ type: "string" }).isRequired({ value: true }),
  password: new FieldConfig({ type: "string" }).isRequired({ value: true }),
}

const validateField = createFieldValidator({ fieldsRulesConfig })

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
                  initialValue: "",
                  eventsListeners: { input: validateField, blur: validateField },
                }).markup,
                label: "Логин",
                name: "login",
              }).markup,
              new Row({
                field: new Input({
                  name: "password",
                  type: "password",
                  initialValue: "",
                  eventsListeners: { input: validateField, blur: validateField },
                }).markup,
                label: "Пароль",
                name: "password",
              }).markup,
            ],
            buttons: [
              new Button({
                startIconName: "login",
                text: "Войти",
                type: "submit",
              }).markup,
              new Button({
                text: "Заполнить поля",
                type: "button",
                eventsListeners: {
                  click: () => {
                    fillFormWithSampleValues({
                      login: "helloworld",
                      password: "Qwerty123",
                    })
                  },
                },
              }).markup,
            ],
            eventsListeners: {
              submit: createFormSubmitter<TSignInPayload>({
                fieldsRulesConfig,
                onValidationSuccess: async ({ formValues }) => {
                  await authController.signIn({ payload: formValues })
                  router.go({ pathname: "/messenger" })
                },
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
