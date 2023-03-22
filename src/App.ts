import { ChangePassword } from "./pages/ChangePassword"
import { Chats } from "./pages/Chats"
import { Profile } from "./pages/Profile"
import { Settings } from "./pages/Settings"
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
      return new Profile().markup
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
