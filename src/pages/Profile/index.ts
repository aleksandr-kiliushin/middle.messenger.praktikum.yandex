import Handlebars from "handlebars"
import { Block } from "../../utils/Block"
import { Button } from "../../components/Button"
import { PageWrapper } from "../../components/PageWrapper"
import { template } from "./template"

let demoCounter = 0 // Remonstrates component renrender.

const _template = PageWrapper({
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
})

interface IProfileProps {}

export class Profile extends Block<IProfileProps> {
  constructor() {
    super(_template, {})
  }
}
