import Handlebars from "handlebars"

import { Button } from "@components/Button"
import { Form } from "@components/Form"
import { Input } from "@components/Input"
import { PageWrapper } from "@components/PageWrapper"
import { Row } from "@components/Row"

import { Block } from "@utils/Block"
import { createFieldValidator } from "@utils/createFieldValidator"
import { createFormSubmitter } from "@utils/createFormSubmitter"
import { FieldConfig } from "@utils/form-validator"
import { request } from "@utils/request"
import { validations } from "@utils/validations"

import { template } from "./template"

const fieldsRulesConfig = {
  display_name: new FieldConfig({ type: "string" }).isRequired({ value: true }),
  email: validations.email,
  first_name: validations.name,
  login: validations.login,
  phone: validations.phone,
  second_name: validations.name,
}

const validateField = createFieldValidator({ fieldsRulesConfig })

export class Settings extends Block {
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
                  eventsListeners: {
                    input: validateField,
                    blur: validateField,
                  },
                }).markup,
                label: "Почта",
                name: "email",
              }).markup,
              new Row({
                field: new Input({
                  name: "login",
                  type: "text",
                  eventsListeners: {
                    input: validateField,
                    blur: validateField,
                  },
                }).markup,
                label: "Логин",
                name: "login",
              }).markup,
              new Row({
                field: new Input({
                  name: "first_name",
                  type: "text",
                  eventsListeners: {
                    input: validateField,
                    blur: validateField,
                  },
                }).markup,
                label: "Имя",
                name: "first_name",
              }).markup,
              new Row({
                field: new Input({
                  name: "second_name",
                  type: "text",
                  eventsListeners: {
                    input: validateField,
                    blur: validateField,
                  },
                }).markup,
                label: "Фамилия",
                name: "second_name",
              }).markup,
              new Row({
                field: new Input({
                  name: "display_name",
                  type: "text",
                  eventsListeners: {
                    input: validateField,
                    blur: validateField,
                  },
                }).markup,
                label: "Имя в чате",
                name: "display_name",
              }).markup,
              new Row({
                field: new Input({
                  name: "phone",
                  type: "text",
                  eventsListeners: {
                    input: validateField,
                    blur: validateField,
                  },
                }).markup,
                label: "Телефон",
                name: "phone",
              }).markup,
            ],
            buttons: [
              new Button({
                startIconName: "save",
                text: "Сохранить",
                type: "submit",
              }).markup,
            ],
            eventsListeners: {
              submit: createFormSubmitter({
                fieldsRulesConfig,
                onValidationSuccess: ({ formValues }) => {
                  request({
                    method: "PUT",
                    url: "https://ya-praktikum.tech/api/v2/user/profile",
                    body: formValues,
                  })
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

  async componentDidMount() {
    const authorizedUser = await request({
      method: "GET",
      url: "https://ya-praktikum.tech/api/v2/auth/user",
    })

    for (const fieldName in authorizedUser.data) {
      const fieldNode = document.querySelector(`[name="${fieldName}"]`)
      if (fieldNode instanceof HTMLInputElement) {
        fieldNode.value = authorizedUser.data[fieldName] ?? ""
      }
    }
  }
}
