import { TEditSettingsPayload } from "@api/UsersApi"
import { DEFUALT_AVATAR_SRC, RESOURCES_BASE_URL } from "@constants"
import { usersController } from "@controllers/usersController"
import { TStoreState, withStore } from "@store"

import { Box } from "@components/Box"
import { Button } from "@components/Button"
import { FileInput } from "@components/FileInput"
import { Image } from "@components/Image"
import { Input } from "@components/Input"
import { Label } from "@components/Label"
import { PageWrapper } from "@components/PageWrapper"

import { Block, TBlockBaseProps } from "@utils/Block"
import { createFieldValidator } from "@utils/createFieldValidator"
import { createFormSubmitter } from "@utils/createFormSubmitter"
import { FieldConfig } from "@utils/form-validator"
import { validations } from "@utils/validations"

const fieldsRulesConfig = {
  display_name: new FieldConfig({ type: "string" }).isRequired({ value: true }),
  email: validations.email,
  first_name: validations.name,
  login: validations.login,
  phone: validations.phone,
  second_name: validations.name,
}

const validateField = createFieldValidator({ fieldsRulesConfig })

type TSettingsOwnProps = TBlockBaseProps
type TSettingsPropsFromStore = Pick<TStoreState, "authorizedUserData">
type TSettingsProps = TSettingsOwnProps & TSettingsPropsFromStore

export class _Settings extends Block<TSettingsProps> {
  constructor(props: TSettingsProps) {
    super({ props })
  }

  render() {
    const { authorizedUserData } = this.props

    if (authorizedUserData === null) return { children: [] }

    return {
      children: [
        new PageWrapper({
          children: [
            new Box({
              className: "rows centered",
              children: [
                new Box({ tag: "h1", content: "Настройки профиля" }),
                new Box({
                  className: "row",
                  children: [
                    new Label({ content: "Аватар", for: "avatar", className: "row-label" }),
                    new Label({
                      for: "avatar",
                      children: [
                        new Image({
                          alt: "Avatar",
                          height: 200,
                          width: 200,
                          src: authorizedUserData.avatar ? RESOURCES_BASE_URL + authorizedUserData.avatar : DEFUALT_AVATAR_SRC,
                          className: "avatar",
                        }),
                      ],
                    }),
                    new FileInput({
                      name: "avatar",
                      className: "display_none",
                      eventsListeners: {
                        change: (event) => {
                          if (!(event.target instanceof HTMLInputElement)) return
                          if (event.target.files === null) return
                          usersController.changeAvatar({ avatar: event.target.files[0] })
                        },
                      },
                    }),
                  ],
                }),
                new Box({
                  tag: "form",
                  className: "rows",
                  eventsListeners: {
                    submit: createFormSubmitter<TEditSettingsPayload>({
                      fieldsRulesConfig,
                      onValidationSuccess: ({ formValues }) => {
                        usersController.editSettings({ payload: formValues })
                      },
                    }),
                  },
                  children: [
                    new Box({
                      className: "row",
                      children: [
                        new Label({ content: "Почта", className: "row-label", for: "email" }),
                        new Input({
                          name: "email",
                          initialValue: authorizedUserData.email,
                          eventsListeners: { input: validateField, blur: validateField },
                        }),
                        new Box({ className: "row-error" }),
                      ],
                    }),
                    new Box({
                      className: "row",
                      children: [
                        new Label({ content: "Логин", className: "row-label", for: "login" }),
                        new Input({
                          name: "login",
                          initialValue: authorizedUserData.login,
                          eventsListeners: { input: validateField, blur: validateField },
                        }),
                        new Box({ className: "row-error" }),
                      ],
                    }),
                    new Box({
                      className: "row",
                      children: [
                        new Label({ content: "Имя", className: "row-label", for: "first_name" }),
                        new Input({
                          name: "first_name",
                          initialValue: authorizedUserData.first_name,
                          eventsListeners: { input: validateField, blur: validateField },
                        }),
                        new Box({ className: "row-error" }),
                      ],
                    }),
                    new Box({
                      className: "row",
                      children: [
                        new Label({ content: "Фамилия", className: "row-label", for: "second_name" }),
                        new Input({
                          name: "second_name",
                          initialValue: authorizedUserData.second_name,
                          eventsListeners: { input: validateField, blur: validateField },
                        }),
                        new Box({ className: "row-error" }),
                      ],
                    }),
                    new Box({
                      className: "row",
                      children: [
                        new Label({ content: "Имя в чате", className: "row-label", for: "display_name" }),
                        new Input({
                          name: "display_name",
                          initialValue: authorizedUserData.display_name ?? "",
                          eventsListeners: { input: validateField, blur: validateField },
                        }),
                        new Box({ className: "row-error" }),
                      ],
                    }),
                    new Box({
                      className: "row",
                      children: [
                        new Label({ content: "Телефон", className: "row-label", for: "phone" }),
                        new Input({
                          name: "phone",
                          initialValue: authorizedUserData.phone,
                          eventsListeners: { input: validateField, blur: validateField },
                        }),
                        new Box({ className: "row-error" }),
                      ],
                    }),
                    new Button({ startIconName: "save", text: "Сохранить", type: "submit" }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }
  }
}

export const Settings = withStore(["authorizedUserData"])(_Settings)
