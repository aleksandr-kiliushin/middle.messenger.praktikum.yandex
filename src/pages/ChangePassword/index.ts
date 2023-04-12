import { TChangePasswordPayload, usersApi } from "@api/usersApi"
import Handlebars from "handlebars"

import { Button } from "@components/Button"
import { Form } from "@components/Form"
import { Input } from "@components/Input"
import { PageWrapper } from "@components/PageWrapper"
import { Row } from "@components/Row"

import { Block } from "@utils/Block"
import { createFieldValidator } from "@utils/createFieldValidator"
import { createFormSubmitter } from "@utils/createFormSubmitter"
import { FieldConfig, validateFields } from "@utils/form-validator"
import { validations } from "@utils/validations"

import { template } from "./template"

const fieldsRulesConfig = {
  oldPassword: new FieldConfig({ type: "string" }).isRequired({ value: true }),
  newPassword: validations.password,
  newPasswordConfirmation: new FieldConfig({ type: "string" }).isRequired({ value: true }),
}

const validateField = createFieldValidator({ fieldsRulesConfig })

export class ChangePassword extends Block {
  constructor() {
    super(
      new PageWrapper({
        content: Handlebars.compile(template)({
          form: new Form({
            rows: [
              new Row({
                field: new Input({
                  name: "oldPassword",
                  type: "password",
                  eventsListeners: { input: validateField, blur: validateField },
                }).markup,
                label: "Старый пароль",
                name: "oldPassword",
              }).markup,
              new Row({
                field: new Input({
                  name: "newPassword",
                  type: "password",
                  eventsListeners: { input: validateField, blur: validateField },
                }).markup,
                label: "Новый пароль",
                name: "newPassword",
              }).markup,
              new Row({
                field: new Input({
                  name: "newPasswordConfirmation",
                  type: "password",
                  eventsListeners: { input: validateField, blur: validateField },
                }).markup,
                label: "Повторите новый пароль",
                name: "newPasswordConfirmation",
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
              submit: createFormSubmitter<TChangePasswordPayload>({
                fieldsRulesConfig,
                onValidationSuccess: ({ formValues }) => {
                  const passwordsMatchingValidationConfig = validateFields({
                    rules: {
                      newPassword: new FieldConfig({ type: "string" }).equals({
                        value: formValues.newPasswordConfirmation,
                        errorText: "Пароли не совпадают.",
                      }),
                      newPasswordConfirmation: new FieldConfig({ type: "string" }).equals({
                        value: formValues.newPassword as string,
                        errorText: "Пароли не совпадают.",
                      }),
                    },
                    values: formValues,
                  })

                  passwordsMatchingValidationConfig.renderErrors()
                  if (!passwordsMatchingValidationConfig.isValid()) return

                  usersApi.changePassword({ payload: formValues })
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
