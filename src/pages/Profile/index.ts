import { TStoreState, withStore } from "@store"
import Handlebars from "handlebars"

import { Button } from "@components/Button"
import { Div } from "@components/Div"
import { Form } from "@components/Form"
import { Image } from "@components/Image"
import { PageWrapper } from "@components/PageWrapper"
import { Row } from "@components/Row"

import { Block, TBlockBaseProps } from "@utils/Block"

import { template } from "./template"

let count = 0

type TProfileOwnProps = TBlockBaseProps
type TProfilePropsFromStore = Pick<TStoreState, "authorizedUserData" | "authorizedUserLoadingStatus">
type TProfileProps = TProfileOwnProps & TProfilePropsFromStore

export class _Profile extends Block {
  constructor({ props }: { props: TProfileProps }) {
    super(
      new PageWrapper({
        content: Handlebars.compile(template)({
          Details: new Form({
            rows: [
              new Row({
                field: new Image({
                  src:
                    props.authorizedUserData?.avatar === null
                      ? "https://st3.depositphotos.com/1767687/16607/v/600/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg"
                      : "https://ya-praktikum.tech/api/v2/resources" + props.authorizedUserData?.avatar,
                  className: "avatar",
                  alt: "Avatar",
                  height: 200,
                  width: 200,
                }).markup,
                name: "email",
                label: "Почта",
              }).markup,
              new Row({
                field: new Div({ content: props.authorizedUserData?.email, className: "row-detail" }).markup,
                name: "email",
                label: "Почта",
              }).markup,
              new Row({
                field: new Div({ content: props.authorizedUserData?.login, className: "row-detail" }).markup,
                name: "login",
                label: "Логин",
              }).markup,
              new Row({
                field: new Div({ content: props.authorizedUserData?.first_name, className: "row-detail" }).markup,
                name: "first_name",
                label: "Имя",
              }).markup,
              new Row({
                field: new Div({ content: props.authorizedUserData?.second_name, className: "row-detail" }).markup,
                name: "second_name",
                label: "Фамилия",
              }).markup,
              new Row({
                field: new Div({ content: props.authorizedUserData?.display_name, className: "row-detail" }).markup,
                name: "display_name",
                label: "Имя в чате",
              }).markup,
              new Row({
                field: new Div({ content: props.authorizedUserData?.phone, className: "row-detail" }).markup,
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
}

export const Profile = withStore((store) => ({
  authorizedUserData: store.authorizedUserData,
  authorizedUserLoadingStatus: store.authorizedUserLoadingStatus,
}))(_Profile)
