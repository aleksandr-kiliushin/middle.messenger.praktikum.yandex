import { withStore } from "@store"
import Handlebars from "handlebars"

import { Button } from "@components/Button"
import { Detail } from "@components/Detail"
import { Form } from "@components/Form"
import { PageWrapper } from "@components/PageWrapper"
import { Row } from "@components/Row"

import { Block, TBlockBaseProps } from "@utils/Block"

import { template } from "./template"

let count = 0

export class _Profile<TProps extends TBlockBaseProps> extends Block {
  constructor({ props }: { props: TProps }) {
    super(
      new PageWrapper({
        content: Handlebars.compile(template)({
          Details: new Form({
            rows: [
              new Row({
                field: new Detail({ content: props.authorizedUserData?.email }).markup,
                name: "email",
                label: "Почта",
              }).markup,
              new Row({
                field: new Detail({ content: props.authorizedUserData?.login }).markup,
                name: "login",
                label: "Логин",
              }).markup,
              new Row({
                field: new Detail({ content: props.authorizedUserData?.first_name }).markup,
                name: "first_name",
                label: "Имя",
              }).markup,
              new Row({
                field: new Detail({ content: props.authorizedUserData?.second_name }).markup,
                name: "second_name",
                label: "Фамилия",
              }).markup,
              new Row({
                field: new Detail({ content: props.authorizedUserData?.display_name }).markup,
                name: "display_name",
                label: "Имя в чате",
              }).markup,
              new Row({
                field: new Detail({ content: props.authorizedUserData?.phone }).markup,
                name: "phone",
                label: "Телефон",
              }).markup,
            ],
            buttons: [
              new Button({
                eventsListeners: {
                  click() {
                    ;(this as Button).props.text = "ВЫШЕЛ " + ++count
                    // await authController.signOut()
                    // router.go({ pathname: "/" })
                  },
                },
                startIconName: "logout",
                text: "Выйти",
                type: "button",
              }).markup,
            ],
            className: "rows",
          }).markup,
        }),
      }).markup,
      props
    )
  }

  componentDidUpdate() {
    console.log("Profile update new this.props >>", this.props)
  }
}

export const Profile = withStore((store) => ({
  authorizedUserData: store.authorizedUserData,
  authorizedUserLoadingStatus: store.authorizedUserLoadingStatus,
}))(_Profile)
