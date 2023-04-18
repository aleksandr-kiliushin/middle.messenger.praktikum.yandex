import { TChangePasswordPayload } from "@api/UsersApi"
import { usersController } from "@controllers/usersController"

import { Box } from "@components/Box"
import { Button } from "@components/Button"
import { Input } from "@components/Input"
import { Label } from "@components/Label"
import { PageWrapper } from "@components/PageWrapper"

import { Block } from "@utils/Block"
import { createFieldValidator } from "@utils/createFieldValidator"
import { createFormSubmitter } from "@utils/createFormSubmitter"
import { FieldConfig, validateFields } from "@utils/form-validator"
import { validations } from "@utils/validations"

const fieldsRulesConfig = {
  oldPassword: new FieldConfig({ type: "string" }).isRequired({ value: true }),
  newPassword: validations.password,
  newPasswordConfirmation: new FieldConfig({ type: "string" }).isRequired({ value: true }),
}

const validateField = createFieldValidator({ fieldsRulesConfig })

export class ChangePassword extends Block {
  render() {
    const submit = createFormSubmitter<TChangePasswordPayload>({
      fieldsRulesConfig,
      onValidationSuccess: ({ formValues }) => {
        const passwordsMatchingValidationConfig = validateFields({
          rules: {
            newPassword: new FieldConfig({ type: "string" }).equals({
              value: formValues.newPasswordConfirmation,
              errorText: "Пароли не совпадают.",
            }),
            newPasswordConfirmation: new FieldConfig({ type: "string" }).equals({
              value: formValues.newPassword,
              errorText: "Пароли не совпадают.",
            }),
          },
          values: formValues,
        })

        passwordsMatchingValidationConfig.renderErrors()
        if (!passwordsMatchingValidationConfig.isValid()) return

        usersController.changePassword({ payload: formValues })
      },
    })

    return {
      children: [
        new PageWrapper({
          children: [
            new Box({
              tag: "form",
              className: "rows centered",
              eventsListeners: { submit },
              children: [
                new Box({ tag: "h1", content: "Изменить пароль" }),
                new Box({
                  tag: "div",
                  className: "row",
                  children: [
                    new Label({ content: "Старый пароль", className: "row-label", for: "oldPassword" }),
                    new Input({
                      name: "oldPassword",
                      type: "password",
                      initialValue: "",
                      eventsListeners: { input: validateField, blur: validateField },
                    }),
                  ],
                }),
                new Box({
                  tag: "div",
                  className: "row",
                  children: [
                    new Label({ content: "Новый пароль", className: "row-label", for: "newPassword" }),
                    new Input({
                      name: "newPassword",
                      type: "password",
                      initialValue: "",
                      eventsListeners: { input: validateField, blur: validateField },
                    }),
                  ],
                }),
                new Box({
                  tag: "div",
                  className: "row",
                  children: [
                    new Label({ content: "Повторите новый пароль", className: "row-label", for: "newPasswordConfirmation" }),
                    new Input({
                      name: "newPasswordConfirmation",
                      type: "password",
                      initialValue: "",
                      eventsListeners: { input: validateField, blur: validateField },
                    }),
                  ],
                }),
                new Button({ startIconName: "save", text: "Сохранить", type: "submit" }),
              ],
            }),
          ],
        }),
      ],
    }
  }
}
