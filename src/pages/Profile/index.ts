import Handlebars from "handlebars"

import { Button } from "@components/Button"
import { PageWrapper } from "@components/PageWrapper"

import { Block } from "@utils/Block"
import { request } from "@utils/request"

import { template } from "./template"

let demoCounter = 0 // Remonstrates component renrender.

export class Profile extends Block {
  constructor() {
    super(
      new PageWrapper({
        content: Handlebars.compile(template)({
          LogoutButton: new Button({
            eventsListeners: {
              click() {
                ;(this as Button).props.text = `Вы вышли ${++demoCounter} раз.`
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
