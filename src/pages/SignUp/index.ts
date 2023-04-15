import { TSignUpPayload } from "@api/AuthApi"
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
import { validations } from "@utils/validations"

import { template } from "./template"

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
                  initialValue: "",
                  eventsListeners: { input: validateField, blur: validateField },
                }).markup,
                label: "Почта",
                name: "email",
              }).markup,
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
                  name: "first_name",
                  type: "text",
                  initialValue: "",
                  eventsListeners: { input: validateField, blur: validateField },
                }).markup,
                label: "Имя",
                name: "first_name",
              }).markup,
              new Row({
                field: new Input({
                  name: "second_name",
                  type: "text",
                  initialValue: "",
                  eventsListeners: { input: validateField, blur: validateField },
                }).markup,
                label: "Фамилия",
                name: "second_name",
              }).markup,
              new Row({
                field: new Input({
                  name: "phone",
                  type: "text",
                  initialValue: "",
                  eventsListeners: { input: validateField, blur: validateField },
                }).markup,
                label: "Телефон",
                name: "phone",
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
              new Row({
                field: new Input({
                  name: "passwordConfirmation",
                  type: "password",
                  initialValue: "",
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
              new Button({
                text: "Заполнить поля",
                type: "button",
                eventsListeners: {
                  click: () => {
                    fillFormWithSampleValues({
                      email: "hello@world.ru",
                      login: "helloworld",
                      first_name: "Hello",
                      second_name: "World",
                      phone: "0123456789",
                      password: "Qwerty123",
                      passwordConfirmation: "Qwerty123",
                    })
                  },
                },
              }).markup,
            ],
            eventsListeners: {
              submit: createFormSubmitter<TSignUpPayload>({
                fieldsRulesConfig,
                onValidationSuccess: async ({ formValues }) => {
                  await authController.signUp({ payload: formValues })
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
