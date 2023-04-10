import { Router } from "@utils/Router"

import { ChangePassword } from "./pages/ChangePassword"
import { Chats } from "./pages/Chats"
import { InternalServerError } from "./pages/InternalServerError"
import { PageNotFound } from "./pages/PageNotFound"
import { Profile } from "./pages/Profile"
import { Settings } from "./pages/Settings"
import { SignIn } from "./pages/SignIn"
import { SignUp } from "./pages/SignUp"

const router = new Router()

export const App = () => {
  router.use({ blockClass: Profile, pathname: "/profile" }).start()

  switch (window.location.pathname) {
    case "/change-password":
      return new ChangePassword().markup
    case "/messenger":
      return new Chats().markup
    case "/settings":
      return new Settings().markup
    case "/":
      return new SignIn().markup
    case "/sign-up":
      return new SignUp().markup
    case "/500":
      return new InternalServerError().markup
    default:
      return new PageNotFound().markup
  }
}
