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
}
