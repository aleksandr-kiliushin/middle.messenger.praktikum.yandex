import { router } from "@utils/Router"

import { ChangePassword } from "./pages/ChangePassword"
import { Chats } from "./pages/Chats"
import { InternalServerError } from "./pages/InternalServerError"
import { Profile } from "./pages/Profile"
import { Settings } from "./pages/Settings"
import { SignIn } from "./pages/SignIn"
import { SignUp } from "./pages/SignUp"

export const App = () => {
  router
    .use({ pageBlockClass: ChangePassword, pathname: "/change-password" })
    .use({ pageBlockClass: Profile, pathname: "/profile" })
    .use({ pageBlockClass: Chats, pathname: "/messenger" })
    .use({ pageBlockClass: Settings, pathname: "/settings" })
    .use({ pageBlockClass: SignIn, pathname: "/" })
    .use({ pageBlockClass: SignUp, pathname: "/sign-up" })
    .use({ pageBlockClass: InternalServerError, pathname: "/500" })
    .start()
}
