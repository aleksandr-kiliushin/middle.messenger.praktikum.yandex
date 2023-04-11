import Handlebars from "handlebars"

import { Button } from "@components/Button"
import { PageWrapper } from "@components/PageWrapper"

import { Block } from "@utils/Block"
import { router } from "@utils/Router"
import { request } from "@utils/request"

import { template } from "./template"

export class Profile extends Block {
  constructor() {
    super(
      new PageWrapper({
        content: Handlebars.compile(template)({
          LogoutButton: new Button({
            eventsListeners: {
              click: async () => {
                await request({
                  method: "POST",
                  url: "https://ya-praktikum.tech/api/v2/auth/logout",
                })
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
    const authorizedUser = await request({
      method: "GET",
      url: "https://ya-praktikum.tech/api/v2/auth/user",
    })

    for (const fieldName in authorizedUser.data) {
      const fieldNode = document.querySelector("#" + fieldName)
      if (fieldNode !== null) {
        fieldNode.textContent = authorizedUser.data[fieldName] ?? "--"
      }
    }
  }
}
