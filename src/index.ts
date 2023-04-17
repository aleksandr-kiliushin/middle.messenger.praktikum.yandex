import { usersController } from "@controllers/usersController"

import { router } from "@utils/router"

import { ChangePassword } from "./pages/ChangePassword"
import { Chats } from "./pages/Chats"
import { InternalServerError } from "./pages/InternalServerError"
import { Profile } from "./pages/Profile"
import { Settings } from "./pages/Settings"
import { SignIn } from "./pages/SignIn"
import { SignUp } from "./pages/SignUp"
import "./styles"

window.addEventListener("DOMContentLoaded", async () => {
  try {
    setTimeout(() => {
      // console.log("        Loading started.")
      usersController.fetchAndSetAuthorizedUser()
    }, 1000)
  } catch (error) {
    console.error(error)
  }

  router
    .use({ pathname: "/", RouteBlock: SignIn })
    .use({ pathname: "/500", RouteBlock: InternalServerError })
    .use({ pathname: "/change-password", RouteBlock: ChangePassword })
    .use({ pathname: "/messenger", RouteBlock: Chats })
    .use({ pathname: "/profile", RouteBlock: Profile })
    .use({ pathname: "/settings", RouteBlock: Settings })
    .use({ pathname: "/sign-up", RouteBlock: SignUp })
    .start()
})
