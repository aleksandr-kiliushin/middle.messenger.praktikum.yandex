import { authController } from "@controllers/authController"

import { TSignInPayload } from "@api/AuthApi"

import { Anchor } from "@components/Anchor"
import { Box } from "@components/Box"
import { Button } from "@components/Button"
import { Input } from "@components/Input"
import { Label } from "@components/Label"
import { PageWrapper } from "@components/PageWrapper"

import { Block } from "@utils/Block"
import { router } from "@utils/Router"
import { createFieldValidator } from "@utils/createFieldValidator"
import { createFormSubmitter } from "@utils/createFormSubmitter"
import { fillFormWithSampleValues } from "@utils/fillFormWithSampleValues"
import { FieldConfig } from "@utils/form-validator"

const fieldsRulesConfig = {
  login: new FieldConfig({ type: "string" }).isRequired({ value: true }),
  password: new FieldConfig({ type: "string" }).isRequired({ value: true }),
}

const validateField = createFieldValidator({ fieldsRulesConfig })

export class SignIn extends Block {
  render() {
    return {
      children: [
        new PageWrapper({
          children: [
            new Box({
              tag: "form",
              className: "rows centered",
              eventsListeners: {
                submit: createFormSubmitter<TSignInPayload>({
                  fieldsRulesConfig,
                  onValidationSuccess: async ({ formValues }) => {
                    await authController.signIn({ payload: formValues })
                    router.go({ pathname: "/messenger" })
                  },
                }),
              },
              children: [
                new Box({ tag: "h1", content: "Вход" }),
                new Box({
                  className: "row",
                  children: [
                    new Label({ content: "Логин", className: "row-label", for: "login" }),
                    new Input({
                      name: "login",
                      eventsListeners: { input: validateField, blur: validateField },
                    }),
                    new Box({ className: "row-error" }),
                  ],
                }),
                new Box({
                  className: "row",
                  children: [
                    new Label({ content: "Пароль", className: "row-label", for: "password" }),
                    new Input({
                      name: "password",
                      type: "password",
                      eventsListeners: { input: validateField, blur: validateField },
                    }),
                    new Box({ className: "row-error" }),
                  ],
                }),
                new Button({ startIconName: "login", text: "Войти", type: "submit" }),
                new Button({
                  text: "Заполнить поля",
                  eventsListeners: {
                    click: () => {
                      fillFormWithSampleValues({
                        login: "helloworld",
                        password: "Qwerty123",
                      })
                    },
                  },
                }),
                new Anchor({ content: "Нет аккаунта?", href: "/sign-up" }),
              ],
            }),
          ],
        }),
      ],
    }
  }
}
