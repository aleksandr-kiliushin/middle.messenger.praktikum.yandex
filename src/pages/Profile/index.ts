import Handlebars from "handlebars"
import { Button } from "../../components/Button"
import { PageWrapper } from "../../components/PageWrapper"
import { template } from "./template"

export const Profile = () => {
  return PageWrapper({
    content: Handlebars.compile(template)({
      LogoutButton: new Button({
        eventsListeners: {
          click: () => {
            console.log("Logged out!")
          },
        },
        startIconName: "logout",
        text: "Выйти",
        type: "button",
      }).render(),
    }),
  })
}
