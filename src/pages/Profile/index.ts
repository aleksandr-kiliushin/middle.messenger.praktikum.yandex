import { authController } from "@controllers/authController"
import { TStoreState, withStore } from "@store"

import { Anchor } from "@components/Anchor"
import { Box } from "@components/Box"
import { Button } from "@components/Button"
import { Image } from "@components/Image"
import { Label } from "@components/Label"
import { PageWrapper } from "@components/PageWrapper"

import { Block, TBlockBaseProps } from "@utils/Block"
import { router } from "@utils/router"

type TProfileOwnProps = TBlockBaseProps
type TProfilePropsFromStore = Pick<TStoreState, "authorizedUserData">
type TProfileProps = TProfileOwnProps & TProfilePropsFromStore

export class _Profile extends Block<TProfileProps> {
  constructor(props: TProfileProps) {
    super({ props })
  }

  render() {
    return {
      children: [
        new PageWrapper({
          children: [
            new Box({
              tag: "div",
              className: "rows centered",
              children: [
                new Box({ tag: "h1", content: "Профиль" }),
                new Box({
                  tag: "div",
                  className: "row",
                  children: [
                    new Label({ className: "row-label", content: "Аватар" }),
                    new Image({
                      src:
                        this.props.authorizedUserData?.avatar === null
                          ? "https://st3.depositphotos.com/1767687/16607/v/600/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg"
                          : "https://ya-praktikum.tech/api/v2/resources" + this.props.authorizedUserData?.avatar,
                      className: "avatar",
                      alt: "Avatar",
                      height: 200,
                      width: 200,
                    }),
                  ],
                }),
                new Box({
                  tag: "div",
                  className: "row",
                  children: [
                    new Label({ className: "row-label", content: "Почта" }),
                    new Box({ className: "row-detail", tag: "div", content: this.props.authorizedUserData?.email }),
                  ],
                }),
                new Box({
                  tag: "div",
                  className: "row",
                  children: [
                    new Label({ className: "row-label", content: "Логин" }),
                    new Box({ className: "row-detail", tag: "div", content: this.props.authorizedUserData?.login }),
                  ],
                }),
                new Box({
                  tag: "div",
                  className: "row",
                  children: [
                    new Label({ className: "row-label", content: "Имя" }),
                    new Box({ className: "row-detail", tag: "div", content: this.props.authorizedUserData?.first_name }),
                  ],
                }),
                new Box({
                  tag: "div",
                  className: "row",
                  children: [
                    new Label({ className: "row-label", content: "Фамилия" }),
                    new Box({ className: "row-detail", tag: "div", content: this.props.authorizedUserData?.second_name }),
                  ],
                }),
                new Box({
                  tag: "div",
                  className: "row",
                  children: [
                    new Label({ className: "row-label", content: "Имя в чате" }),
                    new Box({ className: "row-detail", tag: "div", content: this.props.authorizedUserData?.display_name }),
                  ],
                }),
                new Box({
                  tag: "div",
                  className: "row",
                  children: [
                    new Label({ className: "row-label", content: "Телефон" }),
                    new Box({ className: "row-detail", tag: "div", content: this.props.authorizedUserData?.phone }),
                  ],
                }),
                new Anchor({ content: "Изменить данные", href: "/settings" }),
                new Anchor({ content: "Изменить пароль", href: "/change-password" }),
                new Button({
                  eventsListeners: {
                    async click() {
                      await authController.signOut()
                      router.go({ pathname: "/" })
                    },
                  },
                  startIconName: "logout",
                  text: "Выйти",
                  type: "button",
                }),
              ],
            }),
          ],
        }),
      ],
    }
  }
}

export const Profile = withStore(["authorizedUserData"])(_Profile)
