import { TEditSettingsPayload } from "@api/UsersApi"
import { usersController } from "@controllers/usersController"
import { TStoreState, withStore } from "@store"
import Handlebars from "handlebars"

import { Button } from "@components/Button"
import { Form } from "@components/Form"
import { Input } from "@components/Input"
import { PageWrapper } from "@components/PageWrapper"
import { Row } from "@components/Row"

import { Block, TBlockBaseProps } from "@utils/Block"
import { createFieldValidator } from "@utils/createFieldValidator"
import { createFormSubmitter } from "@utils/createFormSubmitter"
import { FieldConfig } from "@utils/form-validator"
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

type TSettingsOwnProps = TBlockBaseProps
type TSettingsPropsFromStore = Pick<TStoreState, "authorizedUserData">
type TSettingsProps = TSettingsOwnProps & TSettingsPropsFromStore

export class _Settings extends Block {
  constructor({ props }: { props: TSettingsProps }) {
    super(
      new PageWrapper({
        content: Handlebars.compile(template)({
          form: new Form({
            rows: [
              new Row({
                field: new Input({
                  name: "email",
                  type: "text",
                  initialValue: props.authorizedUserData?.email ?? "",
                  eventsListeners: { input: validateField, blur: validateField },
                }).markup,
                label: "Почта",
                name: "email",
              }).markup,
              new Row({
                field: new Input({
                  name: "login",
                  type: "text",
                  initialValue: props.authorizedUserData?.login ?? "",
                  eventsListeners: { input: validateField, blur: validateField },
                }).markup,
                label: "Логин",
                name: "login",
              }).markup,
              new Row({
                field: new Input({
                  name: "first_name",
                  type: "text",
                  initialValue: props.authorizedUserData?.first_name ?? "",
                  eventsListeners: { input: validateField, blur: validateField },
                }).markup,
                label: "Имя",
                name: "first_name",
              }).markup,
              new Row({
                field: new Input({
                  name: "second_name",
                  type: "text",
                  initialValue: props.authorizedUserData?.second_name ?? "",
                  eventsListeners: { input: validateField, blur: validateField },
                }).markup,
                label: "Фамилия",
                name: "second_name",
              }).markup,
              new Row({
                field: new Input({
                  name: "display_name",
                  type: "text",
                  initialValue: props.authorizedUserData?.display_name ?? "",
                  eventsListeners: { input: validateField, blur: validateField },
                }).markup,
                label: "Имя в чате",
                name: "display_name",
              }).markup,
              new Row({
                field: new Input({
                  name: "phone",
                  type: "text",
                  initialValue: props.authorizedUserData?.phone ?? "",
                  eventsListeners: { input: validateField, blur: validateField },
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
              submit: createFormSubmitter<TEditSettingsPayload>({
                fieldsRulesConfig,
                onValidationSuccess: ({ formValues }) => {
                  usersController.editSettings({ payload: formValues })
                },
              }),
            },
            className: "rows",
          }).markup,
        }),
      }).markup,
      props
    )
  }
}

export const Settings = withStore(["authorizedUserData"])(_Settings)
