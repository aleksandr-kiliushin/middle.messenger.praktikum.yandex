import Handlebars from "handlebars"
import { Block } from "@utils/Block"
import { Button } from "@components/Button"
import { PageWrapper } from "@components/PageWrapper"
import { template } from "./template"

let demoCounter = 0 // Remonstrates component renrender.

interface IProfileProps {}

export class Profile extends Block<IProfileProps> {
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
}
