import { TSignUpPayload } from "@api/AuthApi"
import { authController } from "@controllers/authController"

import { Anchor } from "@components/Anchor"
import { Box } from "@components/Box"
import { Button } from "@components/Button"
import { Input } from "@components/Input"
import { Label } from "@components/Label"
import { PageWrapper } from "@components/PageWrapper"

import { Block } from "@utils/Block"
import { createFieldValidator } from "@utils/createFieldValidator"
import { createFormSubmitter } from "@utils/createFormSubmitter"
import { fillFormWithSampleValues } from "@utils/fillFormWithSampleValues"
import { FieldConfig } from "@utils/form-validator"
import { router } from "@utils/router"
import { validations } from "@utils/validations"

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
  render() {
    return {
      children: [
        new PageWrapper({
          children: [
            new Box({
              tag: "form",
              className: "rows centered",
              eventsListeners: {
                submit: createFormSubmitter<TSignUpPayload>({
                  fieldsRulesConfig,
                  onValidationSuccess: async ({ formValues }) => {
                    await authController.signUp({ payload: formValues })
                    router.go({ pathname: "/messenger" })
                  },
                }),
              },
              children: [
                new Box({ tag: "h1", content: "Регистрация" }),
                new Box({
                  className: "row",
                  children: [
                    new Label({ content: "Почта", className: "row-label", for: "email" }),
                    new Input({
                      name: "email",
                      type: "text",
                      eventsListeners: { input: validateField, blur: validateField },
                    }),
                  ],
                }),
                new Box({
                  className: "row",
                  children: [
                    new Label({ content: "Логин", className: "row-label", for: "login" }),
                    new Input({
                      name: "login",
                      type: "text",
                      eventsListeners: { input: validateField, blur: validateField },
                    }),
                  ],
                }),
                new Box({
                  className: "row",
                  children: [
                    new Label({ content: "Имя", className: "row-label", for: "first_name" }),
                    new Input({
                      name: "first_name",
                      type: "text",
                      eventsListeners: { input: validateField, blur: validateField },
                    }),
                  ],
                }),
                new Box({
                  className: "row",
                  children: [
                    new Label({ content: "Фамилия", className: "row-label", for: "second_name" }),
                    new Input({
                      name: "second_name",
                      type: "text",
                      eventsListeners: { input: validateField, blur: validateField },
                    }),
                  ],
                }),
                new Box({
                  className: "row",
                  children: [
                    new Label({ content: "Телефон", className: "row-label", for: "phone" }),
                    new Input({
                      name: "phone",
                      type: "text",
                      eventsListeners: { input: validateField, blur: validateField },
                    }),
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
                  ],
                }),
                new Box({
                  className: "row",
                  children: [
                    new Label({ content: "Повторите пароль", className: "row-label", for: "passwordConfirmation" }),
                    new Input({
                      name: "passwordConfirmation",
                      type: "password",
                      eventsListeners: { input: validateField, blur: validateField },
                    }),
                  ],
                }),
                new Button({ text: "Зарегистрироваться", type: "submit" }),
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
                }),
                new Anchor({ content: "Войти", href: "/" }),
              ],
            }),
          ],
        }),
      ],
    }
  }
}
