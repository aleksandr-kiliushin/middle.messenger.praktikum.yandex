import { ChangePassword } from "./pages/ChangePassword"
import { Chats } from "./pages/_Chats"
import { Profile } from "./pages/_Profile"
import { Settings } from "./pages/_Settings"
import { SignIn } from "./pages/SignIn"
import { SignUp } from "./pages/SignUp"
import { InternalServerError } from "./pages/InternalServerError"
import { PageNotFound } from "./pages/PageNotFound"

export const App = () => {
  switch (window.location.pathname) {
    case "/change-password":
      return ChangePassword()
    case "/chats":
      return Chats()
    case "/profile":
      return Profile()
    case "/settings":
      return Settings()
    case "/sign-in":
      return SignIn()
    case "/sign-up":
      return SignUp()
    case "/500":
      return InternalServerError()
    default:
      return PageNotFound()
  }
}
