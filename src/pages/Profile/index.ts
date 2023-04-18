import { DEFUALT_AVATAR_SRC, RESOURCES_BASE_URL } from "@constants"
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
    const { authorizedUserData } = this.props

    return {
      children: [
        new PageWrapper({
          children: [
            new Box({
              className: "rows centered",
              children: [
                new Box({ tag: "h1", content: "Профиль" }),
                new Box({
                  className: "row",
                  children: [
                    new Label({ className: "row-label", content: "Аватар" }),
                    new Image({
                      src: authorizedUserData?.avatar ? RESOURCES_BASE_URL + authorizedUserData.avatar : DEFUALT_AVATAR_SRC,
                      className: "avatar",
                      alt: "Avatar",
                      height: 200,
                      width: 200,
                    }),
                  ],
                }),
                new Box({
                  className: "row",
                  children: [
                    new Label({ className: "row-label", content: "Почта" }),
                    new Box({ className: "row-detail", content: authorizedUserData?.email }),
                  ],
                }),
                new Box({
                  className: "row",
                  children: [
                    new Label({ className: "row-label", content: "Логин" }),
                    new Box({ className: "row-detail", content: authorizedUserData?.login }),
                  ],
                }),
                new Box({
                  className: "row",
                  children: [
                    new Label({ className: "row-label", content: "Имя" }),
                    new Box({ className: "row-detail", content: authorizedUserData?.first_name }),
                  ],
                }),
                new Box({
                  className: "row",
                  children: [
                    new Label({ className: "row-label", content: "Фамилия" }),
                    new Box({ className: "row-detail", content: authorizedUserData?.second_name }),
                  ],
                }),
                new Box({
                  className: "row",
                  children: [
                    new Label({ className: "row-label", content: "Имя в чате" }),
                    new Box({ className: "row-detail", content: authorizedUserData?.display_name }),
                  ],
                }),
                new Box({
                  className: "row",
                  children: [
                    new Label({ className: "row-label", content: "Телефон" }),
                    new Box({ className: "row-detail", content: authorizedUserData?.phone }),
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
