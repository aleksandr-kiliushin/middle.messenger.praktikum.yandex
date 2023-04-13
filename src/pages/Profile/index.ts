import { authController } from "@controllers/authController"
import Handlebars from "handlebars"

import { Button } from "@components/Button"
import { PageWrapper } from "@components/PageWrapper"

import { Block } from "@utils/Block"
import { router } from "@utils/router"

import { template } from "./template"

export class Profile extends Block {
  constructor() {
    super(
      new PageWrapper({
        content: Handlebars.compile(template)({
          LogoutButton: new Button({
            eventsListeners: {
              click: async () => {
                await authController.signOut()
                router.go({ pathname: "/" })
              },
            },
            startIconName: "logout",
            text: "Выйти",
            type: "button",
          }).markup,
        }),
      }).markup,
      {}
    )
  }

  async componentDidMount() {
    const authorizedUser = await authController.getAuthorizedUser()

    for (const fieldName in authorizedUser.data) {
      const fieldNode = document.querySelector("#" + fieldName)
      if (fieldNode !== null) {
        fieldNode.textContent = authorizedUser.data[fieldName] ?? "--"
      }
    }

    if (authorizedUser.data.avatar !== null) {
      const avatarNode = document.querySelector("img.avatar")
      if (avatarNode instanceof HTMLImageElement) {
        avatarNode.src = "https://ya-praktikum.tech/api/v2/resources" + authorizedUser.data.avatar
      }
    }
  }
}
