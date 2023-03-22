import Handlebars from "handlebars"
import { Button } from "../../components/Button"
import { PageWrapper } from "../../components/PageWrapper"
import { template } from "./template"

let demoCounter = 0 // Remonstrates component renrender.

export const Profile = () => {
  return PageWrapper({
    content: Handlebars.compile(template)({
      LogoutButton: new Button({
        eventsListeners: {
          click() {
            console.log("Logged out!")
            ;(this as Button).props.text = `Вы вышли ${++demoCounter} раз.`
          },
        },
        startIconName: "logout",
        text: "Выйти",
        type: "button",
      }).markup,
    }),
  })
}
